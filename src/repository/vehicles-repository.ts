import prisma from "../database/database.js";

async function getVehicles() {
    try {
        return prisma.vehicles.findMany({
            include: {
                models: {
                    include: { carmakers: { select: { name: true } } }
                },
                colors: { select: { name: true } }
            }
        })
    } catch (error) {
        throw error
    }
}

const vehiclesRepository = {
    getVehicles
};

export default vehiclesRepository;