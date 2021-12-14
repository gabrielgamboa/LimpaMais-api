const bcrypt = require("bcrypt");
const { User, Diarist, Service, Rating } = require("../models");

class UserController {
    async create(request, response) {
        const { name, email, password, phone, street, number, city, state } = request.body;

        try {
            const userAlreadyExists = await User.findOne({ where: { email } });

            if (userAlreadyExists)
                return response.status(400).json({ error: "Já existe um usuário cadastrado com este e-mail." });

            await User.create({
                name,
                email,
                phone,
                street,
                number,
                city,
                state,
                password,
            });

            return response.status(201).send();

        } catch (error) {
            return response.status(500).send(error);
        }
    }

    async find(request, response) {
        const { id } = request.params;

        try {
            const user = await User.findOne({ 
                where: { id },
                attributes: { exclude: ["password_hash"]} 
            });

            if (!user) {
                return response.status(400).json({ error: "Usuário não encontrado" });
            }

            return response.json(user);
        } catch (error) {

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

    async update(request, response) {
        const { id } = request.params;
        const { name, email, password, phone, street, number, city, state } = request.body;

        const user = await User.findOne({ where: { id }});

        if (!user) return response.status(404).json({error: "Usuário não encontrado"});

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if (phone) user.phone = phone;
        if (street) user.street = street;
        if (number) user.number = number;
        if (city) user.city = city;
        if (state) user.state = state;

        await user.save();

        return response.json(user);
        
    }

    async upload(request, response) {
        const { file } = request;
        console.log(file);

        return response.send();
    }

    async findServicesByUserId(request, response) {
        const { id } = request.params;

        try {
            const services = await Service.findAll({
                where: { user_id: id },
                include: [
                    {
                        model: Diarist,
                        as: "diarist",
                        attributes: ["id","name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note"]
                    },
                    {
                        model: Rating,
                        as: "rating",
                    }
                ]
            });

            return response.json(services);

        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    }
}

module.exports = { UserController };