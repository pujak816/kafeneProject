let login = window.localStorage.getItem("loginStatus");

function loggedOut() {
  // localStorage.clear();
  window.localStorage.setItem("loginStatus", "false");
  window.location.href = "index.html";
}

var checkedInput = document.getElementsByName("orders");
if (login == "true") {
  function loadOrdersData() {
    $.getJSON(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
      function (response) {
        let ordersData = response;
        console.log(ordersData);

        //filters functionality
        let checkedData = [];
        let filteredUser = [];
        var total = 0;
        for (var i = 0; i < checkedInput.length; i++) {
          if (checkedInput[i].checked) {
            checkedData.push(checkedInput[i].value);
          }
        }
        // console.log(checkedData);

        filteredUser = ordersData.filter(filteredData);
        // console.log(filteredUser);
        function filteredData(item) {
          return checkedData.includes(item.orderStatus);
        }

        // getting table data

        let temp = "";

        $(filteredUser).each(function (i, table) {
          temp += "<tr>";
          temp += "<td class='secondryText'>" + table.id + "</td>";
          temp += "<td class='primaryText'>" + table.customerName + "</td>";
          temp +=
            "<td class='primaryText'>" +
            table.orderDate +
            "<br class='orderTime'/>" +
            table.orderTime +
            "</td>";
          temp += "<td class='secondryText'>" + table.amount + "</td>";
          temp += "<td class='primaryText'>" + table.orderStatus + "</td>";
        });

        document.querySelector(".Homepage_tableBody").innerHTML = temp;

        total = filteredUser.length;
        let ordersCount = document.getElementById("count");
        ordersCount.innerHTML = `Count: ${total}`;
      }
    );
  }
  loadOrdersData();
}
