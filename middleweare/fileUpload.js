import multer from 'multer';
const path = require('path');
import fs from 'fs'
import express from 'express'
// const router = express.Router()

const storeSingleFile = (req, file, location) => {

  const storageConfig = {
  destination: function (req, file, cb) {
    cb(null, location)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
}

  return multer.diskStorage(storageConfig)
}

exports.uploadProfilePic = (req, res, next) =>{

  const storagePaths = ['public', 'authors']

  const upload = multer({ storage: storeSingleFile(req, res, path.join(...storagePaths)) }).single('image')
  upload(req, res, err => {
    if (err) {res.json(err)}
    else
    {
      console.log(req.body)
      req.body.image = req.file.destination,
      res.json({
          name: req.file.filename,
          path: storagePaths,
          fullPath: path.join(...storagePaths, req.file.filename),
        })
      next()
    }
  })     

}



export const uploadPostImage = (req, res, next)=>{
  next()
}