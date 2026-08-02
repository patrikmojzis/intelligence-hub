import { Route } from "react-router";

import { NewPythonTransformPage } from "metabase/transforms/pages/NewTransformPage";

import { PythonLibraryEditorPage } from "./pages/PythonLibraryEditorPage";

export function getPythonTransformsRoutes() {
  return (
    <>
      <Route path="library/:path" component={PythonLibraryEditorPage} />
      <Route path="new/python" component={NewPythonTransformPage} />
    </>
  );
}

export function getPythonUpsellRoutes() {
  return null;
}
