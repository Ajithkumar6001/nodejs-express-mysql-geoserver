const {createLogger, transports, transport, format, verbose}= require('winston')

const customFormat= format.combine(format.timestamp(), format.printf((info)=>{
    return `${info.timestamp} -[${info.level.toUpperCase()}] - ${info.message}`
}))
const logger=createLogger({

format:customFormat,   

    transports:[
new transports.File({filename:'app.log'})
    ]
});
module.exports=logger;