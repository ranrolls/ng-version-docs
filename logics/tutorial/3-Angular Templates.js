Now it's time to make the web page dynamic — with AngularJS. We'll also add a test that verifies the code for the controller we are going to add.

There are many ways to structure the code for an application. For Angular apps, we encourage the use of the Model-View-Controller (MVC) design pattern to decouple the code and to separate concerns. With that in mind, let's use a little Angular and JavaScript to add model, view, and controller components to our app.

View and Template

In Angular, the view is a projection of the model through the HTML template. This means that whenever the model changes, Angular refreshes the appropriate binding points, which updates the view.

The view component is constructed by Angular from this template:

Model and Controller

The data model (a simple array of phones in object literal notation) is now instantiated within the PhoneListCtrl controller. The controller is simply a constructor function that takes a $scope parameter

Although the controller is not yet doing very much, it plays a crucial role. By providing context for our data model, the controller allows us to establish data-binding between the model and the view. We connected the dots between the presentation, data, and logic components as follows:

    The ngController directive, located on the <body> tag, references the name of our controller, PhoneListCtrl (located in the JavaScript file controllers.js).

    The PhoneListCtrl controller attaches the phone data to the $scope that was injected into our controller function. This scope is a prototypical descendant of the root scope that was created when the application was defined. This controller scope is available to all bindings located within the <body ng-controller="PhoneListCtrl"> tag.

Scope

The concept of a scope in Angular is crucial. A scope can be seen as the glue which allows the template, model and controller to work together. Angular uses scopes, along with the information contained in the template, data model, and controller, to keep models and views separate, but in sync. Any changes made to the model are reflected in the view; any changes that occur in the view are reflected in the model.

To learn more about Angular scopes, see the angular scope documentation.    

Tests

The "Angular way" of separating controller from the view, makes it easy to test code as it is being developed. If our controller is available on the global namespace then we could simply instantiate it with a mock scope object:

test/e2e/scenarios.js:

describe('PhoneListCtrl', function(){

  it('should create "phones" model with 3 phones', function() {
    var scope = {},
        ctrl = new PhoneListCtrl(scope);

    expect(scope.phones.length).toBe(3);
  });

});



The test instantiates PhoneListCtrl and verifies that the phones array property on the scope contains three records. This example demonstrates how easy it is to create a unit test for code in Angular. Since testing is such a critical part of software development, we make it easy to create tests in Angular so that developers are encouraged to write them.
Testing non-Global Controllers

In practice, you will not want to have your controller functions in the global namespace. Instead, you can see that we have registered it via an anonymous constructor function on the phonecatApp module.

In this case Angular provides a service, $controller, which will retrieve your controller by name. Here is the same test using $controller:

test/unit/controllersSpec.js:

describe('PhoneListCtrl', function(){

  beforeEach(module('phonecatApp'));

  it('should create "phones" model with 3 phones', inject(function($controller) {
    var scope = {},
        ctrl = $controller('PhoneListCtrl', {$scope:scope});

    expect(scope.phones.length).toBe(3);
  }));

});

    Before each test we tell Angular to load the phonecatApp module.
    We ask Angular to inject the $controller service into our test function
    We use $controller to create an instance of the PhoneListCtrl
    With this instance, we verify that the phones array property on the scope contains three records.

Writing and Running Tests

Angular developers prefer the syntax of Jasmine's Behavior-driven Development (BDD) framework when writing tests. Although Angular does not require you to use Jasmine, we wrote all of the tests in this tutorial in Jasmine v1.3. You can learn about Jasmine on the Jasmine home page and at the Jasmine docs.