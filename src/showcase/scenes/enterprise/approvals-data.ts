import type { ActivityItem, PipelineNode } from "@/sparx-ui";

export type ApprovalType = "采购" | "报废" | "费用" | "付款";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ApprovalLine {
  sku: string;
  name: string;
  qty: number;
  unit: string;
  price: number;
}

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  title: string;
  requester: string;
  dept: string;
  amount: number;
  submittedAt: string;
  status: ApprovalStatus;
  /** 当前是否轮到“我”（林静）审批 */
  awaitingMe: boolean;
  supplier?: string;
  budget: string;
  reason: string;
  lines: ApprovalLine[];
  steps: PipelineNode[];
  activity: ActivityItem[];
}

export const ME = "林静";

export const APPROVALS: ApprovalRequest[] = [
  {
    id: "PO-20260927-01",
    type: "采购",
    title: "多层滤光镀膜片补货",
    requester: "周航",
    dept: "采购部",
    amount: 142000,
    submittedAt: "09-27 10:12",
    status: "pending",
    awaitingMe: true,
    supplier: "苏州锐光光电有限公司",
    budget: "生产物料 · 2026 Q3",
    reason: "当前库存 640 件，低于安全库存 1,000 件。按近 30 天的用量，现有库存只能维持 9 天，供应商交期为 14 天。",
    lines: [{ sku: "SKU-8842-B", name: "多层滤光镀膜片", qty: 2000, unit: "件", price: 71 }],
    steps: [
      { id: "s1", name: "提交申请", status: "completed", assignee: "周航", duration: "09-27 10:12" },
      { id: "s2", name: "部门主管审批", status: "completed", assignee: "陈立", duration: "09-27 14:30", comment: "用量数据已核对，同意。" },
      { id: "s3", name: "运营经理审批", status: "in_progress", assignee: ME },
      { id: "s4", name: "财务复核", status: "pending", assignee: "赵敏" },
      { id: "s5", name: "下单", status: "pending", assignee: "系统自动" },
    ],
    activity: [
      { id: "a1", actor: "周航", action: "提交了申请", time: "09-27 10:12" },
      { id: "a2", actor: "陈立", action: "批准了申请", time: "09-27 14:30", tone: "success", comment: "用量数据已核对，同意。" },
    ],
  },
  {
    id: "SCRAP-0842",
    type: "报废",
    title: "损坏的 NPU 推理模块报废",
    requester: "吴迪",
    dept: "质检部",
    amount: 4800,
    submittedAt: "09-27 16:05",
    status: "pending",
    awaitingMe: true,
    budget: "质量损失 · 2026 Q3",
    reason: "9 月第 3 批次中有 12 件模块在老化测试中失效，返修成本高于采购价，申请报废。",
    lines: [{ sku: "SKU-3120-C", name: "低功耗 NPU 推理模块", qty: 12, unit: "件", price: 400 }],
    steps: [
      { id: "s1", name: "提交申请", status: "completed", assignee: "吴迪", duration: "09-27 16:05" },
      { id: "s2", name: "运营经理审批", status: "in_progress", assignee: ME },
      { id: "s3", name: "资产核销", status: "pending", assignee: "赵敏" },
    ],
    activity: [{ id: "a1", actor: "吴迪", action: "提交了申请", time: "09-27 16:05", comment: "失效报告见附件《老化测试记录-0927》。" }],
  },
  {
    id: "EXP-0931",
    type: "费用",
    title: "供应商现场审核差旅费",
    requester: "何雨",
    dept: "质检部",
    amount: 6350,
    submittedAt: "09-28 08:40",
    status: "pending",
    awaitingMe: true,
    budget: "差旅 · 质检部",
    reason: "9 月 22 日至 24 日赴苏州锐光光电进行年度现场审核，含往返高铁、两晚住宿和市内交通。",
    lines: [
      { sku: "—", name: "往返高铁", qty: 2, unit: "张", price: 1175 },
      { sku: "—", name: "住宿（2 晚）", qty: 2, unit: "晚", price: 1650 },
      { sku: "—", name: "市内交通", qty: 1, unit: "项", price: 700 },
    ],
    steps: [
      { id: "s1", name: "提交申请", status: "completed", assignee: "何雨", duration: "09-28 08:40" },
      { id: "s2", name: "运营经理审批", status: "in_progress", assignee: ME },
      { id: "s3", name: "财务报销", status: "pending", assignee: "赵敏" },
    ],
    activity: [{ id: "a1", actor: "何雨", action: "提交了申请", time: "09-28 08:40" }],
  },
  {
    id: "PO-20260926-02",
    type: "采购",
    title: "仓库网络交换机更换",
    requester: ME,
    dept: "运营部",
    amount: 18600,
    submittedAt: "09-26 11:20",
    status: "pending",
    awaitingMe: false,
    supplier: "杭州联拓网络科技",
    budget: "IT 设备 · 2026 Q3",
    reason: "仓库 2 号楼的两台交换机已使用 7 年，近一个月出现 3 次断网，影响扫码入库。",
    lines: [{ sku: "IT-SW-48", name: "48 口千兆交换机", qty: 2, unit: "台", price: 9300 }],
    steps: [
      { id: "s1", name: "提交申请", status: "completed", assignee: ME, duration: "09-26 11:20" },
      { id: "s2", name: "IT 主管审批", status: "in_progress", assignee: "郑凯" },
      { id: "s3", name: "财务复核", status: "pending", assignee: "赵敏" },
    ],
    activity: [{ id: "a1", actor: ME, action: "提交了申请", time: "09-26 11:20" }],
  },
  {
    id: "PO-20260925-03",
    type: "采购",
    title: "碳纤维外壳模具",
    requester: "周航",
    dept: "采购部",
    amount: 86000,
    submittedAt: "09-25 09:30",
    status: "approved",
    awaitingMe: false,
    supplier: "宁波精成模具",
    budget: "工装模具 · 2026 Q3",
    reason: "新一代外壳改为一体成型，需要新开一套模具。",
    lines: [{ sku: "MD-5491", name: "碳纤维外壳模具", qty: 1, unit: "套", price: 86000 }],
    steps: [
      { id: "s1", name: "提交申请", status: "completed", assignee: "周航", duration: "09-25 09:30" },
      { id: "s2", name: "部门主管审批", status: "completed", assignee: "陈立", duration: "09-25 11:02" },
      { id: "s3", name: "运营经理审批", status: "completed", assignee: ME, duration: "09-25 15:47" },
      { id: "s4", name: "财务复核", status: "completed", assignee: "赵敏", duration: "09-26 10:15" },
      { id: "s5", name: "下单", status: "completed", assignee: "系统自动", duration: "09-26 10:15" },
    ],
    activity: [
      { id: "a1", actor: "周航", action: "提交了申请", time: "09-25 09:30" },
      { id: "a2", actor: "陈立", action: "批准了申请", time: "09-25 11:02", tone: "success" },
      { id: "a3", actor: ME, action: "批准了申请", time: "09-25 15:47", tone: "success" },
      { id: "a4", actor: "赵敏", action: "完成了财务复核", time: "09-26 10:15", tone: "success" },
    ],
  },
  {
    id: "PAY-0212",
    type: "付款",
    title: "激光发射器镜组货款",
    requester: "孙悦",
    dept: "财务部",
    amount: 328000,
    submittedAt: "09-24 14:00",
    status: "rejected",
    awaitingMe: false,
    supplier: "深圳光启精密",
    budget: "应付账款",
    reason: "8 月到货的 400 套镜组，按合同约定到货 30 天后付款。",
    lines: [{ sku: "SKU-7723-E", name: "激光发射器镜组", qty: 400, unit: "套", price: 820 }],
    steps: [
      { id: "s1", name: "提交申请", status: "completed", assignee: "孙悦", duration: "09-24 14:00" },
      { id: "s2", name: "运营经理审批", status: "failed", assignee: ME, duration: "09-24 17:20", comment: "发票抬头与合同主体不一致，请供应商重开发票后再提交。" },
      { id: "s3", name: "出纳付款", status: "skipped", assignee: "赵敏" },
    ],
    activity: [
      { id: "a1", actor: "孙悦", action: "提交了申请", time: "09-24 14:00" },
      { id: "a2", actor: ME, action: "驳回了申请", time: "09-24 17:20", tone: "error", comment: "发票抬头与合同主体不一致，请供应商重开发票后再提交。" },
    ],
  },
];
