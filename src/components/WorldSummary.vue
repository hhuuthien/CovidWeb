<template>
  <div id="covid_main">
    <div class="columns">
      <div class="column is-2 title-col">
        <img class="big-title-img" src="../assets/worldwide.png" alt="" />
        <p class="big-title">Thế giới</p>
      </div>
      <div class="column">
        <div class="card cv cv-total">
          <div class="card-content">
            <p class="card-title">Tổng số ca mắc</p>
            <p class="card-data">{{ w_total }}</p>
            <p class="card-subdata">{{ w_newtotal }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-recover">
          <div class="card-content">
            <p class="card-title">Số ca khỏi</p>
            <p class="card-data">{{ w_recover }}</p>
            <p class="card-subdata">{{ w_newrecover }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-death">
          <div class="card-content">
            <p class="card-title">Số ca tử vong</p>
            <p class="card-data">{{ w_death }}</p>
            <p class="card-subdata">{{ w_newdeath }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-2 title-col">
        <!-- <img id="flag-img" src="https://www.countryflags.io/VN/flat/48.png" /> -->
        <div class="select is-rounded is-info is-normal">
          <select id="selectCountry" v-on:change="selectFunction"> </select>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-total">
          <div class="card-content">
            <p class="card-title">Tổng số ca mắc</p>
            <p class="card-data">{{ v_total }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-recover">
          <div class="card-content">
            <p class="card-title">Số ca khỏi</p>
            <p class="card-data">{{ v_recover }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-death">
          <div class="card-content">
            <p class="card-title">Số ca tử vong</p>
            <p class="card-data">{{ v_death }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import { ref } from "vue";

export default {
  name: "WorldSummary",
  setup(props, context) {
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

    const w_total = ref(0);
    const w_newtotal = ref(0);
    const w_recover = ref(0);
    const w_newrecover = ref(0);
    const w_death = ref(0);
    const w_newdeath = ref(0);
    const v_total = ref(0);
    const v_recover = ref(0);
    const v_death = ref(0);

    const res = ref("");

    const selectFunction = () => {
      var x = document.getElementById("selectCountry");
      var value = x.options[x.selectedIndex].value;

      let tempArray = res.value;
      tempArray.forEach((country) => {
        if (country.country_vn === value) {
          //update Value
          v_total.value = country.total_cases.replaceAll(`.`, `,`);
          v_recover.value = country.total_recovered.replaceAll(`.`, `,`);
          v_death.value = country.total_deaths.replaceAll(`.`, `,`);
          return;
        }
      });
    };

    firebase
      .database()
      .ref()
      .child("world")
      .get()
      .then((snapshot) => {
        let response = snapshot.val();
        res.value = response.data.data[0].table_country;

        //notify to App
        context.emit("loaded", "loaded");

        w_total.value = response.data.data[0].table_world.total_cases.replaceAll(
          `.`,
          `,`
        );
        w_recover.value = response.data.data[0].table_world.total_recovered.replaceAll(
          `.`,
          `,`
        );
        w_death.value = response.data.data[0].table_world.total_deaths.replaceAll(
          `.`,
          `,`
        );

        w_newtotal.value = response.data.data[0].table_world.new_cases.replaceAll(
          `.`,
          `,`
        );
        w_newrecover.value = response.data.data[0].table_world.new_recovered.replaceAll(
          `.`,
          `,`
        );
        w_newdeath.value = response.data.data[0].table_world.new_deaths.replaceAll(
          `.`,
          `,`
        );

        let arrayCountry = response.data.data[0].table_country;
        let arrayCountryFilter = new Array();

        arrayCountry.forEach((country) => {
          if (
            country.country_vn !== "Châu Á" &&
            country.country_vn !== "Châu Âu" &&
            country.country_vn !== "Bắc Mỹ" &&
            country.country_vn !== "Nam Mỹ" &&
            country.country_vn !== "Châu Phi"
          ) {
            arrayCountryFilter.push(country);
          }
        });

        let arrayCountryFilterSort = arrayCountryFilter.sort((a, b) =>
          a.country_vn.localeCompare(b.country_vn)
        );

        let optionsForSelectTag = "";
        arrayCountryFilterSort.forEach((country) => {
          if (country.country_vn === "Việt Nam") {
            optionsForSelectTag =
              optionsForSelectTag +
              "<option selected>" +
              country.country_vn +
              "</option>";
          } else {
            optionsForSelectTag =
              optionsForSelectTag +
              "<option>" +
              country.country_vn +
              "</option>";
          }
        });
        document.getElementById(
          "selectCountry"
        ).innerHTML = optionsForSelectTag;

        arrayCountryFilterSort.forEach((country) => {
          if (country.country_vn === "Việt Nam") {
            v_total.value = country.total_cases.replaceAll(`.`, `,`);
            v_recover.value = country.total_recovered.replaceAll(`.`, `,`);
            v_death.value = country.total_deaths.replaceAll(`.`, `,`);
            return;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      w_total,
      w_newtotal,
      w_recover,
      w_newrecover,
      w_death,
      w_newdeath,
      v_total,
      v_recover,
      v_death,
      selectFunction,
      res,
    };
  },
};
</script>

<style scoped>
#covid_main {
  width: 90%;
  margin: auto;
}

.columns {
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cv-total {
  color: rgb(0, 11, 112);
  background-color: rgba(0, 11, 112, 0.1);
}

.cv-total:hover {
  color: rgb(0, 11, 112);
  background-color: rgba(0, 11, 112, 0.3);
  transition: 0.7s;
}

.cv-recover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.1);
}

.cv-recover:hover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.3);
  transition: 0.7s;
}

.cv-death {
  color: rgb(131, 0, 0);
  background-color: rgb(131, 0, 0, 0.1);
}

.cv-death:hover {
  color: rgb(131, 0, 0);
  background-color: rgb(131, 0, 0, 0.3);
  transition: 0.7s;
}

.card-data {
  font-weight: bold;
  font-size: 1.4rem;
}

.card-subdata {
  font-size: 0.8rem;
}

.title-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.big-title {
  font-size: 1.2rem;
  margin-top: 5px;
}

.big-title-img {
  width: 48px;
}
</style>
