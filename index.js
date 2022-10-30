import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";



import categoryRoutes from './routes/category';
import postRoutes from './routes/post';
import authorRoutes from './routes/author'
import authRoutes from'./routes/auth';
import multer  from 'multer'

require('dotenv').config();


const app = express();


// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB CONNECTION ERROR: ', err));

// middlewares


app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(multer().single('image'))
app.use(morgan('dev'));




  

/// Declare public Dir

const dir = path.join(__dirname, 'public');
app.use(express.static(dir));



//
// route middlewares
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postRoutes);
app.use('/api', authorRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
