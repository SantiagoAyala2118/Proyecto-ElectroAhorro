// hooks/useEnergyCalculator.js
import { useState, useEffect } from 'react';

export const useEnergyCalculator = () => {
    const [appliances, setAppliances] = useState([]);
    const [selectedAppliances, setSelectedAppliances] = useState([]);
    const [hoursOfUse, setHoursOfUse] = useState({});
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar electrodomésticos desde la API
    useEffect(() => {
        const fetchAppliances = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:4000/api/public/appliances');

                if (!response.ok) {
                    throw new Error('Error al cargar electrodomésticos');
                }

                const data = await response.json();
                setAppliances(data.appliances || []);
            } catch (err) {
                console.error('Error cargando electrodomésticos:', err);
                setError('No se pudieron cargar los electrodomésticos. Verifica que el servidor esté corriendo.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppliances();
    }, []);

    // Manejar selección de electrodomésticos
    const handleApplianceToggle = (appliance) => {
        const isSelected = selectedAppliances.some(item => item.id === appliance.id);

        if (isSelected) {
            setSelectedAppliances(selectedAppliances.filter(item => item.id !== appliance.id));
            setHoursOfUse(prev => {
                const newHours = { ...prev };
                delete newHours[appliance.id];
                return newHours;
            });
        } else {
            setSelectedAppliances([...selectedAppliances, appliance]);
            setHoursOfUse(prev => ({
                ...prev,
                [appliance.id]: 1 // Valor por defecto: 1 hora
            }));
        }
    };

    // Manejar cambio de horas de uso
    const handleHoursChange = (applianceId, hours) => {
        setHoursOfUse(prev => ({
            ...prev,
            [applianceId]: parseFloat(hours) || 0
        }));
    };

    // Calcular consumo
    const calculateConsumption = async () => {
        if (selectedAppliances.length === 0) {
            setError('Por favor selecciona al menos un electrodoméstico');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const appliancesData = selectedAppliances.map(appliance => ({
                applianceId: appliance.id,
                hoursOfUse: hoursOfUse[appliance.id] || 1
            }));

            const response = await fetch('http://localhost:4000/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ appliances: appliancesData })
            });

            if (!response.ok) {
                throw new Error('Error en el cálculo');
            }

            const data = await response.json();
            setResults(data.results);
        } catch (err) {
            console.error('Error calculando consumo:', err);
            setError('Error al calcular el consumo. Usando cálculo local...');

            // Cálculo local como fallback
            calculateLocalConsumption();
        } finally {
            setLoading(false);
        }
    };

    // Cálculo local como fallback
    const calculateLocalConsumption = () => {
        let totalDailyKwh = 0;
        let totalMonthlyKwh = 0;
        let totalYearlyKwh = 0;

        const applianceCalculations = selectedAppliances.map(appliance => {
            const hours = hoursOfUse[appliance.id] || 0;
            const dailyKwh = (appliance.potencia * hours) / 1000;
            const monthlyKwh = dailyKwh * 30;
            const yearlyKwh = dailyKwh * 365;

            totalDailyKwh += dailyKwh;
            totalMonthlyKwh += monthlyKwh;
            totalYearlyKwh += yearlyKwh;

            return {
                ...appliance,
                dailyKwh,
                monthlyKwh,
                yearlyKwh,
                hoursUsed: hours
            };
        });

        setResults({
            appliances: applianceCalculations,
            totals: {
                daily: totalDailyKwh,
                monthly: totalMonthlyKwh,
                yearly: totalYearlyKwh
            }
        });
    };

    // Limpiar resultados
    const clearResults = () => {
        setResults(null);
        setSelectedAppliances([]);
        setHoursOfUse({});
    };

    return {
        appliances,
        selectedAppliances,
        hoursOfUse,
        results,
        loading,
        error,
        handleApplianceToggle,
        handleHoursChange,
        calculateConsumption,
        clearResults
    };
};