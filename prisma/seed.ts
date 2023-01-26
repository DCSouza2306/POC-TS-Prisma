import prisma from "../src/database/database.js";

async function main() {
    await prisma.colors.createMany({
        data: [
            {
                name: "Preto"
            },
            {
                name: "Branco"
            },
            {
                name: "Cinza"
            }
        ]
    })
    await prisma.carmakers.createMany({
        data: [
            {
                name: "Fiat"
            },
            {
                name: "Chevrolet"
            }
        ]
    })
    await prisma.models.createMany({
        data: [
            {
                carmaker_id: 1,
                name: "Strada",
                year: 2020
            },
            {
                carmaker_id: 2,
                name: "Onix",
                year: 2021
            }
        ]
    })
    await prisma.vehicles.createMany({
        data: [
            {
                color_id: 3,
                model_id: 1,
                license_plate: "RBG9I80",
                price_per_day: 150000,
            },
            {
                color_id: 1,
                model_id: 2,
                license_plate: "RBE6I98",
                price_per_day: 145000,
            }
        ]
    })

}

main()
    .then(() => { console.log("Registro realizado com sucesso") })
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect()
    })