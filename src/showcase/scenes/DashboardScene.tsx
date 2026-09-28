import React, { useMemo, useState } from "react";
import { ArrowRight, Download, PackageSearch } from "lucide-react";
import {
  AppShell,
  Button,
  DataTable,
  DataTableStatusBadge,
  EmptyState,
  FilterBar,
  MetricStatCard,
  PageHeader,
  Select,
  type DataTableColumn,
} from "@/sparx-ui";
import type { RouteId } from "../routes";
import { OPS_PRODUCT, OPS_USER, OpsCard, OpsTopbar, formatCny, opsNav, type OpsNavId } from "./enterprise/shared";
import { APPROVALS } from "./enterprise/approvals-data";

interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  safety: number;
  cycleDays: number;
  qc: "passed" | "warning" | "inspecting";
}

const STOCK: StockItem[] = [
  { id: "1", sku: "SKU-9921-A", name: "超薄陶瓷高频介质基板", category: "原材料", stock: 4280, safety: 2000, cycleDays: 3.2, qc: "passed" },
  { id: "2", sku: "SKU-8842-B", name: "多层滤光镀膜片", category: "光学组件", stock: 640, safety: 1000, cycleDays: 7.8, qc: "warning" },
  { id: "3", sku: "SKU-3120-C", name: "低功耗 NPU 推理模块", category: "电子模组", stock: 12500, safety: 3000, cycleDays: 2.1, qc: "passed" },
  { id: "4", sku: "SKU-5491-D", name: "碳纤维轻量外壳", category: "结构件", stock: 890, safety: 600, cycleDays: 4.5, qc: "inspecting" },
  { id: "5", sku: "SKU-7723-E", name: "激光发射器镜组", category: "光学组件", stock: 310, safety: 400, cycleDays: 9.1, qc: "warning" },
  { id: "6", sku: "SKU-2208-F", name: "氮化镓电源模块", category: "电子模组", stock: 2150, safety: 800, cycleDays: 3.6, qc: "passed" },
  { id: "7", sku: "SKU-6617-G", name: "铝合金散热底座", category: "结构件", stock: 1740, safety: 500, cycleDays: 5.0, qc: "passed" },
];

const CATEGORIES = ["全部分类", "原材料", "光学组件", "电子模组", "结构件"];

const DEFECTS = [
  { label: "表面微裂纹", value: 42 },
  { label: "镀层不均", value: 27 },
  { label: "厚度超差", value: 18 },
  { label: "其他", value: 13 },
];

const QC_LABEL: Record<StockItem["qc"], { text: string; variant: "emerald" | "amber" | "cyan" }> = {
  passed: { text: "合格", variant: "emerald" },
  warning: { text: "接近阈值", variant: "amber" },
  inspecting: { text: "复检中", variant: "cyan" },
};

/** 场景：企业经营看板（皓白极翠） */
export const DashboardScene: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const [range, setRange] = useState("quarter");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const pending = APPROVALS.filter((a) => a.awaitingMe && a.status === "pending");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return STOCK.filter(
      (s) =>
        (category === CATEGORIES[0] || s.category === category) &&
        (!q || s.sku.toLowerCase().includes(q) || s.name.includes(q))
    );
  }, [query, category]);

  const filtered = query !== "" || category !== CATEGORIES[0];
  const reset = () => {
    setQuery("");
    setCategory(CATEGORIES[0]);
  };

  const columns: DataTableColumn<StockItem>[] = [
    { key: "sku", header: "物料编号", width: "140px", render: (s) => <span className="font-mono font-semibold text-slate-900">{s.sku}</span> },
    {
      key: "name",
      header: "物料名称",
      render: (s) => (
        <div>
          <div className="text-slate-900">{s.name}</div>
          <div className="text-sm text-slate-500">{s.category}</div>
        </div>
      ),
    },
    {
      key: "stock",
      header: "库存",
      align: "right",
      render: (s) => (
        <div className="font-mono">
          <div className={s.stock < s.safety ? "text-[#D97706] font-semibold" : "text-slate-900"}>{s.stock.toLocaleString()} 件</div>
          <div className="text-sm text-slate-400">安全线 {s.safety.toLocaleString()}</div>
        </div>
      ),
    },
    { key: "cycle", header: "周转", align: "right", render: (s) => <span className="font-mono">{s.cycleDays.toFixed(1)} 天</span> },
    {
      key: "qc",
      header: "抽检结果",
      align: "center",
      render: (s) => (
        <DataTableStatusBadge variant={QC_LABEL[s.qc].variant} pulse={s.qc === "inspecting"}>
          {QC_LABEL[s.qc].text}
        </DataTableStatusBadge>
      ),
    },
  ];

  const navigate = (id: OpsNavId) => {
    if (id === "approvals") onNavigate("scene-approvals");
  };

  return (
    <AppShell<OpsNavId>
      product={OPS_PRODUCT}
      nav={opsNav(pending.length)}
      activeId="dashboard"
      onNavigate={navigate}
      user={OPS_USER}
      topbar={<OpsTopbar />}
    >
      <div className="p-4 @xl/main:p-6 @5xl/main:p-8 space-y-6 max-w-[88rem] mx-auto">
        <PageHeader
          breadcrumbs={[{ label: "运营中台" }, { label: "经营看板" }]}
          title="经营看板"
          description="2026 年第三季度 · 数据更新于 09-28 09:00"
          actions={
            <>
              <Select
                size="sm"
                value={range}
                onChange={setRange}
                options={[
                  { value: "quarter", label: "本季度" },
                  { value: "month", label: "本月" },
                  { value: "week", label: "近 7 天" },
                ]}
              />
              <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                导出报表
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 gap-4">
          <MetricStatCard
            title="毛利率"
            value="48.6"
            unit="%"
            delta={{ value: "+3.8%", trend: "up", label: "同比" }}
            sparkline={[38, 41, 40, 44, 46, 45, 48.6]}
            subtitle="目标 46%"
          />
          <MetricStatCard
            title="平均库存周转"
            value="4.2"
            unit="天"
            delta={{ value: "-1.1 天", trend: "up", label: "同比" }}
            sparkline={[5.6, 5.4, 5.1, 4.9, 4.6, 4.4, 4.2]}
            subtitle="2 种低于安全线"
          />
          <MetricStatCard
            title="AI 质检合格率"
            value="99.82"
            unit="%"
            delta={{ value: "+0.14%", trend: "up", label: "环比" }}
            sparkline={[99.4, 99.5, 99.6, 99.7, 99.82]}
            subtitle="抽检 12,400 件"
          />
          <MetricStatCard
            title="自动处理的审批单"
            value="14,820"
            unit="单/周"
            delta={{ value: "+22.4%", trend: "up", label: "环比" }}
            sparkline={[9, 10.2, 11, 11.8, 12.9, 13.6, 14.8]}
            subtitle="需人工处理 1.4%"
          />
        </div>

        <div className="grid grid-cols-1 @6xl/main:grid-cols-12 gap-6 items-start">
          <OpsCard title="在库物料" className="@6xl/main:col-span-8" bodyClassName="space-y-4 p-5">
            <FilterBar
              query={query}
              onQueryChange={setQuery}
              searchLabel="搜索物料"
              placeholder="例如：SKU-8842 或 镀膜"
              filters={
                <Select size="sm" value={category} onChange={setCategory} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
              }
              resultCount={rows.length}
              onReset={filtered ? reset : undefined}
            />
            {rows.length > 0 ? (
              <DataTable columns={columns} data={rows} keyField="id" />
            ) : (
              <EmptyState
                compact
                icon={<PackageSearch className="w-5 h-5" />}
                title={`没有与“${query || category}”匹配的物料`}
                description="换一个关键词，或清除筛选查看全部物料。"
                action={
                  <Button variant="outline" size="sm" onClick={reset}>
                    清除筛选
                  </Button>
                }
              />
            )}
          </OpsCard>

          <div className="@6xl/main:col-span-4 grid grid-cols-1 @3xl/main:grid-cols-2 @6xl/main:grid-cols-1 gap-6 items-start">
            <OpsCard
              title="待我审批"
              aside={<span className="text-sm font-mono text-[#D97706]">{pending.length} 笔</span>}
            >
              <ul className="divide-y divide-slate-100">
                {pending.map((a) => (
                  <li key={a.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{a.title}</div>
                      <div className="text-sm text-slate-500">
                        {a.requester} · {a.type} · <span className="font-mono">{formatCny(a.amount)}</span>
                      </div>
                    </div>
                    <span className="text-sm font-mono text-slate-400 shrink-0">{a.submittedAt.slice(6)}</span>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => onNavigate("scene-approvals")}
                  className="group flex items-center gap-1.5 text-sm font-semibold text-[#059669] hover:text-emerald-800 cursor-pointer"
                >
                  打开审批中心
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </OpsCard>

            <OpsCard title="缺陷类型分布" aside={<span className="text-sm font-mono text-slate-400">样本 28,400 件</span>} bodyClassName="p-5 space-y-3.5">
              {DEFECTS.map((d) => (
                <div key={d.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{d.label}</span>
                    <span className="font-mono text-slate-900">{d.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#059669]" style={{ width: `${d.value}%`, opacity: 0.35 + d.value / 70 }} />
                  </div>
                </div>
              ))}
              <p className="text-sm text-slate-500 leading-relaxed pt-1">
                双目视觉检测能发现 0.05mm² 以上的缺陷，分类后自动送回返工线。
              </p>
            </OpsCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
