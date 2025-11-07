import { useState, useEffect } from 'react';
import { electrodomesticosService } from '../services/electrodomesticosService'; // Ruta CORRECTA

export const useElectrodomesticos = () => {
    const [electrodomesticos, setElectrodomesticos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadElectrodomesticos();
    }, []);

    const loadElectrodomesticos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await electrodomesticosService.getElectrodomesticos();
            console.log('Datos recibidos del servicio:', data); // Para debug
            setElectrodomesticos(data);
        } catch (err) {
            setError(err.message || 'Error al cargar electrodomésticos');
            console.error('Error en useElectrodomesticos:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        electrodomesticos,
        loading,
        error,
        refetch: loadElectrodomesticos
    };
};