const mongoose = require('mongoose');

const uri = 'mongodb://mongo/mongo?authSource=admin';

mongoose.connect(uri, {
    pass: 'root',
    user: 'root',
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    autoCreate: true
}, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('connect success.');
});

const AricleSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    publishTime: Date
});


const Article = mongoose.model('Article', AricleSchema);

const art = new Article({
    title: 'node.js',
    author: 'node2',
    content: 'node2',
    publishTime: new Date(),
});


// insert
/*
art.save((err, doc) => {
    if (err) {
        console.log(err);

        return;
    }

    console.log('save success ', doc);
});
*/

// findAll 
Article.find((err, res) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(res);

    return;
})


//find by
/*
Article.find({title: 'node.js', author: 'node'}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    if (res) {
        console.log(res);
    }

    return;
})
 */


// document 自带一个删除函数.
/*
Article.find({title: 'node.js', author: 'node2'}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }

    if (res) {
        console.log(res);
        res.forEach(ele => ele.remove())
    }

    return;
})
*/


