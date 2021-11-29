const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Diarist = sequelize.define(
        'Diarist',
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
              phone: {
                type: DataTypes.STRING(20),
                allowNull: false
              },
              street: {
                type: DataTypes.STRING(80),
                allowNull: false,
              },
              number: {
                type: DataTypes.STRING(20),
                allowNull: false,
              },
              city: {
                type: DataTypes.STRING(40),
                allowNull: false,
              },
              state: {
                type: DataTypes.STRING(40),
                allowNull: false,
              },
              daily_rate: {
                type: DataTypes.DOUBLE,
                allowNull: false
              },
              note: {
                type: DataTypes.STRING(80),
                allowNull: true
              },
              password: {
                type: DataTypes.VIRTUAL,
              },
              password_hash: {
                type: DataTypes.STRING(80),
              }
        },
        {
          hooks: {
            beforeCreate: async (user) => {
              if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
              }

              return [user.password_hash];
            }
          }
        }
    )

    return Diarist
}