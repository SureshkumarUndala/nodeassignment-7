const router = require('express').Router();
const bodyParser = require("body-parser")
const Blog = require('../models/Blog')

// Your routing code goes here
router.use(bodyParser.json())

router.get('/', pagination(Blog), (req, res) => {
    console.log(res.paginationResult)
    res.json(res.paginationResult)
    // try{
    //     const blogs = await Blog.find()
    //     res.status(200).json({
    //         status:"Success",
    //         blogs
    //     })
    // }catch(e){
    //     res.status(400).json({
    //         status:"Failed",
    //         message:e.message
    //     })
    // }
})
//Creating Blog
router.post('/', async (req, res) => {
    try {
        const blogs = await Blog.create(req.body)
        res.status(200).json({
            status: "Success",
            blogs
        })
    } catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

})
router.put("/:id", async (req, res) => {
    try {
        const blogs = await Blog.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(200).json({
            status: "Success",
            blogs
        })
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const blogs = await Blog.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            status: "Success",
            blogs
        })

    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})
function pagination(model) {
    // console.log(Blog)
    return async (req, res, next) => {
        // console.log(req.query.page)
        // console.log(req.query.search)
        const page = parseInt(req.query.page)
        const topic = req.query.search
        const recordsFrom = (page - 1) * 5;
        // const recordsTo = page * 5;
        let result = {}
        try {
            result.result = await Blog.find({ "topic": topic }).skip(recordsFrom).limit(5)
            if (result.result.length === 0) {
                // res.paginationResult =  res.status(500).json({status:"Failed"})
                res.paginationResult = res.status(400).json({ status: "Failed", message: "We cannot found your query" })
                next()
            }

            res.paginationResult = { status: "success", result }
            next()


        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}
module.exports = router;