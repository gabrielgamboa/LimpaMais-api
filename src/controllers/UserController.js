const bcrypt = require("bcrypt");
const { User } = require("../models");

class UserController {
    async create(request, response) {
        const { name, email, phone, password } = request.body;

        try {

            const userAlreadyExists = await User.findOne({ where: { email } });

            if (userAlreadyExists)
                return response.status(400).json({ error: "Já existe um usuário cadastrado com este e-mail." });

            await User.create({
                name,
                email,
                phone,
                password,
            });

            return response.status(201).send();

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
                email: user.email,
                phone: user.phone
            });

        } catch (error) {
            return response.status(500).send(error);
        }
    }
}

module.exports = { UserController };