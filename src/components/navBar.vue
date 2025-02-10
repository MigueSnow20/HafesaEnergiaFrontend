<template>
  <nav class="navbar">
    <div class="navbar-title">P E T R O X P E R T</div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed; /* Fijar la navbar en la parte superior */
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(21, 47, 82, 0.9); /* Color más sólido con opacidad */
  backdrop-filter: blur(10px); /* Agrega desenfoque de fondo */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Sombra para diferenciar del fondo */
  display: flex;
  justify-content: center; /* Centrar el texto */
  align-items: center;
  z-index: 1000;
}

.navbar-title {
  font-size: 2.5rem; /* Texto grande */
  font-weight: bold;
  color: white; /* Texto blanco */
  letter-spacing: 10px; /* Espaciado entre letras */
  text-transform: uppercase; /* Asegurar mayúsculas */
}
</style>
