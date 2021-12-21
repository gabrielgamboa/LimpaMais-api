const bcrypt = require("bcrypt");
const {QueryTypes} = require('sequelize');

const db = require("../models");
const { Diarist, User, Service, Rating } = require("../models");

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
        const { id: diarist_id } = request.params;

        const diarists = await Diarist.findOne({
            where: { id: diarist_id },
            attributes: { exclude: ["password_hash"] },
            include: [
                {
                    model: Service,
                    as: "services",
                    include: [
                        {
                            model: Rating,
                            as: "rating"
                        },
                        {
                            model: User,
                            as: "user",
                        }
                    ]
                }
            ]
        });

        const { services } = diarists;
        
        const [averageRateResult] = await db.sequelize.query(`SELECT AVG(R.rate) as average_rate FROM RATINGS R JOIN SERVICES S ON R.service_id = S.id WHERE S.diarist_id = ${diarist_id}`, { type: QueryTypes.SELECT });
        const { average_rate } = averageRateResult;

        console.log(averageRateResult)
        console.log(average_rate)

        const ratings = services.map(service => {
            const { user } = service;
            const { id, rate, description, createdAt} = service.rating;

            return {
                id,
                user,
                rate,
                description,
                createdAt
            };
        });

        const {id, name, email, phone, street, number, city, state, daily_rate, note, url_photo} = diarists.dataValues;

        return response.json({
            id,
            name,
            email,
            phone,
            street,
            number,
            city,
            average_rate,
            state,
            daily_rate,
            note,
            url_photo,
            ratings
        });
    }

    async findServicesByDiaristId(request, response) {
        const { id } = request.params;

        try {
            const services = await Service.findAll({
                where: { diarist_id: id },
                attributes: { exclude: ["user_id", "diarist_id"] },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "name", "email", "phone", "street", "number", "city", "state"]
                    },
                ]
            });

            return response.json(services);

        } catch (error) {
            console.log(error)
        }
    }

    async list(request, response) {
        const { city, sort } = request.query;

        try {
            const query = {
                attributes: ["id", "name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note", "url_photo"]
            };

            if (city) query.where = { city };
            if (sort) query.order = [["daily_rate", sort]];

            const diarists = await Diarist.findAll(query);

            if (diarists.length === 0)
                return response.status(404).json({ error: "Não foi encontrado diaristas" });

            return response.json(diarists);

        } catch (error) {
            return response.status(500).send(error);
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, password, phone, street, number, city, state, daily_rate, note } = request.body;

        const diarist = await Diarist.findOne({ where: { id } });

        if (!diarist) return response.status(404).json({ error: "Diarista não encontrada" });

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

    async upload(request, response) {
        const { location: url_photo } = request.file;
        const { id } = request.params;

        await Diarist.update(
            { url_photo },
            { where: { id } }
        );

        return response.status(204).send();
    }


}

module.exports = { DiaristController }