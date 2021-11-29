const bcrypt = require("bcrypt");
const { Diarist } = require("../models");

class DiaristController {
    async create(request, response) {
        const { name, email, phone, daily_rate, note, password } = request.body;

        try {
            const diaristAlreadyExists = await Diarist.findOne({ where: { email } });

            if (diaristAlreadyExists)
                return response.status(400).json({ error: "Já existe um usuário cadastrado com este e-mail." });

            await Diarist.create({
                name,
                email,
                phone,
                daily_rate,
                note,
                password,
            });

            return response.status(201).send();

        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    }

    async list(request, response) {
        const diarists = await Diarist.findAll({
            attributes: ["name", "email", "phone", "daily_rate", "note"]
        });

        return response.json(diarists);
    }
}

module.exports = { DiaristController }