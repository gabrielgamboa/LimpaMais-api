const { Service } = require("../models");
class ServiceController {
    async create(request, response) {
        const { user_id, diarist_id, appointment_date } = request.body;

        try {
            await Service.create({
                user_id,
                diarist_id,
                appointment_date
            });

            return response.status(201).send();

        } catch (error) {
            return response.status(500).send(error)
        }
    }
}

module.exports = { ServiceController }