"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const categoryData = [
    {
        title: 'starters'
    },
    {
        title: 'salads'
    },
    {
        title: 'sides'
    },
    {
        title: 'desserts'
    },
    {
        title: 'breakfast'
    },
    {
        title: 'drinks'
    },
    {
        title: 'main dishes'
    },
    {
        title: 'burgers'
    },
    {
        title: 'pizzas'
    },
];
async function main() {
    console.log(`Start seeding ...`);
    for (const u of categoryData) {
        const user = await prisma.category.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
