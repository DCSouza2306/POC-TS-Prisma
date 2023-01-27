export type ErrorModel = {
    name: string,
    message: string
};

export type vehicles = [{
    model: string,
    carMaker: string,
    year: number,
    licensePlate: string,
    status: string,
    pricePerDay: number
}]