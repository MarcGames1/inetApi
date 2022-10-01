const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },

    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },

    codIntern: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    size: {
      nr: {
        type: Number,
        trim: true,
        maxlength: 2,
        required: true,
      },
      cm: {
        type: Number,
        trim: true,
        maxlength: 3,
      },
    },
    thumbnail: {
      type: String,
      
      trim: true,
    },
    colorVariation: {
      required: false,
      color: { type: ObjectId, ref: 'Color' },
      image: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    category: [
      {
        type: ObjectId,
        ref: 'Category',
        required: true,
      },
    ],

    content: { type: String, trim: true },
  },
  { timestamps: true }
);





module.exports = mongoose.model('Product', productSchema);