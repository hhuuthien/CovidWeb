<template>
  <div id="table-container">
    <div id="table-info">
      <p id="info-title">Số liệu thống kê ở Việt Nam</p>
      <p id="info"></p>
    </div>

    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Ngày</th>
          <th>Tổng số ca mắc</th>
          <th>Số ca khỏi</th>
          <th>Số ca tử vong</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../js/func.js";

export default {
  name: "WorldDetail",
  props: ["country"],
  setup(props) {
    const options = {
      method: "GET",
      url: "https://api.covid19api.com/total/country/" + props.country,
    };

    axios
      .request(options)
      .then(function(response) {
        let array = response.data;
        let length = array.length;

        let newArray = [];
        for (let index = 1; index < 8; index++) {
          newArray.push(array[length - index]);
        }

        let tableString = "";
        newArray.forEach((element) => {
          tableString =
            tableString +
            "<tr><td>" +
            formatDate(element.Date) +
            "</td><td>" +
            element.Confirmed.toLocaleString() +
            "</td><td>" +
            element.Recovered.toLocaleString() +
            "</td><td>" +
            element.Deaths.toLocaleString() +
            "</td></tr>";
        });

        document.getElementById("tbody").innerHTML = tableString;

        const newConfirmed7 = (
          newArray[0].Confirmed - newArray[6].Confirmed
        ).toLocaleString();
        const newDeath7 = (
          newArray[0].Deaths - newArray[6].Deaths
        ).toLocaleString();

        document.getElementById(
          "info"
        ).innerHTML = `Trong 7 ngày qua, Việt Nam ghi nhận thêm <strong>${newConfirmed7}</strong> ca nhiễm Covid và <strong>${newDeath7}</strong> ca tử vong.`;
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  watch: {
    country: function(newValue) {
      const options = {
        method: "GET",
        url: "https://api.covid19api.com/total/country/" + newValue,
      };

      axios
        .request(options)
        .then(function(response) {
          let array = response.data;
          let length = array.length;

          let newArray = [];
          for (let index = 1; index < 8; index++) {
            newArray.push(array[length - index]);
          }

          let tableString = "";
          newArray.forEach((element) => {
            tableString =
              tableString +
              "<tr><td>" +
              formatDate(element.Date) +
              "</td><td>" +
              element.Confirmed.toLocaleString() +
              "</td><td>" +
              element.Recovered.toLocaleString() +
              "</td><td>" +
              element.Deaths.toLocaleString() +
              "</td></tr>";
          });

          document.getElementById("tbody").innerHTML = tableString;
          document.getElementById(
            "info-title"
          ).innerHTML = `Số liệu thống kê ở ${array[0].Country}`;

          const newConfirmed7 = (
            newArray[0].Confirmed - newArray[6].Confirmed
          ).toLocaleString();
          const newDeath7 = (
            newArray[0].Deaths - newArray[6].Deaths
          ).toLocaleString();

          document.getElementById(
            "info"
          ).innerHTML = `Trong 7 ngày qua, ${array[0].Country} ghi nhận thêm <strong>${newConfirmed7}</strong> ca nhiễm Covid và <strong>${newDeath7}</strong> ca tử vong.`;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
#table-container {
  width: 95%;
  margin: auto;
  padding: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

#info-title {
  font-weight: bold;
  font-size: 1.5rem;
  padding-bottom: 10px;
}

#info {
  padding-bottom: 15px;
}
</style>
