

    In the PhoneListCtrl controller, remove the statement that sets the orderProp value and you'll see that Angular will temporarily add a new blank ("unknown") option to the drop-down list and the ordering will default to unordered/natural order.

    Add an {{orderProp}} binding into the index.html template to display its current value as text.

    Reverse the sort order by adding a - symbol before the sorting value: <option value="-age">Oldest</option>

Summary

Now that you have added list sorting and tested the app, go to step 5 to learn about Angular services and how Angular uses dependency injection.