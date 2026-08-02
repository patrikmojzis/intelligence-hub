import fetchMock from "fetch-mock";

import { renderWithProviders, screen } from "__support__/ui";
import { mockAdvancedTransformsCloudAddOn } from "metabase-types/api/mocks/add-ons";

import { PurchaseAdvancedTransforms } from "./PurchaseAdvancedTransforms";

const setup = () => {
  const handleModalClose = jest.fn();
  const onSuccess = jest.fn();

  const view = renderWithProviders(
    <PurchaseAdvancedTransforms
      handleModalClose={handleModalClose}
      addOn={mockAdvancedTransformsCloudAddOn}
      freeUnitsIncluded
      onSuccess={onSuccess}
    />,
  );

  return { ...view, handleModalClose, onSuccess };
};

describe("PurchaseAdvancedTransforms", () => {
  it("renders nothing and does not start a purchase flow", () => {
    fetchMock.post(
      "path:/api/ee/cloud-add-ons/transforms-advanced-metered",
      200,
    );

    const { container, handleModalClose, onSuccess } = setup();

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(
      fetchMock.callHistory.called(
        "path:/api/ee/cloud-add-ons/transforms-advanced-metered",
      ),
    ).toBe(false);
    expect(handleModalClose).not.toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
