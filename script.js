var input_text = document.querySelector("#input_text");
var input_password = document.querySelector("#input_password");
var error_msg = document.querySelector(".error_msg");
var addButton = document.getElementById("add");
var resultArray;
var data;
var count = 0;

// Validation Function

function myFunction(callback) {
  event.preventDefault();
  document.getElementById("user_error").innerHTML = " ";
  document.getElementById("pswd_error").innerHTML = " ";
  if (input_text.value == "admin" && input_password.value == "12345") {
    callback();
  } else {
    if (input_text.value != "admin") {
      if (input_text.value == "") {
        document.getElementById("user_error").style.display = "block";
        document.getElementById("user_error").innerHTML =
          "Username shouldn't be empty";
      } else {
        document.getElementById("user_error").style.display = "block";
        document.getElementById("user_error").innerHTML =
          "Enter a valid Username ";
      }
    }
    if (input_password.value != "12345") {
      if (input_password.value == "") {
        document.getElementById("pswd_error").style.display = "block";
        document.getElementById("pswd_error").innerHTML =
          "Password shouldn't be empty";
      } else {
        document.getElementById("pswd_error").style.display = "block";
        document.getElementById("pswd_error").innerHTML =
          "Enter a valid Password ";
      }
    }
  }
}

// Callback Function

function todo() {
  // window.open("todo.html");
  location.href = "./todo.html";
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/todos");
document.getElementById("populate").addEventListener("click", function () {
  xhr.send();
});
xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    resultArray = JSON.parse(this.responseText);
    data = resultArray;
    let text = "";
    text +=
      "<table id='items' class='table table-hover table-bordered table-dark table-striped'>";

    text += "<tbody id='tableBody'> ";
    for (let i = 0; i < resultArray.length; i++) {
      var current_record = resultArray[i];
      var current_status = resultArray[i].completed;
      let a = i;
      cr = i;
      let c = "check_" + a;
      let b = "id_" + a;
      let d = "tr_" + a;
      text +=
        "<tr id=" +
        d +
        "><td ><input type='checkbox'  id=" +
        c +
        " onclick='checkbox(" +
        a +
        ")'></td> <td id=" +
        b +
        ">" +
        current_record.title +
        "</td><td ><div onclick='remove(" +
        a +
        ")'><i  style='cursor: pointer;' class='fa fa-trash-o'></i></div></td></tr>";
    }
    text += "</tbody></table>";

    document.getElementById("containers").innerHTML = text;
    document.getElementById("body-id").style.backgroundImage = `URL(
      "./images/pic7.jpg"
    )`;

    document.getElementById("h1-id").innerHTML = `My ToDo`;
    document.getElementById(
      "input-div"
    ).innerHTML = ` <input type="text" name="" placeholder="Enter task" id="input" /><br />`;
    document.getElementById(
      "btn-id"
    ).innerHTML = `<button type="button" id="add" onclick="newElement()">Add</button>`;

    // Disabling Completed Task Checkbox

    for (let i = 0; i < resultArray.length; i++) {
      var z = "id_" + i;
      var y = "check_" + i;
      if (resultArray[i].completed == true) {
        document.getElementById(y).checked = true;
        document.getElementById(y).disabled = true;
        document.getElementById(z).style.color = "red";
        document.getElementById(z).style.textDecoration = "line-through";
      }
    }
  }
};

// CheckBox function Starts here

function checkbox(obj) {
  var x = "check_" + obj;
  var k = "id_" + obj;

  if (document.getElementById(x).checked == true) {
    document.getElementById(k).style.color = "red";
    document.getElementById(k).style.textDecoration = "line-through";
    count++;
    if (count == 5) {
      getAlert();
    }
  } else {
    document.getElementById(k).style.textDecoration = "none";
    document.getElementById(k).style.color = "white";
    count--;
  }
}

// Checkbox Alert Function

function getAlert() {
  setTimeout(() => {
    swal({
      title: "Congrats!",
      text: "5 Tasks have been Successfully Completed!",
      icon: "success",
      button: "OK!",
    });
  }, 200);
}

// Task  Removal Function

function remove(arg) {
  alert("hai");
  // let n = "tr_" + arg;
  // document.getElementById("items").deleteRow(n);
}

// New Task Addition Function

function newElement() {
  var tr = document.createElement("tr");
  var val = document.getElementById("items").rows.length;
  var l = "id_" + "val";
  tr.setAttribute("id", l);
  var notes = document.getElementById("input").value;
  if (notes != "") {
    swal({
      button: "OK!",
      text: "New Task Added",
    });

    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    var task = document.createTextNode(notes);

    tr.append(td1, td2, td3);
    td1.innerHTML = `<input type="checkbox" onclick='checkItem(" +
  p +
  ")' id="+l+" >`;
    td2.appendChild(task);

    td3.innerHTML = `<div onclick='deletes()'><i  style='cursor: pointer;' class='fa fa-trash-o'></i></div>`;

    document.getElementById("items").appendChild(tr);

    document.getElementById("input").value = "";
    document.getElementById("Remove").style.display = "block";
    return (val += 1);
  } else {
    swal({
      title: "Error!",
      text: "Please , Add Task!",
      icon: "error",
      button: "OK!",
    });
  }
}

// Delete function for added task
function deletes() {
  var e = document.getElementById("items").rows.length - 1;
  document.getElementById("items").deleteRow(e);
}
