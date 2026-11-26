// chooses a variant by the local time of the reader from the variant's
// `params.themeVariantByTimeMappings`, which maps the time a variant starts, as `HH:MM`,
// to the variant to show from then on; the latest start of the day before the current
// time wins, and before the first start of the day it is the last one of the day before
function themeVariantByTime(variants, variant) {
  var mappings = variant.params.themeVariantByTimeMappings;
  var now = new Date();
  var current = now.getHours() * 60 + now.getMinutes();
  var starts = Object.keys(mappings)
    .map(function (time) {
      var match = /^(\d{1,2}):(\d{2})$/.exec(time);
      if (!match) {
        throw new Error('Invalid time: ' + time);
      }
      return { minutes: Number(match[1]) * 60 + Number(match[2]), variant: mappings[time] };
    })
    .sort(function (a, b) {
      return a.minutes - b.minutes;
    });
  var started = starts.filter(function (start) {
    return start.minutes <= current;
  });
  return (started.length ? started : starts).at(-1).variant;
}
