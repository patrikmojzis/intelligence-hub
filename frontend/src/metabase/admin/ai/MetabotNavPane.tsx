import { t } from "ttag";

import {
  AdminNavItem,
  AdminNavWrapper,
} from "metabase/admin/components/AdminNav";
import { useSetting } from "metabase/common/hooks";
import { Flex } from "metabase/ui";

export function MetabotNavPane() {
  const areAiFeaturesEnabled = useSetting("ai-features-enabled?") !== false;

  return (
    <Flex direction="column" flex="0 0 auto">
      <AdminNavWrapper>
        <AdminNavItem
          disabled={!areAiFeaturesEnabled}
          icon="mcp"
          label={t`MCP`}
          folderPattern="/admin/metabot/mcp"
        >
          <AdminNavItem
            disabled={!areAiFeaturesEnabled}
            label={t`Settings`}
            path="/admin/metabot/mcp"
          />
          <AdminNavItem
            disabled={!areAiFeaturesEnabled}
            label={t`Authorizations`}
            path="/admin/metabot/mcp/authorizations"
          />
        </AdminNavItem>
      </AdminNavWrapper>
    </Flex>
  );
}
