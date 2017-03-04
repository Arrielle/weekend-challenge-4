console.log('javascript');

$(document).ready(function(){

getTaskDataAddToDom();

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
            '<td><div type="button" name="delete" class="box" >' +
              '<div class="box-left"><i class="but-icon fa fa-lg fa-times"></i></div>' +
            '</div></td>' +
            '<td><div type="button" name="smile" class="box" >' +
              '<div class="box-left, smileButton"><i class="but-icon fa fa-lg fa-smile-o"></i></div>' +
            '</div></td></tr>');
        } else if (todoList.complete === false){
          $('#taskTableBody').append('<tr><td><div id = "toDo">' +
          todoList.task_description +
          '</div></td><td><div type="button" name="delete" class="box" ><div class="box-left"><i class="but-icon fa fa-lg fa-times"></i></div></div></td>' +
              '<td><div type="button" name="complete" class="box" ><div class="box-left, completeButton"><i class="but-icon fa fa-lg fa-check"></i></div></div></td></tr>');
        }//ends else if
      }//ends for loop
    }//ends success ajax
  });//ends GET ajax
}//ends function getTaskDataAddToDom
});//ends doc.ready
