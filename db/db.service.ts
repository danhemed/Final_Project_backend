import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Sequelize } from 'sequelize';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
    public sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize(process.env.POSTGRES_CONNECTION || "", {
            dialect: 'postgres',
            pool: {
                max: 20,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    }

    async onModuleInit() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connected successfully'); 
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.sequelize.close();
    }

    getSequelize(): Sequelize {
        return this.sequelize;
    }

    async syncDatabase(force: boolean = false) {
        try {
            await this.sequelize.sync({ force });
            console.log('Database synced successfully');
        } catch (error) {
            console.error('Database sync failed:', error);
            throw error;
        }
    }
}