$(document).ready(function(){

  getTaskDataAddToDom();
  // deleteTask();
  sweetAlertDelete();
  addNewTask();
  completeTask();

  // when delete button has been clicked, make sure they want to delete it. Runs sweet alert!

  function addNewTask(){
    $('#addNewTaskButton').on('click', function(){
      var newTaskObject = {};
      var input = $('#taskInput').val();
      newTaskObject.task_description = input;
      newTaskObject.complete = false;
      $.ajax({
        type: 'POST',
        url: '/newTask',
        data: newTaskObject,
        success: function(response){
          $('#taskTableBody').empty();
          $('#completedTaskTableBody').empty();
          getTaskDataAddToDom();
        }//ends success
      })//ends post ajax
    });//ends new task buttonclick
  }//end add new task button
  // sweet alert delete function
  function sweetAlertDelete(){
    $('#taskTable').on('click', '.deleteButton',function(){
    var taskIDDelete = $(this).parent().parent().data().id;
    swal({
      title: 'Are you sure?',
      text: "Do want to delete this task?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {
      swal(
        'Deleted!',
        'Your task has been deleted.',
        'success'
      )
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
