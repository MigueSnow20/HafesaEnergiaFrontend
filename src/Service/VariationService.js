import axios from 'axios';

const BACKEND_URL = 'https://petroxpertbackend.fly.dev';
export default class VariationsService {
  
  // Obtener datos desde el scraping
  async getScrapedGasoil() {
    try {
      const response = await axios.get(`${BACKEND_URL}/scrape-gasoil`);
      return parseFloat(response.data.gasoil);
    } catch (error) {
      console.error('❌ Error al obtener gasoil desde el scraping:', error);
      throw error;
    }
  }

  async getScrapedGasolina() {
    try {
      const response = await axios.get(`${BACKEND_URL}/scrape-gasolina`);
      return parseFloat(response.data.gasolina);
    } catch (error) {
      console.error('❌ Error al obtener gasolina desde el scraping:', error);
      throw error;
    }
  }

  async getScrapedTipoCambio() {
    try {
      const response = await axios.get(`${BACKEND_URL}/scrape-tipo-cambio`);
      return parseFloat(response.data.tipoCambio);
    } catch (error) {
      console.error('❌ Error al obtener tipo de cambio desde el scraping:', error);
      throw error;
    }
  }

  // Obtener datos desde la base de datos
  async getLastSavedData() {
    try {
      const response = await axios.get(`${BACKEND_URL}/cierre-ultimo`);
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener los últimos datos guardados:', error);
      throw error;
    }
  }

  async getDeltanwe() {
    try {
      const data = await this.getLastSavedData();
      return parseFloat(data.deltanwe);
    } catch (error) {
      console.error('❌ Error al obtener deltanwe desde la base de datos:', error);
      throw error;
    }
  }

  async getDeltamed() {
    try {
      const data = await this.getLastSavedData();
      return parseFloat(data.deltamed);
    } catch (error) {
      console.error('❌ Error al obtener deltamed desde la base de datos:', error);
      throw error;
    }
  }

  async getGna() {
    try {
      const data = await this.getLastSavedData();
      return parseFloat(data.gna);
    } catch (error) {
      console.error('❌ Error al obtener gna desde la base de datos:', error);
      throw error;
    }
  }

  async getGnanwe() {
    try {
      const data = await this.getLastSavedData();
      return parseFloat(data.gnanwe);
    } catch (error) {
      console.error('❌ Error al obtener gnanwe desde la base de datos:', error);
      throw error;
    }
  }

  async getGnamed() {
    try {
      const data = await this.getLastSavedData();
      return parseFloat(data.gnamed);
    } catch (error) {
      console.error('❌ Error al obtener gnamed desde la base de datos:', error);
      throw error;
    }
  }
  

  async getDivisa() {
    try {
      const data = await this.getLastSavedData();
      return parseFloat(data.divisa);
    } catch (error) {
      console.error('❌ Error al obtener divisa desde la base de datos:', error);
      throw error;
    }
  }

  // Método que realiza todas las operaciones y cálculos
  async getAllData() {
    try {
      // Obtener valores desde el scraping y la base de datos
      const [gasoil, tipoCambio, deltanwe, deltamed, divisa, gna, gasolina, gnamed, gnanwe] = await Promise.all([
        this.getScrapedGasoil(),
        this.getScrapedTipoCambio(),
        this.getDeltanwe(),
        this.getDeltamed(),
        this.getDivisa(),
        this.getGna(),
        this.getScrapedGasolina(),
        this.getGnamed(),
        this.getGnanwe(),
      ]);

      // Calcular cotizaciones
      const cotizacionGasoilnwe = ((gasoil + deltanwe) * 0.845) / tipoCambio;
      const cotizacionGasoilCierrenwe = ((gasoil + deltanwe) * 0.845) / divisa;
      const cotizacionGasoilmed = ((gasoil + deltamed) * 0.845) / tipoCambio;

      // Nueva variación del gasoil
      const variacionGasoil = cotizacionGasoilnwe - cotizacionGasoilCierrenwe;

            // Nueva variación del gasoil
      const gna_aeuro = ((gna / divisa) / 3.78541) * 1000;  // RBOB de $/galón a €/m3
      const precio_gasolina = ((gasolina / tipoCambio) / 3.78541) * 1000;  // Precio gasolina €/m3
      const variacion_gasolina = precio_gasolina - gna_aeuro;  // Variación de la gasolina

      // Formatear los resultados a 2 decimales
      const resultado = {
        cotizacionGasoilnwe: parseFloat(cotizacionGasoilnwe.toFixed(2)),
        cotizacionGasoilCierrenwe: parseFloat(cotizacionGasoilCierrenwe.toFixed(2)),
        variacionGasoil: parseFloat(variacionGasoil.toFixed(2)),
        tipoCambio: parseFloat(tipoCambio.toFixed(4)),
        gasoilScraped: parseFloat(gasoil.toFixed(2)),
        variacionGasolina: parseFloat(variacion_gasolina.toFixed(2)),
        gasolinaScraped: parseFloat(gasolina.toFixed(2)),
        cotizacionGasoilmed: parseFloat(cotizacionGasoilmed.toFixed(2))
      };

      return resultado;
    } catch (error) {
      console.error('❌ Error al obtener todos los datos:', error);
      throw error;
    }
  }
}
