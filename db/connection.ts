import { Sequelize} from "sequelize";

const db = new Sequelize('node', 'root', 'mysql1234', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});

export default db;