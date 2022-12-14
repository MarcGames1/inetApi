import mongoose from 'mongoose';
const {Schema} = mongoose;
const {ObjectId} = mongoose.Schema





const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  contentImages:[{ type: String,  trim: true,}],
  excerpt:{
  type: String,
  trim: true,
  max: 160
  },
  categories: [{ type: ObjectId, ref: 'Category' }],
  author:{type: ObjectId, ref: 'Author'},
  image:{ 
    type: Object,
    },
  published: {type: Boolean, default: true},
  postedBy: {type: ObjectId, ref: 'User'},
  slug:{
    type: String,
    unique: true,
    lowercase: true,
  }
},
{ timestamps: true}
);

export default mongoose.model("Post", postSchema);