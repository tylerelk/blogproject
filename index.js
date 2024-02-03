import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post('/submit', (req, res) => {
    let post = new BlogPost(req.body.title, req.body.author, req.body.content);
    console.log(post);
    res.render('index.ejs', post);
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
     return `posttitle-${title}`;
    }
}
