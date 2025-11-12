import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Ajusta la ruta si es diferente

export const MonthlyConsumptionModel = sequelize.define('MonthlyConsumption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Ajusta si el nombre de la tabla es diferente
            key: 'id',
        },
    },
    month: {
        type: DataTypes.STRING, // Formato 'YYYY-MM'
        allowNull: false,
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'monthly_consumptions',
    timestamps: true,
});

export default MonthlyConsumptionModel;
