import prisma from "database/database";

export async function cleanDb(){
    await prisma.carmakers.deleteMany({})
    await prisma.colors.deleteMany({})
    await prisma.models.deleteMany({})
    await prisma.vehicles.deleteMany({})
}