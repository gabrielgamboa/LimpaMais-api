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

    async find(request, response) {
        const { id } = request.params;

        try {

            const diarist = await Diarist.findOne({
                where: { id },
                attributes: { exclude: ["password_hash"]}
            });

            if (!diarist) return response.status(400).json({ error: "Diarista não encontrada" });

            return response.json(diarist);

        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    }

    async list(request, response) {
        const { city } = request.query;

        if (city) {
            const diaristsByCity = await Diarist.findAll({
                where: { city },
                attributes: ["name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note"],
            });

            return response.json(diaristsByCity);
        }

        const diarists = await Diarist.findAll({
            attributes: ["name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note"]
        });

        return response.json(diarists);
    }

    async count(request, response) {
        const result = await Diarist.count();
        return response.json(result);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, password, phone, street, number, city, state, daily_rate, note } = request.body;

        const diarist = await Diarist.findOne({ where: { id }});

        if (!diarist) return response.status(404).json({error: "Usuário não encontrado"});

        if (name) diarist.name = name;
        if (email) diarist.email = email;
        if (password) diarist.password = password;
        if (phone) diarist.phone = phone;
        if (street) diarist.street = street;
        if (number) diarist.number = number;
        if (city) diarist.city = city;
        if (state) diarist.state = state;
        if (daily_rate) diarist.daily_rate = daily_rate;
        if (note) diarist.note = note;

        await diarist.save();

        return response.json(diarist);
        
    }
}

module.exports = { DiaristController }