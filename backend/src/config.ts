import dotenv from 'dotenv';
import bunyan from 'bunyan';
// import cloudinary from 'cloudinary'

dotenv.config({});

class Config {
    public DATABASE_URL: string | undefined;
    public NODE_ENV: string | undefined;


    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL || '';
        this.NODE_ENV = process.env.NODE_ENV || '';

    }

    public createLogger(name: string): bunyan {
        return bunyan.createLogger({ name, level: 'debug' });
    }

    public validateConfig(): void {
        for (const [key, value] of Object.entries(this)) {
            if (value === undefined) {
                throw new Error(`${key} configuration is undefined`);
            }
        }
    }
}

export const config: Config = new Config();