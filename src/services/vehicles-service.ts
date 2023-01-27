
import vehiclesRepository from "../repository/vehicles-repository.js";

async function getVehicles() {
    try {
        const data = await vehiclesRepository.getVehicles();
        const vehicles: object[] = [];
        for (let i = 0; i < data.length; i++) {
            vehicles.push({
                model: data[i].models.name,
                carMaker: data[i].models.carmakers.name,
                year: data[i].models.year,
                licensePlate: data[i].license_plate,
                status: data[i].status,
                pricePerDay: data[i].price_per_day
            })
        }
        return vehicles;
    } catch (error) {
        throw error
    }
}

const vehiclesService = {
    getVehicles
};

export default vehiclesService