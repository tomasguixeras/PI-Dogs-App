const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('breed', {
    id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    weight: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    lifeSpan: {
        type: DataTypes.NUMBER
    }
  });
};