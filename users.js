let login = window.localStorage.getItem("loginStatus");

function loggedOut() {
  window.localStorage.setItem("loginStatus", "false");
  window.location.href = "index.html";
}

let resetBtn = document.getElementById("resetbtn");

if (login == "true") {
  let reset = () => {
    $(document).ready(function () {
      $.ajax({
        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
        type: "GET",
        success: function (data, status) {
          console.log(data, status);

          // reset button
          resetBtn.addEventListener("click", function () {
            // console.log(data);
            userTable(data);
          });

          // search filter
          var searchInput = document.querySelector(".userList_searchBox");
          searchInput.addEventListener("keyup", (e) => {
            e.preventDefault();
            let value = e.target.value;
            // console.log(value);
            if (value.length >= 2) {
              var userData = search(value, data);
              // console.log(userData)
              userTable(userData);
            } else {
              alert("Enter atleast 2 characters");
            }
          });
          userTable(data);

          // search function
          function search(value, data) {
            let filteredData = [];
            for (let j = 0; j < data.length; j++) {
              value = value.toLowerCase();
              let name = data[j].fullName.toLowerCase();
              if (name.includes(value)) {
                filteredData.push(data[j]);
              }
            }
            return filteredData;
            // console.log(filteredData);
          }

          // getting table data
          function userTable(user) {
            var temp = "";
            user.forEach((item) => {
              temp += "<tr>";
              temp += "<td class='secondryText'>" + item.id + "</td>";
              temp += "<td>" + `<img src =${item.profilePic}` + "</td>";
              temp += "<td class='secondryText'>" + item.fullName + "</td>";
              temp += "<td>" + item.dob + "</td>";
              temp += "<td class='secondryText'>" + item.gender + "</td>";
              temp +=
                "<td class='secondryText'>" +
                item.currentCity +
                ", " +
                item.currentCountry +
                "</td>";
            });

            document.querySelector(".userList_tableBody").innerHTML = temp;
          }
        },
      });
    });
  };
  reset();
}
