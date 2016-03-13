Bootstrapping AngularJS apps

Bootstrapping AngularJS apps automatically using the ngApp directive is very easy and suitable for most cases. In advanced cases, such as when using script loaders, you can use the imperative / manual way to bootstrap the app.

There are 3 important things that happen during the app bootstrap:

    The injector that will be used for dependency injection is created.

    The injector will then create the root scope that will become the context for the model of our application.

    Angular will then "compile" the DOM starting at the ngApp root element, processing any directives and bindings found along the way.

Once an application is bootstrapped, it will then wait for incoming browser events (such as mouse click, key press or incoming HTTP response) that might change the model. Once such an event occurs, Angular detects if it caused any model changes and if changes are found, Angular will reflect them in the view by updating all of the affected bindings.

<p>Nothing here {{'yet' + '!'}}</p>

This line demonstrates two core features of Angular's templating capabilities:

    a binding, denoted by double-curlies {{ }}
    a simple expression 'yet' + '!' used in this binding.

The binding tells Angular that it should evaluate an expression and insert the result into the DOM in place of the binding. Rather than a one-time insert, as we'll see in the next steps, a binding will result in efficient continuous updates whenever the result of the expression evaluation changes.

Angular expression is a JavaScript-like code snippet that is evaluated by Angular in the context of the current model scope, rather than within the scope of the global context (window).