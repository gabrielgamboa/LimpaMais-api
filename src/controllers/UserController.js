const { User } = require("../models");

class UserController {
    async create(request, response) {
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

            return response.status(201).json(user);

        } catch (error) {
            return response.status(500).send(error);
        }
    }
}

module.exports = { UserController };