import { t } from "ttag";

import { AdminNavWrapper } from "metabase/admin/components/AdminNav";
import { PLUGIN_SECURITY_CENTER } from "metabase/plugins";
import { Box, Divider } from "metabase/ui";

import { SettingsNavItem } from "./SettingsNavItem";

const NavDivider = () => <Divider my="sm" />;

export function SettingsNav() {
  const { isEnabled: isSecurityCenterEnabled, SecurityCenterPromoCard } =
    PLUGIN_SECURITY_CENTER;

  return (
    <AdminNavWrapper>
      <SettingsNavItem path="general" label={t`General`} icon="gear" />
      <SettingsNavItem
        label={t`Authentication`}
        icon="lock"
        folderPattern="auth"
      >
        <SettingsNavItem path="authentication" label={t`Overview`} />
        <SettingsNavItem path="authentication/api-keys" label={t`API keys`} />
        <SettingsNavItem path="authentication/google" label={t`Google auth`} />
        <SettingsNavItem path="authentication/ldap" label="LDAP" />
      </SettingsNavItem>
      <NavDivider />
      <SettingsNavItem path="email" label={t`Email`} icon="mail" />
      <SettingsNavItem path="slack" label={t`Slack`} icon="slack" />
      <SettingsNavItem path="webhooks" label={t`Webhooks`} icon="webhook" />
      <NavDivider />
      <SettingsNavItem
        path="localization"
        label={t`Localization`}
        icon="globe"
      />
      <SettingsNavItem path="maps" label={t`Maps`} icon="pinmap" />
      <SettingsNavItem path="appearance" label={t`Appearance`} icon="palette" />
      <NavDivider />
      <SettingsNavItem path="uploads" label={t`Uploads`} icon="upload" />
      <SettingsNavItem
        path="public-sharing"
        label={t`Public sharing`}
        icon="share"
      />
      {isSecurityCenterEnabled && (
        <Box
          pos="sticky"
          bottom={0}
          pt="md"
          bg="background_page-primary"
          style={{ marginTop: "auto", zIndex: 1 }}
        >
          <SecurityCenterPromoCard />
        </Box>
      )}
    </AdminNavWrapper>
  );
}
