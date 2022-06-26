import {DataSource} from "typeorm";
import {dirname} from "path"


const connectToDatabase = async () => {
    const dataSource = new DataSource(
        {
            type: "mysql",
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            entities:[`${dirname(__dirname)}/entities/*.ts`],
            synchronize: true
        }
    )
    await dataSource.initialize();
}

export {connectToDatabase};