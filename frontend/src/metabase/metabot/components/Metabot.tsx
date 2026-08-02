import type { SuggestionModel } from "metabase/rich_text_editing/tiptap/extensions/shared/types";

import type { MetabotAgentId } from "../state";

export interface MetabotConfig {
  agentId?: MetabotAgentId;
  emptyText?: string;
  hideSuggestedPrompts?: boolean;
  preventRetryMessage?: boolean;
  suggestionModels: SuggestionModel[];
}

export interface MetabotProps {
  hide?: boolean;
  config?: MetabotConfig;
}

export const MetabotAuthenticated = (_props: MetabotProps) => null;

export const Metabot = (_props: MetabotProps) => null;
