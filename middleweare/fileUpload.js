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
//de de editat
const storeMultiple = (req, file, location) => {

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
     
      let imgPath = req.file.destination.split(path.sep)
      imgPath.shift()
      imgPath.push(req.file.filename)
      console.log("Image Path will be constructed using parh.join() with following parameter => ", imgPath)
       req.body.image = imgPath
     
      next()
    }
  })     

}



export const uploadPostThumbnail = (req, res, next)=>{
  const storagePaths = ['public', 'posts']
   const upload = multer({ storage: storeSingleFile(req, res, path.join(...storagePaths)) }).single('thumbnail')

    upload(req, res, err => {
    if (err) {res.json(err)} 
    else{
      console.log(req.body)
      let imgPath = req.file.destination.split(path.sep)
      imgPath.shift()
      imgPath.push(req.file.filename)
      console.log("Image Path will be constructed using parh.join() with following parameter => ", imgPath)
       req.body.image = imgPath
  next()
  }
})
}

export const uploadPostImage = (req, res, next)=>{ 

  const storagePaths = ['public', 'posts', 'postpics']
   const upload = multer({ storage: storeMultiple(req, res, path.join(...storagePaths)) }).single('image')

   upload(req, res, err=>{
    if(err){res.json(err)} 
    else {
       let imgPath = req.file.destination.split(path.sep)
       imgPath.shift()
       imgPath.push(req.file.filename)
       console.log('image stored succesfully on ', path.join(...imgPath)) // sends back the full url
       res.status(200).json({'path': path.join(...imgPath)})
    }
   })
}