// components/ApplianceList.jsx
export const ApplianceList = ({
    appliances,
    selectedAppliances,
    hoursOfUse,
    onApplianceToggle,
    onHoursChange,
    loading
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Cargando electrodomésticos...</span>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-96 overflow-y-auto">
            {appliances.map(appliance => (
                <div key={appliance.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                    <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedAppliances.some(item => item.id === appliance.id)}
                            onChange={() => onApplianceToggle(appliance)}
                            className="mt-1 h-5 w-5 text-green-600 focus:ring-green-500"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold text-gray-800">{appliance.nombre}</span>
                                    <p className="text-sm text-gray-600">{appliance.marca} - {appliance.modelo}</p>
                                    <p className="text-sm text-gray-500">Potencia: {appliance.potencia}W</p>
                                </div>
                                {appliance.consumo_promedio && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {appliance.consumo_promedio} kWh
                                    </span>
                                )}
                            </div>

                            {selectedAppliances.some(item => item.id === appliance.id) && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                                        <span>Horas de uso por día:</span>
                                        <input
                                            type="number"
                                            min="0"
                                            max="24"
                                            step="0.5"
                                            value={hoursOfUse[appliance.id] || 0}
                                            onChange={(e) => onHoursChange(appliance.id, e.target.value)}
                                            className="ml-2 border border-gray-300 rounded px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-green-300 focus:border-green-500"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </label>
                </div>
            ))}
        </div>
    );
};

