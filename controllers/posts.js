
import Post from '../models/post';
import slugify from 'slugify';





export const create = (req, res) => {



  const {title, content, categories, Image} = req.body
 
 let post_slug = slugify(req.body.title)
 let post = new Post({
   title,
   content,
   categories,
   Image,
   slug: post_slug,
 });
 post.save((err, data)=>{
  if(err){
    
     return res.status(500).json({error: err});
   }if(data){
    res.status(200).json({success: true})
   }
   

  })
 }
 

//  post.Image = fs.readFileSync(files.photo.path);
//  post.Image.contentType = files.photo.type;



export const update = () => {
 
};

export const remove = () => {

};

export const list = () => {
 
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

export const read = () => {

};
