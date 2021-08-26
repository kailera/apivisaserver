const { verifySignUp } = require ('../middlewares');
const controller = require('../controller/auth.controller');

module.exports = app => {
    // procura no header as credenciais (x-access-token)
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // [DISABLED] chama os middlewares para validar as roles e se tem email duplicado
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    // [ENABLED] checa o login
    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/refreshtoken", controller.refreshToken)

};

