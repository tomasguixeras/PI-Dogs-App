const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  sequelize.define('breed', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    lifeSpan: {
        type: DataTypes.DECIMAL(10,2),
    },
    image: {
        type: DataTypes.STRING, 
        defaultValue: "https://cdn.icon-icons.com/icons2/1950/PNG/512/free-30-instagram-stories-icons68_122615.png"
    }
  });
};
