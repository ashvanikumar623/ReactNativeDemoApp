import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import { I18n } from "i18n-js";
import translations from "./translations.json";
I18n.fallbacks = true;

const i18n = new I18n(translations);

const { languageTag, isRTL } = RNLocalize.findBestLanguageTag(
  Object.keys(i18n.translations)
) || { languageTag: "en", isRTL: false };

I18nManager.forceRTL(isRTL);
i18n.locale = languageTag;

export default i18n;
