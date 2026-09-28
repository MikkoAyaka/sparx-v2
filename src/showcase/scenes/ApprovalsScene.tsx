import React, { useId, useMemo, useState } from "react";
import { clsx } from "clsx";
import { CheckCircle2, Inbox, XCircle } from "lucide-react";
import {
  ActivityTimeline,
  AppShell,
  Badge,
  Button,
  DataTable,
  DescriptionList,
  EmptyState,
  FilterBar,
  PageHeader,
  WorkflowPipeline,
  type DataTableColumn,
} from "@/sparx-ui";
import type { RouteId } from "../routes";
import { OPS_PRODUCT, OPS_USER, OpsCard, OpsTopbar, formatCny, opsNav, type OpsNavId } from "./enterprise/shared";
import { APPROVALS, ME, type ApprovalLine, type ApprovalRequest } from "./enterprise/approvals-data";

type Tab = "mine" | "initiated" | "processed";

const NOW = "09-28 10:24";

const inTab = (r: ApprovalRequest, tab: Tab) =>
  tab === "mine" ? r.status === "pending" && r.awaitingMe : tab === "initiated" ? r.requester === ME : r.status !== "pending";

const statusBadge = (r: ApprovalRequest) => {
  if (r.status === "approved") return <Badge variant="success" mono={false}>已批准</Badge>;
  if (r.status === "rejected") return <Badge variant="error" mono={false}>已驳回</Badge>;
  if (r.awaitingMe) return <Badge variant="warning" mono={false}>待我审批</Badge>;
  return <Badge variant="info" mono={false}>审批中</Badge>;
};

/** 场景：审批中心（皓白极翠） */
export const ApprovalsScene: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const [requests, setRequests] = useState<ApprovalRequest[]>(APPROVALS);
  const [tab, setTab] = useState<Tab>("mine");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(APPROVALS[0].id);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [banner, setBanner] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const reasonId = useId();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter(
      (r) => inTab(r, tab) && (!q || r.id.toLowerCase().includes(q) || r.title.includes(q) || r.requester.includes(q))
    );
  }, [requests, tab, query]);

  const counts = {
    mine: requests.filter((r) => inTab(r, "mine")).length,
    initiated: requests.filter((r) => inTab(r, "initiated")).length,
    processed: requests.filter((r) => inTab(r, "processed")).length,
  };

  const selected = requests.find((r) => r.id === selectedId) ?? null;

  const select = (id: string | null) => {
    setSelectedId(id);
    setRejecting(false);
    setReason("");
    setReasonError("");
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setBanner(null);
    const first = requests.find((r) => inTab(r, t));
    select(first?.id ?? null);
  };

  /** 处理完一张单据后，自动选中当前列表中的下一张 */
  const advanceFrom = (id: string, next: ApprovalRequest[]) => {
    const remaining = next.filter((r) => inTab(r, tab));
    const idx = list.findIndex((r) => r.id === id);
    const candidate = remaining[Math.min(idx, remaining.length - 1)];
    select(candidate?.id ?? null);
  };

  const approve = (r: ApprovalRequest) => {
    const mineIdx = r.steps.findIndex((s) => s.status === "in_progress");
    const nextStep = r.steps[mineIdx + 1];
    const updated: ApprovalRequest = {
      ...r,
      status: "approved",
      awaitingMe: false,
      steps: r.steps.map((s, i) =>
        i === mineIdx ? { ...s, status: "completed", duration: NOW } : i === mineIdx + 1 ? { ...s, status: "in_progress" } : s
      ),
      activity: [...r.activity, { id: `a-${Date.now()}`, actor: ME, action: "批准了申请", time: NOW, tone: "success" }],
    };
    const next = requests.map((x) => (x.id === r.id ? updated : x));
    setRequests(next);
    setBanner({
      tone: "success",
      text: nextStep ? `已批准 ${r.id}，已转给${nextStep.name}（${nextStep.assignee}）。` : `已批准 ${r.id}。`,
    });
    advanceFrom(r.id, next);
  };

  const confirmReject = (r: ApprovalRequest) => {
    const text = reason.trim();
    if (text.length < 5) {
      setReasonError("请填写驳回原因，至少 5 个字。申请人会看到这段说明。");
      return;
    }
    const mineIdx = r.steps.findIndex((s) => s.status === "in_progress");
    const updated: ApprovalRequest = {
      ...r,
      status: "rejected",
      awaitingMe: false,
      steps: r.steps.map((s, i) =>
        i === mineIdx ? { ...s, status: "failed", duration: NOW, comment: text } : i > mineIdx ? { ...s, status: "skipped" } : s
      ),
      activity: [...r.activity, { id: `a-${Date.now()}`, actor: ME, action: "驳回了申请", time: NOW, tone: "error", comment: text }],
    };
    const next = requests.map((x) => (x.id === r.id ? updated : x));
    setRequests(next);
    setBanner({ tone: "error", text: `已驳回 ${r.id}，${r.requester} 会收到你填写的原因。` });
    advanceFrom(r.id, next);
  };

  const lineColumns: DataTableColumn<ApprovalLine & { id: string }>[] = [
    { key: "name", header: "项目", render: (l) => <span className="text-slate-900">{l.name}</span> },
    { key: "sku", header: "编号", render: (l) => <span className="font-mono text-slate-500">{l.sku}</span> },
    { key: "qty", header: "数量", align: "right", render: (l) => <span className="font-mono">{l.qty.toLocaleString()} {l.unit}</span> },
    { key: "price", header: "单价", align: "right", render: (l) => <span className="font-mono">{formatCny(l.price)}</span> },
    {
      key: "sum",
      header: "小计",
      align: "right",
      render: (l) => <span className="font-mono font-semibold text-slate-900">{formatCny(l.qty * l.price)}</span>,
    },
  ];

  return (
    <AppShell<OpsNavId>
      product={OPS_PRODUCT}
      nav={opsNav(counts.mine)}
      activeId="approvals"
      onNavigate={(id) => id === "dashboard" && onNavigate("scene-dashboard")}
      user={OPS_USER}
      topbar={<OpsTopbar />}
    >
      <div className="@4xl/main:h-full flex flex-col @4xl/main:flex-row">
        {/* 单据列表 */}
        <aside className="@4xl/main:w-[340px] @6xl/main:w-[380px] shrink-0 bg-white border-b @4xl/main:border-b-0 @4xl/main:border-r border-slate-200 flex flex-col @4xl/main:min-h-0">
          <div className="px-5 pt-6 space-y-4">
            <PageHeader<Tab>
              title="审批中心"
              tabs={[
                { id: "mine", label: "待我审批", count: counts.mine },
                { id: "initiated", label: "我发起的", count: counts.initiated },
                { id: "processed", label: "已处理", count: counts.processed },
              ]}
              activeTab={tab}
              onTabChange={switchTab}
            />
            <FilterBar
              query={query}
              onQueryChange={setQuery}
              searchLabel="搜索审批单"
              placeholder="单号、标题或申请人"
              searchClassName="w-full"
              className="pb-4"
            />
          </div>

          {list.length > 0 ? (
            <ul className="flex-1 @4xl/main:min-h-0 subtle-scroll border-t border-slate-200 divide-y divide-slate-100 max-h-80 @4xl/main:max-h-none overflow-y-auto">
              {list.map((r) => {
                const active = r.id === selectedId;
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setBanner(null);
                        select(r.id);
                      }}
                      aria-current={active ? "true" : undefined}
                      className={clsx(
                        "relative w-full text-left px-5 py-3.5 space-y-1 cursor-pointer transition-colors",
                        active ? "bg-emerald-50/70" : "hover:bg-slate-50"
                      )}
                    >
                      {active && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#059669]" aria-hidden="true" />}
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-mono text-slate-500">
                          {r.type} · {r.id}
                        </span>
                        <span className="font-mono text-slate-400 shrink-0">{r.submittedAt}</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 truncate">{r.title}</div>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">
                          {r.requester} · {r.dept}
                        </span>
                        <span className="font-mono text-slate-900">{formatCny(r.amount)}</span>
                      </div>
                      {r.status !== "pending" && (
                        <div className={clsx("text-sm", r.status === "approved" ? "text-[#059669]" : "text-[#E11D48]")}>
                          {r.status === "approved" ? "已批准" : "已驳回"}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex-1 border-t border-slate-200">
              {query ? (
                <EmptyState
                  compact
                  title={`没有与“${query}”匹配的审批单`}
                  action={
                    <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                      清除搜索
                    </Button>
                  }
                />
              ) : (
                <EmptyState
                  compact
                  icon={<Inbox className="w-5 h-5" />}
                  title={tab === "mine" ? "没有待你审批的单据" : "这里还没有单据"}
                  description={tab === "mine" ? "新的审批单提交后会出现在这里。" : undefined}
                  action={
                    tab === "mine" ? (
                      <Button variant="outline" size="sm" onClick={() => switchTab("processed")}>
                        查看已处理
                      </Button>
                    ) : undefined
                  }
                />
              )}
            </div>
          )}
        </aside>

        {/* 单据详情 */}
        <section className="@container/detail flex-1 min-w-0 @4xl/main:min-h-0 @4xl/main:overflow-y-auto subtle-scroll">
          <div className="p-4 @xl/detail:p-6 @4xl/detail:p-8 space-y-6 max-w-6xl">
            {banner && (
              <div
                role="status"
                className={clsx(
                  "flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm animate-rise",
                  banner.tone === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
                )}
              >
                {banner.tone === "success" ? (
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#059669] shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 mt-0.5 text-[#E11D48] shrink-0" />
                )}
                {banner.text}
              </div>
            )}

            {!selected ? (
              <OpsCard>
                <EmptyState
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  title="待审批的单据都处理完了"
                  description="你处理过的单据可以在“已处理”里查看。"
                  action={
                    <Button variant="outline" size="sm" onClick={() => switchTab("processed")}>
                      查看已处理
                    </Button>
                  }
                />
              </OpsCard>
            ) : (
              <>
                <PageHeader
                  breadcrumbs={[{ label: "审批中心" }, { label: selected.id }]}
                  title={selected.title}
                  meta={statusBadge(selected)}
                  description={`${selected.type}申请 · ${selected.requester}（${selected.dept}）提交于 ${selected.submittedAt}`}
                  actions={
                    selected.awaitingMe && selected.status === "pending" && !rejecting ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => setRejecting(true)}>
                          驳回
                        </Button>
                        <Button variant="flare" size="sm" onClick={() => approve(selected)}>
                          批准
                        </Button>
                      </>
                    ) : undefined
                  }
                />

                {rejecting && (
                  <OpsCard bodyClassName="p-5 space-y-3">
                    <label htmlFor={reasonId} className="block text-sm font-semibold text-slate-900">
                      驳回原因
                    </label>
                    <p className="text-sm text-slate-500">申请人会看到这段说明。写清楚需要修改什么，对方才能重新提交。</p>
                    <textarea
                      id={reasonId}
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                        if (reasonError) setReasonError("");
                      }}
                      rows={3}
                      aria-invalid={reasonError ? true : undefined}
                      aria-describedby={reasonError ? `${reasonId}-err` : undefined}
                      placeholder="例如：单价比上次采购高 12%，请附上供应商的报价说明。"
                      className={clsx(
                        "w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-y",
                        reasonError
                          ? "border-[#E11D48] focus:ring-2 focus:ring-rose-100"
                          : "border-slate-200 focus:border-[#059669] focus:ring-2 focus:ring-emerald-100"
                      )}
                    />
                    {reasonError && (
                      <p id={`${reasonId}-err`} className="text-sm text-[#E11D48]">
                        {reasonError}
                      </p>
                    )}
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRejecting(false);
                          setReason("");
                          setReasonError("");
                        }}
                      >
                        取消
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#E11D48]! text-[#E11D48]! hover:bg-rose-50!" onClick={() => confirmReject(selected)}>
                        驳回申请
                      </Button>
                    </div>
                  </OpsCard>
                )}

                {/* 详情区宽度 ≥ 1024px：进度与记录放在右侧栏；更窄时放进主列，进度改为横向 */}
                <div className="grid grid-cols-1 @5xl/detail:grid-cols-3 gap-6 items-start">
                  <div className="@5xl/detail:col-span-2 space-y-6">
                    <OpsCard title="基本信息" bodyClassName="p-5">
                      <DescriptionList
                        items={[
                          { label: "单号", value: selected.id, mono: true },
                          { label: "金额", value: formatCny(selected.amount), mono: true },
                          { label: "预算科目", value: selected.budget },
                          { label: "申请人", value: `${selected.requester} · ${selected.dept}` },
                          { label: "供应商", value: selected.supplier ?? "—" },
                          { label: "提交时间", value: selected.submittedAt, mono: true },
                          { label: "申请事由", value: selected.reason, span: 3 },
                        ]}
                      />
                    </OpsCard>

                    <OpsCard title="审批进度" className="@5xl/detail:hidden" bodyClassName="p-5">
                      <WorkflowPipeline orientation="horizontal" nodes={selected.steps} />
                    </OpsCard>

                    <OpsCard
                      title="明细"
                      aside={<span className="text-sm font-mono text-slate-900">合计 {formatCny(selected.amount)}</span>}
                      bodyClassName="p-5"
                    >
                      <DataTable columns={lineColumns} data={selected.lines.map((l, i) => ({ ...l, id: String(i) }))} keyField="id" compact />
                    </OpsCard>

                    <OpsCard title="操作记录" className="@5xl/detail:hidden" bodyClassName="p-5">
                      <ActivityTimeline items={[...selected.activity].reverse()} />
                    </OpsCard>
                  </div>

                  <div className="hidden @5xl/detail:block space-y-6">
                    <OpsCard title="审批进度" bodyClassName="p-5">
                      <WorkflowPipeline orientation="vertical" nodes={selected.steps} />
                    </OpsCard>
                    <OpsCard title="操作记录" bodyClassName="p-5">
                      <ActivityTimeline items={[...selected.activity].reverse()} />
                    </OpsCard>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
};
