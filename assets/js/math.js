// MathJax reads its configuration from a global of its own, which has to stand before
// MathJax runs; we are loaded right in front of it and without `defer`, so we are
// done before its `async` tag is even parsed
//
// our input is the `R-math-config` block standing right before our tag - a script
// element of a non JavaScript type, which is a data block the browser never executes
// and a strict CSP therefore never has to allow. the defaults are ours, whatever the
// site configured wins over them
window.MathJax = Object.assign(
  window.MathJax || {},
  {
    tex: {
      inlineMath: [
        ['\\(', '\\)'],
        ['$', '$'],
      ],
      displayMath: [
        ['\\[', '\\]'],
        ['$$', '$$'],
      ],
    },
    options: {
      enableMenu: false, // avoid translation hassle for context menu
    },
  },
  JSON.parse(document.getElementById('R-math-config').textContent)
);
