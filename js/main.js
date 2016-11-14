//Send Post request to server with credentials 
$(function()){
var $username = $('#fpUsername');
var $password = $('#fpPassword');

//Mount the onclick Function of Signin  
$('#fpSignIN').on('click', function()
    {
      var credentials ={
          username: $username.val(),
            password:$password.val(), 
          //more stuff here
    };
    
    //Ajax call to the backend API
    $.ajax
    ({
    type:'Post',
    url:'', //Ask illia for the url
    data:credentials,
        error: function(){
            alert('Error pushing the credentials');
        }
    });
    
    
    });
});
