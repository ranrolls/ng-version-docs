Understanding Controllers

In Angular, a Controller is defined by a JavaScript constructor function that is used to augment the Angular Scope.

When a Controller is attached to the DOM via the ng-controller directive, Angular will instantiate a new Controller object, using the specified Controller's constructor function. A new child scope will be created and made available as an injectable parameter to the Controller's constructor function as $scope.

If the controller has been attached using the controller as syntax then the controller instance will be assigned to a property on the new scope.

Use controllers to:

    Set up the initial state of the $scope object.
    Add behavior to the $scope object.

Do not use controllers to:

    Manipulate DOM — Controllers should contain only business logic. Putting any presentation logic into Controllers significantly affects its testability. Angular has databinding for most cases and directives to encapsulate manual DOM manipulation.
    Format input — Use angular form controls instead.
    Filter output — Use angular filters instead.
    Share code or state across controllers — Use angular services instead.
    Manage the life-cycle of other components (for example, to create service instances).


var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);


It is common to attach Controllers at different levels of the DOM hierarchy. Since the ng-controller directive creates a new child scope, we get a hierarchy of scopes that inherit from each other. The $scope that each Controller receives will have access to properties and methods defined by Controllers higher up the hierarchy. See Understanding Scopes for more information about scope inheritance.

<div class="spicy">
  <div ng-controller="MainController">
    <p>Good {{timeOfDay}}, {{name}}!</p>

    <div ng-controller="ChildController">
      <p>Good {{timeOfDay}}, {{name}}!</p>

      <div ng-controller="GrandChildController">
        <p>Good {{timeOfDay}}, {{name}}!</p>
      </div>
    </div>
  </div>
</div>

Notice how we nested three ng-controller directives in our template. This will result in four scopes being created for our view:

    The root scope
    The MainController scope, which contains timeOfDay and name properties
    The ChildController scope, which inherits the timeOfDay property but overrides (hides) the name property from the previous
    The GrandChildController scope, which overrides (hides) both the timeOfDay property defined in MainController and the name property defined in ChildController

Inheritance works with methods in the same way as it does with properties. So in our previous examples, all of the properties could be replaced with methods that return string values.
Testing Controllers

describe('state', function() {
    var mainScope, childScope, grandChildScope;

    beforeEach(module('myApp'));

    beforeEach(inject(function($rootScope, $controller) {
        mainScope = $rootScope.$new();
        $controller('MainController', {$scope: mainScope});
        childScope = mainScope.$new();
        $controller('ChildController', {$scope: childScope});
        grandChildScope = childScope.$new();
        $controller('GrandChildController', {$scope: grandChildScope});
    }));

    it('should have over and selected', function() {
        expect(mainScope.timeOfDay).toBe('morning');
        expect(mainScope.name).toBe('Nikki');
        expect(childScope.timeOfDay).toBe('morning');
        expect(childScope.name).toBe('Mattie');
        expect(grandChildScope.timeOfDay).toBe('evening');
        expect(grandChildScope.name).toBe('Gingerbread Baby');
    });
});