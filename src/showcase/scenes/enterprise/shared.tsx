import React from "react";
import { clsx } from "clsx";
import { Bell, ClipboardCheck, LayoutDashboard, Package, Search, Settings, ShieldCheck, ShoppingCart } from "lucide-react";
import type { AppShellNavItem } from "@/sparx-ui";

/** 两个企业场景共用的产品框架：同一个“星衡制造 · 运营中台” */

export type OpsNavId = "dashboard" | "orders" | "inventory" | "quality" | "approvals" | "settings";

export const OPS_PRODUCT = { name: "星衡制造", subtitle: "运营中台", logo: "星" };

export const OPS_USER = { name: "林静", role: "运营经理" };

export const opsNav = (pendingApprovals: number): AppShellNavItem<OpsNavId>[] => [
  { id: "dashboard", label: "经营看板", icon: <LayoutDashboard className="w-4 h-4" />, group: "概览" },
  { id: "orders", label: "订单", icon: <ShoppingCart className="w-4 h-4" />, count: 12, group: "业务" },
  { id: "inventory", label: "库存", icon: <Package className="w-4 h-4" />, group: "业务" },
  { id: "quality", label: "质检", icon: <ShieldCheck className="w-4 h-4" />, group: "业务" },
  { id: "approvals", label: "审批中心", icon: <ClipboardCheck className="w-4 h-4" />, count: pendingApprovals, group: "流程" },
  { id: "settings", label: "设置", icon: <Settings className="w-4 h-4" />, group: "系统" },
];

/** 顶栏：全局搜索与通知 */
export const OpsTopbar: React.FC = () => (
  <>
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="search"
        aria-label="全局搜索"
        placeholder="订单号、物料编号或供应商"
        className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#059669] focus:ring-2 focus:ring-emerald-100"
      />
    </div>
    <div className="ml-auto flex items-center gap-3 shrink-0">
      <span className="hidden lg:inline text-sm text-slate-500 font-mono">2026-09-28</span>
      <button
        type="button"
        aria-label="通知，3 条未读"
        className="relative w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E11D48] ring-2 ring-white" />
      </button>
    </div>
  </>
);

/** 企业场景里的内容卡片：白底、1px 边框、极浅阴影 */
export const OpsCard: React.FC<{
  title?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}> = ({ title, aside, children, className, bodyClassName }) => (
  <section className={clsx("rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]", className)}>
    {title && (
      <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {aside}
      </div>
    )}
    <div className={bodyClassName}>{children}</div>
  </section>
);

export const formatCny = (n: number) => `¥${n.toLocaleString("zh-CN")}`;
