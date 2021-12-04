const { Rating, Service } = require("../models");

class RatingController {
    async create(request, response) {
        const { service_id, rate, description } = request.body;

        try {
            await Rating.create({
                service_id,
                rate,
                description
            });

            return response.status(201).send();

        } catch (error) {
            return response.status(500).send(error);
        }

    }

    async find(request, response) {
        const { id } = request.params;

        const ratings = await Rating.findOne({
            where: { id },
            include: [
                {
                    model: Service,
                    as: "service",
                }
            ]
        });
        return response.json(ratings)
    }
}

module.exports = { RatingController }