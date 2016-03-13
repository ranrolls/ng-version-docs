Custom Filter

In order to create a new filter, you are going to create a phonecatFilters module and register your custom filter with this module:

app/js/filters.js:

angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});