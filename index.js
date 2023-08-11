const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
//all models
const URL = require('./models/url');

//all routes
const urlroute = require('./routes/urlRoutes');
const staticroute = require('./routes/staticRoutes');
const userRouter = require('./routes/userRoute');
const { restrictToLoggedin } = require('./middlware/auth');

const app = express();

const PORT = 8000;

app.set('view engine' , 'ejs');
app.set('views' , path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
//connecting database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/URLshortener").then(() => {

    console.log("connected!");
}).catch((err) => {
    console.log("Error on while connecting database");
})

app.use('/',staticroute);
app.use('/url',restrictToLoggedin, urlroute);
app.use('/user', userRouter)


// app.get("/url/:shortId" ,restrictToLoggedin, async (req, res) => {
//     const ShortId = req.params.ShortId;
//     const entry = await URL.findOneAndUpdate(
//       {
//         ShortId,
//       },
//       {
//         $push: {
//           visitHistory: {
//             timestamp: Date.now(),
//           },
//         },
//       },
//       { new: true }
//     );
//     if (entry) {
//         res.redirect(entry.redirectURL);
//     } else {
//         // Handle case where entry with given ShortId is not found
//         res.status(404).send('URL not found');
//     }
//   });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:8000`);
})