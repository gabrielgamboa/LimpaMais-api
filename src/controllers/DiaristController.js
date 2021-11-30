const bcrypt = require("bcrypt");
const { Diarist } = require("../models");

class DiaristController {
    async create(request, response) {
        const { name, email, password, phone, street, number, city, state, daily_rate, note } = request.body;

        try {
            const diaristAlreadyExists = await Diarist.findOne({ where: { email } });

            if (diaristAlreadyExists)
                return response.status(400).json({ error: "Já existe um usuário cadastrado com este e-mail." });

            await Diarist.create({
                name,
                email,
                password,
                street,
                number,
                city,
                state,
                phone,
                daily_rate,
                note,
            });

            return response.status(201).send();

        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    }

    async list(request, response) {
        const diarists = await Diarist.findAll({
            attributes: ["name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note"]
        });

        return response.json(diarists);
    }

    async result(request, response) {
        const result = await Diarist.count();
        console.log(result)
        return response.json(result);
    }
}

module.exports = { DiaristController }