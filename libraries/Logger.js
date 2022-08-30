const winston = require('winston')
const {date_time} = require('./Utility')

const Logger = {

    init: (param) => {
        if (!param.type) param.type = "info";
        (param.data) ? param.data.log_date = date_time(new Date()) : param.data = {"log_date":date_time(new Date())}
        winston.log(param.type, param.msg, param.data)
    }
}

module.exports = Logger