const fs = require("fs")

let emitPassword = () => {
    let password = ""
    fs.readFile('./secure/securityKey.txt', (error, data) => {
        if(error) throw Error(`An error ocurrs while trying to get the security key: ${error.message}`)

        password = data.toString()
    })
    console.log(password)
    return password
}

module.exports = {
    emitPassword
}