<template>
  <div class="blocks2">
    <h1><strong>Variación de la Gasolina: </strong> {{ variacionGasolina }} €/m³</h1>
  </div>
</template>

<script>
export default {
  props: {
    gasolina: Number,
    variacionGasolina: Number,
  },
};
</script>

<style scoped>
.blocks h1 {
  text-align: center;
  margin: auto; /* Centra el texto horizontalmente */
  line-height: 100px; /* Centra el texto verticalmente */
  color: #152f52;
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
  font-size: 35px;
}

.error {
  color: red;
  text-align: center;
  font-size: 16px;
}
</style>