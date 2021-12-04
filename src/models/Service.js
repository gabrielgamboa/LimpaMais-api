module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define(
        "Service",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            appointment_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM,
                values: ["created", "rejected", "scheduled and not rated", "scheduled and rated"],
                allowNull: false,
            },
        }
    );

    Service.associate = (models) => {
        Service.belongsTo(models.User, { as: "user", foreignKey: "user_id" });
        Service.belongsTo(models.Diarist, { as: "diarist", foreignKey: "diarist_id"});
        Service.hasMany(models.Rating, { as: "rating", foreignKey: "service_id"});
    }

    return Service;
}
