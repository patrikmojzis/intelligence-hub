import type { Store } from "@reduxjs/toolkit";
import {
  IndexRedirect,
  IndexRoute,
  Route,
  type RouteComponent,
} from "react-router";

import { AdminSettingsLayout } from "metabase/admin/components/AdminLayout/AdminSettingsLayout";
import { NotFound } from "metabase/common/components/ErrorPages";
import { PLUGIN_AUTH_PROVIDERS } from "metabase/plugins";
import type { State } from "metabase/redux/store";

import { GoogleAuthForm } from "./settings/auth/components/GoogleAuthForm";
import { SettingsLdapForm } from "./settings/components/SettingsLdapForm";
import { SettingsNav } from "./settings/components/SettingsNav";
import { AppearanceSettingsPage } from "./settings/components/SettingsPages/AppearanceSettingsPage";
import { AuthenticationSettingsPage } from "./settings/components/SettingsPages/AuthenticationSettingsPage";
import { EmailSettingsPage } from "./settings/components/SettingsPages/EmailSettingsPage";
import { GeneralSettingsPage } from "./settings/components/SettingsPages/GeneralSettingsPage";
import { LocalizationSettingsPage } from "./settings/components/SettingsPages/LocalizationSettingsPage";
import { MapsSettingsPage } from "./settings/components/SettingsPages/MapsSettingsPage";
import { PublicSharingSettingsPage } from "./settings/components/SettingsPages/PublicSharingSettingsPage";
import { SlackSettingsPage } from "./settings/components/SettingsPages/SlackSettingsPage";
import { UploadSettingsPage } from "./settings/components/SettingsPages/UploadSettingsPage";
import { WebhooksSettingsPage } from "./settings/components/SettingsPages/WebhooksSettingsPage";

export const getSettingsRoutes = (
  _store: Store<State>,
  _IsAdmin: RouteComponent,
) => {
  return (
    <Route
      component={({ children }) => (
        <AdminSettingsLayout sidebar={<SettingsNav />}>
          {children}
        </AdminSettingsLayout>
      )}
    >
      <IndexRedirect to="general" />
      <Route path="general" component={GeneralSettingsPage} />
      <Route path="email" component={EmailSettingsPage} />
      <Route path="slack" component={SlackSettingsPage} />
      <Route path="webhooks" component={WebhooksSettingsPage} />
      <Route
        path="authentication"
        component={() => <AuthenticationSettingsPage tab="authentication" />}
      />
      <Route
        path="authentication/user-provisioning"
        component={() => <AuthenticationSettingsPage tab="user-provisioning" />}
      />
      <Route
        path="authentication/api-keys"
        component={() => <AuthenticationSettingsPage tab="api-keys" />}
      />
      <Route path="authentication/google" component={GoogleAuthForm} />
      <Route path="authentication/ldap" component={SettingsLdapForm} />
      <Route
        path="authentication/saml"
        component={() => <PLUGIN_AUTH_PROVIDERS.SettingsSAMLForm />}
      />
      <Route
        path="authentication/jwt"
        component={() => <PLUGIN_AUTH_PROVIDERS.SettingsJWTForm />}
      />
      <Route
        path="authentication/oidc"
        component={() => <PLUGIN_AUTH_PROVIDERS.SettingsOIDCForm />}
      />
      <Route path="maps" component={MapsSettingsPage} />
      <Route path="localization" component={LocalizationSettingsPage} />
      <Route path="uploads" component={UploadSettingsPage} />
      <Route path="public-sharing" component={PublicSharingSettingsPage} />
      <Route path="appearance" component={() => <AppearanceSettingsPage />} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};
