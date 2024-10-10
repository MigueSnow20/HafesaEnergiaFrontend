<template>
  <div class="blocks">
    <h1
      :style="{ color: variacionGasoil < 0 ? 'red' : 'green' }"
    >
      <strong>Variación del Gasoil: </strong> {{ variacionGasoil }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    gasoil: Number,
    variacionGasoil: Number,
  },
};
</script>

<style scoped>
.blocks h1 {
  text-align: center;
  margin: auto; /* Centra el texto horizontalmente */
  line-height: 100px; /* Centra el texto verticalmente */
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
  font-size: 35px;
}
</style>