<template>
  <div id="vw_container">
    <p id="vw-title">Thế giới</p>
    <div class="columns">
      <div class="column">
        <div class="card cv-1">
          <div class="card-content">
            <p class="card-title">Số quốc gia đã tiêm</p>
            <p class="card-data">{{ country_num }}</p>
            <p class="card-subdata">({{ country_percent }}%)</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv-2">
          <div class="card-content">
            <p class="card-title">Số người đã tiêm</p>
            <p class="card-data">{{ people_num }}</p>
            <p class="card-subdata">({{ people_percent }}%)</p>
          </div>
        </div>
      </div>
    </div>
    <p id="vw-title" style="margin:30px 0 5px 0">Thống kê theo châu lục</p>
    <div
      class="select is-rounded is-info is-normal"
      style="margin:0 0 30px 15px"
    >
      <select id="selectVaccine" v-on:change="selectVaccine">
        <option selected>Tỷ lệ người đã tiêm</option>
        <option>Số người đã tiêm</option>
      </select>
    </div>
    <div id="chart-vw"></div>
    <p id="vw-title" style="margin:30px 0 5px 0">Thống kê theo quốc gia</p>
    <div
      class="select is-rounded is-info is-normal"
      style="margin:0 0 30px 15px"
    >
      <select id="selectVaccine2" v-on:change="selectVaccine2">
        <option selected>Quốc gia có số mũi tiêm cao nhất</option>
        <option>Quốc gia có tỷ lệ tiêm cao nhất</option>
        <option>Quốc gia có số người tiêm (đủ liều) cao nhất</option>
        <option>Quốc gia có số người tiêm (chưa đủ liều) cao nhất</option>
      </select>
    </div>
    <div id="chart-vw2"></div>
    <p id="vw-title" style="margin:30px 0 5px 0">Chi tiết các quốc gia</p>
    <div
      class="select is-rounded is-info is-normal"
      style="margin:0 0 30px 15px"
    >
      <select id="selectVaccine3" v-on:change="selectVaccine3"> </select>
    </div>
    <p class="pinfo1 pinfo">
      Dân số: <strong>{{ c_pop }}</strong> (người)
    </p>
    <p class="pinfo2 pinfo">
      Tổng số mũi tiêm: <strong>{{ c_total }}</strong> (mũi tiêm)
    </p>
    <p class="pinfo3 pinfo">
      Tổng số người đã tiêm: <strong>{{ c_people1 }}</strong> (người)
    </p>
    <p class="pinfo4 pinfo">
      • Số người đã tiêm đủ liều: <strong>{{ c_people2 }}</strong> (người)
    </p>
    <p class="pinfo5 pinfo">
      • Số người đã tiêm chưa đủ liều:
      <strong>{{ c_people3 }}</strong> (người)
    </p>
    <p class="pinfo6 pinfo">
      Tỷ lệ người đã tiêm ít nhất một mũi tiêm: <strong>{{ c_percent }}</strong
      >%
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  drawChartColumn,
  drawChartBar,
  object_To_Array_3,
  changeName,
} from "../js/func.js";
import firebase from "firebase/app";
import "firebase/database";

export default {
  name: "VaccineW",
  setup() {
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
      firebase.app();
    }

    let dataGlobal;

    const country_num = ref(0);
    const country_percent = ref("");
    const people_num = ref(0);
    const people_percent = ref(0);
    const c_pop = ref(0);
    const c_total = ref(0);
    const c_people1 = ref(0);
    const c_people2 = ref(0);
    const c_people3 = ref(0);
    const c_percent = ref(0);

    firebase
      .database()
      .ref()
      .child("vaccine")
      .child("world")
      .get()
      .then((snapshot) => {
        let data = snapshot.val();
        dataGlobal = data;

        country_num.value = data.total_country_vaccined;
        country_percent.value = data.percent_country_vaccined;
        people_num.value = data.people_vaccinated.World.toLocaleString();
        people_percent.value = data.percent_vaccinated.World;

        let category = [
          "Châu Á",
          "Châu Âu",
          "Châu Phi",
          "Bắc Mỹ",
          "Nam Mỹ",
          "Châu Úc",
        ];

        let dataToChart = [
          data.percent_vaccinated.Asia,
          data.percent_vaccinated.Europe,
          data.percent_vaccinated.Africa,
          data.percent_vaccinated["North America"],
          data.percent_vaccinated["South America"],
          data.percent_vaccinated.Oceania,
        ];

        drawChartColumn(
          "chart-vw",
          "Tỷ lệ người đã tiêm trên dân số (%)",
          dataToChart,
          category,
          "#000d81"
        );

        //country high vaccined (0)
        function compare(a, b) {
          if (a.val > b.val) return -1;
          else if (a.val < b.val) return 1;
          else return 0;
        }

        let arrToChart = new Array();
        let categoryToChartTemp = new Array();
        let categoryToChart = new Array();
        let temp = object_To_Array_3(data.vaccined).sort(compare);
        for (let index = 0; index < 10; index++) {
          arrToChart.push(temp[index].val);
          categoryToChartTemp.push(temp[index].country);
        }

        changeName(categoryToChartTemp, categoryToChart);

        drawChartBar(
          "chart-vw2",
          "Số mũi tiêm",
          arrToChart,
          categoryToChart,
          "#000d81"
        );

        //detail country
        let listCountryVaccine = object_To_Array_3(data.vaccined);
        let string = "";
        listCountryVaccine.forEach((country) => {
          if (country.country === "Vietnam") {
            string =
              string + "<option selected>" + country.country + "</option>";
          } else {
            string = string + "<option>" + country.country + "</option>";
          }
        });
        document.getElementById("selectVaccine3").innerHTML = string;

        c_pop.value = data.population["Vietnam"].toLocaleString();
        c_total.value = data.vaccined["Vietnam"].toLocaleString();
        c_people1.value = data.people_vaccinated["Vietnam"].toLocaleString();
        c_people2.value = data.people_fully_vaccinated[
          "Vietnam"
        ].toLocaleString();
        c_people3.value = (
          data.people_vaccinated["Vietnam"] -
          data.people_fully_vaccinated["Vietnam"]
        ).toLocaleString();
        c_percent.value = data.percent_vaccinated["Vietnam"];
      })
      .catch((error) => {
        console.error(error);
      });

    const selectVaccine = () => {
      let type = document.getElementById("selectVaccine").selectedIndex;
      let category = [
        "Châu Á",
        "Châu Âu",
        "Châu Phi",
        "Bắc Mỹ",
        "Nam Mỹ",
        "Châu Úc",
      ];

      switch (type) {
        case 0: {
          let dataToChart = [
            dataGlobal.percent_vaccinated.Asia,
            dataGlobal.percent_vaccinated.Europe,
            dataGlobal.percent_vaccinated.Africa,
            dataGlobal.percent_vaccinated["North America"],
            dataGlobal.percent_vaccinated["South America"],
            dataGlobal.percent_vaccinated.Oceania,
          ];

          drawChartColumn(
            "chart-vw",
            "Tỷ lệ người đã tiêm trên dân số (%)",
            dataToChart,
            category,
            "#000d81"
          );
          break;
        }
        case 1: {
          let dataToChart = [
            dataGlobal.people_vaccinated.Asia,
            dataGlobal.people_vaccinated.Europe,
            dataGlobal.people_vaccinated.Africa,
            dataGlobal.people_vaccinated["North America"],
            dataGlobal.people_vaccinated["South America"],
            dataGlobal.people_vaccinated.Oceania,
          ];

          drawChartColumn(
            "chart-vw",
            "Số người đã tiêm",
            dataToChart,
            category,
            "#008132"
          );
          break;
        }
      }
    };

    const selectVaccine2 = () => {
      let type = document.getElementById("selectVaccine2").selectedIndex;

      function compare(a, b) {
        if (a.val > b.val) return -1;
        else if (a.val < b.val) return 1;
        else return 0;
      }

      switch (type) {
        case 0: {
          //country high vaccined (0)
          let arrToChart = new Array();
          let categoryToChartTemp = new Array();
          let categoryToChart = new Array();
          let temp = object_To_Array_3(dataGlobal.vaccined).sort(compare);
          for (let index = 0; index < 10; index++) {
            arrToChart.push(temp[index].val);
            categoryToChartTemp.push(temp[index].country);
          }

          changeName(categoryToChartTemp, categoryToChart);

          drawChartBar(
            "chart-vw2",
            "Số mũi tiêm",
            arrToChart,
            categoryToChart,
            "#000d81"
          );
          break;
        }
        case 1: {
          //country high percent (1)
          let arrToChart = new Array();
          let categoryToChartTemp = new Array();
          let categoryToChart = new Array();
          let temp = object_To_Array_3(dataGlobal.percent_vaccinated).sort(
            compare
          );

          let temp2 = dataGlobal.population;
          for (let index = 0; index < 50; index++) {
            //in top 50 countries, filter country that has population > 1M
            let name = temp[index].country;
            let pop = temp2[name];
            if (pop >= 1000000) {
              arrToChart.push(temp[index].val);
              categoryToChartTemp.push(temp[index].country);
            }
          }

          for (let index = 0; index < 10; index++) {
            arrToChart.push(temp[index].val);
            categoryToChartTemp.push(temp[index].country);
          }

          changeName(categoryToChartTemp, categoryToChart);

          drawChartBar(
            "chart-vw2",
            "Tỷ lệ người được tiêm trên dân số (%)",
            arrToChart.slice(0, 10),
            categoryToChart.slice(0, 10),
            "#000d81"
          );
          break;
        }
        case 2: {
          //country high people (enough) (2)
          let arrToChart = new Array();
          let categoryToChartTemp = new Array();
          let categoryToChart = new Array();
          let temp = object_To_Array_3(dataGlobal.people_fully_vaccinated).sort(
            compare
          );
          for (let index = 0; index < 10; index++) {
            arrToChart.push(temp[index].val);
            categoryToChartTemp.push(temp[index].country);
          }

          changeName(categoryToChartTemp, categoryToChart);

          drawChartBar(
            "chart-vw2",
            "Số người đã tiêm đủ liều",
            arrToChart,
            categoryToChart,
            "#000d81"
          );
          break;
        }
        case 3: {
          //country high people (not enough) (3)
          let arrToChart = new Array();
          let categoryToChartTemp = new Array();
          let categoryToChart = new Array();
          let temp = object_To_Array_3(dataGlobal.people_vaccinated).sort(
            compare
          );
          for (let index = 0; index < 10; index++) {
            arrToChart.push(temp[index].val);
            categoryToChartTemp.push(temp[index].country);
          }

          changeName(categoryToChartTemp, categoryToChart);

          drawChartBar(
            "chart-vw2",
            "Số người đã tiêm chưa đủ liều",
            arrToChart,
            categoryToChart,
            "#000d81"
          );
          break;
        }
      }
    };

    const selectVaccine3 = () => {
      let x = document.getElementById("selectVaccine3");
      let value = x.options[x.selectedIndex].value;

      try {
        c_pop.value = dataGlobal.population[value].toLocaleString();
        c_total.value = dataGlobal.vaccined[value].toLocaleString();
        c_people1.value = dataGlobal.people_vaccinated[value].toLocaleString();
        c_people2.value = dataGlobal.people_fully_vaccinated[
          value
        ].toLocaleString();
        c_people3.value = (
          dataGlobal.people_vaccinated[value] -
          dataGlobal.people_fully_vaccinated[value]
        ).toLocaleString();
        c_percent.value = dataGlobal.percent_vaccinated[value];
      } catch (error) {
        c_pop.value = "-";
        c_total.value = "-";
        c_people1.value = "-";
        c_people2.value = "-";
        c_people3.value = "-";
        c_percent.value = "-";
      }
    };

    return {
      country_num,
      country_percent,
      people_num,
      people_percent,
      selectVaccine,
      selectVaccine2,
      selectVaccine3,
      c_pop,
      c_total,
      c_people1,
      c_people2,
      c_people3,
      c_percent,
    };
  },
};
</script>

<style scoped>
#vw_container {
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(182, 182, 182);
  border-radius: 10px;
}

#vw-title {
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0 0 10px 0;
}

.columns {
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-data {
  font-weight: bold;
  font-size: 1.4rem;
}

.card-subdata {
  font-size: 0.8rem;
}

.cv-1 {
  color: rgb(0, 10, 97);
  background-color: rgba(0, 14, 145, 0.1);
}

.cv-1:hover {
  color: rgb(0, 10, 97);
  background-color: rgba(0, 14, 145, 0.3);
  transition: 0.7s;
}

.cv-2 {
  color: rgb(0, 85, 33);
  background-color: rgba(0, 131, 50, 0.1);
}

.cv-2:hover {
  color: rgb(0, 85, 33);
  background-color: rgba(0, 131, 50, 0.3);
  transition: 0.7s;
}

.pinfo {
  padding: 4px;
  margin: 0 0 0 20px;
}

.pinfo4,
.pinfo5 {
  margin: 0 0 0 40px;
}
</style>
