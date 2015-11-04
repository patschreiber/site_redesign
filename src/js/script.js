$(document).ready(function() {
  var ajaxTest = new Ajax("google.com", {}, printTest);
  console.log(ajaxTest);
  ajaxTest.request();

  function printTest() {
    console.log("Hello");
  }
});