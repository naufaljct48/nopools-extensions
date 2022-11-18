/* eslint-disable linebreak-style */
import {
  LanguageCode,
  SourceInfo,
  TagType,
  ContentRating,
} from "paperback-extensions-common";

import { MangaStream, getExportVersion } from "../MangaStream";

import { WestMangaParser } from "./WestMangaParser";

const WESTMANGA_DOMAIN = "https://westmanga.info";

export const WestMangaInfo: SourceInfo = {
  version: getExportVersion("0.0.1"),
  name: "WestManga",
  description: "Extension that pulls manga from WestManga",
  author: "NaufalJCT48",
  authorWebsite: "http://github.com/naufaljct48",
  icon: "icon.png",
  contentRating: ContentRating.MATURE,
  websiteBaseURL: WESTMANGA_DOMAIN,
  sourceTags: [
    {
      text: "Notifications",
      type: TagType.GREEN,
    },
    {
      text: "Indonesian",
      type: TagType.GREY,
    },
  ],
};

export class WestManga extends MangaStream {
  //FOR ALL THE SELECTIONS, PLEASE CHECK THE MangaSteam.ts FILE!!!

  baseUrl: string = WESTMANGA_DOMAIN;
  languageCode: LanguageCode = LanguageCode.ENGLISH;

  override readonly parser: WestMangaParser = new WestMangaParser();

  override sourceTraversalPathName = "manga";

  override requestManager = createRequestManager({
    requestsPerSecond: 2,
    requestTimeout: 15000,
  });

  //----MANGA DETAILS SELECTORS
  /*
    If a website uses different names/words for the status below, change them to these.
    These must also be changed id a different language is used!
    Don't worry, these are case insensitive.
    */

  //manga_StatusTypes: object = {
  //    ONGOING: "ongoing",
  //    COMPLETED: "completed"
  //}

  //----HOMESCREEN SELECTORS
  //Disabling some of these will cause some Home-Page tests to fail, edit these test files to match the setting.
  //Always be sure to test this in the app!

  override homescreen_PopularToday_enabled = true;
  override homescreen_PopularToday_selector =
    "h2:contains(Komik Popular Hari Ini...)";

  override homescreen_LatestUpdate_enabled = true;
  override homescreen_LatestUpdate_selector_box =
    "h2:contains(UPDATE KOMIK LAINYA...)";

  override homescreen_NewManga_enabled = true;
  override homescreen_NewManga_selector =
    "h2:contains(UPDATE PROJECT WESTMANGA)";

  override homescreen_TopAllTime_enabled = true;
  override homescreen_TopMonthly_enabled = true;
  override homescreen_TopWeekly_enabled = true;

  /*
    ----TAG SELECTORS
    PRESET 1 (default): Genres are on homepage ex. https://mangagenki.com/
    tags_SubdirectoryPathName: string = ""
    tags_selector_box: string = "ul.genre"
    tags_selector_item: string = "li"
    tags_selector_label: string = ""

    PRESET 2: with /genre/ subdirectory ex. https://mangadark.com/genres/
    tags_SubdirectoryPathName: string = "/genres/"
    tags_selector_box: string = "ul.genre"
    tags_selector_item: string = "li"
    tags_selector_label: string = "span"
    */

  override manga_tag_selector_box = ".seriestugenre";
}
