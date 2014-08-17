(function() {
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
  activeBar();
})();
