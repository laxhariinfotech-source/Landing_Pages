// ===============================
// ExtensionPage.tsx
// ===============================

import HeroDemo from "../components/extension/HeroDemo";
import InstallSteps from "../components/extension/InstallSteps";
import DemoGrid from "../components/extension/DemoGrid";
import FinalCTA from "../components/extension/FinalCTA";

export default function ExtensionPage() {
  return (
    <main className="extension-page">
      <HeroDemo />
      <InstallSteps />
      <DemoGrid />
      <FinalCTA />
    </main>
  );
}