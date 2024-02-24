import { Sequelize } from "sequelize";


const sequelize = new Sequelize('rrhh','root','toor',{
    host: 'localhost',
    dialect:"mysql",
})

export default sequelize;