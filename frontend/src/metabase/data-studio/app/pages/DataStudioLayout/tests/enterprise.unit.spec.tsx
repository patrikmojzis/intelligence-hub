import fetchMock from "fetch-mock";

import { screen, waitFor } from "__support__/ui";
import * as Urls from "metabase/urls";

import { DEFAULT_EE_SETTINGS, setup } from "./setup";

describe("DataStudioLayout", () => {
  beforeEach(() => {
    fetchMock.removeRoutes();
    fetchMock.clearHistory();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Set up remote sync button", () => {
    it("does not show the remote sync setup entry", async () => {
      setup({ ...DEFAULT_EE_SETTINGS, remoteSyncEnabled: false });

      await waitFor(() => {
        expect(screen.getByTestId("data-studio-nav")).toBeInTheDocument();
      });

      expect(
        screen.queryByLabelText("Set up remote sync"),
      ).not.toBeInTheDocument();
    });
  });

  describe("sidebar rendering", () => {
    it("should render the sidebar with navigation tabs", async () => {
      setup({ ...DEFAULT_EE_SETTINGS, remoteSyncBranch: "main" });

      await waitFor(() => {
        expect(screen.getByTestId("data-studio-nav")).toBeInTheDocument();
      });

      expect(screen.getByText("Library")).toBeInTheDocument();
    });

    it("should render GitSyncAppBarControls when sidebar is expanded", async () => {
      setup({
        ...DEFAULT_EE_SETTINGS,
        remoteSyncBranch: "main",
        isNavbarOpened: true,
      });

      await waitFor(() => {
        expect(screen.getByTestId("data-studio-nav")).toBeInTheDocument();
      });

      expect(screen.getByTestId("git-sync-controls")).toBeInTheDocument();
    });

    it("should not render GitSyncAppBarControls when sidebar is collapsed", async () => {
      setup({
        ...DEFAULT_EE_SETTINGS,
        remoteSyncBranch: "main",
        isNavbarOpened: false,
      });

      await waitFor(() => {
        expect(screen.getByTestId("data-studio-nav")).toBeInTheDocument();
      });

      expect(screen.queryByTestId("git-sync-controls")).not.toBeInTheDocument();
    });

    it("should render content area", async () => {
      setup({ ...DEFAULT_EE_SETTINGS, remoteSyncBranch: null });

      await waitFor(() => {
        expect(screen.getByTestId("data-studio-nav")).toBeInTheDocument();
      });

      expect(screen.getByTestId("content")).toBeInTheDocument();
    });
  });

  describe("transforms navigation", () => {
    it("does not show transform tabs", async () => {
      setup({
        ...DEFAULT_EE_SETTINGS,
        remoteSyncBranch: "main",
        isNavbarOpened: true,
        hasTransformDirtyChanges: true,
        remoteSyncTransforms: true,
      });

      await waitFor(() => {
        expect(screen.getByTestId("data-studio-nav")).toBeInTheDocument();
      });

      expect(screen.queryByLabelText("Transforms")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Jobs")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("Runs")).not.toBeInTheDocument();
    });
  });

  describe("workspaces tab", () => {
    it("admin sees the tab and it links to the workspaces index", async () => {
      setup({ ...DEFAULT_EE_SETTINGS, isAdmin: true });

      const tab = await screen.findByLabelText("Workspaces");
      expect(tab).toHaveAttribute("href", Urls.workspaces());
    });

    it("non-admin does not see the tab", async () => {
      setup({
        ...DEFAULT_EE_SETTINGS,
        isAdmin: false,
      });

      expect(await screen.findByTestId("data-studio-nav")).toBeInTheDocument();
      expect(screen.queryByLabelText("Workspaces")).not.toBeInTheDocument();
    });
  });
});
