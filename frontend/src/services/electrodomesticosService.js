import api from './api';

export const electrodomesticosService = {
  getElectrodomesticos: async () => {
    try {
      const response = await api.get('/api/public/appliances');
      console.log('Respuesta completa del backend:', response); // Para debug
      
      // La respuesta puede estar en response.data.appliances o response.data
      const appliances = response.data.appliances || response.data;
      console.log('Electrodomésticos recibidos:', appliances);
      
      if (!appliances || !Array.isArray(appliances)) {
        console.warn('No se recibió un array de electrodomésticos:', appliances);
        return [];
      }
      
      return appliances.map(appliance => mapearElectrodomestico(appliance));
    } catch (error) {
      console.error('Error fetching electrodomesticos:', error);
      return []; // Devolver array vacío en caso de error
    }
  }
};

// Función para mapear un electrodoméstico del backend al frontend
const mapearElectrodomestico = (appliance) => {
  if (!appliance) return null;
  
  // Determinar categoría basada en el nombre o descripción
  const categoria = determinarCategoria(appliance.nombre, appliance.descripcion);
  
  // Determinar nivel de consumo basado en la potencia
  const consumptionLevel = determinarNivelConsumo(appliance.potencia);
  
  // Determinar icono basado en la categoría
  const icon = determinarIcono(categoria);
  
  // Generar especificaciones automáticamente
  const specs = generarEspecificaciones(appliance, categoria);
  
  return {
    id: appliance.id,
    // Campos del backend mapeados al frontend
    name: appliance.nombre || 'Sin nombre',
    brand: appliance.marca || 'Sin marca',
    model: appliance.modelo || 'Sin modelo',
    description: appliance.descripcion || 'Sin descripción',
    power: appliance.potencia || 0,
    averageConsumption: appliance.consumo_promedio || 0,
    
    // Campos calculados para el frontend
    category: categoria,
    consumption: consumptionLevel,
    consumptionLevel: consumptionLevel,
    icon: icon,
    specs: specs,
    
    // Campos formateados para display
    consumo: `${appliance.consumo_promedio || 0} kWh/mes`,
    potencia: `${appliance.potencia || 0}W`
  };
};

// Función para determinar la categoría basada en el nombre
const determinarCategoria = (nombre, descripcion) => {
  if (!nombre) return 'cocina';
  
  const nombreLower = nombre.toLowerCase();
  const descripcionLower = (descripcion || '').toLowerCase();
  
  if (nombreLower.includes('aire') || nombreLower.includes('acondicionado') || nombreLower.includes('ventilador')) {
    return 'climatizacion';
  }
  if (nombreLower.includes('heladera') || nombreLower.includes('refrigerador') || nombreLower.includes('freezer')) {
    return 'cocina';
  }
  if (nombreLower.includes('tv') || nombreLower.includes('televisor') || nombreLower.includes('televisión')) {
    return 'entretenimiento';
  }
  if (nombreLower.includes('lavarropas') || nombreLower.includes('lavadora') || nombreLower.includes('secadora')) {
    return 'lavanderia';
  }
  if (nombreLower.includes('microondas') || nombreLower.includes('horno') || nombreLower.includes('cocina')) {
    return 'cocina';
  }
  if (nombreLower.includes('lámpara') || nombreLower.includes('lampara') || nombreLower.includes('luz') || nombreLower.includes('led')) {
    return 'iluminacion';
  }
  if (nombreLower.includes('computadora') || nombreLower.includes('pc') || nombreLower.includes('laptop')) {
    return 'oficina';
  }
  
  return 'cocina'; // categoría por defecto
};

// Función para determinar el nivel de consumo
const determinarNivelConsumo = (potencia) => {
  if (!potencia) return 'medio';
  if (potencia <= 100) return 'bajo';
  if (potencia <= 800) return 'medio';
  return 'alto';
};

// Función para determinar el icono basado en la categoría
const determinarIcono = (categoria) => {
  const iconos = {
    climatizacion: 'FaWind',
    cocina: 'GiKitchenScale',
    entretenimiento: 'FaTv',
    lavanderia: 'GiWashingMachine',
    iluminacion: 'FaLightbulb',
    oficina: 'FaDesktop'
  };
  return iconos[categoria] || 'GiElectric';
};

// Función para generar las especificaciones automáticamente
const generarEspecificaciones = (appliance, categoria) => {
  const specs = [
    { icon: 'FaBolt', text: `Potencia: ${appliance.potencia || 0}W` },
    { icon: 'IoMdSpeedometer', text: `Consumo: ${appliance.consumo_promedio || 0} kWh/mes` }
  ];
  
  // Agregar specs específicas por categoría
  if (categoria === 'climatizacion') {
    specs.unshift({ icon: 'FaThermometerHalf', text: 'Control de temperatura' });
  }
  if (categoria === 'cocina') {
    specs.unshift({ icon: 'IoMdSettings', text: 'Múltiples funciones' });
  }
  if (categoria === 'iluminacion') {
    specs.unshift({ icon: 'FaLightbulb', text: 'Tecnología LED' });
  }
  
  return specs;
};