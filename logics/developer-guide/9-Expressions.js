Angular Expressions

Angular expressions are JavaScript-like code snippets that are mainly placed in interpolation bindings such as <span title="{{ attrBinding }}">{{ textBinding }}</span>, but also used directly in directive attributes such as ng-click="functionExpression()".

Angular Expressions vs. JavaScript Expressions

Angular expressions are like JavaScript expressions with the following differences:

    Context: JavaScript expressions are evaluated against the global window. In Angular, expressions are evaluated against a scope object.

    Forgiving: In JavaScript, trying to evaluate undefined properties generates ReferenceError or TypeError. In Angular, expression evaluation is forgiving to undefined and null.

    No Control Flow Statements: You cannot use the following in an Angular expression: conditionals, loops, or exceptions.

    No Function Declarations: You cannot declare functions in an Angular expression, even inside ng-init directive.

    No RegExp Creation With Literal Notation: You cannot create regular expressions in an Angular expression.

    No Object Creation With New Operator: You cannot use new operator in an Angular expression.

    No Comma And Void Operators: You cannot use , or void operators in an Angular expression.

    Filters: You can use filters within expressions to format data before displaying it.

If you want to run more complex JavaScript code, you should make it a controller method and call the method from your view. If you want to eval() an Angular expression yourself, use the $eval() method.

Context

Angular does not use JavaScript's eval() to evaluate expressions. Instead Angular's $parse service processes these expressions.

Angular expressions do not have access to global variables like window, document or location. This restriction is intentional. It prevents accidental access to the global state – a common source of subtle bugs.

Instead use services like $window and $location in functions called from expressions. Such services provide mockable access to globals.

It is possible to access the context object using the identifier this and the locals object using the identifier $locals.

Forgiving

Expression evaluation is forgiving to undefined and null. In JavaScript, evaluating a.b.c throws an exception if a is not an object. While this makes sense for a general purpose language, the expression evaluations are primarily used for data binding, which often look like this:


No Control Flow Statements

Apart from the ternary operator (a ? b : c), you cannot write a control flow statement in an expression. The reason behind this is core to the Angular philosophy that application logic should be in controllers, not the views. If you need a real conditional, loop, or to throw from a view expression, delegate to a JavaScript method instead.
No function declarations or RegExp creation with literal notation

You can't declare functions or create regular expressions from within AngularJS expressions. This is to avoid complex model transformation logic inside templates. Such logic is better placed in a controller or in a dedicated filter where it can be tested properly.
$event

Directives like ngClick and ngFocus expose a $event object within the scope of that expression. The object is an instance of a jQuery Event Object when jQuery is present or a similar jqLite object.

One-time binding

An expression that starts with :: is considered a one-time expression. One-time expressions will stop recalculating once they are stable, which happens after the first digest if the expression result is a non-undefined value (see value stabilization algorithm below).

Reasons for using one-time binding

The main purpose of one-time binding expression is to provide a way to create a binding that gets deregistered and frees up resources once the binding is stabilized. Reducing the number of expressions being watched makes the digest loop faster and allows more information to be displayed at the same time.
Value stabilization algorithm

One-time binding expressions will retain the value of the expression at the end of the digest cycle as long as that value is not undefined. If the value of the expression is set within the digest loop and later, within the same digest loop, it is set to undefined, then the expression is not fulfilled and will remain watched.

    Given an expression that starts with ::, when a digest loop is entered and expression is dirty-checked, store the value as V
    If V is not undefined, mark the result of the expression as stable and schedule a task to deregister the watch for this expression when we exit the digest loop
    Process the digest loop as normal
    When digest loop is done and all the values have settled, process the queue of watch deregistration tasks. For each watch to be deregistered, check if it still evaluates to a value that is not undefined. If that's the case, deregister the watch. Otherwise, keep dirty-checking the watch in the future digest loops by following the same algorithm starting from step 1

    
Special case for object literals

Unlike simple values, object-literals are watched until every key is defined. See http://www.bennadel.com/blog/2760-one-time-data-bindings-for-object-literal-expressions-in-angularjs-1-3.htm
How to benefit from one-time binding

If the expression will not change once set, it is a candidate for one-time binding. Here are three example cases.

When interpolating text or attributes:

<div name="attr: {{::color}}">text: {{::name | uppercase}}</div>

When using a directive with bidirectional binding and parameters that will not change:

someModule.directive('someDirective', function() {
  return {
    scope: {
      name: '=',
      color: '@'
    },
    template: '{{name}}: {{color}}'
  };
});

<div some-directive name="::myName" color="My color is {{::myColor}}"></div>

When using a directive that takes an expression:

<ul>
  <li ng-repeat="item in ::items | orderBy:'name'">{{item.name}};</li>
</ul>    