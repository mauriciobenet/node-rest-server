// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Token expire
// ============================
// 60 sec
// 60 min
// 24 hr
// 1  day
process.env.TOKEN_EXPIRE = 60 * 60 * 24 * 1;

// ============================
//  Authentication seed
// ============================
process.env.SEED = process.env.SEED || 'app-dev-seed';


// ============================
//  Entorno
// ============================

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;