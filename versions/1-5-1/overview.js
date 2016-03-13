Welcome to the AngularJS API docs page. These pages contain the AngularJS reference materials for version 1.5.0 ennoblement-facilitation.

The documentation is organized into modules which contain various components of an AngularJS application. These components are directives, services, filters, providers, templates, global APIs, and testing mocks.

Angular Prefixes $ and $$: To prevent accidental name collisions with your code, Angular prefixes names of public objects with $ and names of private objects with $$. Please do not use the $ or $$ prefix in your code. 

====================================================================================================
Angular Modules

ng (core module)
This module is provided by default and contains the core components of AngularJS.

Directives 	
This is the core collection of directives you would use in your template code to build an AngularJS application.
Some examples include: ngClick, ngInclude, ngRepeat, etc…

Services / Factories 	
This is the core collection of services which are used within the DI of your application.
Some examples include: $compile, $http, $location, etc…

Filters 	
The core filters available in the ng module are used to transform template data before it is rendered within directives and expressions.
Some examples include: filter, date, currency, lowercase, uppercase, etc...

Global APIs 	
The core global API functions are attached to the angular object. These core functions are useful for low level JavaScript operations within your application.
Some examples include: angular.copy(), angular.equals(), angular.element(), etc... 
---------------------------------------------------------------------------------------------------------
ngRoute

Use ngRoute to enable URL routing to your application. The ngRoute module supports URL management via both hashbang and HTML5 pushState.
Include the angular-route.js file and set ngRoute as a dependency for this to work in your application.

Services / Factories 	The following services are used for route management:
    $routeParams is used to access the querystring values present in the URL.
    $route is used to access the details of the route that is currently being accessed.
    $routeProvider is used to register routes for the application.

Directives 	The ngView directive will display the template of the current route within the page.     
---------------------------------------------------------------------------------------------------------
ngAnimate

Use ngAnimate to enable animation features within your application. Various core ng directives will provide animation hooks into your application when ngAnimate is included. Animations are defined by using CSS transitions/animations or JavaScript callbacks.
Include the angular-animate.js file and set ngAnimate as a dependency for this to work in your application.

Services / Factories 	Use $animate to trigger animation operations within your directive code.

CSS-based animations 	Follow ngAnimate’s CSS naming structure to reference CSS transitions / keyframe animations in AngularJS. Once defined, the animation can be triggered by referencing the CSS class within the HTML template code.

JS-based animations 	Use module.animation() to register a JavaScript animation. Once registered, the animation can be triggered by referencing the CSS class within the HTML template code. 
---------------------------------------------------------------------------------------------------------
ngAria

Use ngAria to inject common accessibility attributes into directives and improve the experience for users with disabilities.
Include the angular-aria.js file and set ngAria as a dependency for this to work in your application.

Services 	
The $aria service contains helper methods for applying ARIA attributes to HTML.
$ariaProvider is used for configuring ARIA attributes. 
---------------------------------------------------------------------------------------------------------
ngResource

Use the ngResource module when querying and posting data to a REST API.
Include the angular-resource.js file and set ngResource as a dependency for this to work in your application.

Services / Factories 	The $resource service is used to define RESTful objects which communicate with a REST API.
---------------------------------------------------------------------------------------------------------
ngCookies

Use the ngCookies module to handle cookie management within your application.
Include the angular-cookies.js file and set ngCookies as a dependency for this to work in your application.

Services / Factories 	The following services are used for cookie management:
The $cookie service is a convenient wrapper to store simple data within browser cookies.
$cookieStore is used to store more complex data using serialization.
---------------------------------------------------------------------------------------------------------
ngTouch

Use ngTouch when developing for mobile browsers/devices.
Include the angular-touch.js file and set ngTouch as a dependency for this to work in your application.

Services / Factories 	The $swipe service is used to register and manage mobile DOM events.

Directives 	Various directives are available in ngTouch to emulate mobile DOM events.
---------------------------------------------------------------------------------------------------------
ngSanitize

Use ngSanitize to securely parse and manipulate HTML data in your application.
Include the angular-sanitize.js file and set ngSanitize as a dependency for this to work in your application.
Services / Factories 	The $sanitize service is used to clean up dangerous HTML code in a quick and convenient way.
Filters 	The linky filter is used to turn URLs into HTML links within the provided string. 
---------------------------------------------------------------------------------------------------------
ngMock

Use ngMock to inject and mock modules, factories, services and providers within your unit tests.
Include the angular-mocks.js file into your test runner for this to work.
Services / Factories 	

ngMock will extend the behavior of various core services to become testing aware and manageable in a synchronous manner.

Some examples include: $timeout, $interval, $log, $httpBackend, etc...

Global APIs 	

Various helper functions are available to inject and mock modules within unit test code.

Some examples inject(), module(), dump(), etc... 
---------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------





