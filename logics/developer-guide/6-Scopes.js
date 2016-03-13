What are Scopes?

Scope is an object that refers to the application model. It is an execution context for expressions. Scopes are arranged in hierarchical structure which mimic the DOM structure of the application. Scopes can watch expressions and propagate events.
Scope characteristics

    Scopes provide APIs ($watch) to observe model mutations.

    Scopes provide APIs ($apply) to propagate any model changes through the system into the view from outside of the "Angular realm" (controllers, services, Angular event handlers).

    Scopes can be nested to limit access to the properties of application components while providing access to shared model properties. Nested scopes are either "child scopes" or "isolate scopes". A "child scope" (prototypically) inherits properties from its parent scope. An "isolate scope" does not. See isolated scopes for more information.

    Scopes provide context against which expressions are evaluated. For example {{username}} expression is meaningless, unless it is evaluated against a specific scope which defines the username property.

Scope as Data-Model

Scope is the glue between application controller and the view. During the template linking phase the directives set up $watch expressions on the scope. The $watch allows the directives to be notified of property changes, which allows the directive to render the updated value to the DOM.

Both controllers and directives have reference to the scope, but not to each other. This arrangement isolates the controller from the directive as well as from the DOM. This is an important point since it makes the controllers view agnostic, which greatly improves the testing story of the applications.

Scope Hierarchies

Each Angular application has exactly one root scope, but may have several child scopes.

The application can have multiple scopes, because some directives create new child scopes (refer to directive documentation to see which directives create new scopes). When new scopes are created, they are added as children of their parent scope. This creates a tree structure which parallels the DOM where they're attached.

When Angular evaluates {{name}}, it first looks at the scope associated with the given element for the name property. If no such property is found, it searches the parent scope and so on until the root scope is reached. In JavaScript this behavior is known as prototypical inheritance, and child scopes prototypically inherit from their parents.

Retrieving Scopes from the DOM.

Scopes are attached to the DOM as $scope data property, and can be retrieved for debugging purposes. (It is unlikely that one would need to retrieve scopes in this way inside the application.) The location where the root scope is attached to the DOM is defined by the location of ng-app directive. Typically ng-app is placed on the <html> element, but it can be placed on other elements as well, if, for example, only a portion of the view needs to be controlled by Angular.

To examine the scope in the debugger:

    Right click on the element of interest in your browser and select 'inspect element'. You should see the browser debugger with the element you clicked on highlighted.

    The debugger allows you to access the currently selected element in the console as $0 variable.

    To retrieve the associated scope in console execute: angular.element($0).scope() or just type $scope

Scope Events Propagation

Scopes can propagate events in similar fashion to DOM events. The event can be broadcasted to the scope children or emitted to scope parents.

$scope.$on('MyEvent', function() {
    $scope.count++;
  });


Scope Life Cycle

The normal flow of a browser receiving an event is that it executes a corresponding JavaScript callback. Once the callback completes the browser re-renders the DOM and returns to waiting for more events.

When the browser calls into JavaScript the code executes outside the Angular execution context, which means that Angular is unaware of model modifications. To properly process model modifications the execution has to enter the Angular execution context using the $apply method. Only model modifications which execute inside the $apply method will be properly accounted for by Angular. For example if a directive listens on DOM events, such as ng-click it must evaluate the expression inside the $apply method.

After evaluating the expression, the $apply method performs a $digest. In the $digest phase the scope examines all of the $watch expressions and compares them with the previous value. This dirty checking is done asynchronously. This means that assignment such as $scope.username="angular" will not immediately cause a $watch to be notified, instead the $watch notification is delayed until the $digest phase. This delay is desirable, since it coalesces multiple model updates into one $watch notification as well as guarantees that during the $watch notification no other $watches are running. If a $watch changes the value of the model, it will force additional $digest cycle.

    Creation

    The root scope is created during the application bootstrap by the $injector. During template linking, some directives create new child scopes.

    Watcher registration

    During template linking directives register watches on the scope. These watches will be used to propagate model values to the DOM.

    Model mutation

    For mutations to be properly observed, you should make them only within the scope.$apply(). Angular APIs do this implicitly, so no extra $apply call is needed when doing synchronous work in controllers, or asynchronous work with $http, $timeout or $interval services.

    Mutation observation

    At the end of $apply, Angular performs a $digest cycle on the root scope, which then propagates throughout all child scopes. During the $digest cycle, all $watched expressions or functions are checked for model mutation and if a mutation is detected, the $watch listener is called.

    Scope destruction

    When child scopes are no longer needed, it is the responsibility of the child scope creator to destroy them via scope.$destroy() API. This will stop propagation of $digest calls into the child scope and allow for memory used by the child scope models to be reclaimed by the garbage collector.

Scopes and Directives

During the compilation phase, the compiler matches directives against the DOM template. The directives usually fall into one of two categories:

    Observing directives, such as double-curly expressions {{expression}}, register listeners using the $watch() method. This type of directive needs to be notified whenever the expression changes so that it can update the view.

    Listener directives, such as ng-click, register a listener with the DOM. When the DOM listener fires, the directive executes the associated expression and updates the view using the $apply() method.

When an external event (such as a user action, timer or XHR) is received, the associated expression must be applied to the scope through the $apply() method so that all listeners are updated correctly.
Directives that Create Scopes

In most cases, directives and scopes interact but do not create new instances of scope. However, some directives, such as ng-controller and ng-repeat, create new child scopes and attach the child scope to the corresponding DOM element. You can retrieve a scope for any DOM element by using an angular.element(aDomElement).scope() method call. See the directives guide for more information about isolate scopes.
Controllers and Scopes

Scopes and controllers interact with each other in the following situations:

    Controllers use scopes to expose controller methods to templates (see ng-controller).

    Controllers define methods (behavior) that can mutate the model (properties on the scope).

    Controllers may register watches on the model. These watches execute immediately after the controller behavior executes.

See the ng-controller for more information.
Scope $watch Performance Considerations

Dirty checking the scope for property changes is a common operation in Angular and for this reason the dirty checking function must be efficient. Care should be taken that the dirty checking function does not do any DOM access, as DOM access is orders of magnitude slower than property access on JavaScript object.
Scope $watch Depths

Dirty checking can be done with three strategies: By reference, by collection contents, and by value. The strategies differ in the kinds of changes they detect, and in their performance characteristics.

    Watching by reference (scope.$watch (watchExpression, listener)) detects a change when the whole value returned by the watch expression switches to a new value. If the value is an array or an object, changes inside it are not detected. This is the most efficient strategy.
    Watching collection contents (scope.$watchCollection (watchExpression, listener)) detects changes that occur inside an array or an object: When items are added, removed, or reordered. The detection is shallow - it does not reach into nested collections. Watching collection contents is more expensive than watching by reference, because copies of the collection contents need to be maintained. However, the strategy attempts to minimize the amount of copying required.
    Watching by value (scope.$watch (watchExpression, listener, true)) detects any change in an arbitrarily nested data structure. It is the most powerful change detection strategy, but also the most expensive. A full traversal of the nested data structure is needed on each digest, and a full copy of it needs to be held in memory.

Integration with the browser event loop

The diagram and the example below describe how Angular interacts with the browser's event loop.

    The browser's event-loop waits for an event to arrive. An event is a user interaction, timer event, or network event (response from a server).
    The event's callback gets executed. This enters the JavaScript context. The callback can modify the DOM structure.
    Once the callback executes, the browser leaves the JavaScript context and re-renders the view based on DOM changes.

Angular modifies the normal JavaScript flow by providing its own event processing loop. This splits the JavaScript into classical and Angular execution context. Only operations which are applied in the Angular execution context will benefit from Angular data-binding, exception handling, property watching, etc... You can also use $apply() to enter the Angular execution context from JavaScript. Keep in mind that in most places (controllers, services) $apply has already been called for you by the directive which is handling the event. An explicit call to $apply is needed only when implementing custom event callbacks, or when working with third-party library callbacks.

    Enter the Angular execution context by calling scope.$apply(stimulusFn), where stimulusFn is the work you wish to do in the Angular execution context.
    Angular executes the stimulusFn(), which typically modifies application state.
    Angular enters the $digest loop. The loop is made up of two smaller loops which process $evalAsync queue and the $watch list. The $digest loop keeps iterating until the model stabilizes, which means that the $evalAsync queue is empty and the $watch list does not detect any changes.
    The $evalAsync queue is used to schedule work which needs to occur outside of current stack frame, but before the browser's view render. This is usually done with setTimeout(0), but the setTimeout(0) approach suffers from slowness and may cause view flickering since the browser renders the view after each event.
    The $watch list is a set of expressions which may have changed since last iteration. If a change is detected then the $watch function is called which typically updates the DOM with the new value.
    Once the Angular $digest loop finishes, the execution leaves the Angular and JavaScript context. This is followed by the browser re-rendering the DOM to reflect any changes.

Here is the explanation of how the Hello world example achieves the data-binding effect when the user enters text into the text field.

    During the compilation phase:
        the ng-model and input directive set up a keydown listener on the <input> control.
        the interpolation sets up a $watch to be notified of name changes.
    During the runtime phase:
        Pressing an 'X' key causes the browser to emit a keydown event on the input control.
        The input directive captures the change to the input's value and calls $apply("name = 'X';") to update the application model inside the Angular execution context.
        Angular applies the name = 'X'; to the model.
        The $digest loop begins
        The $watch list detects a change on the name property and notifies the interpolation, which in turn updates the DOM.
        Angular exits the execution context, which in turn exits the keydown event and with it the JavaScript execution context.
        The browser re-renders the view with the updated text.
