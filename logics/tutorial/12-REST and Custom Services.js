Dependencies

The RESTful functionality is provided by Angular in the ngResource module, which is distributed separately from the core Angular framework.

We are using Bower to install client side dependencies.

Template

Our custom resource service will be defined in app/js/services.js so we need to include this file in our layout template. Additionally, we also need to load the angular-resource.js file, which contains the ngResource module

Test

Because we're now using the ngResource module, it's necessary to update the Karma config file with angular-resource so the new tests will pass.

test/karma.conf.js:

files : [
  'app/bower_components/angular/angular.js',
  'app/bower_components/angular-route/angular-route.js',
  'app/bower_components/angular-resource/angular-resource.js',
  'app/bower_components/angular-mocks/angular-mocks.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
],

We have modified our unit tests to verify that our new service is issuing HTTP requests and processing them as expected. The tests also check that our controllers are interacting with the service correctly.

The $resource service augments the response object with methods for updating and deleting the resource. If we were to use the standard toEqual matcher, our tests would fail because the test values would not match the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher. When the toEqualData matcher compares two objects, it takes only object properties into account and ignores methods