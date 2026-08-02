import { renderWithProviders, screen } from "__support__/ui";

import { TrialBanner } from "./TrialBanner";

function setup({
  daysRemaining,
  onClose,
}: {
  daysRemaining: number;
  onClose: () => void;
}) {
  return renderWithProviders(
    <TrialBanner daysRemaining={daysRemaining} onClose={onClose} />,
  );
}

describe("TrialBanner", () => {
  it("does not render removed trial banner UI", () => {
    const { container } = setup({ daysRemaining: 6, onClose: jest.fn() });

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
