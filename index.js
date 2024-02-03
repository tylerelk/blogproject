import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const allPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post('/submit', (req, res) => {
    let post = new BlogPost(req.body.title, req.body.author, req.body.content);
    allPosts.push(post.postID);
    console.log(allPosts);
    res.render('index.ejs', {title: post.title, author: post.author, content: post.content});
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

class BlogPost {
    constructor(title, author, content) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.postID = this.generateID(this.title);
    };

    generateID(title) {
     return `post-${title}`;
    }
}
