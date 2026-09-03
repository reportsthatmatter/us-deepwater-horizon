import { pipeline, runningFurniture } from "@rtm/ingest";

/**
 * How this report is built. Owned by the report: every decision that shaped
 * its text is named here, and the passes it composes are library code, so a
 * fix to a shared pass reaches every report that calls it.
 */
export default pipeline({
  id: "us-deepwater-horizon",
  title: "Deep Water: The Gulf Oil Disaster and the Future of Offshore Drilling",
  authors: "National Commission on the BP Deepwater Horizon Oil Spill and Offshore Drilling",
  published_at: "January 2011",
  source_url: "https://www.govinfo.gov/content/pkg/GPO-OILCOMMISSION/pdf/GPO-OILCOMMISSION.pdf",
  repo: ".",
  volumes: [
    {
      path: "archive/deep-water.pdf",
      sha256: "f0a242909914e4d00200005734ce9b240b1b4c58e0e8af04e95387717780b23c",
    },
  ],
  passes: [runningFurniture()],
});
