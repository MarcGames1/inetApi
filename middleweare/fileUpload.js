import multer from 'multer';
const path = require('path');

export const uploadPostImage = (req, res, next) =>{

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/posts/');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + '-' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('postImage');



     upload(req, res, (err) => {
       if (err) {
         res.json(err);
       } else {
 
        req.body.Image = {
          name: req.file.filename,
          path: req.file.destination,
          fullPath: path.join(req.file.destination, req.file.filename),
        };
         next();
        }
    });
}

export const uploadProductCategoryImage =  (req, res, next) =>{

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/product-cat/');
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + '-' + file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('categoryImage');



     upload(req, res, (err) => {
       if (err) {
         res.json(err);
       } else {
   
        req.body.Image = {
          name: req.file.filename,
          path: req.file.destination,
          fullPath: path.join(req.file.destination, req.file.filename),
        };
         next();
        }
    });
}


export const uploadProductThumbnail = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/products/' + req.body.name);
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        req.body.name +
        '-' +
        req.fule.fieldname +
          uniqueSuffix +
          path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage: storage }).single('categoryImage');

  upload(req, res, (err) => {
    if (err) {
      res.json(err);
    } else {

      req.body.Image = {
        name: req.file.filename,
        path: req.file.destination,
        fullPath: path.join(req.file.destination, req.file.filename),
      };
      next();
    }
  });
};