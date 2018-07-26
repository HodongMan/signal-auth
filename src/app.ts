import * as express from "express";
import * as bodyParser from "body-parser";

// App class는 반드시 Singleton으로 해야 합니다.
class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void{

        // 외부 라이브러리 설정은 여기서 합니다.
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;