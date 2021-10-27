const bcrypt = require("bcrypt");

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
              phone: {
                type: DataTypes.STRING(20),
                allowNull: false
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

    return User
}