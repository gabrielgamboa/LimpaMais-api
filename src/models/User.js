module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
              },
              name: {
                type: DataTypes.STRING(80),
                allowNull: false
              },
              email: {
                type: DataTypes.STRING(80),
                allowNull: false
              },
              password: {
                type: DataTypes.STRING(80),
                allowNull: false
              },
        }
    )

    return User
}