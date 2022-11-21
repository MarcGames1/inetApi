const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    nume: {
      type: String,
      trim: true,
      required: true,
    },
    prenume: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    functie: {
      type: String,
      trim: true,
    },
    image: [],
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    bio: { type: String, trim: true },
    socialMedia: [
      
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', authorSchema);
