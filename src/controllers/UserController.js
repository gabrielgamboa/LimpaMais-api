const bcrypt = require("bcrypt");
const { User } = require("../models");

class UserController {
    async store(request, response) {
        const { name, email, password } = request.body;

        try {
            const userAlreadyExists = await User.findOne({ where: { email } });

            if (userAlreadyExists)
                return response.status(400).json({ error: "Já existe um usuário cadastrado com este e-mail." });

            const user = await User.create({
                name,
                email,
                password,
            });

            const { id, name, email } = user;

            return response.status(201).json({
                id,
                name,
                email
            });

        } catch (error) {
            return response.status(500).send(error);
        }
    }

    async login(request, response) {
        const { email, password } = request.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user)
                return response.status(404).json({ error: "E-mail ou senha incorretos" });

            const passwordIsValid = await bcrypt.compare(password, user.password_hash);

            if (!passwordIsValid)
                return response.status(404).json({ error: "E-mail ou senha incorretos" });


            return response.json({
                id: user.id,
                name: user.name,
                email: user.email
            });

        } catch (error) {
            return response.status(500).send(error);
        }
    }
}

module.exports = { UserController };