<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <!-- Campos para la tabla cierre -->
      <h2 class="section-title">Datos de Cierre</h2>
      <div class="form-group" v-for="(label, key) in cierreLabels" :key="key">
        <label :for="key">{{ label }}:</label>
        <input
          :id="key"
          v-model="formData.cierre[key]"
          type="number"
          step="0.0001"
          required
        />
      </div>

      <div class="separator"></div> <!-- Barra horizontal fina -->

      <!-- Campos para la tabla precios_ciudades -->
      <h2 class="section-title">Primas por Ciudad</h2>
      <div class="form-group" v-for="(label, key) in preciosLabels" :key="key">
        <label :for="key">{{ label }}:</label>
        <input
          :id="key"
          v-model="formData.precios[key]"
          type="number"
          step="0.0001"
          required
        />
      </div>

      <button type="submit">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // Datos del formulario
      formData: {
        cierre: {
          ice: null,
          deltamed: null,
          deltanwe: null,
          divisa: null,
          gna: null,
          gnanwe: null,
          gnamed: null
        },
        precios: {
          gasoilvigo: null,
          gasolinafirstvigo: null,
          gasolinasecondvigo: null,
          gasoilhuelva: null,
          gasolinafirsthuelva: null,
          gasolinasecondhuelva: null,
          gasoilmerida: null
        }
      },

      // Datos para el informe
      informeTexto: "",

      // Últimos informes recuperados de la BD
      informes: [],

      // Etiquetas de los campos
      cierreLabels: {
        ice: "ICE Gasóleo",
        deltamed: "Delta MED",
        deltanwe: "Delta NWE",
        divisa: "Divisa",
        gna: "GNA",
        gnanwe: "GNA NWE",
        gnamed: "GNA MED"
      },
      preciosLabels: {
        gasoilvigo: "Gasoil Vigo",
        gasolinafirstvigo: "Gasolina 1ª Vigo",
        gasolinasecondvigo: "Gasolina 2ª Vigo",
        gasoilhuelva: "Gasoil Huelva",
        gasolinafirsthuelva: "Gasolina 1ª Huelva",
        gasolinasecondhuelva: "Gasolina 2ª Huelva",
        gasoilmerida: "Gasoil Mérida"
      }
    };
  },
  methods: {
    // Obtener los últimos datos guardados en la BD
    async fetchLatestValues() {
      try {
        const cierreResponse = await axios.get("https://petroxpertbackend.fly.dev/cierre-ultimo");
        console.log(cierreResponse);
        if (cierreResponse.data && cierreResponse.data.id) {
          Object.keys(cierreResponse.data).forEach(key => {
            if (key !== "id" && key !== "created_at") {
              cierreResponse.data[key] = parseFloat(cierreResponse.data[key]);
            }
          });
          this.formData.cierre = { ...cierreResponse.data };
          delete this.formData.cierre.id;
          delete this.formData.cierre.created_at;
        }

        const preciosResponse = await axios.get("https://petroxpertbackend.fly.dev/precios-ciudades-ultimo");
        if (preciosResponse.data && preciosResponse.data.id) {
          Object.keys(preciosResponse.data).forEach(key => {
            if (key !== "id" && key !== "created_at") {
              this.formData.precios[key] = parseFloat(preciosResponse.data[key]);
            }
          });
        }
      } catch (error) {
        console.error("❌ Error al obtener los datos de la BD:", error);
      }
    },
    // Guardar los valores en la BD
    async submitForm() {
      try {
        await axios.post("https://petroxpertbackend.fly.dev/insert-cierre", this.formData.cierre);
        await axios.post("https://petroxpertbackend.fly.dev/insert-precios-ciudades", this.formData.precios);
        alert("✅ Datos guardados correctamente");
      } catch (error) {
        console.error("❌ Error al guardar en la BD:", error);
        alert("Error al guardar los datos");
      }
    }
  },
  mounted() {
    this.fetchLatestValues();
  }
};
</script>

<style scoped>
.form-container {
  background-color: #152f52cb;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
.separator {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto 15px auto;
  border-radius: 2px;
}
.section-title {
  color: white;
  text-align: center;
  margin-bottom: 15px;
  margin-left: 175px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.section-title2 {
  color: white;
  text-align: center;
  margin-bottom: 15px;
  margin-left: 100px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

label {
  flex: 1;
  font-weight: bold;
  color: #ffffff;
}

input {
  flex: 2;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #152f52;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
}

button:hover {
  background-color: #34373b;
}

.form-container {
  background-color: #152f52cb;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
.separator {
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto 15px auto;
  border-radius: 2px;
}
.section-title {
  color: white;
  text-align: center;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
}
</style>
