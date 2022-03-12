const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  sequelize.define('breed', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lifeSpan: {
        type: DataTypes.STRING
    }
  });
};
