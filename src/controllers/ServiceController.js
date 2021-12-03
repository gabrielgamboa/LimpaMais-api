const { Service, User, Diarist } = require("../models");
class ServiceController {
    async create(request, response) {

        const { user_id, diarist_id } = request.body;

        try {
            await Service.create({
                user_id,
                diarist_id,
                appointment_date: new Date(),
                status: "created"
            });

            return response.status(201).send();

        } catch (error) {
            return response.status(500).send(error)
        }
    }

    async findServiceById(request, response) {
        const { id } = request.params;

        try {
            const service = await Service.findOne({
                where: { id },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["name", "email", "phone", "street", "number", "city", "state"]
                    },
                    {
                        model: Diarist,
                        as: "diarist",
                        attributes: ["name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note"]
                    }
                ]
            });

            return response.json(service);


        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { ServiceController }