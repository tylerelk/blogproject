import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const allPosts = [];
const data = {
  posts: allPosts,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    data: data,
    message: "Select or create a post",
  });
});

app.post("/submit", (req, res) => {
  let post = new BlogPost(req.body.title, req.body.author, req.body.content);
  allPosts.push(post);
  res.render("index.ejs", { data: data, postID: post.postID });
});

app.post("/select", (req, res) => {
  res.render("index.ejs", {
    data: data,
    postID: Number(req.body.postSelection),
  });
});

app.post("/editRequest", (req, res) => {
  res.render("index.ejs", {
    data: data,
    message: `Editing Post: ${allPosts[req.body.postid].title}`,
    postID: req.body.postid,
    edit: true,
  });
});

app.post('/edit', (req, res) => {
  allPosts[req.body.postid].title = req.body.title;
  allPosts[req.body.postid].author = req.body.author;
  allPosts[req.body.postid].content = req.body.content;
  res.render('index.ejs', {
    data: data,
    message: 'Post Edited'
  })
})

app.post("/delete", (req, res) => {
  delete allPosts[req.body.postid];
  res.render("index.ejs", {
    data: data,
    message: "Post Deleted",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

class BlogPost {
  constructor(title, author, content) {
    this.title = title;
    this.author = author;
    this.content = content;
    this.postID = this.generateID();
  }

  generateID() {
    return allPosts.length;
  }
}
