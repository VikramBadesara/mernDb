const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = require('./configs/common').config()['SERVER_PORT'];
const { Connection } = require("./repositories/mongo.client.provider")
const resource = require(`./resources/resource`)
const { clsMiddleware } = require('./repositories/req.context.middleware')

const app = express();
process.env.TZ = 'Asia/Calcutta';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.text({ type: "text/html", limit: '5mb' }))
app.use(clsMiddleware)
app.use(cors())
app.use("/mernDb", resource)


app.get('/', (req, res)=>{
    res.status(200).send("Hello")
})

app.listen(PORT, () => {
    Connection.connectToMongo();
    console.log(`Server is listening on port ${PORT}`)
});



// const express = require('express')
// const app = express()

// // Use .env
// const dotenv = require('dotenv')
// dotenv.config()
// let config = process.env

// const mongoose = require('mongoose')
// const User = require('./models/userModels')

// const PORT = config.PORT
// const MONGODB_BASE_URL = config.MONGODB_BASE_URL
// const dbName = config.DB_NAME

// app.get('/', (req, res) => {
//     res.status(200).send('Server is running')
// })

// app.listen(PORT || 2000, (error) => {
//     if (error) {
//         console.error(`Error running server on port ${PORT}`);
//     }
//     console.log(`Server started on port ${PORT}`);
// })

// mongoose.connect(MONGODB_BASE_URL + dbName).then(connected => {
//     console.log(`Connected to mongo on port ${connected.connection.port} | models names: ${connected.modelNames().map(n => n)}`)

// }).catch(error => {
//     console.error(`Error connecting to mongo: ${error.message}`);
// })


