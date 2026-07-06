import { screen } from "__support__/ui";

import { setup } from "./setup";

describe("PythonTransformsUpsellModal", () => {
  it.each([
    { isHosted: true, isAdmin: false, isStoreUser: false },
    { isHosted: true, isAdmin: true, isStoreUser: false },
    { isHosted: true, isStoreUser: true },
    { isHosted: false, isStoreUser: true },
  ])("renders no removed advanced transforms UI", (options) => {
    setup(options);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
