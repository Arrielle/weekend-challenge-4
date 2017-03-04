console.log('javascript');

$(document).ready(function(){

  var taskIsComplete = false;

  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: function(response){
      console.log('Here are the tasks that were "got"', response);
    }//ends success ajax
  });//ends GET ajax

});
