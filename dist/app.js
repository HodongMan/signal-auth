"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const errorhandler = require("strong-error-handler");
const routes_1 = require("./routes/routes");
const config_1 = require("./db/config");
const userModel_1 = require("./models/userModel");
// App class는 반드시 Singleton으로 해야 합니다.
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.initOdbc();
        this.config();
        this.routes.routes(this.app);
        this.errorHandler();
    }
    config() {
        // 외부 라이브러리 설정은 여기서 합니다.
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    errorHandler() {
        this.app.use(errorhandler({
            debug: process.env.ENV !== 'prod',
            log: true,
        }));
    }
    initOdbc() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.sequelize.sync({ force: true });
            userModel_1.User.create({
                name: "hodong",
                id: "hodong",
                password: "1234",
                email: "arshavin3@naver.com"
            });
        });
    }
}
// App은 여기서 한번 생성합니다. 다른 곳에서 절대 생성하지 마세요 방어코드 필요함
exports.default = new App().app;
//# sourceMappingURL=app.js.map