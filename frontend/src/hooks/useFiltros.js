import { useState, useMemo } from 'react';

export const useFiltros = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentConsumption, setCurrentConsumption] = useState('all');

  const categorias = [
    { id: 'all', name: 'Todos' },
    { id: 'cocina', name: 'Cocina' },
    { id: 'lavanderia', name: 'Lavandería' },
    { id: 'climatizacion', name: 'Climatización' },
    { id: 'entretenimiento', name: 'Entretenimiento' },
    { id: 'iluminacion', name: 'Iluminación' },
    { id: 'oficina', name: 'Oficina' }
  ];

  const nivelesConsumo = [
    { id: 'all', name: 'Todos' },
    { id: 'bajo', name: 'Bajo' },
    { id: 'medio', name: 'Medio' },
    { id: 'alto', name: 'Alto' }
  ];

  const filtrarProductos = (productos) => {
    return productos.filter(producto => {
      const coincideCategoria = currentCategory === 'all' || producto.category === currentCategory;
      const coincideConsumo = currentConsumption === 'all' || producto.consumptionLevel === currentConsumption;
      return coincideCategoria && coincideConsumo;
    });
  };

  return {
    currentCategory,
    currentConsumption,
    setCurrentCategory,
    setCurrentConsumption,
    categorias,
    nivelesConsumo,
    filtrarProductos
  };
};