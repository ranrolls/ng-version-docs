To dynamically generate links that will in the future lead to phone detail pages, we used the now-familiar double-curly brace binding in the href attribute values. In step 2, we added the {{phone.name}} binding as the element content. In this step the {{phone.id}} binding is used in the element attribute.

We also added phone images next to each record using an image tag with the ngSrc directive. That directive prevents the browser from treating the Angular {{ expression }} markup literally, and initiating a request to an invalid URL http://localhost:8000/app/{{phone.imageUrl}}, which it would have done if we had only specified an attribute binding in a regular src attribute (<img src="{{phone.imageUrl}}">). Using the ngSrc directive prevents the browser from making an http request to an invalid location.

Experiments

    Replace the ng-src directive with a plain old src attribute. Using tools such as Firebug, or Chrome's Web Inspector, or inspecting the webserver access logs, confirm that the app is indeed making an extraneous request to /app/%7B%7Bphone.imageUrl%7D%7D (or /app/{{phone.imageUrl}}).

    The issue here is that the browser will fire a request for that invalid image address as soon as it hits the img tag, which is before Angular has a chance to evaluate the expression and inject the valid address.
