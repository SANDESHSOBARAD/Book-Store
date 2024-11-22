import express, { response } from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import cors from 'cors';
import booksRoute from './routes/booksRoute.js'


const app = express()


//Middelware for parcing json
app.use(express.json());
//app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/', (req,res) => {
    console.log(req);
    return res.status(234).send('Welcome to Book-Store')
})

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`Backend Express server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })
