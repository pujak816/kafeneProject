function login() {
  var userName = document.getElementById("username").value;
  var passWord = document.getElementById("password").value;

  if (userName == passWord && userName.length > 2) {
    alert("Login Successful");
    window.localStorage.setItem("loginStatus", "true");
    window.location.href = "orders.html";
  } else {
    alert("Please enter valid credentials!");
  }
}

let loginStatus = window.localStorage.getItem("loginStatus");
if (loginStatus == "true") {
  window.location.href = "orders.html";
}
