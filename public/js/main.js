//alert(1);
/*
$(document).ready(function(){
    $('.delete-article').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type:'DELETE',
        url: '/articles/'+id,
        success: function(response){
          alert('Deleting Article');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  });
*/
$(document).ready(function(){
  $('.deleteUser').on('click', deleteUser);
});
  
function deleteUser(){
  var confirmation = confirm('Are You Sure?');
  
  if(confirmation){
    //alert(1);
    $.ajax({
      type:'DELETE',
      url:'users/delete/'+$(this).data('id')
    }).done(function(response){
    window.location.replace('/');
    })
    window.location.replace('/');
  } else{
      return false;
  }
}
  