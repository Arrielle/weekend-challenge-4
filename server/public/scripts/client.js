console.log('javascript');

$(document).ready(function(){

getTaskDataAddToDom();

//when delete button has been clicked, make sure they want to delete it.
$('#taskTable').on('click', '.deleteButton',function(){
  sweetAlertDelete();
});

$('#addNewTaskButton').on('click', function(){
  console.log('submit task button has been clicked');
  var newTaskObject = {};
  var input = $('#taskInput').val();
  newTaskObject.task_description = input;
  newTaskObject.complete = false;
  console.log(newTaskObject);
  $.ajax({
    type: 'POST',
    url: '/newTask',
    data: newTaskObject,
    success: function(response){
      $('#taskTableBody').empty();
      $('#completedTaskTableBody').empty();
      getTaskDataAddToDom();
      console.log('response from newtask post', response);
    }//ends success
  })//ends post ajax
});//ends new task buttonclick



//sweet alert delete function to be put into an onclick
function sweetAlertDelete(){
  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function () {
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  })//ends sweet alert
}//ends sweetAlertDelete() function
function getTaskDataAddToDom(){
  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: function(response){
      for (var i = 0; i < response.length; i++) {
        var todoList = response[i];
        if (todoList.complete === true){
          $('#completedTaskTableBody').append('<tr><td>' +
            '<div id = "completedTaskDescription">' + todoList.task_description + '</div></td>' +
            '<td><div type="button" name="delete" class="box, deleteButton" >' +
              '<div class="box-left"><i class="but-icon fa fa-lg fa-times"></i></div>' +
            '</div></td>' +
            '<td><div type="button" name="smile" class="box" >' +
              '<div class="box-left, smileButton"><i class="but-icon fa fa-lg fa-smile-o"></i></div>' +
            '</div></td></tr>');
        } else if (todoList.complete === false){
          $('#taskTableBody').append('<tr><td><div id = "toDo">' +
          todoList.task_description +
          '</div></td><td><div type="button" name="delete" class="box, deleteButton" ><div class="box-left"><i class="but-icon fa fa-lg fa-times"></i></div></div></td>' +
              '<td><div type="button" name="complete" class="box" ><div class="box-left, completeButton"><i class="but-icon fa fa-lg fa-check"></i></div></div></td></tr>');
        }//ends else if
      }//ends for loop
    }//ends success ajax
  });//ends GET ajax
}//ends function getTaskDataAddToDom
});//ends doc.ready
