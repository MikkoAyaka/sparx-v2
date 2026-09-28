import React from "react";
import {
  Button,
  Badge,
  Tag,
  StatusDot,
  ReadingGauge,
  PillDock,
  GlassCard,
  CodeBlock,
  MetricStatCard,
  DataTable,
  DataTableStatusBadge,
  Select,
  TelemetryGauge,
  type StatusDotProps,
  useSparxTheme,
} from "@/sparx-ui";
import { Box, Database } from "lucide-react";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PageIntro } from "../../components/PageIntro";

export const DataComponentsPage: React.FC = () => {
  const { themeId } = useSparxTheme();
  const isEmerald = themeId === "glacial-emerald";

  return (
    <div className="w-full min-w-0 space-y-12">
      <PageIntro eyebrow="Components · 数据组件" icon={<Database className="w-4 h-4" />} title="数据组件">
        <p>指标卡、遥测仪表和数据表格。它们主要用在皓白极翠的后台页面里，也可以在虚空绯红的实验类产品中展示运行数据。数字统一使用等宽字体。</p>
      </PageIntro>

      {/* 8. MetricStatCard 关键指标卡 */}
      <ComponentPreview
        title="MetricStatCard 指标卡"
        description="用于展示经营、库存、质检良率、模型吞吐量等指标，可附带 SVG 迷你趋势线和同比变化。"
        code={`import { MetricStatCard } from "@/sparx-ui";

<MetricStatCard
  title="季度综合毛利率"
  value="48.6"
  unit="%"
  delta={{ value: "+3.8%", trend: "up", label: "同比" }}
  sparkline={[38, 41, 40, 44, 46, 45, 48.6]}
  subtitle="目标达成率 106%"
  badge="经营分析"
  variant="active"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <MetricStatCard
            title="季度综合毛利率"
            value="48.6"
            unit="%"
            delta={{ value: "+3.8%", trend: "up", label: "同比" }}
            sparkline={[38, 41, 40, 44, 46, 45, 48.6]}
            subtitle="目标达成率 106%"
            badge="经营分析"
            variant="active"
          />
          <MetricStatCard
            title="AI 质检抽检合格率"
            value="99.82"
            unit="%"
            delta={{ value: "+0.14%", trend: "up", label: "环比" }}
            sparkline={[99.4, 99.5, 99.6, 99.7, 99.82]}
            subtitle="本周抽检 12,400 件"
            badge="质量检测"
          />
        </div>
      </ComponentPreview>

      {/* 9. TelemetryGauge 遥测仪表 */}
      <ComponentPreview
        title="TelemetryGauge 遥测仪表"
        description="提供环形和条形两种样式，用于显示 NPU 利用率、推理延时、功耗和温度告警。"
        code={`import { TelemetryGauge } from "@/sparx-ui";

<TelemetryGauge
  label="NPU 算力利用率"
  value={84}
  maxValue={100}
  unit="%"
  type="circular"
  quantization="INT8"
  iconType="cpu"
  subtext="Throughput: 420 FPS"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <TelemetryGauge
            label="NPU 算力利用率"
            value={84}
            maxValue={100}
            unit="%"
            type="circular"
            quantization="INT8"
            iconType="cpu"
            subtext="Throughput: 420 FPS"
          />
          <TelemetryGauge
            label="端侧整机功耗"
            value={16.4}
            maxValue={25}
            unit="W"
            type="bar"
            status="normal"
            iconType="power"
            subtext="剩余续航：6.8h"
          />
        </div>
      </ComponentPreview>

      {/* 10. DataTable 数据表格 */}
      <ComponentPreview
        title="DataTable 数据表格"
        description="用于知识库台账、物料清单、审计日志等信息密集的场景。数字列使用等宽字体对齐，状态用统一的标签表示。"
        code={`import { DataTable, DataTableStatusBadge } from "@/sparx-ui";

<DataTable
  columns={[
    { key: "code", header: "编码", width: "120px" },
    { key: "name", header: "物料品名" },
    {
      key: "status",
      header: "状态",
      align: "center",
      render: (item) => (
        <DataTableStatusBadge variant={item.status === "就绪" ? "emerald" : "amber"}>
          {item.status}
        </DataTableStatusBadge>
      ),
    },
  ]}
  data={[
    { id: 1, code: "SKU-01", name: "低功耗 NPU 模块", status: "就绪" },
  ]}
/>`}
      >
        <div className="w-full max-w-2xl">
          <DataTable
            columns={[
              {
                key: "code",
                header: "SKU 编号",
                width: "120px",
                render: (item) => <span className="font-bold">{item.code}</span>,
              },
              { key: "name", header: "物料品名与型号" },
              {
                key: "stock",
                header: "库存余量",
                align: "right",
                render: (item) => <span>{item.stock} 件</span>,
              },
              {
                key: "status",
                header: "状态",
                align: "center",
                render: (item) => (
                  <DataTableStatusBadge
                    variant={item.status === "就绪" ? "emerald" : "amber"}
                  >
                    {item.status}
                  </DataTableStatusBadge>
                ),
              },
            ]}
            data={[
              { id: "1", code: "SKU-8821", name: "低功耗 NPU 推理模块", stock: "12,500", status: "就绪" },
              { id: "2", code: "SKU-3401", name: "超薄陶瓷高频介质基板", stock: "4,280", status: "就绪" },
              { id: "3", code: "SKU-7729", name: "激光发射器镜组", stock: "310", status: "预警" },
            ]}
            keyField="id"
          />
        </div>
      </ComponentPreview>
    </div>
  );
};
