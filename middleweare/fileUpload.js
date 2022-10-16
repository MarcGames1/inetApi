import multer from 'multer';
const path = require('path');
var multiparty = require('multiparty');
const fs = require('fs');
const mv = require('mv');


 export const addFieldstobody = (req, res, next)=>{
    const uploadPath = checkDir(path.join(__dirname, '../public/tmp'));
     var form = new multiparty.Form({
       uploadDir: path.join(uploadPath),
       autoFields: true,
     });

     // chk error

     form.on('error', function (err) {
       console.log('Error parsing form: ' + err.stack);
     });

      
       form.parse(req, parser );
       console.log( Object.keys(x))

       
}

// Parser Function

const parser = (err, fields, files) => {

  for (const [key, value] of Object.entries(fields)) {
    
    let x = {}
    x[`${key}`] = value[0];
    console.log(`${x}`)
  }

  for (const [key, value] of Object.entries(fields)) {
  let y = {}
  y[`${key}`] = value;
  }
  
 
  // const y  = fields[Object.keys(fields)[0]]

         
       }

export const uploadAuthorPic = (req, res, next) => {

  



  let uploadPath = checkDir(
    path.join(__dirname, '../public/authors')
  );
  var form = new multiparty.Form({
    uploadDir: path.join(uploadPath),
    autoFields: true,
  });
  form.on('error', function (err) {
    console.log('Error parsing form: ' + err.stack);
  });
  
  form.parse(req, function (err, fields, files) {
    for (const [key, value] of Object.entries(fields)) {
      console.log(`fields => ${key}: ${value}`);
      req.body[`${key}`] = value[0];
    }
     console.log(files)
  console.log('oldpath =>',path.join(files.file[0].path));
const oldPath = path.join(files.file[0].path);
const newPath = checkDir(
  path.join(
    `../public/author${req.body.prenume}_${req.body.nume}/${files.file[0].originalFilename}`
  )
);
mv(oldPath, newPath, function (err) {
  if (err) {
    throw err;
  } else {
    console.log('Successfully moved the file!');
  }
});


req.body.image = newPath;

console.log('REQ BODY ->', req.body)










  });
  
  
  res.send(JSON.stringify(req.body)).status(200);
  // next()
} 
    

    
    
 
export const uploadPostImage = (req, res, next) => {
    console.log('Upload completed!');
      next()
    }
  





    // checkDIR or make it

    const checkDir =(dir) =>{
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        return dir
      }
      return dir
    }