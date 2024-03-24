//a general middleware to log the request to the general_logs.txt file
const fs = require('fs');
const path = require('path');

const generalMiddleware = (req, res, next) => {
    const message = 'ingreso en la ruta ' + req.url;
    const dateTime = new Date().toLocaleString();
    
    //write the log message to the general_logs.txt file
    fs.createWriteStream(path.join('logs', 'general_logs.txt'), { flags: 'a' });
    fs.appendFileSync(path.join('logs', 'general_logs.txt'), dateTime + ' - ' + message + '\n');
    next();
}

module.exports = generalMiddleware;