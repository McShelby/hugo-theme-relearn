// chooses a variant by chance, asked anew on every page load: one of the variant's
// `params.themeVariantByRandomVariants` if given, otherwise one of all other configured
// variants, hidden ones included
function themeVariantByRandom(variants, variant) {
  var targets =
    variant.params.themeVariantByRandomVariants ??
    variants
      .filter(function (target) {
        return target.identifier != variant.identifier;
      })
      .map(function (target) {
        return target.identifier;
      });
  return targets[Math.floor(Math.random() * targets.length)];
}
