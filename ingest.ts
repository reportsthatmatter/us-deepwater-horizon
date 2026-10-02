import {
  pipeline,
  geometry,
  allCapsHeadings,
  listedDivisions,
  wrappedHeadings,
  runningFurniture,
  romanFolios,
  photoCredits,
  numberedOutsideTables,
} from "@rtm/ingest";

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
  passes: [
    // The book is set with a gutter: left-hand (even) pages sit four columns
    // further in than right-hand ones. Against one document margin every
    // even page's text read as inset, and 816 of its paragraphs became block
    // quotations with no ids (reportsthatmatter-eyc). Each page's margin is
    // measured on its own.
    geometry("per-page"),
    runningFurniture(),
    // The Foreword and front matter are folioed i-xiii, a lone numeral on
    // even pages and "vii   vii" on odd ones. Left alone they stay in the text
    // ("Fran Ulmer v v") and the pages carry no number (reportsthatmatter-cbr).
    // Needs an @rtm/ingest release that has romanFolios.
    romanFolios(),
    // The report's sections are its Foreword, parts, chapters, endnotes and
    // appendices, which the contents lists; chapter openers set their titles
    // a word or two to a line with no blank before the text, so they are
    // read from the contents (reportsthatmatter-a0z).
    listedDivisions(),
    // Nothing the report sets in capitals on a line of its own is a heading:
    // those are figure captions and map labels ("SANTA BARBARA OIL SPILL",
    // "MS AL LA GA"), and a signature ("BARACK OBAMA"). "ENDNOTES" and
    // "INDEX" come back from the contents.
    allCapsHeadings(false),
    // Chapter 9's "4. The Need for … to Improve Spill" / "Response".
    wrappedHeadings(),
    // A photo credit ("Mark Wilson/Getty Images") set between a paragraph and
    // the rest of its sentence took the continuation as its own text
    // (reportsthatmatter-xay). Needs the @rtm/ingest release with photoCredits.
    photoCredits(),
    // Appendix D's two-column staff list sets names with initials ("C. Hobson
    // Bryan   Jill Jonnes") that read as lettered headings; a lettered line
    // between aligned rows is a table row (reportsthatmatter-0ij). Needs the
    // @rtm/ingest release with numberedOutsideTables.
    numberedOutsideTables(),
  ],
});
