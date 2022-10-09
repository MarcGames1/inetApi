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
    image: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    bio: { type: String, trim: true },
    socialMedia: [
      {
        platform: { type: String, trim: true },
        url: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Author', authorSchema);
