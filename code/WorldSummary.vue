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
            <p class="card-subdata">+ {{ w_newtotal }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-recover">
          <div class="card-content">
            <p class="card-title">Số ca khỏi</p>
            <p class="card-data">{{ w_recover }}</p>
            <p class="card-subdata">+ {{ w_newrecover }}</p>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card cv cv-death">
          <div class="card-content">
            <p class="card-title">Số ca tử vong</p>
            <p class="card-data">{{ w_death }}</p>
            <p class="card-subdata">+ {{ w_newdeath }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-2 title-col">
        <img id="flag-img" src="https://www.countryflags.io/VN/flat/48.png" />
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
import axios from "axios";
import { ref } from "vue";

export default {
  name: "WorldSummary",
  setup(props, context) {
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
        if (country.Country === value) {
          //update Value
          v_total.value = country.TotalConfirmed.toLocaleString();
          v_recover.value = country.TotalRecovered.toLocaleString();
          v_death.value = country.TotalDeaths.toLocaleString();
          //change Flag
          document.getElementById("flag-img").src =
            "https://www.countryflags.io/" +
            country.CountryCode +
            "/flat/48.png";

          //notify to App
          context.emit("countrySelected", country.Slug);

          return;
        }
      });
    };

    const options = {
      method: "GET",
      url: "https://api.covid19api.com/summary",
    };

    axios
      .request(options)
      .then(function(response) {
        //notify to App
        context.emit("loaded", "loaded");

        res.value = response.data.Countries;

        w_total.value = response.data.Global.TotalConfirmed.toLocaleString();
        w_recover.value = response.data.Global.TotalRecovered.toLocaleString();
        w_death.value = response.data.Global.TotalDeaths.toLocaleString();

        w_newtotal.value = response.data.Global.NewConfirmed.toLocaleString();
        w_newrecover.value = response.data.Global.NewRecovered.toLocaleString();
        w_newdeath.value = response.data.Global.NewDeaths.toLocaleString();

        let arrayCountry = response.data.Countries;

        let optionsForSelectTag = "";
        arrayCountry.forEach((country) => {
          if (country.CountryCode === "VN") {
            optionsForSelectTag =
              optionsForSelectTag +
              "<option selected>" +
              country.Country +
              "</option>";
          } else {
            optionsForSelectTag =
              optionsForSelectTag + "<option>" + country.Country + "</option>";
          }
        });

        document.getElementById(
          "selectCountry"
        ).innerHTML = optionsForSelectTag;

        var x = document.getElementById("selectCountry");
        var value = x.options[x.selectedIndex].value;

        arrayCountry.forEach((country) => {
          if (country.Country === value) {
            v_total.value = country.TotalConfirmed.toLocaleString();
            v_recover.value = country.TotalRecovered.toLocaleString();
            v_death.value = country.TotalDeaths.toLocaleString();
            return;
          }
        });
      })
      .catch(function(error) {
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

.cv-recover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.1);
}

.cv-death {
  color: rgb(131, 0, 0);
  background-color: rgb(131, 0, 0, 0.1);
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
