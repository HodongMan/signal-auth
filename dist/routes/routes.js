"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 메인 라우터 입니다 
class Routes {
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'main routes'
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