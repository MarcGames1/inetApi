const Category = require("../models/category")
import slugify from 'slugify';
import fs from 'fs';
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) =>{
        if(err || !category) {
            res.status(400).json({
                error:"ERROR Category Does not exist"
            })
        }
        req.category = category
        next()
    })
} 


exports.create = async (req, res) =>{
   const { name } = req.body;
   console.log(name)
    const category = await new Category({
      name,
      slug: slugify(name),
    });
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
        
        res.status(200).json( data )
        
    })

}

exports.read = (req,res) =>{
    return res.json(req.category)
}

exports.update = (req,res) =>{
    const category = req.category
    category.name = req.body.name
    (category.slug = slugify(category.name)),
      category.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Something went wrong',
          });
        }
        res.json({ data });
      });
}


exports.remove = (req, res) => {
    const category = req.category
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
            res.json({ message: "Category removed" })
    })
}

exports.list = (req, res) => {
    Category.find().sort({createdAt: -1}).exec((err, data)=>{
        if(err){
            return res.status(400).json({error: "Something went wrong listing the categories"})
        }
        res.json(data)
    })
}