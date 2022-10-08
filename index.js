require('dotenv').config();
const express = require('express');
const cors = require('cors');
import authRoutes from'./routes/auth';
import mongoose from 'mongoose';
import categoryRoutes from './routes/category';
import postRoutes from './routes/post';
import authorRoutes from './routes/author'


const morgan = require('morgan');

const app = express();
const http = require('http').createServer(app);

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB CONNECTION ERROR: ', err));

// middlewares
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// route middlewares
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postRoutes);
app.use('/api', authorRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));
