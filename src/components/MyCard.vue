<template>
  <div
    class="card"
    :class="
      cardStyle === 1 ? 'cv-total' : cardStyle === 2 ? 'cv-recover' : 'cv-death'
    "
  >
    <div class="card-content">
      <p class="card-title">{{ cardTitle }}</p>
      <p class="card-data">{{ cardData }}</p>
      <p class="card-subdata">{{ cardSubdata }}</p>
    </div>
  </div>
</template>
g

<script>
export default {
  name: "MyCard",
  props: ["cardTitle", "cardData", "cardSubdata", "cardStyle"],
};
</script>

<style scoped>
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}

.cv-total {
  color: rgb(0, 11, 112);
  background-color: rgba(0, 11, 112, 0.1);
  border-left: 3px solid rgb(0, 11, 112);
}

.cv-total:hover {
  color: rgb(0, 11, 112);
  background-color: rgba(0, 11, 112, 0.3);
  transition: 0.7s;
}

.cv-recover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.1);
  border-left: 3px solid rgb(0, 109, 42);
}

.cv-recover:hover {
  color: rgb(0, 109, 42);
  background-color: rgb(0, 109, 42, 0.3);
  transition: 0.7s;
}

.cv-death {
  color: rgb(131, 0, 0);
  background-color: rgb(131, 0, 0, 0.1);
  border-left: 3px solid rgb(131, 0, 0);
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
</style>
