'use strict'
const jwt = require ('jwt-simple');
const moment = require ('moment');
const secret = 'clave_secreta_curso';

//recibe la petición antes del metodo llamado
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'la petición no tiene header'});
    }
    let token = req.headers.authorization.replace(/['"]+/g,'');

    let payload;
    try {
        payload = jwt.decode(token, secret);
        if (payload.ex <= moment().unix()){
            return res.status(401).send({message : 'Token expirado'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'token no valido'});
    }
    req.user = payload;
    next();
};