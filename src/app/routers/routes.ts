import { Application } from 'express';
import cors from 'cors';
import expressPlayground from 'graphql-playground-middleware-express';
import GraphqlEngine from '../graphql';

export class ExpressApp {
    private app: Application;

    constructor (app: Application) {
        this.app = app;
        this.app.use(cors());
        this.app.use('/graphql', GraphqlEngine);
        if (process.env.NODE_ENV !== 'production') {
            this.app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
        }
    }

    listen (port: number | string) {
        this.app.listen(port, () => {
            console.log('Running a GraphQL API server at *:' + port);
        });
    }

}
