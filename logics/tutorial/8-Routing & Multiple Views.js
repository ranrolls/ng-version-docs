Multiple Views, Routing and Layout Template

Our app is slowly growing and becoming more complex. Before step 7, the app provided our users with a single view (the list of all phones), and all of the template code was located in the index.html file. The next step in building the app is to add a view that will show detailed information about each of the devices in our list.

To add the detailed view, we could expand the index.html file to contain template code for both views, but that would get messy very quickly. Instead, we are going to turn the index.html template into what we call a "layout template". This is a template that is common for all views in our application. Other "partial templates" are then included into this layout template depending on the current "route" — the view that is currently displayed to the user.

Application routes in Angular are declared via the $routeProvider, which is the provider of the $route service. This service makes it easy to wire together controllers, view templates, and the current URL location in the browser. Using this feature, we can implement deep linking, which lets us utilize the browser's history (back and forward navigation) and bookmarks.
A Note About DI, Injector and Providers

As you noticed, dependency injection (DI) is at the core of AngularJS, so it's important for you to understand a thing or two about how it works.

When the application bootstraps, Angular creates an injector that will be used to find and inject all of the services that are required by your app. The injector itself doesn't know anything about what $http or $route services do. In fact, the injector doesn't even know about the existence of these services unless it is configured with proper module definitions.

The injector only carries out the following steps :

    load the module definition(s) that you specify in your app
    register all Providers defined in these module definitions
    when asked to do so, inject a specified function and any necessary dependencies (services) that it lazily instantiates via their Providers.

Providers are objects that provide (create) instances of services and expose configuration APIs that can be used to control the creation and runtime behavior of a service. In case of the $route service, the $routeProvider exposes APIs that allow you to define routes for your application.
Note: Providers can only be injected into config functions. Thus you could not inject $routeProvider into PhoneListCtrl.

Angular modules solve the problem of removing global state from the application and provide a way of configuring the injector. As opposed to AMD or require.js modules, Angular modules don't try to solve the problem of script load ordering or lazy script fetching. These goals are totally independent and both module systems can live side by side and fulfill their goals.