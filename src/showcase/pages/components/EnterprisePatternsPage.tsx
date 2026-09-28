import React, { useState } from "react";
import { Building2, Inbox } from "lucide-react";
import {
  ActivityTimeline,
  AppShell,
  Badge,
  Button,
  DescriptionList,
  EmptyState,
  FilterBar,
  PageHeader,
  Select,
  WorkflowPipeline,
} from "@/sparx-ui";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PageIntro } from "../../components/PageIntro";
import { OPS_PRODUCT, OPS_USER, opsNav, type OpsNavId } from "../../scenes/enterprise/shared";
import { APPROVALS } from "../../scenes/enterprise/approvals-data";
import type { RouteId } from "../../routes";

const SAMPLE = APPROVALS[0];

export const EnterprisePatternsPage: React.FC<{ onNavigate: (id: RouteId) => void }> = ({ onNavigate }) => {
  const [nav, setNav] = useState<OpsNavId>("dashboard");
  const [tab, setTab] = useState<"mine" | "initiated" | "processed">("mine");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  const filtered = query !== "" || category !== "all";

  return (
    <div className="w-full min-w-0 space-y-12">
      <PageIntro
        eyebrow="Patterns · 企业应用"
        icon={<Building2 className="w-4 h-4" />}
        title="企业应用"
        actions={
          <>
            <Button variant="flare" size="sm" withArrow onClick={() => onNavigate("scene-approvals")}>
              打开审批中心场景
            </Button>
            <Button variant="outline" size="sm" onClick={() => onNavigate("scene-dashboard")}>
              打开经营看板
            </Button>
          </>
        }
      >
        <p>
          这一组复合模式为每天都要使用的后台设计：固定的外框、统一的标题区、可预期的筛选和详情结构。推荐搭配皓白极翠使用。所有页面用同一套结构，用户在任何页面都能在同一位置找到主操作。
        </p>
      </PageIntro>

      <ComponentPreview
        title="AppShell 应用外框"
        recommend="glacial-emerald"
        description="左侧固定侧栏（产品名、分组导航、计数、当前用户），右侧顶栏加内容区，只有内容区滚动。窄屏时侧栏收起，导航变成横向标签。"
        bleed
        code={`<AppShell
  product={{ name: "星衡制造", subtitle: "运营中台", logo: "星" }}
  nav={[
    { id: "dashboard", label: "经营看板", icon: <LayoutDashboard />, group: "概览" },
    { id: "approvals", label: "审批中心", icon: <ClipboardCheck />, count: 3, group: "流程" },
  ]}
  activeId={active}
  onNavigate={setActive}
  user={{ name: "林静", role: "运营经理" }}
  topbar={<GlobalSearch />}
>
  <PageContent />
</AppShell>`}
      >
        <div className="h-[460px]">
          <AppShell<OpsNavId>
            product={OPS_PRODUCT}
            nav={opsNav(3)}
            activeId={nav}
            onNavigate={setNav}
            user={OPS_USER}
            topbar={<span className="text-sm text-slate-500">顶栏：放全局搜索、通知和当前日期</span>}
          >
            <div className="p-6">
              <PageHeader title={opsNav(3).find((n) => n.id === nav)?.label ?? ""} description="点击左侧导航切换页面。内容区是页面上唯一的滚动区域。" />
            </div>
          </AppShell>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="PageHeader 页面标题区"
        recommend="glacial-emerald"
        description="面包屑、标题、状态、说明、操作按钮和下划线标签页。每个页面都用这一结构，主操作固定在右上角。"
        code={`<PageHeader
  breadcrumbs={[{ label: "审批中心" }, { label: "PO-20260927-01" }]}
  title="多层滤光镀膜片补货"
  meta={<Badge variant="warning" mono={false}>待我审批</Badge>}
  description="采购申请 · 周航（采购部）提交于 09-27 10:12"
  actions={<><Button variant="outline" size="sm">驳回</Button><Button size="sm">批准</Button></>}
  tabs={[{ id: "mine", label: "待我审批", count: 3 }, { id: "processed", label: "已处理", count: 2 }]}
  activeTab={tab}
  onTabChange={setTab}
/>`}
      >
        <PageHeader
          className="w-full"
          breadcrumbs={[{ label: "审批中心" }, { label: SAMPLE.id }]}
          title={SAMPLE.title}
          meta={
            <Badge variant="warning" mono={false}>
              待我审批
            </Badge>
          }
          description={`采购申请 · ${SAMPLE.requester}（${SAMPLE.dept}）提交于 ${SAMPLE.submittedAt}`}
          actions={
            <>
              <Button variant="outline" size="sm">
                驳回
              </Button>
              <Button variant="flare" size="sm">
                批准
              </Button>
            </>
          }
          tabs={[
            { id: "mine", label: "待我审批", count: 3 },
            { id: "initiated", label: "我发起的", count: 1 },
            { id: "processed", label: "已处理", count: 2 },
          ]}
          activeTab={tab}
          onTabChange={setTab}
        />
      </ComponentPreview>

      <ComponentPreview
        title="FilterBar 搜索与筛选"
        recommend="glacial-emerald"
        description="左侧搜索，中间放筛选控件，右侧显示结果数。有筛选条件时出现“清除筛选”。搜索框有独立的无障碍标签，占位文字只写示例。"
        code={`<FilterBar
  query={query}
  onQueryChange={setQuery}
  searchLabel="搜索物料"
  placeholder="例如：SKU-8842 或 镀膜"
  filters={<Select size="sm" value={category} onChange={setCategory} options={categories} />}
  resultCount={rows.length}
  onReset={filtered ? reset : undefined}
/>`}
      >
        <FilterBar
          className="w-full"
          query={query}
          onQueryChange={setQuery}
          searchLabel="搜索物料"
          placeholder="例如：SKU-8842 或 镀膜"
          filters={
            <Select
              size="sm"
              value={category}
              onChange={setCategory}
              options={[
                { value: "all", label: "全部分类" },
                { value: "optics", label: "光学组件" },
                { value: "module", label: "电子模组" },
              ]}
            />
          }
          resultCount={filtered ? 2 : 7}
          onReset={
            filtered
              ? () => {
                  setQuery("");
                  setCategory("all");
                }
              : undefined
          }
        />
      </ComponentPreview>

      <ComponentPreview
        title="DescriptionList 详情字段"
        recommend="glacial-emerald"
        description="键值对详情。标签在上、值在下，便于纵向扫读；长文本可以横跨整行。"
        code={`<DescriptionList
  items={[
    { label: "单号", value: "PO-20260927-01", mono: true },
    { label: "金额", value: "¥142,000", mono: true },
    { label: "申请事由", value: "当前库存 640 件，低于安全库存……", span: 3 },
  ]}
/>`}
      >
        <DescriptionList
          className="w-full"
          items={[
            { label: "单号", value: SAMPLE.id, mono: true },
            { label: "金额", value: `¥${SAMPLE.amount.toLocaleString()}`, mono: true },
            { label: "预算科目", value: SAMPLE.budget },
            { label: "申请人", value: `${SAMPLE.requester} · ${SAMPLE.dept}` },
            { label: "供应商", value: SAMPLE.supplier },
            { label: "提交时间", value: SAMPLE.submittedAt, mono: true },
            { label: "申请事由", value: SAMPLE.reason, span: 3 },
          ]}
        />
      </ComponentPreview>

      <ComponentPreview
        title="WorkflowPipeline 流程进度"
        recommend="both"
        description="多步骤流程的进度：已完成、进行中、未开始、未通过、已跳过。横向用于页面顶部的概览，纵向用于详情页侧栏，可以显示负责人、时间和意见。"
        controls={
          <div className="flex items-center gap-2">
            <span>方向：</span>
            <Select
              size="sm"
              value={orientation}
              onChange={(v) => setOrientation(v as "horizontal" | "vertical")}
              options={[
                { value: "horizontal", label: "horizontal（横向）" },
                { value: "vertical", label: "vertical（纵向）" },
              ]}
            />
          </div>
        }
        code={`<WorkflowPipeline
  orientation="${orientation}"
  nodes={[
    { id: "1", name: "提交申请", status: "completed", assignee: "周航", duration: "09-27 10:12" },
    { id: "2", name: "部门主管审批", status: "completed", assignee: "陈立", comment: "用量数据已核对，同意。" },
    { id: "3", name: "运营经理审批", status: "in_progress", assignee: "林静" },
    { id: "4", name: "财务复核", status: "pending", assignee: "赵敏" },
  ]}
/>`}
      >
        <WorkflowPipeline className="w-full max-w-3xl" orientation={orientation} nodes={SAMPLE.steps} />
      </ComponentPreview>

      <ComponentPreview
        title="ActivityTimeline 操作记录"
        recommend="glacial-emerald"
        description="谁在什么时候做了什么。审批、工单和审计日志都适用；附言显示在记录下方。"
        code={`<ActivityTimeline
  items={[
    { id: "2", actor: "陈立", action: "批准了申请", time: "09-27 14:30", tone: "success", comment: "用量数据已核对，同意。" },
    { id: "1", actor: "周航", action: "提交了申请", time: "09-27 10:12" },
  ]}
/>`}
      >
        <ActivityTimeline
          className="w-full max-w-xl"
          items={[...APPROVALS[5].activity, ...SAMPLE.activity].reverse()}
        />
      </ComponentPreview>

      <ComponentPreview
        title="EmptyState 空状态"
        recommend="both"
        description="说明这里是什么、为什么是空的，并给出一个下一步操作。搜索没有结果时，写出用户搜的词，并提供清除筛选的按钮。"
        code={`<EmptyState
  icon={<Inbox />}
  title="没有待你审批的单据"
  description="新的审批单提交后会出现在这里。"
  action={<Button variant="outline" size="sm">查看已处理</Button>}
/>`}
      >
        <EmptyState
          icon={<Inbox className="w-5 h-5" />}
          title="没有待你审批的单据"
          description="新的审批单提交后会出现在这里。"
          action={
            <Button variant="outline" size="sm">
              查看已处理
            </Button>
          }
        />
      </ComponentPreview>
    </div>
  );
};
