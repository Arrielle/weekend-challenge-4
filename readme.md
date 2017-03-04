#Task Manager
- [ ] Once a player has 10 points, they win!
- [ ] New game start option

##Here are the specific components for the challenge:

###Create a front end experience that allows a user to create a Task.
- [ ] Input field for a new task.
###When the Task is created, it should be stored inside of a database (SQL)
- [ ] Set up a database with the correct rows
- [ ] Set up an AJAX update to add data to the database.
###Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
- [ ] Run function populating the data on page load
- [ ] Clear data on new task creation
- [ ] Run function populating the data on new task creation
###Each Task should have an option to 'Complete' or 'Delete'.
- [ ] Add button for Delete
- [ ] Add button for Complete
###When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
- [ ] Change completed task from Incomplete (false option in database) to Complete (true option in database)
- [ ] All incomplete tasks are in the top tablebody
- [ ] All complete tasks are in the bottom tablebody (css styling?)
###Whether or not a Task is complete should also be stored in the database.
- [ ] Done is above step.
###Deleting a Task should remove it both from the front end as well as the Database.
- [ ] Delete button functionality client side.
- [ ] Delete button functionality server side.
###Please include a database.sql text file in your repo that includes all of your CREATE TABLE queries. This is so we can re-create your database while testing your app.
- [ ] Create table.
###In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interrupt this however you would like.
- [ ] Look into "Sweet Alert"
###Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.
- [ ] Potentially done in above step?
