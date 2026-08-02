import type { MetabaseAIProviderSetupProps } from "metabase/plugins";
import type { MetabotUsageResponse } from "metabase-enterprise/api";

import type { MetabaseManagedAiPricing } from "../../useMetabaseManagedAiPricing";

export function MetabaseAIProviderSetup(_props: MetabaseAIProviderSetupProps) {
  return null;
}

export function MetabasePricingText(_props: {
  pricing: MetabaseManagedAiPricing;
}) {
  return null;
}

export function getMetabaseUsageCost(
  usage: MetabotUsageResponse | undefined,
  pricing: MetabaseManagedAiPricing | null,
) {
  if (!usage || !pricing) {
    return 0;
  }

  const { tokens, free_tokens: freeTokens } = usage;
  if (!tokens) {
    return 0;
  }

  return (
    (Math.max(0, tokens - (freeTokens ?? 0)) / pricing.unitCount) *
    pricing.pricePerUnit
  );
}
