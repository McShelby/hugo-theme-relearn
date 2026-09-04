/*!
 * Lunr languages, `Artificial` language
 * Local to this site, not part of the theme: our Piratish translation uses
 * `languageCode = 'art-x-pir'`, which the lunr search adapter reduces to the
 * base code `art`. Without this file the language is dropped from the search
 * index and the build warns about it. Piratish is autotranslated from English,
 * so it reuses the English support that is build in into lunr
 *
 * Copyright 2026, Sören Weber
 * http://www.mozilla.org/MPL/
 */
!function(e,r){"function"==typeof define&&define.amd?define(r):"object"==typeof exports?module.exports=r():r()(e.lunr)}(this,function(){return function(e){if(void 0===e)throw new Error("Lunr is not present. Please include / require Lunr before this script.");e.art=function(){this.pipeline.reset(),this.pipeline.add(e.art.trimmer,e.art.stopWordFilter,e.art.stemmer),this.searchPipeline&&(this.searchPipeline.reset(),this.searchPipeline.add(e.art.stemmer))},e.art.wordCharacters="\\w",e.art.trimmer=e.trimmer,e.art.stopWordFilter=e.stopWordFilter,e.art.stemmer=e.stemmer}});
