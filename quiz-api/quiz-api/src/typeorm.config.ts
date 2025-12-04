import { Term } from "src/entities/term.entity";
import { ConnectionOptions } from "typeorm";


export const TypeOrmConfig : ConnectionOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'pass',
    entities: [Term],
    synchronize: true
}