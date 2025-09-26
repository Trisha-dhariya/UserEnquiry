let express = require('express');
let mongoose = require('mongoose');
let cors =require('cors')
//console.log("📂 Index file loaded hihi");
let { enquiryRouter } = require('./App/routes/web/enquiryRouter.js')
//console.log("er bhi msst");
require('dotenv').config();
let app = express();
app.use(cors());
app.use(express.json());
app.use('/api/website/enquiry', enquiryRouter);

mongoose.connect(process.env.DBURL).then(() => {
    console.log('connected to mongodb')
    app.listen(process.env.PORT || 3000, () => {
        console.log('server is running ',);
    });
}).catch((err) => { console.log(err) })