import React from "react";
import type { SceneId } from "../routes";

/**
 * 场景缩略示意：用色块画出每个场景的真实版式，而不是截图或配图。
 * 深色三个场景使用虚空绯红配色，浅色三个场景使用皓白极翠配色。
 */

const Bar: React.FC<{ w: string; h?: string; c: string; className?: string }> = ({ w, h = "h-1.5", c, className = "" }) => (
  <div className={`${h} rounded-full ${c} ${className}`} style={{ width: w }} />
);

export const SceneThumb: React.FC<{ id: SceneId; cover?: string }> = ({ id, cover }) => {
  switch (id) {
    case "scene-editorial":
      return (
        <div className="absolute inset-0 bg-[#030406]">
          {cover && <img src={cover} alt="" className="absolute inset-y-0 left-0 w-[60%] h-full object-cover opacity-80" />}
          <div className="absolute inset-0" style={{ background: "var(--sparx-mask-horizontal)" }} />
          <div className="absolute right-[8%] top-[22%] w-[40%] space-y-2">
            <div className="text-4xl font-black leading-none text-transparent" style={{ WebkitTextStroke: "1px #E5192D" }}>
              01
            </div>
            <Bar w="90%" h="h-2.5" c="bg-white" />
            <Bar w="70%" h="h-2.5" c="bg-white" />
            <Bar w="85%" c="bg-white/30" />
            <Bar w="60%" c="bg-white/30" />
            <div className="pt-1">
              <div className="h-4 w-14 rounded-full bg-[#E5192D] shadow-[0_0_10px_rgba(229,25,45,0.6)]" />
            </div>
          </div>
          <div className="absolute left-[5%] right-[5%] bottom-[8%] flex gap-2">
            {[1, 0, 0, 0].map((a, i) => (
              <div key={i} className={`h-[3px] flex-1 rounded-full ${a ? "bg-[#E5192D]" : "bg-white/15"}`} />
            ))}
          </div>
        </div>
      );
    case "scene-monograph":
      return (
        <div className="absolute inset-0 bg-[#050505] flex">
          <div className="relative w-[35%] border-r border-white/10 overflow-hidden">
            {cover && <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
            <div className="absolute inset-x-[12%] bottom-[12%] space-y-1.5">
              <Bar w="90%" h="h-2" c="bg-white" />
              <Bar w="60%" h="h-2" c="bg-white" />
              <div className="pt-2 space-y-1.5">
                <div className="h-1.5 w-[70%] border-l-2 border-[#E5192D] pl-1"><div className="h-full bg-white/60 rounded-full" /></div>
                <Bar w="55%" c="bg-white/20" />
                <Bar w="65%" c="bg-white/20" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[3px] w-[40%] bg-[#E5192D]" />
          </div>
          <div className="flex-1 px-[8%] py-[10%] space-y-2">
            <Bar w="80%" h="h-2" c="bg-white/80" />
            {[95, 88, 92, 70].map((w, i) => (
              <Bar key={i} w={`${w}%`} c="bg-white/20" />
            ))}
            <div className="border-l-2 border-[#E5192D] pl-2 py-1 space-y-1.5">
              <Bar w="80%" h="h-2" c="bg-white/70" />
              <Bar w="50%" h="h-2" c="bg-white/70" />
            </div>
            {[90, 84].map((w, i) => (
              <Bar key={i} w={`${w}%`} c="bg-white/20" />
            ))}
          </div>
        </div>
      );
    case "scene-agent-lab":
      return (
        <div className="absolute inset-0 bg-[#020204] p-[5%] flex flex-col gap-[4%]">
          <div className="flex items-center justify-between">
            <Bar w="35%" h="h-2" c="bg-white/70" />
            <div className="font-mono text-lg font-black text-white leading-none">07.65</div>
          </div>
          <div className="flex-1 grid grid-cols-12 gap-[3%]">
            <div className="col-span-3 rounded-md border border-white/10 bg-[#06080F] p-1.5 space-y-1.5">
              {[1, 1, 0, 0].map((a, i) => (
                <div key={i} className={`h-4 rounded ${a ? "border-l-2 border-[#E5192D] bg-[#E5192D]/10" : "bg-white/5"}`} />
              ))}
            </div>
            <div className="col-span-5 rounded-md border border-white/10 bg-[#06080F] p-2 space-y-2">
              {["done", "done", "run", "wait", "wait"].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      s === "run" ? "bg-[#E5192D] shadow-[0_0_8px_#E5192D]" : s === "done" ? "bg-white/40" : "border border-dashed border-white/20"
                    }`}
                  />
                  <Bar w={`${60 + ((i * 13) % 30)}%`} c={s === "wait" ? "bg-white/10" : "bg-white/30"} />
                </div>
              ))}
            </div>
            <div className="col-span-4 rounded-md border border-white/10 bg-[#08090E] p-2 space-y-1.5">
              {[70, 85, 55, 90, 40, 75].map((w, i) => (
                <Bar key={i} w={`${w}%`} h="h-1" c={i === 0 ? "bg-[#E5192D]/70" : "bg-white/20"} />
              ))}
            </div>
          </div>
        </div>
      );
    case "scene-dashboard":
      return (
        <div className="absolute inset-0 bg-[#F8FAFC] flex">
          <div className="w-[20%] bg-white border-r border-slate-200 p-[3%] space-y-1.5">
            <div className="h-3 w-3 rounded bg-[#059669] mb-2" />
            <div className="h-2.5 rounded bg-emerald-50 border border-emerald-100" />
            {[1, 2, 3, 4].map((i) => (
              <Bar key={i} w="70%" c="bg-slate-200" />
            ))}
          </div>
          <div className="flex-1 p-[4%] space-y-[4%]">
            <Bar w="30%" h="h-2" c="bg-slate-800" />
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded-md bg-white border border-slate-200 p-1 space-y-1">
                  <Bar w="50%" h="h-1" c="bg-slate-300" />
                  <Bar w="35%" h="h-2" c="bg-slate-700" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="col-span-2 rounded-md bg-white border border-slate-200 p-1.5 space-y-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-1.5 items-center">
                    <Bar w="25%" h="h-1" c="bg-slate-400" />
                    <Bar w="40%" h="h-1" c="bg-slate-200" />
                    <div className={`ml-auto h-1.5 w-4 rounded-full ${i === 1 ? "bg-amber-300" : "bg-emerald-200"}`} />
                  </div>
                ))}
              </div>
              <div className="rounded-md bg-white border border-slate-200 p-1.5 space-y-1.5">
                {[80, 60, 40].map((w, i) => (
                  <Bar key={i} w={`${w}%`} h="h-1" c="bg-[#059669]/60" />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "scene-approvals":
      return (
        <div className="absolute inset-0 bg-[#F8FAFC] flex">
          <div className="w-[16%] bg-white border-r border-slate-200" />
          <div className="w-[30%] bg-white border-r border-slate-200 p-[3%] space-y-1.5">
            <Bar w="50%" h="h-2" c="bg-slate-800" />
            {[1, 0, 0, 0].map((a, i) => (
              <div key={i} className={`rounded p-1 space-y-1 ${a ? "bg-emerald-50 border-l-2 border-[#059669]" : ""}`}>
                <Bar w="80%" h="h-1" c="bg-slate-500" />
                <Bar w="50%" h="h-1" c="bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-[4%] space-y-[5%]">
            <div className="flex items-center justify-between">
              <Bar w="45%" h="h-2" c="bg-slate-800" />
              <div className="h-3 w-8 rounded-full bg-[#059669]" />
            </div>
            <div className="rounded-md bg-white border border-slate-200 p-1.5 grid grid-cols-3 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Bar key={i} w="80%" h="h-1" c="bg-slate-300" />
              ))}
            </div>
            <div className="rounded-md bg-white border border-slate-200 p-2 flex items-center">
              {["bg-[#059669]", "bg-[#059669]", "bg-white border-2 border-[#059669]", "bg-slate-200", "bg-slate-200"].map((c, i, arr) => (
                <React.Fragment key={i}>
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${c}`} />
                  {i < arr.length - 1 && <div className={`h-0.5 flex-1 ${i < 2 ? "bg-[#059669]" : "bg-slate-200"}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    case "scene-docs":
      return (
        <div className="absolute inset-0 bg-white flex">
          <div className="w-[22%] bg-slate-50 border-r border-slate-200 p-[3%] space-y-1.5">
            {[1, 0, 0, 0, 0].map((a, i) => (
              <div key={i} className={`h-2.5 rounded flex items-center justify-between px-1 ${a ? "bg-white border border-slate-200" : ""}`}>
                <Bar w="50%" h="h-1" c="bg-slate-400" />
                <div className={`h-1.5 w-3 rounded-sm ${i === 2 ? "bg-amber-200" : "bg-teal-200"}`} />
              </div>
            ))}
          </div>
          <div className="flex-1 px-[6%] py-[5%] space-y-2">
            <Bar w="40%" h="h-2" c="bg-slate-800" />
            <div className="h-3 rounded bg-slate-50 border border-slate-200" />
            <div className="rounded border border-slate-200 p-1 space-y-1">
              {[0, 1, 2].map((i) => (
                <Bar key={i} w={`${70 + i * 8}%`} h="h-1" c="bg-slate-200" />
              ))}
            </div>
            <div className="rounded bg-slate-100 border border-slate-200 p-1.5 space-y-1">
              {[60, 80, 45].map((w, i) => (
                <Bar key={i} w={`${w}%`} h="h-1" c={i === 0 ? "bg-[#059669]/60" : "bg-slate-300"} />
              ))}
            </div>
          </div>
          <div className="w-[18%] border-l border-slate-200 p-[3%] space-y-1.5">
            <div className="h-1.5 w-[70%] border-l-2 border-[#059669]" />
            {[1, 2, 3].map((i) => (
              <Bar key={i} w="60%" h="h-1" c="bg-slate-200" />
            ))}
          </div>
        </div>
      );
  }
};
