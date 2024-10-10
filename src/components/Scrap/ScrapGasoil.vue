<template>
  <div class="blocks">
    <h1>
      <strong>Variación del Gasoil: </strong>
      <span :style="{ color: variacionGasoil < 0 ? 'red' : 'green' }">
        {{ variacionGasoil }}
      </span>
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
  color: #5b4d6e;
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
  font-size: 35px;
}
</style>