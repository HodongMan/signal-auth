"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
// 메인 라우터 입니다 
class Routes {
    routes(app) {
        app.route('/api/user')
            .post(userController_1.createUser);
        app.route('/api/user/login')
            .post(userController_1.loginUser);
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'main routes1'
            });
        });
        /* 샘플입니다 아래에 이렇게 추가하세요 방어 코드 필요
        app.route('/api')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'main routes'
            })
        })
        */
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map