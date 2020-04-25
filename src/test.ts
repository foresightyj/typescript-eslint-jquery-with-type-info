import { add } from "./math";
$(".hello")
  .next()
  .click(function (e) {
    console.log(e.target.tagName, "is clicked");
  });

$.each([1, 2, 3], (el, idx) => {
  idx++;
});

(($) => {
  $.parseInt("123", 10);
})(window);
