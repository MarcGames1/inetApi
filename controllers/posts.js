
import Post from '../models/post';
import slugify from 'slugify';
import fs from 'fs'
import path from 'path'




export const create = (req, res) => {



  const {title, content, categories, image, author, excerpt} = req.body
 
 let post_slug = slugify(req.body.title)
 let post = new Post({
   title,
   content,
   categories,
   image,
   author,
   excerpt,
   slug: post_slug,
 });
 post.save((err, data)=>{
  if(err){
    
     return res.status(500).json({error: err});
   }if(data){
    console.log("Saved Post", JSON.stringify(data))
    res.status(200).json({success: true})
   }
   

  })
 }
 

//  post.Image = fs.readFileSync(files.photo.path);
//  post.Image.contentType = files.photo.type;



export const update = (req, res) => {
 const post = req.post
};

export const remove = (req, res) => {
const post = req.post
//stergem imaginea reprezentativa
fs.unlink(path.join('public', ...post.image), (err =>{console.log(err)}))

post.remove((err, data)=>{
  if(err) {
    return res.status(400).json({error: "Ceva nu a functionat"})
  }
  res.json({message: "Postare Stearsa"})
  })

};

export const list = (req, res) => {
  Post.find().select(['title', 'image', 'excerpt']).populate({ path: 'author', select: ['nume', 'prenume'] }).populate({ path: 'categories', select: 'name' }).exec((err, data)=>{
        if(err){
            return res.status(400).json({error: "Something went wrong listing the posts"})
        }
        
        if(data.length === 0 ){
          return res.status(502).json({error: "No Blog Entries Yet"})
          
        }
        res.json(data)
    })
};

//de refacut
export const listbyCat = (req, res, category) => {
  Post.find({category: category}).sort({createdAt: -1}).exec((err, data)=>{
        if(err){
            return res.status(400).json({error: "Something went wrong listing the posts"})
        }
        res.json(data)
    })
};

export const postById = (req, res, next, id) => {

  Post.findById(id).exec((err, post) => {
    if (err || !Post) {
      res.status(400).json({
        error: 'ERROR Post Does not exist',
      });
    }
    req.post = post;
    next();
  });
};

export const read = (req, res) => {
  return res.json(req.post)
};
