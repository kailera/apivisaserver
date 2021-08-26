const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const { TokenExpiredError } = jwt;

const catchError = (err, res) =>{
    if(err instanceof TokenExpiredError){
        return res.status(401).send({message:"Token Expired"})
    }
    return res.sendStatus(401).send({message: "Unauthorized"})
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message: "no token provided"});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isFiscal = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Role.find({
            _id:{$in:user.roles}
        },
        (err, roles) => {
            if (err){
                res.status(500).send({message:err});
                return;
            }
            for(let i = 0; i < roles.length; i++){
                if(roles[i].name === "fiscal"){
                    next();
                    return;
                }
            }
            res.status(403).send({message: 'require fiscal role'});
            return;
            }
        )
    })
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }

        Role.find({
            _id: {$in: user.roles}
        },
        (err, roles) => {
            if(err){
                res.status(500).send({message:err});
                return;
            }

            for(let i = 0; i < roles.length; i++){
                if (roles[i].name ==="admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({message: 'require admin role'});
            return;
            }
        );
    });
};


isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) =>{
        if(err){
            res.status(500).send({message:err});
            return;
        }

        Role.find(
            {
                _id:{$in:user.roles}
            },
            (err, roles)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }

                for(let i = 0; i< roles.length; i++){
                    if(roles[i].name === "moderator"){
                        next();
                        return
                    }
                }
                res.status(403).send({message: "Require Moderator Role"});
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isFiscal,
    isAdmin,
    isModerator
};

module.exports = authJwt;