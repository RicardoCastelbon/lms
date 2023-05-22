# next-auth-trpc-prisma

Next Auth with tRPC and Prisma 🎃

## Installation

You will need node on at least version 16
[Download Node.js here](https://nodejs.org/en/download).
Make sure to have typescript installed, if not you can visit this page [How to install typescript](https://www.typescriptlang.org/download). Yarn is used as package manager, so if you don't have that installed you can run `npm install --global yarn`

You will also need MAMP or XAMPP to run the database server. MAMP is recommended for its ease of installation. [Download MAMP here](https://www.mamp.info/en/downloads/)

Then:

1. Clone the repo

2. Open a terminal and navigate to the root of the project, then run "yarn" (without quotation) to install all dependencies required.

3. Create a .env file copy from the .env.sample (setup for local development)

4. Generate the prisma client by running `yarn prisma generate`

5. Generate and build the database by running `yarn prisma db push` (Make sure mamp is started and running)

6. Finally populate the database with boilerplate content from the seeder by running `yarn prisma db seed`
