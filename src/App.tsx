import React, { useCallback, useEffect, useState } from "react";
import { SparxThemeProvider } from "./sparx-ui";
import { DocsShell } from "./showcase/layout/DocsShell";
import { SceneShell } from "./showcase/layout/SceneShell";
import { isSceneId, readRouteFromUrl, type PageId, type RouteId, type SceneId } from "./showcase/routes";

import { OverviewPage } from "./showcase/pages/start/OverviewPage";
import { QuickStartPage } from "./showcase/pages/start/QuickStartPage";
import { AgentPromptPage } from "./showcase/pages/start/AgentPromptPage";
import { ThemesPage } from "./showcase/pages/foundations/ThemesPage";
import { ColorPage } from "./showcase/pages/foundations/ColorPage";
import { TypographyPage } from "./showcase/pages/foundations/TypographyPage";
import { SurfacesPage } from "./showcase/pages/foundations/SurfacesPage";
import { GuardrailsPage } from "./showcase/pages/foundations/GuardrailsPage";
import { CopywritingGuidePage } from "./showcase/pages/foundations/CopywritingGuidePage";
import { BasicComponentsPage } from "./showcase/pages/components/BasicComponentsPage";
import { DataComponentsPage } from "./showcase/pages/components/DataComponentsPage";
import { AtmospherePage } from "./showcase/pages/components/AtmospherePage";
import { PublishingPatternsPage } from "./showcase/pages/components/PublishingPatternsPage";
import { EnterprisePatternsPage } from "./showcase/pages/components/EnterprisePatternsPage";
import { ScenesIndexPage } from "./showcase/pages/scenes-index/ScenesIndexPage";

import { EditorialScene } from "./showcase/scenes/EditorialScene";
import { MonographScene } from "./showcase/scenes/MonographScene";
import { AgentLabScene } from "./showcase/scenes/AgentLabScene";
import { DashboardScene } from "./showcase/scenes/DashboardScene";
import { ApprovalsScene } from "./showcase/scenes/ApprovalsScene";
import { DocsScene } from "./showcase/scenes/DocsScene";

export type Navigate = (id: RouteId) => void;

function renderPage(id: PageId, navigate: Navigate): React.ReactNode {
  switch (id) {
    case "overview":
      return <OverviewPage onNavigate={navigate} />;
    case "quick-start":
      return <QuickStartPage onNavigate={navigate} />;
    case "agent-prompt":
      return <AgentPromptPage />;
    case "themes":
      return <ThemesPage onNavigate={navigate} />;
    case "color":
      return <ColorPage />;
    case "typography":
      return <TypographyPage />;
    case "surfaces":
      return <SurfacesPage />;
    case "guardrails":
      return <GuardrailsPage />;
    case "copywriting":
      return <CopywritingGuidePage />;
    case "components-basic":
      return <BasicComponentsPage />;
    case "components-data":
      return <DataComponentsPage />;
    case "atmosphere":
      return <AtmospherePage />;
    case "patterns-publishing":
      return <PublishingPatternsPage onNavigate={navigate} />;
    case "patterns-enterprise":
      return <EnterprisePatternsPage onNavigate={navigate} />;
    case "scenes":
      return <ScenesIndexPage onNavigate={navigate} />;
  }
}

function renderScene(id: SceneId, navigate: Navigate): React.ReactNode {
  switch (id) {
    case "scene-editorial":
      return <EditorialScene onNavigate={navigate} />;
    case "scene-monograph":
      return <MonographScene onNavigate={navigate} />;
    case "scene-agent-lab":
      return <AgentLabScene />;
    case "scene-dashboard":
      return <DashboardScene onNavigate={navigate} />;
    case "scene-approvals":
      return <ApprovalsScene onNavigate={navigate} />;
    case "scene-docs":
      return <DocsScene />;
  }
}

export function App() {
  const [route, setRoute] = useState<RouteId>(() => readRouteFromUrl());

  const navigate = useCallback<Navigate>((id) => {
    setRoute(id);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", id);
      url.searchParams.delete("nav");
      url.hash = "";
      window.history.pushState(null, "", url.toString());
      window.scrollTo({ top: 0 });
    }
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(readRouteFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <SparxThemeProvider defaultTheme="void-flare">
      {isSceneId(route) ? (
        <SceneShell scene={route} onNavigate={navigate}>
          {renderScene(route, navigate)}
        </SceneShell>
      ) : (
        <DocsShell route={route} onNavigate={navigate}>
          {renderPage(route, navigate)}
        </DocsShell>
      )}
    </SparxThemeProvider>
  );
}

export default App;
