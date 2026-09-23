import React, { useState } from "react";
import { SparxThemeProvider } from "./sparx-ui";
import { ShowcaseShell, type ShowcaseNavId } from "./showcase/layout/ShowcaseShell";
import { OverviewPage } from "./showcase/pages/OverviewPage";
import { AgentPromptPage } from "./showcase/pages/AgentPromptPage";
import { GuardrailsPage } from "./showcase/pages/GuardrailsPage";
import { PrimitivesPage } from "./showcase/pages/PrimitivesPage";
import { AtmospherePage } from "./showcase/pages/AtmospherePage";
import { PatternsPage } from "./showcase/pages/PatternsPage";
import { HorizonStageScene } from "./showcase/pages/scenes/HorizonStageScene";
import { SplitMonographScene } from "./showcase/pages/scenes/SplitMonographScene";
import { DeveloperTerminalScene } from "./showcase/pages/scenes/DeveloperTerminalScene";

export function App() {
  const [activeNav, setActiveNav] = useState<ShowcaseNavId>("overview");

  return (
    <SparxThemeProvider defaultTheme="void-flare">
      <ShowcaseShell activeNav={activeNav} onNavChange={setActiveNav}>
        {activeNav === "overview" && (
          <OverviewPage onNavigateTo={(id) => setActiveNav(id as ShowcaseNavId)} />
        )}

        {activeNav === "prompt" && <AgentPromptPage />}

        {activeNav === "guardrails" && <GuardrailsPage />}

        {activeNav === "primitives" && <PrimitivesPage />}

        {activeNav === "atmosphere" && <AtmospherePage />}

        {activeNav === "patterns" && (
          <PatternsPage onNavigateTo={(id) => setActiveNav(id as ShowcaseNavId)} />
        )}

        {activeNav === "stage-scene" && (
          <div className="w-full flex-1 flex flex-col justify-center">
            <HorizonStageScene onInspectEntry={() => setActiveNav("monograph-scene")} />
          </div>
        )}

        {activeNav === "monograph-scene" && (
          <div className="w-full flex-1">
            <SplitMonographScene onBackToStage={() => setActiveNav("stage-scene")} />
          </div>
        )}

        {activeNav === "terminal-scene" && (
          <div className="w-full flex-1">
            <DeveloperTerminalScene />
          </div>
        )}
      </ShowcaseShell>
    </SparxThemeProvider>
  );
}

export default App;
