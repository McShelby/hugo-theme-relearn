// chooses the variant of the first entry of the variant's
// `params.themeVariantByOccasionMappings` whose `occasion` covers today's local date;
// `occasion` is the ID of an occasion, an ISO date like `2026-12-24` or a date of every
// year like `12-24`, or a list of two of them covering the time from the start of the
// first to the end of the second; an entry without it always matches
function themeVariantByOccasion(variants, variant) {
  var now = new Date();
  var year = now.getFullYear();
  var today = Date.UTC(year, now.getMonth(), now.getDate());

  // the spans of an occasion or a date starting in the given years; a date with a year
  // has its one span whatever the years, a date without a year is the same day of
  // every year
  var spans = function (occasion, years) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(occasion);
    if (match) {
      var date = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
      return [{ start: date, end: date }];
    }
    return years.flatMap(function (y) {
      var match = /^(\d{2})-(\d{2})$/.exec(occasion);
      if (match) {
        var date = Date.UTC(y, Number(match[1]) - 1, Number(match[2]));
        return new Date(date).getUTCMonth() == Number(match[1]) - 1 ? [{ start: date, end: date }] : [];
      }
      return occasions.getOccasionSpans(occasion, y);
    });
  };

  var covers = function (occasion) {
    var range = [].concat(occasion);
    if (range.length < 1 || range.length > 2) {
      throw new Error('occasion "' + range.join(', ') + '" names neither one nor two occasions');
    }
    // the latest start of the first occasion up to today, then the earliest end of the
    // last occasion from that start on
    var first = spans(range[0], [year - 1, year])
      .filter(function (span) {
        return span.start <= today;
      })
      .sort(function (a, b) {
        return b.start - a.start;
      })[0];
    if (!first) {
      return false;
    }
    var firstYear = new Date(first.start).getUTCFullYear();
    var last = spans(range[range.length - 1], [firstYear - 1, firstYear, firstYear + 1])
      .filter(function (span) {
        return span.end >= first.start;
      })
      .sort(function (a, b) {
        return a.end - b.end;
      })[0];
    return !!last && today <= last.end;
  };

  var mapping = ((variant.params && variant.params.themeVariantByOccasionMappings) || []).find(function (mapping) {
    return mapping.occasion == null || covers(mapping.occasion);
  });
  return mapping && mapping.variant;
}

/**
 * occasions.js — which major world festival(s) fall on a given date, or else which season it is.
 *
 * getOccasions('2025-03-31')
 * // → [ { id: 'eid-al-fitr', durationDays: 3, ... }, { id: 'nowruz', durationDays: 13, ... } ]
 *
 * Results are always an array: matching festivals first, sorted by duration (shortest first),
 * then always four season entries, one per hemisphere × reckoning, in this order:
 * north/astronomical, north/meteorological, south/astronomical, south/meteorological
 *
 * Only getOccasions and getOccasionSpans are handed out; everything else stays private.
 *
 * Requires an engine with full ICU (all modern browsers, Node >= 13) for the
 * Chinese, Islamic and Hebrew calendars via Intl.DateTimeFormat.
 */
var occasions = (function () {
  'use strict';

  const DAY = 86_400_000;
  const HOUR = 3_600_000;

  const utc = (y, m, d) => Date.UTC(y, m - 1, d);
  const addDays = (t, n) => t + n * DAY;
  const iso = (t) => new Date(t).toISOString().slice(0, 10);
  const rad = (deg) => (deg * Math.PI) / 180;

  /** Calendar day (as UTC-midnight timestamp) of an instant, seen in a fixed UTC offset. */
  const dayInOffset = (ms, offsetH) => {
    const t = ms + offsetH * HOUR;
    return t - (((t % DAY) + DAY) % DAY);
  };

  /** Normalise input to the UTC-midnight timestamp of its calendar date. */
  function toDayTs(input) {
    if (typeof input === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
      const [y, m, d] = input.split('-').map(Number);
      return utc(y, m, d);
    }
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) throw new TypeError(`Invalid date: ${input}`);
    return utc(d.getFullYear(), d.getMonth() + 1, d.getDate()); // local calendar date
  }

  /* ------------------------------------------------------------------ */
  /* Astronomy (Meeus, "Astronomical Algorithms")                       */
  /* ------------------------------------------------------------------ */

  /** Instant (ms) of a new moon (integer k) or full moon (k + 0.5). Accuracy: a few minutes. */
  function moonPhaseMs(k) {
    const T = k / 1236.85,
      T2 = T * T,
      T3 = T2 * T,
      T4 = T3 * T;
    let jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T2 - 0.00000015 * T3 + 0.00000000073 * T4;
    const E = 1 - 0.002516 * T - 0.0000074 * T2;
    const M = rad(2.5534 + 29.1053567 * k - 0.0000014 * T2 - 0.00000011 * T3);
    const Mp = rad(201.5643 + 385.81693528 * k + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4);
    const F = rad(160.7108 + 390.67050284 * k - 0.0016118 * T2 - 0.00000227 * T3 + 0.000000011 * T4);
    const O = rad(124.7746 - 1.56375588 * k + 0.0020672 * T2 + 0.00000215 * T3);
    const c =
      k % 1 !== 0
        ? [-0.40614, 0.17302, 0.01614, 0.01043, 0.00734, -0.00515, 0.00209] // full moon
        : [-0.4072, 0.17241, 0.01608, 0.01039, 0.00739, -0.00514, 0.00208]; // new moon
    jde += c[0] * Math.sin(Mp) + c[1] * E * Math.sin(M) + c[2] * Math.sin(2 * Mp) + c[3] * Math.sin(2 * F) + c[4] * E * Math.sin(Mp - M) + c[5] * E * Math.sin(Mp + M) + c[6] * E * E * Math.sin(2 * M) - 0.00111 * Math.sin(Mp - 2 * F) - 0.00057 * Math.sin(Mp + 2 * F) + 0.00056 * E * Math.sin(2 * Mp + M) - 0.00042 * Math.sin(3 * Mp) + 0.00042 * E * Math.sin(M + 2 * F) + 0.00038 * E * Math.sin(M - 2 * F) - 0.00024 * E * Math.sin(2 * Mp - M) - 0.00017 * Math.sin(O);
    return (jde - 2440587.5) * DAY;
  }

  /** All new (full=false) or full (full=true) moons from late previous year to early next year. */
  function moonPhases(year, full) {
    const k0 = Math.floor((year - 2000) * 12.3685) - 2;
    return Array.from({ length: 17 }, (_, i) => moonPhaseMs(k0 + i + (full ? 0.5 : 0)));
  }

  /** Equinox / solstice instant (ms). i: 0 = March, 1 = June, 2 = September, 3 = December. */
  function solarTermMs(year, i) {
    const Y = (year - 2000) / 1000;
    const C = [
      [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
      [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.0003],
      [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
      [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032],
    ][i];
    const jde = C[0] + C[1] * Y + C[2] * Y ** 2 + C[3] * Y ** 3 + C[4] * Y ** 4;
    return (jde - 2440587.5) * DAY;
  }

  /* ------------------------------------------------------------------ */
  /* Computed festival dates                                            */
  /* ------------------------------------------------------------------ */

  function westernEaster(y) {
    const a = y % 19,
      b = Math.floor(y / 100),
      c = y % 100;
    const d = Math.floor(b / 4),
      e = b % 4,
      f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4),
      k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = h + l - 7 * m + 114;
    return utc(y, Math.floor(n / 31), (n % 31) + 1);
  }

  function orthodoxEaster(y) {
    const d = (19 * (y % 19) + 15) % 30;
    const e = (2 * (y % 4) + 4 * (y % 7) - d + 34) % 7;
    const n = d + e + 114;
    const julian = utc(y, Math.floor(n / 31), (n % 31) + 1);
    return addDays(julian, 13); // Julian → Gregorian offset, valid 1900–2099
  }

  const weekdayOf = (t) => new Date(t).getUTCDay();
  const nthWeekday = (y, m, weekday, n) => {
    const first = utc(y, m, 1);
    return addDays(first, ((weekday - weekdayOf(first) + 7) % 7) + 7 * (n - 1));
  };

  // Hindu lunar days (tithis), evaluated in Indian Standard Time
  const IST = 5.5;
  const TITHI = (29.530588861 / 30) * DAY;

  /**
   * Picks the day whose evening (pradosh, ~18:00–20:24 IST) overlaps most with the tithi
   * ending at `endMs`. This is the usual rule for Diwali (Lakshmi Puja) and Holika Dahan.
   */
  function pradoshDay(endMs) {
    const start = endMs - TITHI;
    let best = null,
      bestOverlap = -1;
    for (const d of new Set([dayInOffset(start, IST), dayInOffset(endMs, IST)])) {
      const pStart = d + (18 - IST) * HOUR;
      const pEnd = pStart + 144 * 60_000;
      const overlap = Math.max(0, Math.min(pEnd, endMs) - Math.max(pStart, start));
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        best = d;
      }
    }
    return bestOverlap > 0 ? best : dayInOffset(endMs, IST);
  }

  const inRange = (t, a, b) => t >= a && t <= b;

  /** Main Diwali day: Amavasya (new moon) with the sun in sidereal Libra (~mid Oct – mid Nov). */
  function diwaliDay(y) {
    const nm = moonPhases(y, false).find((t) => inRange(dayInOffset(t, IST), utc(y, 10, 16), utc(y, 11, 16)));
    return pradoshDay(nm);
  }

  /** Holi: day after Holika Dahan, on the Phalguna full moon (the one before Chaitra's new moon). */
  function holiDays(y) {
    const chaitraNm = moonPhases(y, false).find((t) => inRange(dayInOffset(t, IST), utc(y, 3, 14), utc(y, 4, 13)));
    const fm = moonPhases(y, true)
      .filter((t) => t < chaitraNm)
      .pop();
    const dahan = pradoshDay(fm);
    return { start: dahan, end: addDays(dahan, 1), main: addDays(dahan, 1) };
  }

  /** Vesak: first full moon in May (Sri Lankan / UN convention). */
  function vesakDay(y) {
    const fm = moonPhases(y, true).find((t) => new Date(dayInOffset(t, IST)).getUTCMonth() === 4);
    return fm === undefined ? null : dayInOffset(fm, IST);
  }

  /** Nowruz: if the March equinox is before noon Tehran time, that day; otherwise the next. */
  function nowruzDay(y) {
    const eq = solarTermMs(y, 0);
    const TEHRAN = 3.5;
    const day = dayInOffset(eq, TEHRAN);
    const localHour = (eq + TEHRAN * HOUR - day) / HOUR;
    return localHour < 12 ? day : addDays(day, 1);
  }

  /* ------------------------------------------------------------------ */
  /* Lunar calendars via Intl (Chinese, Islamic Umm al-Qura, Hebrew)    */
  /* ------------------------------------------------------------------ */

  const fmtCache = new Map();

  function calParts(ts, calendar) {
    let f = fmtCache.get(calendar);
    if (!f) {
      f = new Intl.DateTimeFormat(`en-u-ca-${calendar}`, {
        timeZone: 'UTC',
        month: calendar === 'hebrew' ? 'long' : 'numeric', // Hebrew numbering shifts in leap years
        day: 'numeric',
      });
      fmtCache.set(calendar, f);
    }
    const o = {};
    for (const p of f.formatToParts(ts)) o[p.type] = p.value;
    // Chinese leap months come back as e.g. "6bis" — compared as strings, they never match "6".
    return { month: o.month, day: Number(o.day) };
  }

  /** Event starting on a given lunar month/day and lasting `duration` days. */
  function lunarSpan(ts, { calendar, month, day, duration }) {
    for (let off = 0; off < duration; off++) {
      const start = addDays(ts, -off);
      const p = calParts(start, calendar);
      if (p.month === String(month) && p.day === day) return { start, end: addDays(start, duration - 1) };
    }
    return null;
  }

  /** Event covering an entire lunar month (e.g. Ramadan, 29 or 30 days). */
  function lunarMonthSpan(ts, { calendar, month }) {
    const p = calParts(ts, calendar);
    if (p.month !== String(month)) return null;
    let end = ts;
    while (calParts(addDays(end, 1), calendar).month === String(month)) end = addDays(end, 1);
    return { start: addDays(ts, -(p.day - 1)), end };
  }

  /* ------------------------------------------------------------------ */
  /* Event catalogue                                                    */
  /* ------------------------------------------------------------------ */

  const single = (t) => (t == null ? null : { start: t, end: t });

  const EVENTS = [
    { id: 'new-year', name: 'New Year (Gregorian)', group: 'Secular, worldwide', span: (y) => ({ start: utc(y, 12, 31), end: utc(y + 1, 1, 1) }) },
    { id: 'christmas', name: 'Christmas', group: 'Christian (Western) + secular', span: (y) => ({ start: utc(y, 12, 24), end: utc(y, 12, 26) }) },
    {
      id: 'advent',
      name: 'Advent',
      group: 'Christian (Western); strong cultural tradition in German-speaking countries and Northern/Central Europe',
      span: (y) => {
        // 4th Advent = last Sunday before Dec 25; 1st Advent = three weeks earlier (Nov 27 – Dec 3)
        const xmas = utc(y, 12, 25);
        const w = weekdayOf(xmas);
        const fourth = addDays(xmas, -(w === 0 ? 7 : w));
        return { start: addDays(fourth, -21), end: utc(y, 12, 24) };
      },
    },
    { id: 'christmas-orthodox', name: 'Orthodox Christmas', group: 'Christian (Julian-calendar churches)', span: (y) => single(utc(y, 1, 7)) },
    { id: 'epiphany', name: 'Epiphany (Three Wise Men)', group: 'Christian (Western); Three Kings Day in Spain, Latin America and Central Europe', span: (y) => single(utc(y, 1, 6)) },
    {
      id: 'easter',
      name: 'Easter (Good Friday – Easter Monday)',
      group: 'Christian (Western)',
      span: (y) => {
        const e = westernEaster(y);
        return { start: addDays(e, -2), end: addDays(e, 1), main: e };
      },
    },
    {
      id: 'easter-orthodox',
      name: 'Orthodox Easter',
      group: 'Christian (Orthodox)',
      span: (y) => {
        const e = orthodoxEaster(y);
        return { start: addDays(e, -2), end: addDays(e, 1), main: e };
      },
    },
    {
      id: 'carnival',
      name: 'Carnival',
      group: 'Christian roots, mostly secular',
      span: (y) => {
        const e = westernEaster(y);
        return { start: addDays(e, -52), end: addDays(e, -47) };
      },
    },
    // the celebrations differ between countries, so this covers the days any of them may fall on
    { id: 'mid-summer', name: 'Mid-Summer', group: 'Europe', span: (y) => ({ start: utc(y, 6, 19), end: utc(y, 6, 27) }) },
    { id: 'halloween', name: 'Halloween', group: 'Secular (US, UK, IE, CA, growing elsewhere)', span: (y) => single(utc(y, 10, 31)) },
    { id: 'day-of-the-dead', name: 'Día de los Muertos', group: 'Mexico, Catholic-indigenous', span: (y) => ({ start: utc(y, 11, 1), end: utc(y, 11, 2) }) },
    { id: 'thanksgiving-us', name: 'Thanksgiving (US)', group: 'National (US)', span: (y) => single(nthWeekday(y, 11, 4, 4)) },
    { id: 'thanksgiving-ca', name: 'Thanksgiving (Canada)', group: 'National (Canada)', span: (y) => single(nthWeekday(y, 10, 1, 2)) },
    {
      id: 'nowruz',
      name: 'Nowruz',
      group: 'Iran, Central Asia, Kurds',
      approximate: true,
      span: (y) => {
        const d = nowruzDay(y);
        return { start: d, end: addDays(d, 12), main: d };
      },
    },
    {
      id: 'diwali',
      name: 'Diwali',
      group: 'Hindu, Sikh, Jain',
      approximate: true,
      span: (y) => {
        const d = diwaliDay(y);
        return { start: addDays(d, -2), end: addDays(d, 2), main: d };
      },
    },
    { id: 'holi', name: 'Holi (Holika Dahan + Holi)', group: 'Hindu', approximate: true, span: holiDays },
    { id: 'vesak', name: 'Vesak', group: 'Buddhist (Theravada)', approximate: true, span: (y) => single(vesakDay(y)) },
    { id: 'lunar-new-year', name: 'Lunar New Year (to Lantern Festival)', group: 'China, Vietnam, Korea, diaspora', lunar: { calendar: 'chinese', month: 1, day: 1, duration: 15 } },
    { id: 'mid-autumn', name: 'Mid-Autumn Festival', group: 'China, Vietnam, Korea (Chuseok)', lunar: { calendar: 'chinese', month: 8, day: 15, duration: 1 } },
    { id: 'buddhas-birthday', name: "Buddha's Birthday (East Asia)", group: 'Buddhist (Mahayana)', lunar: { calendar: 'chinese', month: 4, day: 8, duration: 1 } },
    { id: 'ramadan', name: 'Ramadan', group: 'Muslim', approximate: true, lunarMonth: { calendar: 'islamic-umalqura', month: 9 } },
    { id: 'eid-al-fitr', name: 'Eid al-Fitr', group: 'Muslim', approximate: true, lunar: { calendar: 'islamic-umalqura', month: 10, day: 1, duration: 3 } },
    { id: 'eid-al-adha', name: 'Eid al-Adha', group: 'Muslim', approximate: true, lunar: { calendar: 'islamic-umalqura', month: 12, day: 10, duration: 4 } },
    { id: 'rosh-hashanah', name: 'Rosh Hashanah', group: 'Jewish', lunar: { calendar: 'hebrew', month: 'Tishri', day: 1, duration: 2 } },
    { id: 'yom-kippur', name: 'Yom Kippur', group: 'Jewish', lunar: { calendar: 'hebrew', month: 'Tishri', day: 10, duration: 1 } },
    { id: 'pesach', name: 'Pesach', group: 'Jewish', lunar: { calendar: 'hebrew', month: 'Nisan', day: 15, duration: 8 } },
    { id: 'hanukkah', name: 'Hanukkah', group: 'Jewish', lunar: { calendar: 'hebrew', month: 'Kislev', day: 25, duration: 8 } },
  ];

  function matchEvent(ev, ts, year) {
    try {
      if (ev.span) {
        for (const y of [year - 1, year, year + 1]) {
          const s = ev.span(y);
          if (s && inRange(ts, s.start, s.end)) return s;
        }
        return null;
      }
      if (ev.lunar) return lunarSpan(ts, ev.lunar);
      if (ev.lunarMonth) return lunarMonthSpan(ts, ev.lunarMonth);
    } catch {
      return null; // e.g. calendar not supported by this Intl build
    }
    return null;
  }

  /* ------------------------------------------------------------------ */
  /* Seasons                                                            */
  /* ------------------------------------------------------------------ */

  const HEMISPHERES = ['north', 'south'];
  const RECKONINGS = ['astronomical', 'meteorological'];
  const FLIP = { spring: 'autumn', summer: 'winter', autumn: 'spring', winter: 'summer' };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  /**
   * Northern-hemisphere season containing `ts` for one reckoning.
   * - astronomical: bounded by equinoxes and solstices (dates vary by year, UTC)
   * - meteorological: whole calendar months (spring = Mar–May, summer = Jun–Aug, ...)
   */
  function northernSeasonSpan(ts, reckoning) {
    const y = new Date(ts).getUTCFullYear();
    if (reckoning === 'astronomical') {
      const day = (yy, i) => dayInOffset(solarTermMs(yy, i), 0);
      const bounds = [day(y - 1, 3), day(y, 0), day(y, 1), day(y, 2), day(y, 3), day(y + 1, 0)];
      const names = ['winter', 'spring', 'summer', 'autumn', 'winter'];
      const i = bounds.findIndex((b, j) => ts >= b && ts < bounds[j + 1]);
      return { season: names[i], start: bounds[i], end: addDays(bounds[i + 1], -1) };
    }
    const m = new Date(ts).getUTCMonth() + 1;
    const startMonth = m === 12 || m <= 2 ? 12 : m <= 5 ? 3 : m <= 8 ? 6 : 9;
    const startYear = startMonth === 12 && m <= 2 ? y - 1 : y;
    const start = utc(startYear, startMonth, 1);
    return {
      season: { 3: 'spring', 6: 'summer', 9: 'autumn', 12: 'winter' }[startMonth],
      start,
      end: addDays(utc(startYear, startMonth + 3, 1), -1),
    };
  }

  /** All four season interpretations for a date, ordered by hemisphere, then reckoning. */
  function getSeasons(input) {
    const ts = toDayTs(input);
    const out = [];
    for (const hemisphere of HEMISPHERES) {
      for (const reckoning of RECKONINGS) {
        const { season: northern, start, end } = northernSeasonSpan(ts, reckoning);
        const season = hemisphere === 'south' ? FLIP[northern] : northern;
        out.push({
          id: `season-${season}-${hemisphere}-${reckoning}`,
          name: `${cap(season)} (${cap(hemisphere)}ern hemisphere, ${reckoning})`,
          type: 'season',
          season, // 'spring' | 'summer' | 'autumn' | 'winter'
          hemisphere, // 'north' | 'south'
          reckoning, // 'astronomical' | 'meteorological'
          group: `${cap(hemisphere)}ern hemisphere`,
          start: iso(start),
          end: iso(end),
          durationDays: Math.round((end - start) / DAY) + 1,
          dayOfEvent: Math.round((ts - start) / DAY) + 1,
          approximate: reckoning === 'astronomical', // boundary day computed in UTC
        });
      }
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Public API                                                         */
  /* ------------------------------------------------------------------ */

  /**
   * @param {Date|string|number} input  Date object (local date is used), 'YYYY-MM-DD', or timestamp
   * @param {object} [options]
   * @param {string[]} [options.exclude=[]]  event ids to ignore
   * @returns {Array} events sorted by durationDays (shortest first), then the four seasons
   */
  function getOccasions(input, options = {}) {
    const { exclude = [] } = options;
    const ts = toDayTs(input);
    const year = new Date(ts).getUTCFullYear();
    const events = [];

    for (const ev of EVENTS) {
      if (exclude.includes(ev.id)) continue;
      const s = matchEvent(ev, ts, year);
      if (!s) continue;
      events.push({
        id: ev.id,
        name: ev.name,
        type: 'event',
        group: ev.group,
        start: iso(s.start),
        end: iso(s.end),
        durationDays: Math.round((s.end - s.start) / DAY) + 1,
        dayOfEvent: Math.round((ts - s.start) / DAY) + 1,
        isMainDay: s.main === undefined ? undefined : s.main === ts,
        approximate: Boolean(ev.approximate),
      });
    }

    events.sort((a, b) => a.durationDays - b.durationDays || a.name.localeCompare(b.name));
    return [...events, ...getSeasons(ts)];
  }

  /**
   * Starts of a lunar month/day within a Gregorian year. Visits each lunar month of the year
   * once instead of each day: reads the lunar date, jumps to the target day if it is the
   * target month, then on to the first days of the next month.
   */
  function lunarStarts(year, { calendar, month, day }) {
    const starts = [];
    const first = utc(year, 1, 1);
    const last = utc(year + 1, 1, 1) - DAY;
    let t = addDays(first, -31);
    while (t <= last) {
      const p = calParts(t, calendar);
      if (p.month === String(month)) {
        const start = addDays(t, day - p.day);
        const q = calParts(start, calendar);
        if (q.month === String(month) && q.day === day && start >= first && start <= last && !starts.includes(start)) starts.push(start);
      }
      t = addDays(t, 32 - p.day);
    }
    return starts;
  }

  /**
   * @param {string} id  id of an event or a season
   * @param {number} year  Gregorian year
   * @returns {Array<{start: number, end: number}>} the spans of the occasion starting in that year,
   *   as UTC-midnight timestamps of their first and last calendar day
   */
  function getOccasionSpans(id, year) {
    const ev = EVENTS.find((e) => e.id === id);
    if (ev) {
      try {
        if (ev.span) {
          const s = ev.span(year);
          return s && new Date(s.start).getUTCFullYear() === year ? [{ start: s.start, end: s.end }] : [];
        }
        if (ev.lunar) return lunarStarts(year, ev.lunar).map((start) => ({ start, end: addDays(start, ev.lunar.duration - 1) }));
        if (ev.lunarMonth) {
          const { calendar, month } = ev.lunarMonth;
          return lunarStarts(year, { calendar, month, day: 1 }).map((start) => ({ start, end: addDays(start, calParts(addDays(start, 29), calendar).month === String(month) ? 29 : 28) }));
        }
      } catch {
        return []; // e.g. calendar not supported by this Intl build
      }
      return [];
    }
    const m = /^season-(spring|summer|autumn|winter)-(north|south)-(astronomical|meteorological)$/.exec(id);
    if (!m) throw new Error(`Unknown occasion: ${id}`);
    const [, season, hemisphere, reckoning] = m;
    const spans = [];
    for (let t = utc(year, 1, 1); new Date(t).getUTCFullYear() === year;) {
      const s = northernSeasonSpan(t, reckoning);
      const name = hemisphere === 'south' ? FLIP[s.season] : s.season;
      if (name === season && new Date(s.start).getUTCFullYear() === year) spans.push({ start: s.start, end: s.end });
      t = addDays(s.end, 1);
    }
    return spans;
  }

  return { getOccasions, getOccasionSpans };
})();
