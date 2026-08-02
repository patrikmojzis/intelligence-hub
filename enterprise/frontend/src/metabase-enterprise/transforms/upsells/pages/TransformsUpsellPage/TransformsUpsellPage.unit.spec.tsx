import fetchMock from "fetch-mock";

import { screen } from "__support__/ui";

import { setup } from "./TransformsUpsellPage.setup.spec";

describe("TransformsUpsellPage", () => {
  it.each([
    { isHosted: true, isAdmin: false, isStoreUser: false },
    { isHosted: true, isAdmin: true, isStoreUser: false },
    { isHosted: true, isStoreUser: true },
    { isHosted: false, isStoreUser: true },
  ])("renders no removed transforms setup UI", (options) => {
    setup(options);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(
      fetchMock.callHistory.calls(
        "path:/api/ee/cloud-add-ons/transforms-basic-metered",
        { method: "POST" },
      ),
    ).toHaveLength(0);
  });
});
