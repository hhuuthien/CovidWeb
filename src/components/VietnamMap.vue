<template>
  <div id="map-container">
    <p id="info-title-map">Biểu đồ các tỉnh/thành</p>
    <div class="select is-rounded is-info is-normal">
      <select id="selectProvince" v-on:change="selectFunction"> </select>
    </div>
    <div class="select is-rounded is-info is-normal">
      <select id="selectTime" v-on:change="selectFunction">
        <option selected>Từ đầu đợt dịch 27/4</option>
        <option>30 ngày qua</option>
        <option>7 ngày qua</option>
      </select>
    </div>
    <p id="noDataMap"></p>
    <div id="chart"></div>
    <div id="chart2"></div>
  </div>
</template>

<script>
import { getAllProvince, drawChart, getMyTime } from "../js/func.js";
import firebase from "firebase/app";
import "firebase/database";

let dataGlobal = new Array();

export default {
  mounted() {
    var firebaseConfig = {
      apiKey: "AIzaSyAdNpXA6W8PpSGKbsWXZB4t5gBTXKpeMho",
      authDomain: "covid-inf.firebaseapp.com",
      databaseURL: "https://covid-inf-default-rtdb.firebaseio.com",
      projectId: "covid-inf",
      storageBucket: "covid-inf.appspot.com",
      messagingSenderId: "189610331880",
      appId: "1:189610331880:web:e9eba067c39fc38ff6435d",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    let optionsForSelectTag = "";
    getAllProvince().forEach((province) => {
      if (province === "TP HCM") {
        optionsForSelectTag =
          optionsForSelectTag + "<option selected>" + province + "</option>";
      } else {
        optionsForSelectTag =
          optionsForSelectTag + "<option>" + province + "</option>";
      }
    });
    document.getElementById("selectProvince").innerHTML = optionsForSelectTag;

    var ref = firebase.database().ref("vietnam_total_location");
    ref.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let data = snapshot.val();
        dataGlobal = data;

        let todayString = getMyTime("/");

        let arrayToChart = new Array();
        let category = new Array();
        let arrayToChart2 = new Array();
        let category2 = new Array();

        data.total.json.forEach((element) => {
          if (element["Ngày"] !== "") {
            if (element["TP HCM"] !== "") {
              let temp = [element["Ngày"], element["TP HCM"]];
              arrayToChart.push(temp);
              category.push(element["Ngày"]);
            }
          }
        });
        data.location.json.some((item) => {
          if (item["Ngày"] !== "") {
            let temp;
            if (item["TP HCM"] === "") {
              temp = [item["Ngày"], 0];
            } else {
              temp = [item["Ngày"], item["TP HCM"]];
            }
            arrayToChart2.push(temp);
            category2.push(item["Ngày"]);
          }
          if (item["Ngày"] === todayString) {
            return true;
          }
        });

        drawChart(
          "chart",
          "Tổng số ca nhiễm",
          arrayToChart,
          category,
          "#000d81"
        );
        drawChart(
          "chart2",
          "Số ca nhiễm mới trong ngày",
          arrayToChart2,
          category2,
          "#000d81"
        );
      }
    });
  },
  setup() {
    const selectFunction = () => {
      var x = document.getElementById("selectProvince");
      var value = x.options[x.selectedIndex].value;

      var time = document.getElementById("selectTime").selectedIndex;

      let todayString = getMyTime("/");

      let arrayToChart = new Array();
      let category = new Array();
      let arrayToChart2 = new Array();
      let category2 = new Array();

      dataGlobal.total.json.forEach((element) => {
        if (element["Ngày"] !== "") {
          if (element[value] !== "") {
            let temp = [element["Ngày"], element[value]];
            arrayToChart.push(temp);
            category.push(element["Ngày"]);
          }
        }
      });
      dataGlobal.location.json.some((item) => {
        if (item["Ngày"] !== "") {
          let temp;
          if (item[value] === "") {
            temp = [item["Ngày"], 0];
          } else {
            temp = [item["Ngày"], item[value]];
          }
          arrayToChart2.push(temp);
          category2.push(item["Ngày"]);
        }
        if (item["Ngày"] === todayString) {
          return true;
        }
      });

      if (
        arrayToChart[0][1] === undefined &&
        arrayToChart2[0][1] === undefined
      ) {
        document.getElementById("noDataMap").innerHTML =
          value + " không ghi nhận ca nhiễm trong đợt dịch từ ngày 27/4.";
        document.getElementById("chart").style.display = "none";
        document.getElementById("chart2").style.display = "none";
      } else {
        document.getElementById("noDataMap").innerHTML = "";
        document.getElementById("chart").style.display = "block";
        document.getElementById("chart2").style.display = "block";
      }

      switch (time) {
        case 0:
          drawChart(
            "chart",
            "Tổng số ca nhiễm",
            arrayToChart,
            category,
            "#ff0000"
          );
          drawChart(
            "chart2",
            "Số ca nhiễm mới trong ngày",
            arrayToChart2,
            category2,
            "#0d00ff"
          );
          break;
        case 1:
          drawChart(
            "chart",
            "Tổng số ca nhiễm",
            arrayToChart.slice(arrayToChart.length - 30),
            category.slice(category.length - 30),
            "#ff0000"
          );
          drawChart(
            "chart2",
            "Số ca nhiễm mới trong ngày",
            arrayToChart2.slice(arrayToChart2.length - 30),
            category2.slice(category2.length - 30),
            "#0d00ff"
          );
          break;
        case 2:
          drawChart(
            "chart",
            "Tổng số ca nhiễm",
            arrayToChart.slice(arrayToChart.length - 7),
            category.slice(category.length - 7),
            "#ff0000"
          );
          drawChart(
            "chart2",
            "Số ca nhiễm mới trong ngày",
            arrayToChart2.slice(arrayToChart2.length - 7),
            category2.slice(category2.length - 7),
            "#0d00ff"
          );
          break;
      }
    };

    return {
      selectFunction,
    };
  },
};
</script>

<style scoped>
#map-container {
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

#info-title-map {
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0 10px 0;
}

.select {
  margin: 0 0 10px 10px;
}

#noDataMap {
  padding-bottom: 20px;
}
</style>
