# POC-TS-Prisma

This is an API created to manage the cars of a rental company, where initially there are only functionalities for including, reading, editing and deleting vehicles, car makers and models.

## Tecnologies
Typescript, Node.js, Prisma

## How to Run

1. Clone this repository
2. Install all dependencies
```bash
npm i
```
3. Create a PostgreSQL database with whatever name you want
4. Configure the `env.development` file using the `env.example` file
5. Run all migrations

``` bash
npm run migration:run
```

6. Seed db
```bash
npm run prisma:seed
```

7. Run the back-end in a development environment:

```bash
npm run dev
```