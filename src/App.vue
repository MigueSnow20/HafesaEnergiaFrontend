<script setup>
import ScrapGasoil from './components/Scrap/ScrapGasoil.vue';
import ScrapGasolina from './components/Scrap/ScrapGasolina.vue';
import navBar from './components/navBar.vue';
import graphics from './components/Scrap/Graphics.vue';
import updateValuesForm from './components/Scrap/UpdateValuesForm.vue';
import differentData from './components/Scrap/Data.vue';
import VariationService from '@/Service/VariationService';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import Informe from './components/Scrap/Informe.vue';
import Precios from './components/Scrap/Precios.vue';

// Estado de la sección actual
const currentSection = ref('graphics');
let intervalId = null;

const BACKEND_URL = 'https://petroxpertbackend.fly.dev';
// Datos reactivos para los valores de `cierre`
const cierreData = ref({
  ice: null,
  deltamed: null,
  deltanwe: null,
  divisa: null,
  gna: null,
  gnanwe: null,
  gnamed: null
});

// Datos reactivos para los valores de `cierre`
const informeData = ref({
  id: null,
  texto: null,
  fecha: null
});

// Método para obtener los últimos valores guardados en la BD
const fetchLatestCierre = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/cierre-ultimo`);
    if (response.data && response.data.id) {
      cierreData.value = { ...response.data };
      delete cierreData.value.id;
      delete cierreData.value.created_at;
    }
  } catch (error) {
    console.error("Error al obtener datos de cierre:", error);
  }
};

// ✅ Instanciamos el servicio de variaciones
const variationService = new VariationService();

// ✅ Estado reactivo para almacenar los valores calculados
const dataVariations = ref({
});

// ✅ Función para obtener los cálculos desde `VariationService`
const fetchVariations = async () => {
  try {
    const result = await variationService.getAllData();
    dataVariations.value = result;

  } catch (error) {
    console.error("Error al obtener la variación del gasoil:", error);
  }
};

// Método para manejar la actualización de valores
const handleUpdateValues = (newValues) => {
  cierreData.value = { ...newValues };
  fetchLatestCierre();
};

// Método para guardar texto
const handleUpdateInforme = (newValues) => {
  informeData.value = { ...newValues };
  fetchLatestCierre();
};

// Cargar valores al inicio
onMounted(() => {
  fetchLatestCierre();
  fetchVariations();
  // Establecer intervalo de actualización cada 5s
  intervalId = setInterval(() => {
    fetchVariations();
    fetchLatestCierre();
  }, 5000);
});

// Detener la actualización automática al desmontar el componente
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("⏹ Intervalo detenido.");
  }
});

// Función para cambiar la sección
const changeSection = (section) => {
  currentSection.value = section;
};
</script>

<template>
  <navBar />

  <div class="button-container">
    <button class="nav-button" @click="changeSection('graphics')">Mostrar Gráficos y Variaciones</button>
    <button class="nav-button" @click="changeSection('form')">Mostrar Formulario</button>
    <button class="nav-button" @click="changeSection('informe')">Informe Diario</button>
  </div>

  <div v-if="currentSection === 'graphics'">
    <h2 class="section-title">Gráficos y Variaciones</h2>
    <graphics />
    <div class="blocks">
      <div class="gas-container">
        <ScrapGasoil :variacionGasoil="dataVariations.variacionGasoil" />
      </div>
      <div class="gas-container">
        <ScrapGasolina :variacionGasolina="dataVariations.variacionGasolina"/>
      </div>
    </div>
    <br>
    <br>
    <Precios :dataVariations="dataVariations" />

  </div>
  <div v-if="currentSection === 'form'">
    <h2 class="section-title">Cambiar Valores de Cierre    </h2>
    <updateValuesForm v-bind="cierreData" @update-values="handleUpdateValues" />
  </div>

<div v-if="currentSection === 'informe'">
  <h2 class="section-title">Daniel Nieva - PETROXPERT  </h2>
  <Informe v-bind="informeData" @update-values="handleUpdateInforme" />
</div>
</template>

<style scoped>
body {
  background-color: white;
  margin: 0;
  padding: 0;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 100px;
  margin-bottom: 40px;
}

.nav-button {
  padding: 14px 30px;
  font-size: 18px;
  background-color: #152f52;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #7b808a;
}

/* Títulos de las secciones */
.section-title {
  text-align: center;
  font-size: 24px;
  color: #152f52;
  margin-bottom: 20px;
}

/* Contenedor principal de los gráficos */
.blocks {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 425px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
}

.blocks2 {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 450px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
}

.gas-container {
  flex: 1;
  box-shadow: 0 4px 8px #152f52;
  background-color: #152f52cb;
  padding: 10px;
  border-radius: 10px;
}

.gas-container:last-child {
  margin-right: 9em;
}

.gas-container:first-child {
  margin-left: 9em;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .blocks {
    flex-direction: column;
    align-items: stretch;
  }

  .gas-container {
    margin: 1em 0;
  }

  .gas-container:last-child {
    margin-right: 0;
  }

  .gas-container:first-child {
    margin-left: 0;
  }
}
</style>
