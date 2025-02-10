<template>
  <div class="informe-container">
    <h2 class="informe-title">📄 Informe Diario</h2>
    <div class="separator"></div> <!-- Barra horizontal fina -->
    
    <div class="informe-box">
      <div v-if="loading" class="loading">Cargando informe...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="informe-content">
        <p class="informe-text">{{ informe.texto }}</p>
        <p class="informe-date">📅 Fecha: {{ formatFecha(informe.fecha) }}</p>
      </div>
    </div>

    <br>
    <div class="separator"></div> <!-- Barra horizontal fina -->
    <br>

    <!-- 🔹 Sección para añadir un informe -->
    <h2 class="informe-title">Nuevo Informe</h2>
    <form @submit.prevent="submitInforme">
      <div class="form-group">
        <textarea id="texto" cols="150" v-model="informeTexto" rows="15" required></textarea>
      </div>
      <br>
      <button type="submit" :disabled="isSaving">
        {{ isSaving ? "Guardando..." : "Guardar Informe" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      informe: {
        texto: "",
        fecha: ""
      },
      informeTexto: "", // 📌 Campo para el nuevo informe
      loading: true,
      error: null,
      isSaving: false, // 📌 Estado para evitar doble envío
    };
  },
  methods: {
    async fetchInforme() {
      try {
        const response = await axios.get("https://petroxpertbackend.fly.dev/informes");
        if (response.data.length > 0) {
          this.informe = response.data[0]; // Tomamos el último informe guardado
        } else {
          this.error = "No hay informes disponibles.";
        }
      } catch (error) {
        console.error("Error al obtener el informe:", error);
        this.error = "Error al cargar el informe.";
      } finally {
        this.loading = false;
      }
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    async submitInforme() {
      if (!this.informeTexto.trim()) {
        alert("El informe no puede estar vacío.");
        return;
      }
      this.isSaving = true;

      try {
        await axios.post("https://petroxpertbackend.fly.dev/insert-informe", {
          texto: this.informeTexto,
        });

        alert("✅ Informe guardado correctamente");

        // 📌 Actualizar la pantalla con el nuevo informe sin recargar
        this.informe = {
          texto: this.informeTexto,
          fecha: new Date().toISOString(), // Simula la fecha actual
        };
        this.informeTexto = ""; // Vaciar campo de texto
      } catch (error) {
        console.error("❌ Error al guardar el informe:", error);
        alert("Error al guardar el informe");
      } finally {
        this.isSaving = false;
      }
    }
  },
  mounted() {
    this.fetchInforme();
  }
};
</script>

<style scoped>
.informe-container {
  background-color: #152f52cb;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 80%;
  margin: 40px auto;
  text-align: center;
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.informe-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 30px;
}

.informe-box {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
}

.separator {
  width: 80%;
  height: 2px; /* Muy fina */
  background-color: rgba(255, 255, 255, 0.5); /* Color blanco con opacidad */
  margin: 0 auto 15px auto; /* Centrada y con espacio debajo */
  border-radius: 2px;
}

.loading {
  font-size: 18px;
  color: #777;
}

.error-message {
  color: red;
  font-size: 18px;
}

.informe-content {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.informe-text {
  font-size: 18px;
  color: #333;
  line-height: 1.5;
}

.informe-date {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
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

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
