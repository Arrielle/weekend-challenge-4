#Task Manager
You are going to create a 'TO DO' application. This type of application is very common to tackle when learning a new language, which makes it extremely valuable to work through for the first time. Chances are good that at some point in your career you will tackle this again while learning another language.

##Here are the specific components for the challenge:

###Create a front end experience that allows a user to create a Task.
- [x] Input field for a new task.

###When the Task is created, it should be stored inside of a database (SQL)
- [x] Set up a database with the correct rows (ID, Task, Completed)
- [x] Set up an AJAX update to add task input to the database.

###Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
- [x] Run function populating the data on page load
- [x] Clear data on new task creation
- [x] Run function populating the data on new task creation

###Each Task should have an option to 'Complete' or 'Delete'.
- [x] Add button for Delete
- [x] Add button for Complete

###When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.
- [x] Change completed task from Incomplete (false option in database) to Complete (true option in database) with an UPDATE
- [x] All incomplete tasks are in the top tablebody
- [x] All complete tasks are in the bottom tablebody (css styling?)

###Whether or not a Task is complete should also be stored in the database.
- [x] Done in above step.

###Deleting a Task should remove it both from the front end as well as the Database.
- [x] Delete button functionality client side.
- [x] Delete button functionality server side.

###Please include a database.sql text file in your repo that includes all of your CREATE TABLE queries. This is so we can re-create your database while testing your app.
- [x] Create table.
- [x] Create sql file.

###In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interrupt this however you would like.
- [x] Look into "Sweet Alert"
- [x] Add an Alert.
- [x] Delete row only after the alert has been confirmed.

###Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.
- [x] Potentially done in above step?


###EXTRA STUFF
- [ ] Don't allow for empty string for the new task
- [ ] If it's an empty string alert them!
- [x] Clear new task field once button has been pressed.
