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
        type: DataTypes.STRING,
        allowNull: false
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lifeSpan: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING, 
        defaultValue: "https://i.pinimg.com/originals/79/70/45/797045541e31863cbf817b4b2306480a.jpg"
    }
  });
};
