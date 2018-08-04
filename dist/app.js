"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
// App class는 반드시 Singleton으로 해야 합니다.
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    config() {
        // 외부 라이브러리 설정은 여기서 합니다.
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
// App은 여기서 한번 생성합니다. 다른 곳에서 절대 생성하지 마세요 방어코드 필요함
exports.default = new App().app;
//# sourceMappingURL=app.js.map