import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const allPosts = [];
const referencePost = (post, arr) => {
  let thisPost = arr[post.postID];
  return thisPost.title;
};
const data = {
  posts: allPosts,
  reference: referencePost,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: data });
});

app.post("/submit", (req, res) => {
  let post = new BlogPost(req.body.title, req.body.author, req.body.content);
  allPosts.push(post);
  res.render("index.ejs", { data: data, postID: post.postID });
});

app.post("/select", (req, res) => {
  res.render("index.ejs", { data: data, postID: Number(req.body.postSelection) });
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
