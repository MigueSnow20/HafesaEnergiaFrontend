<template>
  <div class="precios-container">
    <h2 class="precios-title">📊 Precios del Mercado</h2>
    <div class="separator"></div> <!-- Barra horizontal fina -->

    <div >
      <div v-if="loading" class="loading">Cargando datos...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else>
        <table class="precios-table">
          <thead>
            <tr>
              <th>Terminales</th>
              <th>GOA</th>
              <th>GOA+</th>
              <th>Gna95</th>
              <th>Gna95+</th>
              <th>Gna98</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="terminales">CLH VIGO</td>
              <td>{{ dataVariations.cotizacionGasoilnwe + formData.precios.gasoilvigo }}</td>
              <td>{{ (dataVariations.cotizacionGasoilnwe + formData.precios.gasoilvigo) + 1.5 }}</td>
              <td>{{ (dataVariations.variacionGasolina + formData.cierre.gnanwe + formData.precios.gasolinafirstvigo).toFixed(2) }}</td>
              <td>{{ ((dataVariations.variacionGasolina + formData.cierre.gnanwe + formData.precios.gasolinafirstvigo) + 1.5).toFixed(2) }}</td>
              <td>{{ (dataVariations.variacionGasolina + formData.cierre.gnanwe + formData.precios.gasolinasecondvigo).toFixed(2) }}</td>
            </tr>
            <tr>
              <td class="terminales">CLH HUELVA</td>
              <td>{{ dataVariations.cotizacionGasoilmed + formData.precios.gasoilhuelva }}</td>
              <td>{{ (dataVariations.cotizacionGasoilmed + formData.precios.gasoilhuelva) + 1.5 }}</td>
              <td>{{ (dataVariations.variacionGasolina + formData.cierre.gnamed + formData.precios.gasolinafirsthuelva).toFixed(2) }}</td>
              <td>{{ ((dataVariations.variacionGasolina + formData.cierre.gnamed + formData.precios.gasolinafirsthuelva) + 1.5).toFixed(2) }}</td>
              <td>{{ (dataVariations.variacionGasolina + formData.cierre.gnamed + formData.precios.gasolinasecondhuelva).toFixed(2) }}</td>
            </tr>
            <tr>
              <td class="terminales">CLH MÉRIDA</td>
              <td>{{ dataVariations.cotizacionGasoilmed + formData.precios.gasoilmerida }}</td>
              <td>{{ (dataVariations.cotizacionGasoilmed + formData.precios.gasoilmerida) + 1.5 }}</td>
              <td>-</td> <!-- No hay datos de gasolina para Mérida -->
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    dataVariations: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
      loading: true,
      error: null
    };
  },
  methods: {
    async fetchLatestValues() {
      try {
        const cierreResponse = await axios.get("https://petroxpertbackend.fly.dev/cierre-ultimo");
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
          console.log(dataVariations);
      } catch (error) {
        console.error("❌ Error al obtener los datos de la BD:", error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchLatestValues();
  }
};
</script>

<style scoped>
.precios-container {
  background-color: #152f52cb;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 80%;
  margin: 40px auto;
  text-align: center;
}

.precios-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

.separator {
  width: 80%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto 15px auto;
  border-radius: 2px;
}

.precios-box {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
}

.precios-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.precios-table th,
.precios-table td {
  padding: 12px;
  border: 1px solid #33373d;
  background-color: #edf0f7;
  color: black;
  text-align: center;
}

.precios-table th {
  background-color: #152f52;
  color: white;
}

.row-name {
  background-color: #f4f4f4;
  font-weight: bold;
  text-align: left;
}

.terminales {
  background-color: #84878f; /* Color más oscuro para los terminales */
  font-weight: bold;
  text-align: left;
  color: black;
}
</style>
