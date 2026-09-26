// MathJax reads its configuration from a global of its own, which has to stand before
// MathJax runs; we are loaded right in front of it and without `defer`, so we are
// done before its `async` tag is even parsed
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
  JSON.parse(document.querySelector('#R-math-config').textContent)
);
