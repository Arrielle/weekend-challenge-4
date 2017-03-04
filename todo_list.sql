CREATE TABLE todo_list
(Id SERIAL PRIMARY KEY,
task_description TEXT,
complete BOOLEAN);

INSERT INTO todo_list (task_description, complete)
VALUES ('Do the dishes.', false),
('Mop the floors.', false),
('Do Laundry', false),
('Finish Homework', true);
