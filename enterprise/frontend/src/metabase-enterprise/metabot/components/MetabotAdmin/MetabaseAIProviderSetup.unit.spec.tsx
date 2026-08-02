import { renderWithProviders } from "__support__/ui";
import type { MetabotUsageResponse } from "metabase-enterprise/api";

import type { MetabaseManagedAiPricing } from "../../useMetabaseManagedAiPricing";

import {
  MetabaseAIProviderSetup,
  MetabasePricingText,
  getMetabaseUsageCost,
} from "./MetabaseAIProviderSetup";

const PRICING: MetabaseManagedAiPricing = {
  price: "$3.00",
  unit: "1M",
  pricePerUnit: 3,
  unitCount: 1_000_000,
  freeUnits: null,
};

function createUsage(
  tokens: number | null,
  freeTokens: number | null,
): MetabotUsageResponse {
  return {
    tokens,
    free_tokens: freeTokens,
    updated_at: null,
    is_locked: false,
  };
}

describe("MetabaseAIProviderSetup", () => {
  it("renders no removed managed service setup UI", () => {
    const { container } = renderWithProviders(<MetabaseAIProviderSetup />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe("MetabasePricingText", () => {
  it("renders no managed service pricing UI", () => {
    const { container } = renderWithProviders(
      <MetabasePricingText pricing={{ ...PRICING, freeUnits: "1M" }} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});

describe("getMetabaseUsageCost", () => {
  it.each([
    { tokens: 100, freeTokens: 100 },
    { tokens: 50, freeTokens: 100 },
  ])(
    "returns 0 when tokens ($tokens) are less than or equal to free tokens ($freeTokens)",
    ({ tokens, freeTokens }) => {
      expect(
        getMetabaseUsageCost(createUsage(tokens, freeTokens), PRICING),
      ).toBe(0);
    },
  );

  it("calculates cost only for tokens above the free allocation", () => {
    expect(
      getMetabaseUsageCost(createUsage(3_000_000, 1_000_000), PRICING),
    ).toBe(6);
  });
});
