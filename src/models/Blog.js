const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic:{type:String,required:true},
    description:{type:String,required:true},
    posted_at:Date,
    posted_by:String

})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;