
//to alert mssgs
$("#add_clinic").submit(function(event){
    alert("Data Inserted Successfully!");
})
// in the update user we don't have action method bc we don't want to redirect the user anywhere else
//when i click on submit : we want to execute the following function
//<form method="POST" id="update_user"> in the form field we have the id shown:
$("#update_clinic").submit(function(event){
    //change the default behavior of the form that is to reload the browser when clicked on submit btn
    event.preventDefault();
// return a serializeArray() of the data that is all the submitted data
    var unindexed_array = $(this).serializeArray();
    var data = {} //object
// n:return all the data from the unindexed_array
//i return the index from the array
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value'] //pass the data for the PUT req
    })
//pass the value to the ajax :ajax to make a req to server & get a response from them

    var request = {
        "url" : `http://localhost:3000/api/clinics/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})
//in the delete form we don't have any href attribute , we are not gonna to navigate the user anywhere else
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");// table body table data // a is anchor &we have a delete route for it
    // a : btn border-shadow delete this => a.delete
    $ondelete.click(function(){
        var id = $(this).attr("data-id") //get the current user id from this data attr :data-id=<%= users[i]._id%>

        var request = {
            "url" : `http://localhost:3000/api/clinics/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}