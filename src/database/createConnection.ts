import {DataSource, DataSourceOptions} from "typeorm";
import {dirname} from "path";

const connectionOptions =
    {
        type: "mysql",
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: [`${dirname(__dirname)}/entities/{*.ts,*.js}`],
        synchronize: true,

    } as DataSourceOptions;


const connectToDatabase = async () => {
    const dataSource = new DataSource(
        connectionOptions
    )

    await dataSource.initialize();
}

export {connectToDatabase};