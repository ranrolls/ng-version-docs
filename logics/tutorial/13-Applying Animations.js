we will enhance our phonecat web application by attaching CSS and JavaScript animations on top of the template code we created before.

    We now use the ngAnimate module to enable animations throughout the application.
    We also use common ng directives to automatically trigger hooks for animations to tap into.
    When an animation is found then the animation will run in between the standard DOM operation that is being issued on the element at the given time (e.g. inserting and removing nodes on ngRepeat or adding and removing classes on ngClass).


Dependencies

The animation functionality is provided by Angular in the ngAnimate module, which is distributed separately from the core Angular framework. In addition we will use jQuery in this project to do extra JavaScript animations.

We must ask bower to download and install this dependency. We can do this by running:

npm install

Warning: If a new version of Angular has been released since you last ran npm install, then you may have a problem with the bower install due to a conflict between the versions of angular.js that need to be installed. If you get this then simply delete your app/bower_components folder before running npm install.
Note: If you have bower installed globally then you can run bower install but for this project we have preconfigured npm install to run bower for us. 

 Important: Be sure to use jQuery version 2.1 or newer when using Angular 1.4; jQuery 1.x is not officially supported. Be sure to load jQuery before all AngularJS scripts, otherwise AngularJS won't detect jQuery and animations will not work as expected.

Animations can now be created within the CSS code (animations.css) as well as the JavaScript code (animations.js). But before we start, let's create a new module which uses the ngAnimate module as a dependency just like we did before with ngResource.

Note that we're using jQuery to implement the animation. jQuery isn't required to do JavaScript animations with AngularJS, but we're going to use it because writing your own JavaScript animation library is beyond the scope of this tutorial. For more on jQuery.animate, see the jQuery documentation.

The addClass and removeClass callback functions are called whenever a class is added or removed on the element that contains the class we registered, which is in this case .phone. When the .active class is added to the element (via the ng-class directive) the addClass JavaScript callback will be fired with element passed in as a parameter to that callback. The last parameter passed in is the done callback function. The purpose of done is so you can let Angular know when the JavaScript animation has ended by calling it.

The removeClass callback works the same way, but instead gets triggered when a class is removed from the element.

Within your JavaScript callback, you create the animation by manipulating the DOM. In the code above, that's what the element.css() and the element.animate() are doing. The callback positions the next element with an offset of 500 pixels and animates both the previous and the new items together by shifting each item up 500 pixels. This results in a conveyor-belt like animation. After the animate function does its business, it calls done.

Notice that addClass and removeClass each return a function. This is an optional function that's called when the animation is cancelled (when another animation takes place on the same element) as well as when the animation has completed. A boolean parameter is passed into the function which lets the developer know if the animation was cancelled or not. This function can be used to do any cleanup necessary for when the animation finishes.
    
    