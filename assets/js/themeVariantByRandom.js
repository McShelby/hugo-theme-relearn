// chooses one of the configured variants without a script by chance, asked anew on
// every page load; hidden variants are part of the draw
function themeVariantByRandom(variants, variant) {
  var targets = variants.filter(function (target) {
    return !target.script;
  });
  return targets[Math.floor(Math.random() * targets.length)].identifier;
}
