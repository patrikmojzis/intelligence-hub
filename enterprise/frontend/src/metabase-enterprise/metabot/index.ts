import { PLUGIN_METABOT } from "metabase/plugins";
import { hasPremiumFeature } from "metabase-enterprise/settings";

import { MetabaseAIProviderSetup } from "./components/MetabotAdmin/MetabaseAIProviderSetup";

export function initializePlugin() {
  if (
    hasPremiumFeature("metabase-ai-managed") ||
    hasPremiumFeature("metabot-v3")
  ) {
    PLUGIN_METABOT.isEnabled = true;
    PLUGIN_METABOT.MetabaseAIProviderSetup = MetabaseAIProviderSetup;
  }
}
