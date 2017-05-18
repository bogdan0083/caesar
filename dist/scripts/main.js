$(document).ready(function () {

  function hello(world) {
    console.log(world);
  }

  $('.some-selector').click(function () {
    hello('world');
  });
});
