const { Rating, Service, User, Diarist } = require("../models");

class RatingController {
    async create(request, response) {
        const { rate, description } = request.body;
        const { id } = request.params;

        try {
            await Rating.create({
                service_id: id,
                rate,
                description
            });

            return response.status(201).send();

        } catch (error) {
            return response.status(500).send(error);
        }

    }

    async findByServiceId(request, response) {
        const { id } = request.params;

        const rating = await Rating.findOne({
            attributes: { exclude: ["service_id"]}, 
            include: [
                {
                    where: { id },
                    model: Service,
                    as: "service",
                    attributes: { exclude: ["user_id", "diarist_id"]}, 
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
                    ],
                }
            ]
        });

        return response.json(rating);
    }
}

module.exports = { RatingController }