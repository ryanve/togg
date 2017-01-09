typeof document == 'undefined' ?
  require('open')('index.html') :
angular.module('test', ['togg']).controller('test', ['$document', function($document) {
  $document.on('bubble', function() {
    $('.js-timestamp').text(Date.now())
  })
}]);
