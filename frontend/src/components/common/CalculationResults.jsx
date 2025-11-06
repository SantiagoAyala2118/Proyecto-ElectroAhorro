// components/CalculationResults.jsx
export const CalculationResults = ({ results, onClear }) => {
    if (!results) return null;

    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">Resultados del Cálculo</h2>
                <button
                    onClick={onClear}
                    className="text-sm text-green-700 hover:text-green-900 font-medium"
                >
                    Nuevo Cálculo
                </button>
            </div>

            {/* Totales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-gray-700 text-sm">Consumo Diario</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{results.totals.daily.toFixed(2)} kWh</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-gray-700 text-sm">Consumo Mensual</h3>
                    <p className="text-2xl font-bold text-orange-600 mt-1">{results.totals.monthly.toFixed(2)} kWh</p>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-semibold text-gray-700 text-sm">Consumo Anual</h3>
                    <p className="text-2xl font-bold text-green-600 mt-1">{results.totals.yearly.toFixed(2)} kWh</p>
                </div>
            </div>

            {/* Detalle por electrodoméstico */}
            <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-3 text-lg">Detalle por electrodoméstico:</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {results.appliances.map(appliance => (
                        <div key={appliance.id} className="flex justify-between items-center bg-white p-3 rounded border">
                            <div>
                                <span className="font-medium text-gray-800">{appliance.nombre}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                    ({appliance.hoursUsed}h × {appliance.potencia}W)
                                </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                                {appliance.dailyKwh.toFixed(2)} kWh/día
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

