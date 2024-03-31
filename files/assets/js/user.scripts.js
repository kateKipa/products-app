$(document).ready(function(){

  $.ajax({
    url:'http://localhost:3000/api/users',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){

    let data = response.data;
    // let status = response.status
    if (data.length>0) { 
        createTbody(data);
    } else {
        alert(false,'Πρόβλημα στην αναζήτηση των χρηστών ('+ data.message + ')');

    }
  });

  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let username = $("#username").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let surname = $("#surname").val();
    let email = $("#email").val();
    let area =  $("#area").val();
    let road =  $("#road").val();
    let address = {
      'area' : area,
      'road' : road
    }

    const item = {
      'username': username,
      'password': password,
      'name': name,
      'surname': surname,
      'email': email,
      'address' : address
    }

    console.log($('.btnSubmit').val(), item);

    $.ajax({
      url: "http://localhost:3000/api/users",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) {

      // let data = response.data;
      // let status = response.status

          console.log('Επιτυχής εισαγωγή του χρήστη');
          alert(true,'Επιτυχής εισαγωγή του χρήστη');
          $('#frmUser')[0].reset();
          window.location.replace("http://localhost:3000/user/find.html")
    })

    .fail(function(response) {

      console.log('Ανεπιτυχής εισαγωγή του χρήστη:', response.responseJSON.data.message);
      alert(true,'Ανεπιτυχής εισαγωγή του χρήστη :' + response.responseJSON.data.message);
    })
    return false
  });

  $('#tbody').off('click', '.btnDelete').on('click', '.btnDelete', function () {
    let clickedValue = $(this).val()
    let username = clickedValue
    $.ajax({
      url: "http://localhost:3000/api/users/"+ username,
      type: "delete",
      dataType: "JSON",
      // encode: true,
      success: function(response) {

        console.log(response);
        window.location.replace("http://localhost:3000/user/find.html")
    },
    error: function(xhr, status, error) {

        console.error(xhr.responseText);
    }
    })
  })
});

function createTbody(data){

  $("#userTable > tbody").empty();

  console.log("CreateTBody", data);
  const len = data.length;
  for (let i=0; i<len; i++){
    let username = data[i].username;
    let name = data[i].name;
    let surname = data[i].surname;
    let email = data[i].email;
    let address = data[i].address.area + ", " + data[i].address.road;
    let phone = "";
    for (let x=0; x<data[i].phone.length; x++ ){
      phone = phone + data[i].phone[x].type + ":" + data[i].phone[x].number + "<br>"
    }



    let tr_str = "<tr>" +
      "<td>" + username + "</td>" +
      "<td>" + name + "</td>" +
      "<td>" + surname + "</td>" +
      "<td>" + email + "</td>" +
      "<td>" + address + "</td>" +
      "<td>" + phone + "</td>" +      
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value=\'"+username+"\'>Τροποποίηση</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+username+"\'>Διαγραφή</button>" +
      "</td>" + 
      "</tr>";

    $("#userTable tbody").append(tr_str);
  }
}

function alert(status, message){
  if (status){
      $('.alert').addClass('alert-success');
      $('.alert').removeClass('alert-danger');
  } else {
      $('.alert').addClass('alert-danger');
      $('.alert').removeClass('alert-success');
  }
  $('.alert').html(message);
}