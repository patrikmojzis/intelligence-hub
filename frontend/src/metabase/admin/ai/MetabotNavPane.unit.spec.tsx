import userEvent from "@testing-library/user-event";
import { Route } from "react-router";

import { setupEnterprisePlugins } from "__support__/enterprise";
import { mockSettings } from "__support__/settings";
import { renderWithProviders, screen } from "__support__/ui";
import { reinitialize } from "metabase/plugins";
import { createMockSettingsState } from "metabase/redux/store/mocks";
import { createMockTokenFeatures } from "metabase-types/api/mocks";

import { MetabotNavPane } from "./MetabotNavPane";

const setup = ({
  aiFeaturesEnabled = true,
  aiControlsEnabled = false,
  auditAppEnabled = false,
  isConfigured = true,
  initialRoute = "/admin/metabot",
}: {
  aiFeaturesEnabled?: boolean;
  aiControlsEnabled?: boolean;
  auditAppEnabled?: boolean;
  isConfigured?: boolean;
  initialRoute?: string;
} = {}) => {
  mockSettings({
    "ai-features-enabled?": aiFeaturesEnabled,
    "token-features": createMockTokenFeatures({
      ai_controls: aiControlsEnabled,
      audit_app: auditAppEnabled,
    }),
  });

  setupEnterprisePlugins();

  return renderWithProviders(
    <Route path="/admin/metabot*" component={MetabotNavPane} />,
    {
      withRouter: true,
      initialRoute,
      storeInitialState: {
        settings: createMockSettingsState({
          "ai-features-enabled?": aiFeaturesEnabled,
          "llm-metabot-configured?": isConfigured,
        }),
      },
    },
  );
};

describe("MetabotNavPane", () => {
  afterEach(() => {
    reinitialize();
  });

  it("shows only MCP nav and disables it when all AI features are disabled", () => {
    setup({ aiFeaturesEnabled: false });

    expect(screen.queryByText("AI Settings")).not.toBeInTheDocument();
    expect(screen.getByText("MCP")).toBeInTheDocument();
    expect(
      screen.getByText("MCP", { selector: '[data-disabled="true"] *' }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Usage controls")).not.toBeInTheDocument();
    expect(screen.queryByText("Customization")).not.toBeInTheDocument();
    expect(screen.queryByText("System prompts")).not.toBeInTheDocument();
  });

  it("shows the MCP settings and authorizations links", async () => {
    setup({ aiFeaturesEnabled: true });

    expect(screen.queryByText("AI Settings")).not.toBeInTheDocument();
    await userEvent.click(await screen.findByText("MCP"));

    expect(
      await screen.findByRole("link", { name: "Settings" }),
    ).toHaveAttribute("href", "/admin/metabot/mcp");
    expect(
      screen.getByRole("link", { name: "Authorizations" }),
    ).toHaveAttribute("href", "/admin/metabot/mcp/authorizations");
    expect(screen.queryByText("Usage controls")).not.toBeInTheDocument();
    expect(screen.queryByText("Usage auditing")).not.toBeInTheDocument();
  });
});
