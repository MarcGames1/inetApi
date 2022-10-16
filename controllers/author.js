import Author from '../models/author';
import slugify from 'slugify';
import multiparty from 'multiparty'


exports.authorById = (req, res, next, id) => {
  Author.findById(id).exec((err, author) => {
    if (err || !author) {
      res.status(400).json({
        error: 'Autorul nu exista',
      });
    }
    req.author = author;
    next();
  });
};

exports.create = async (req, res) => {
  console.log('Create Author started with:');
  console.log('req.body,', req.body);
  
  const { nume, prenume, email,functie, image, bio, socialMedia  } = req.body;
  const author = await new Author({
    nume,
    prenume,
    email,
    functie,
    image,
    bio,
    socialMedia,
    slug: slugify(`${nume} ${prenume}`),

  });
  author.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }

    res.status(200).json(data);
  });
};

exports.read = (req, res) => {
  return res.json(req.author);
};

exports.update = (req, res) => {
     const { nume, prenume, email, functie, image, bio, socialMedia } =
       req.body;
  const author = req.author;
  author = {nume, prenume, email, functie, image, bio, socialMedia};

  author.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
    res.json({ data });
  });
};

exports.remove = (req, res) => {
  const author = req.author;
  author.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Something went wrong',
      });
    }
    res.json({ message: 'Autor Sters' });
  });
};

exports.list = (req, res) => {
  Author.find().exec((err, data) => {
    if (err) {
      return res
        .status(400)
        .json({ error: 'Something went wrong listing the Authors' });
    }
    res.json(data);
  });
};
