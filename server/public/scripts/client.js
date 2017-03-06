$(document).ready(function(){

  getTaskDataAddToDom();
  // deleteTask();
  sweetAlertDelete();
  addNewTask();
  completeTask();

//Add new task functionality
  function addNewTask(){
    //when add new task button is clicked -
    $('#addNewTaskButton').on('click', function(){
      //a new object is created
      var newTaskObject = {};
      //the task description from the input field is stored in the variable 'input'
      var input = $('#taskInput').val();
      //the object is given the property task_description with the value of input
      newTaskObject.task_description = input;
      //when a new task is created, the objects property of complete is false
      newTaskObject.complete = false;
      //ajax request pushes this new object to the database
      $.ajax({
        type: 'POST',
        url: '/newTask',
        data: newTaskObject,
        success: function(response){
          //empty the TO DO area
          $('#taskTableBody').empty();
          //empty the HAVE DONE area
          $('#completedTaskTableBody').empty();
          //re add database tasks
          getTaskDataAddToDom();
          $('#taskInput').val('');
        },//ends success
        error: function(error){
          error = error.responseText;
          swal("Oops...", "The task field is empty!");
        }
      })//ends post ajax
    });//ends new task buttonclick
  }//end add new task button
  // sweet alert delete functionality!
  function sweetAlertDelete(){
    //when the taskTable's delete button is clicked
    $('#taskTable').on('click', '.deleteButton',function(){
    //the rows that button is on has an ID (same ID as the task ID) which is stored in taskIDDelete
    var taskIDDelete = $(this).parent().parent().data().id;
    //SWEETALERT
    swal({
      title: 'Are you sure?',
      text: "Do want to delete this task?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#02BBA2',
      cancelButtonColor: '#E74C3C',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      swal(
        'Deleted!',
        'Your task has been deleted.',
        'success'
      )
      //If the user has confirmed they want to delete the task it will be deleted.
      deleteTask(taskIDDelete);
    })//ends sweet alert
    });
  }//ends sweetAlertDelete() function
  function getTaskDataAddToDom(){
    $.ajax({
      type: 'GET',
      url: '/getTasks',
      success: function(response){
        for (var i = 0; i < response.length; i++) {
          var todoList = response[i];
          if (todoList.complete === true){
            $('#completedTaskTableBody').append('<tr data-id ="' + todoList.id + '"><td>' +
            '<div id = "completedTaskDescription">' + todoList.task_description + '</div></td>' +
            '<td><div type="button" name="delete" class="box, deleteButton" >' +
            '<div class="box-left"><i class="but-icon fa fa-lg fa-times"></i></div>' +
            '</div></td>' +
            '<td><div type="button" name="smile" class="box" >' +
            '<div class="box-left, smileButton"><i class="but-icon fa fa-lg fa-smile-o"></i></div>' +
            '</div></td></tr>');
          } else if (todoList.complete === false){
            var $newTask = '<tr data-id ="' + todoList.id + '"><td><div id = "toDo">' + todoList.task_description +
            '</div></td><td><div type="button" name="delete" class="box, deleteButton" ><div class="box-left"><i class="but-icon fa fa-lg fa-times"></i></div></div></td>' +
            '<td><div type="button" name="complete" class="box" ><div class="box-left, completeButton"><i class="but-icon fa fa-lg fa-check"></i></div></div></td></tr>'
            $('#taskTableBody').append($newTask);
          }//ends else if
        }//ends for loop
      }//ends success ajax
    });//ends GET ajax
  }//ends function getTaskDataAddToDom
  //delete a task from the database and reload the page
  function deleteTask(taskIDDelete){
      $.ajax({
        type: 'DELETE',
        url: '/taskDelete/' + taskIDDelete,
        success: function(response){
          $('#taskTableBody').empty();
          $('#completedTaskTableBody').empty();
          getTaskDataAddToDom();
        }//end success
      });//end ajax
  }//ends delete task function
  function completeTask(){
    $('#taskTableBody').on('click', '.completeButton', function(){
      var taskIDSave = $(this).parent().parent().parent().data().id;
      var taskToComplete = {
        complete: true
      }
      $.ajax({
        type: 'PUT', //it's the PG update PUT or PATCH
        url: '/taskComplete/' + taskIDSave,
        data: taskToComplete,// books/delete/48 (where 48 is bookIDDelete)
        success: function(response){
          $('#taskTableBody').empty();
          $('#completedTaskTableBody').empty();
          getTaskDataAddToDom();
          // },
          // error: function(err){
          //   $('#error').empty();
          //   error = err.responseText;
          //   $('#error').append(error);
        }
        // end success
      });//end ajax
    });//end on click
  }//end completeTask function
});//ends doc.ready
