import { enUS, zhCN, zhTW } from "date-fns/locale";
import type { Locale } from "./types";

export function getDateFnsLocale(locale: Locale) {
  switch (locale) {
    case "zh-Hans":
      return zhCN;
    case "zh-Hant":
      return zhTW;
    default:
      return enUS;
  }
}
