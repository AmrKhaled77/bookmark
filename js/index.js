var nameInput = document.getElementById("name");
var URLInput = document.getElementById("url");

var data = JSON.parse(localStorage.getItem("websites")) || [];
var stringdata = ``;

displayData();

function addData() {

if(validateName() && validateURL()){

    let item = {
        webName: nameInput.value,
        url: URLInput.value
    };

    data.push(item);
    localStorage.setItem("websites", JSON.stringify(data));

    nameInput.value = "";
    URLInput.value = "";


 URLInput.classList.remove("is-valid");
 
 URLInput.classList.remove("is-invalid");
 nameInput.classList.remove("is-valid");
  
nameInput.classList.remove("is-invalid");



    displayData();

}else{


    let modal = new bootstrap.Modal(document.getElementById('validationModal'));
       modal.show();

}


   
}

function displayData() {
    stringdata = ``;

    for (let index = 0; index < data.length; index++) {
        stringdata += `
        <tr>
          <td>${index + 1}</td>
          <td>${data[index].webName}</td>
          <td><a href="${data[index].url}" target="_blank" class="btn btn-dark"><i class="fa fa-eye"></i> Visit</a></td>
          <td><button class="btn btn-danger" onclick="deleteItem(${index})"><i class="fa fa-trash"></i> Delete</button></td>
        </tr>`;
    }

    document.getElementById("table-data").innerHTML = stringdata;
}

function deleteItem(index) {
    data.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(data));
    displayData();
}




function validateName() {
    let validName = nameInput.value.trim().length >= 3;

    if (!validName) {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        return false;
    }

    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    return true;
}

function validateURL() {
    let validUrl = /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(URLInput.value.trim());

    if (!validUrl) {
        URLInput.classList.add("is-invalid");
        URLInput.classList.remove("is-valid");
        return false;
    }

    URLInput.classList.add("is-valid");
    URLInput.classList.remove("is-invalid");
    return true;
}