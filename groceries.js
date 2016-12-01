window.onload = loadCookieList;

var myList = [];

function loadCookieList()
{
  var cookie = getCookie("groceryList");
  if (cookie == "")
  return;
  var arrayCookie = cookie.split("|");
  for (var i = 0; i < arrayCookie.length; i++)
  {
    displayItem(arrayCookie[i]);
  }
}

function addItem() {
  var input = document.getElementById("newItem");
  displayItem(input.value);
  input.value = "";
}

function displayItem(userInput)
{
  if (myList.indexOf(userInput) != -1)
  return;
  myList.push(userInput);
  console.log(myList);
  var list = document.getElementById("listDisplay");
  var item = document.createElement("li");
  var btnClose = document.createElement("button");
  btnClose.classList.add("btn");
  btnClose.classList.add("btn-danger");
  btnClose.classList.add("btn-xs");
  var iconClose = document.createElement("span");
  iconClose.classList.add("glyphicon");
  iconClose.classList.add("glyphicon-remove");
  btnClose.appendChild(iconClose);
  btnClose.addEventListener("click", removeParentListItem);
  item.appendChild(btnClose);
  var itemName = document.createTextNode(userInput);
  item.appendChild(itemName);
  list.appendChild(item);
}

function saveList()
{
  var listString = myList.join();
  setCookie("groceryList", listString, 2)
}

function clearList()
{
  var listD = document.getElementById("listDisplay");
  while (listD.firstChild) {
    listD.removeChild(listD.firstChild);
  myList = [];
  }
}

function removeParentListItem() {
  var mom = this.parentNode;
  var itemRemove = mom.firstChild;
  var itemIndex = myList.indexOf(itemRemove);
  myList.splice(itemIndex,1);
  console.log(myList);
  var grandma = mom.parentNode;
  grandma.removeChild(mom);
}

//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
