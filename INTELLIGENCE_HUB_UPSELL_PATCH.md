# Intelligence Hub upsell patch

This branch hides Metabase marketing upsell surfaces for the Intelligence Hub / hotel analytics prototype.

Intentional boundary:

- hide upgrade cards, banners, pills, gems, store link, and the upgrade modal
- do **not** unlock, emulate, or bypass paid/enterprise feature checks
- keep Metabase copyright/license notices intact

Primary patch points:

- `frontend/src/metabase/common/components/upsells/components/UpsellWrapper.tsx`
- `frontend/src/metabase/common/components/upsells/components/UpsellGem.tsx`
- `frontend/src/metabase/nav/components/StoreLink/StoreLink.tsx`
- `frontend/src/metabase/new/components/NewModals/NewModals.tsx`
- `frontend/src/metabase/common/components/upsells/components/UpsellCardContent.tsx`
- `frontend/src/metabase/admin/upsells/UpsellSdkLink.tsx`
- `frontend/src/metabase/nav/components/DevModeBanner/DevModeBanner.tsx`
- `frontend/src/metabase/admin/settings/components/GeneralSettings/DevInstanceBanner.tsx`
- `frontend/src/metabase/admin/settings/components/SettingsLicense/SettingsLicense.tsx`
- `enterprise/frontend/src/metabase-enterprise/license/components/LicenseAndBillingSettings/LicenseAndBillingSettings.tsx`
- `enterprise/frontend/src/metabase-enterprise/license/components/BillingInfo/BillingInfo.tsx`
- `frontend/src/metabase/admin/settingsRoutes.tsx`
- `frontend/src/metabase/admin/settings/components/SettingsPages/CloudSettingsPage.tsx`
- `frontend/src/metabase/admin/settings/components/SettingsNav/SettingsNav.tsx`
- `frontend/src/metabase/embedding/components/EmbedModal/StaticEmbedSetupPane/LookAndFeelSettings.tsx`
- `frontend/src/embedding-sdk-bundle/components/private/SdkUsageProblem/index.tsx`
- `frontend/src/metabase/metabot/components/MetabotManagedProviderLimit.tsx`
- `frontend/src/metabase/metabot/constants.ts`
- `enterprise/frontend/src/metabase-enterprise/metabot/components/MetabotAdmin/MetabaseAIProviderSetup.tsx`
- `frontend/src/metabase/transforms/components/LockedTransformsBanner/LockedTransformsBanner.tsx`
- `frontend/src/metabase/transforms/components/LockedTransformsHoverCard/LockedTransformsHoverCard.tsx`
- `frontend/src/metabase/setup/components/LicenseTokenStep/LicenseTokenForm.tsx`

Run/build using the normal Metabase development instructions. This branch should stay close to upstream so it can be rebased when Metabase moves.
