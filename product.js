let login = window.localStorage.getItem("loginStatus");

function loggedOut() {
  // localStorage.clear();
  window.localStorage.setItem("loginStatus", "false");
  window.location.href = "index.html";
}

let filterInput = document.getElementsByName("products");

if (login == "true") {
  function loadProductData() {
    $(document).ready(function () {
      $.ajax({
        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        type: "GET",
        success: function (data, status) {
          console.log(data, status);

          // filters functionality
          let filteredData = [];
          let total = 0;

          // low stock check
          let lowStock = data.filter(islowStock);
          function islowStock(item) {
            return item.stock < 100;
          }
          console.log(lowStock);

          // expired Stock check
          let expired = data.filter(isExpired);
          function isExpired(item) {
            return new Date(item.expiryDate).getTime() < new Date().getTime();
          }
          console.log(expired);

          // remaining stock
          let remainingStock = data.filter(remaining);
          function remaining(item) {
            return (
              !(new Date(item.expiryDate).getTime() < new Date().getTime()) &&
              !(item.stock < 100)
            );
          }
          console.log(remainingStock);

          let expiredStockProduct = document.getElementById("expired").checked;
          let lowStockProduct = document.getElementById("low_stock").checked;
          if (expiredStockProduct && lowStockProduct) {
            filteredData = data;
          } else if (expiredStockProduct) {
            filteredData = expired;
          } else if (lowStockProduct) {
            filteredData = lowStock;
          } else {
            filteredData = remainingStock;
          }

          // getting table data
          let temp = "";
          $(filteredData).each(function (i, table) {
            temp += "<tr class='primaryText'>";
            temp += "<td class='secondryText'>" + table.id + "</td>";
            temp += "<td class='primaryText'>" + table.medicineName + "</td>";
            temp += "<td class='secondryText'>" + table.medicineBrand + "</td>";
            temp += "<td class='primaryText'>" + table.expiryDate + "</td>";
            temp += "<td class='secondryText'>" + table.unitPrice + "</td>";
            temp += "<td class='secondryText'>" + table.stock + "</td>";
          });
          document.querySelector(".Products_tableBody").innerHTML = temp;

          total = filteredData.length;
          let productsCount = document.getElementById("count");
          productsCount.innerHTML = `Count: ${total}`;
        },
      });
    });
  }
  loadProductData();
}
