let baseURL = "https://tongueshort-ssym6m.stormkit.dev:3000";
let userIP;
getIP();

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
	let jsonToSend={};
	jsonToSend["ip"] = userIP;
	jsonToSend["htmlContent"] = data;

	jsonToSend = JSON.stringify(jsonToSend)

	console.log(jsonToSend);
	fetch(baseURL+"/save",{method: 'POST', body: jsonToSend, headers: {
		'Content-Type': 'application/json'
	  }}).then(res => console.log(res));
}

function serverLoad()
{
	let data;
	console.log(userIP);
	let loaded = fetch(baseURL+"/load?ip="+ userIP).then(result => result.text()).then(data => {
		document.getElementById("main-content").innerHTML = data; 
	});
	console.log(loaded);
}

function getIP()
{
	fetch('https://www.cloudflare.com/cdn-cgi/trace').then(res => res.text()).then(data => {
		let ipRegex = /ip=[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
		ip = data.match(ipRegex)[0].replace('ip=','');
		userIP = ip;
	});
}