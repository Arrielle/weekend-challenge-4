console.log('javascript');

$(document).ready(function(){

  var taskIsComplete = false;

//   $(".box").hover(function() {
//   $(".box-right").toggleClass('cl-box2');
//   $(".bar").toggleClass('cl-bar2');
// });
//
// $(".bar").click(function() {
//   alert("Deleted");
// });

  $.ajax({
    type: 'GET',
    url: '/getTasks',
    success: function(response){
      console.log('Here are the tasks that were "got"', response);
    }//ends success ajax
  });//ends GET ajax

});
