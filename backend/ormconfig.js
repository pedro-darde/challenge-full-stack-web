module.exports = {
  type: process.env.DB_TYPE,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  migrations: [__dirname + "/src/database/migrations/*{.ts,.js}"],
  entities: [__dirname + "/src/models/*{.ts,.js}"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  cache: false,
};
