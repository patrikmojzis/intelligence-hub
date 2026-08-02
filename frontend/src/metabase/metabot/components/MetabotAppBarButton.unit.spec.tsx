import fetchMock from "fetch-mock";
import { Route } from "react-router";

import { setupEnterprisePlugins } from "__support__/enterprise";
import { mockSettings } from "__support__/settings";
import { renderWithProviders, screen } from "__support__/ui";
import {
  createMockLocation,
  createMockRoutingState,
  createMockState,
} from "metabase/redux/store/mocks";
import type { UserMetabotPermissions } from "metabase-types/api";
import { createMockUserMetabotPermissions } from "metabase-types/api/mocks";
import { MetabotProvider } from "../context";

import { MetabotAppBarButton } from "./MetabotAppBarButton";

function setup({
  isMetabotEnabled = true,
  isConfigured = true,
  permissionOverrides,
  pathname = "/",
}: {
  isMetabotEnabled?: boolean;
  isConfigured?: boolean;
  permissionOverrides?: Partial<UserMetabotPermissions>;
  pathname?: string;
} = {}) {
  fetchMock.get(
    "path:/api/metabot/permissions/user-permissions",
    createMockUserMetabotPermissions(permissionOverrides),
  );

  const settings = mockSettings({
    "llm-metabot-configured?": isConfigured,
    "metabot-enabled?": isMetabotEnabled,
  });
  setupEnterprisePlugins();

  const TestComponent = () => (
    <MetabotProvider>
      <MetabotAppBarButton />
    </MetabotProvider>
  );

  renderWithProviders(
    <Route path="*" component={TestComponent} />,
    {
      withRouter: true,
      initialRoute: pathname,
      storeInitialState: createMockState({
        settings,
        routing: createMockRoutingState({
          locationBeforeTransitions: createMockLocation({ pathname }),
        }),
      }),
    },
  );
}

describe("MetabotAppBarButton", () => {
  it("does not render the built-in Metabot chat button", () => {
    setup({ isMetabotEnabled: true });
    expect(
      screen.queryByRole("button", { name: /Chat with Metabot/ }),
    ).not.toBeInTheDocument();
  });
});
