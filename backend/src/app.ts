import express, {Express} from 'express'
import { config } from './config';
import { ServerSetup } from './setup-server';


class Application {
    public initialize(): void {
        this.loadConfig();
        const app: Express = express();
        const server: ServerSetup = new ServerSetup(app)
        server.Start()

    }

    private loadConfig(): void {
        config.validateConfig();        
      }
}

const application: Application = new Application();
application.initialize();