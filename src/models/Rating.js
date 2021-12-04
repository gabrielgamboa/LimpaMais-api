module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define(
        "Rating",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            rate: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(200),
                allowNull: true
            }
        }
    );

    Rating.associate = (models) => {
        Rating.belongsTo(models.Service, { as: "service", foreignKey: "service_id" });
    }

    return Rating;
}
