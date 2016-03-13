/*
Invokes the iterator function once for each item in obj collection, which can be either an object or an array. The iterator function is invoked with iterator(value, key, obj), where value is the value of an object property or an array element, key is the object property key or array element index and obj is the obj itself. Specifying a context for the function is optional.
*/


var values = {name: 'misko', gender: 'male'};
var log = [];
angular.forEach(values, function(value, key) {
  this.push(key + ': ' + value);
}, log);
expect(log).toEqual(['name: misko', 'gender: male']);