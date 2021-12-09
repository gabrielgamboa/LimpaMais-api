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

    async findRatingByServiceId(request, response) {
        const { id } = request.params;

        try {
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
                                attributes: ["id","name", "email", "phone", "street", "number", "city", "state"]
                            },
                            {
                                model: Diarist,
                                as: "diarist",
                                attributes: ["id","name", "email", "phone", "street", "number", "city", "state", "daily_rate", "note"]
                            }
                        ],
                    }
                ]
            });

            if (!rating) 
                return response.status(404).json({error: "Não há uma avaliação para esse serviço"});
    
            return response.json(rating);

        } catch (error) {
            return response.status(500).send(error);
        }
    }
}

module.exports = { RatingController }