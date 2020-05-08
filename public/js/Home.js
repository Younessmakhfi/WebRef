$(document).ready(function () {

    //localStorage check if username is stored in our local storage
    if (localStorage.getItem("username") === null) {

        window.location.href = "login.html";

    } else {

        $("#userName").html(localStorage.getItem("username"));
        getData();
        $("#SaveData").click(function () { // Recuperation des valeurs

            var name = $("#name").val();
            var Description = $("#Description").val();
            var Status = $("#Status").val();

            if (name != "" && Description != "" && Status != "") { // check les valeurs 
                $.ajax({
                    url: '/AddTask',
                    type: 'post',
                    data: {
                        name,
                        Description,
                        Status
                    },
                    success: function (response) {
                        if (response.request) {
                            //send fetched
                            getData(response);
                            $("#name").val('');
                            $("#Description").val('');
                            $("#Status").val('');
                        }
                    }

                });
            }
        });

    }
});


function getData(fetched) {
    if (fetched === undefined) {
        $.ajax({
            url: '/Tache',
            type: 'get',
            success: function (response) {
                if (response.request) {

                    // data correc
                    AddCards(response.data);

                }
            },
        });
    } else {
        AddCards(fetched.data);
    }
}


function AddCards(data) {

    var tache_Data = '';
    // /html used for replace content but .append add new data to content ^_^
    $("#Tache").html(tache_Data);
    // for every web site we have a index , and values  : (web site name, web site link, and description)
    $.each(data, function (index, value) {

        tache_Data += '<div class="col-md-4">';
        tache_Data += '<div class="card-box">';
        tache_Data += '<div class="card-title">';
        tache_Data += `<img height="40" width="40" src='http://www.google.com/s2/favicons?domain=${value.Status}' /> `
        tache_Data += '<h2>' + value.name + '</h2>';
        tache_Data += '<p>' + value.Description + '</p><br/>';
        tache_Data += `<h5><button class="update btn btn-warning btn-sm" style="background-color:#2c9c49;" onclick="openlink('${value.Status}')">Open The web site</button></h5>`;
        
        tache_Data += '</div>';
        tache_Data += ' <div class="card-link">';
        //this line show the data in the popUp update card card
        tache_Data += `<button type="button" data-toggle="modal" data-target="#UpdatePopUp" data-uid="1" onclick="show(${index},'${value.name}','${value.Description}','${value.Status}')" class="update btn btn-warning btn-sm" style="background-color:rgb(16, 199, 22);"><span class="fa fa-pencil"></span></button>`;
        tache_Data += ' <button type="button" data-toggle="modal" data-target="#DeletePopUp" data-uid="1"  class="update btn btn-warning btn-sm" style="background-color:rgb(16, 199, 22);"><span class="fa fa-trash"></span></button>';
        tache_Data += '</div>';
        tache_Data += '</div>';
        tache_Data += '</div>';
    });
    // insert data into our Row
    $("#Tache").append(tache_Data);


}
function openlink(link) {
    window.open('' + link + '', '_blank');
}
function show(index,name,Description,Status) {
    localStorage.setItem("id", index);
    $("#nameUpdate").val(name);
    $("#DescriptionUpdate").val(Description);
    $("#StatusUpdate").val(Status);
}
