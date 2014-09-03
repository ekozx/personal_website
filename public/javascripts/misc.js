// (function() {
window.onload = function() {
  function activeBar() {
    var path = window.location.pathname;
    console.log(path);
    if (path === '/') {
      path = 'root';
    } else {
      path = path.split("/")[1];
    }
    $('#' + String(path)).addClass('active');
  }
  function background() {
    var height = $('figure').parent().height();
    console.log("Adding height..." + String(height));
    $('figure').height(height);
  }
  function pushElementUp(index, element) {
    $(element).css({"top": $(element).parent().offset().top - 20});
  }
  function pushDates() {
    var dates = $('.circle-date');
    var count = dates.length;

    dates.each(pushElementUp);
  }

  pushDates();
  background();
  activeBar();
}
// })();
