import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler';

import { Routes } from "./routes/routes";
/*
export const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// middleware for json body parsing
app.use(bodyParser.json({limit: '5mb'}));

// enable corse for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

  next();
});


const routes: Routes = new Routes();
routes.routes(app);
app.use('/movies', movies);

app.use(errorhandler({
  debug: process.env.ENV !== 'prod',
  log: true,
}));
*/


// App class는 반드시 Singleton으로 해야 합니다.
class App {

  public app: express.Application;
  public routes: Routes = new Routes();

  constructor() {
      this.app = express(); 
      this.config();
      this.routes.routes(this.app);
      this.errorHandler();
  }

  private config(): void{

      // 외부 라이브러리 설정은 여기서 합니다.      
      this.app.use(bodyParser.json({limit: '5mb'}));
      this.app.use(bodyParser.urlencoded({extended: true}));
  }
  
  private errorHandler(): void {
      this.app.use(errorhandler({
          debug: process.env.ENV !== 'prod',
          log: true,
      }));
  } 
}

export default new App().app;