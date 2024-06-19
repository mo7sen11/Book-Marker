//! HTML elements
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var globalIndex;
//! variables
var nameRegex = /^[A-Z][a-zA-Z]{2,}/;
var urlRegex = /^https?:\/\/(www\.)?[a-z A-Z]{3,}\.(com|org|gov|net|dev)$/;
//! check if local storage empty
if (localStorage.getItem("site") != null) {
  sites = JSON.parse(localStorage.getItem("site"));
  display();
} else {
  var sites = [];
}
//! add function
function addSite() {
  if(validate(siteName,nameRegex)&& validate(siteUrl,urlRegex))
    {
        var site = {
            name: siteName.value,
            url: siteUrl.value
          };
          sites.push(site);
          localStorage.setItem("site", JSON.stringify(sites));
          display();
          clear();
          siteName.classList.remove("is-valid");
          siteUrl.classList.remove("is-valid");
    }
    else
    {
        alert("Invalid Data Input");
    }
}

//! display function
function display() {
  var sitesContainer = "";
  for (var i = 0; i < sites.length; i++) {
    sitesContainer += `
               <tr>
                <th scope="row">${i+1}</th>
                <td>${sites[i].name}</td> 
                <td>${sites[i].url}</td>
                <td>
                    <ul class="list-unstyled d-flex  align-items-center justify-content-center ">
                        <li><button class="btn btn-success"><a class="text-decoration-none text-light" href="${sites[i].url}" target="_blank"><i class="fa-solid fa-eye "></i><span>visit</span></a> </button></li>
                        <li><button onclick="setFormForUpdate(${i})" class="btn btn-warning"><i class="fa-solid fa-edit "></i><span>Edit</span></button></li>
                        <li><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-alt "></i><span>Delete</span></button></li>
                    </ul>
                </td>
              </tr>`;
  }
  document.getElementById("tableBody").innerHTML = sitesContainer;
}
//! clear function
function clear() {
  siteName.value = "";
  siteUrl.value = "";
}
//! Delete function
function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(sites));
  display();
}
//! setFormForUpdate function
function setFormForUpdate(i) {
  globalIndex = i;
  siteName.value = sites[i].name;
  siteUrl.value = sites[i].url;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}
//! update function
function updateSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value
  };
  sites.splice(globalIndex, 1, site);
  localStorage.setItem("site", JSON.stringify(sites));
  display();
  clear();
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}
//! validate function 
function validate(element,regex)
{
    if(regex.test(element.value))
        {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.classList.add("d-none")
            return true;
        }
      
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            element.nextElementSibling.classList.remove("d-none")
            return false;
        
}