const jwt = require('jsonwebtoken');
// ============================
//  Verify Token
// ============================
let verifyToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decrypted) => {   //decrypted es el payload
        if(err){
            return res.status(401).json({ // 401 = unauthorized
                ok: false,
                err: {
                    message: "Token rejected."
                }
            });
        }

        req.user = decrypted.user;
        next();
    });
};

// ============================
//  Verify Administrator
// ============================
let isAdmin = (req, res, next) => {
    let user = req.user;

    if(user.role!="ADMIN"){
        return res.status(401).json({
            ok: false,
            err: {
                message: "Not enough privileges."
            }
        });
    }

    next();
}

module.exports = {
    verifyToken,
    isAdmin
};