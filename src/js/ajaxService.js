function Ajax(params, url, callbackFunction) {
  this.params = params,
  this.url = url,
  this.callback = callbackFunction
}

Ajax.prototype.request = function() {
  $.ajax({
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "post",
    data: this.params,
    success: this.callback,
    error: this.callback
  });
}