$(document).ready(function(){

  $.ajax({
    url:'http://localhost:3000/api/products',
    type:'get',
    dataType:'JSON'
  })
  .done(function(response){

    let data = response.data;
    // let status = response.status
    if (data.length > 0) { 
      createTbody(data);
    } else {
        alert(false,'Πρόβλημα στην αναζήτηση των χρηστών ('+ data.message + ')');

    }
  })
  .fail(function(response) {
    console.log(response.err)
  })

  $('.row').off('click', '.btnSubmit').on('click', '.btnSubmit', function () {

    let product = $("#product").val();
    let description = $("#description").val();
    let cost = $("#cost").val();
    let quantity = $("#quantity").val();

    const item = {
      'product': product,
      'description': description,
      'cost': cost,
      'quantity': quantity
    }

    console.log($('.btnSubmit').val(), item);

    $.ajax({
      url: "http://localhost:3000/api/products",
      type: "post",
      data: item,
      dataType: "JSON",
      // encode: true,
    })
    .done( function(response) {

      // let data = response.data;
      // let status = response.status

          console.log('Επιτυχής εισαγωγή του προϊόντος');
          alert(true,'Επιτυχής εισαγωγή του προϊόντος');
          $('#frmUser')[0].reset();
          //window.location.replace("http://localhost:3000/user/find.html")
    })
    
    .fail(function(response) {

      console.log('Ανεπιτυχής εισαγωγή του προϊόντος:', response.responseJSON.data.message);
      alert(true,'Ανεπιτυχής εισαγωγή του προϊόντος :' + response.responseJSON.data.message);
    })
    return false
  });

  $('#tbody').off('click', '.btnDelete').on('click', '.btnDelete', function () {
    let clickedValue = $(this).val()
    let id = clickedValue
    $.ajax({
      url: "http://localhost:3000/api/products/"+ id,
      type: "delete",
      dataType: "JSON",
      // encode: true,
      success: function(response) {
      
        console.log(response);
        window.location.replace("http://localhost:3000/product/find.html")
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
    let product = data[i].product;
    let description = data[i].description;
    let cost = data[i].cost;
    let quantity = data[i].quantity;
    let id = data[i]._id

    let tr_str = "<tr>" +
      "<td>" + product + "</td>" +
      "<td>" + description + "</td>" +
      "<td>" + cost + "</td>" +
      "<td>" + quantity + "</td>" +
      "<td>" +
          "<button class='btnUpdate btn btn-primary' value=\'"+id+"\'>Τροποποίηση</button> " +
          "<button class='btnDelete btn btn-primary' value=\'"+id+"\'>Διαγραφή</button>" +
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