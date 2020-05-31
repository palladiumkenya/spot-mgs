import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
        Logger.log(`running in ${filePath}`);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            SPOTMGS_PORT: Joi.number().default(4888),
            SPOTMGS_DB_TYPE: Joi.string().default('mssql'),
            SPOTMGS_DB_HOST: Joi.string().default('localhost'),
            SPOTMGS_DB_PORT: Joi.number().default(1433),
            SPOTMGS_DB_USER: Joi.string().default('sa'),
            SPOTMGS_DB_PASS: Joi.string().default('maun'),
            SPOTMGS_DB_NAME: Joi.string().default('DwapiCentral'),
            SPOTMGS_ENTITIES: Joi.string().default('dist/**/*.entity{.ts,.js}'),
            SPOTMGS_DB_SYNC: Joi.boolean().default(true),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(
            envConfig,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get Port(): number {
        return Number(this.envConfig.SPOTMGS_PORT);
    }

    get DatabaseType(): string {
        return String(this.envConfig.SPOTMGS_DB_TYPE);
    }

    get DatabaseHost(): string {
        return String(this.envConfig.SPOTMGS_DB_HOST);
    }

    get DatabasePort(): number {
        return Number(this.envConfig.SPOTMGS_DB_PORT);
    }

    get DatabaseUser(): string {
        return String(this.envConfig.SPOTMGS_DB_USER);
    }

    get DatabasePass(): string {
        return String(this.envConfig.SPOTMGS_DB_PASS);
    }

    get DatabaseName(): string {
        return String(this.envConfig.SPOTMGS_DB_NAME);
    }

    get DatabaseEntities(): string {
        return String(this.envConfig.SPOTMGS_ENTITIES);
    }
}
