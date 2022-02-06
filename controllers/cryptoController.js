const crypto = require('crypto')
const helpers = require("../helpers.js")

const password = helpers.emitPassword()
const algorithm = 'aes-256-cbc'
let iv = crypto.randomBytes(16);
let salt = crypto.randomBytes(16);

async function encrypt (text) {
    let key = crypto.scryptSync(password, salt, 32);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return `${iv.toString("hex")}:${salt.toString("hex")}:${encrypted}`;
}

async function decrypt (text) {
    // the decipher function
    let [ivs, salts, data] = text.split(":");
    let iv = Buffer.from(ivs, "hex");
    let salt = Buffer.from(salts, "hex");
    let key = crypto.scryptSync(password, salt, 32);

    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted.toString();
} 

module.exports = {
    encrypt,
    decrypt
}

