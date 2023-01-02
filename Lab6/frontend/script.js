var jsonURL = "https://givikap120.github.io/Web/Lab6/database.json";

document.getElementById("add-item-button").onclick = addItem;
document.getElementById("remove-item-button").onclick = removeItem;
document.getElementById("clear-item-button").onclick = clearItem;

document.getElementById("add-dropdown-button").onclick = addDropdown;
document.getElementById("remove-dropdown-button").onclick = removeDropdown;

document.getElementById("editing-name").onchange = updateName;

document.getElementById("save-button").onclick = serverSave;
document.getElementById("load-button").onclick = serverLoad;

getEditDropdownContents().style = "display: block";


function getEditDropdownContents()
{
	return document.getElementById("edit-dropdown").firstElementChild.children[1];
}

function getEditDropdownButton()
{
	return document.getElementById("edit-dropdown").firstElementChild.children[0];
}

function addItem()
{
	let htmlToPut = "<li class=\"dropdown-content-element\">"+document.getElementById("editing-input").value+"</li>";
	getEditDropdownContents().innerHTML += htmlToPut;
	document.getElementById("editing-input").value = "";
};

function removeItem()
{
	getEditDropdownContents().removeChild(getEditDropdownContents().lastElementChild);
}

function clearItem()
{
	getEditDropdownContents().innerHTML="";
	getEditDropdownButton().innerHTML="Dropdown";
	document.getElementById("editing-name").value = "";
}

function addDropdown()
{
	getEditDropdownContents().style = "";
	let select = document.getElementById("edit-dropdown");
	document.getElementById("main-content").innerHTML += select.innerHTML;
	getEditDropdownContents().style = "display: block";
};

function removeDropdown()
{
	let select = document.getElementById("main-content");
  	select.removeChild(select.lastElementChild);
}

function updateName()
{
	getEditDropdownButton().innerHTML = document.getElementById("editing-name").value;
}

function serverSave()
{
	let data = document.getElementById("main-content").innerHTML;
	

	
}

function serverLoad()
{
	let data;
	let loaded = fetch(jsonURL).then(result => result.json()).then(data => {
		document.getElementById("main-content").innerHTML = data["cringe"]; 
	});
	console.log(loaded);
	
}