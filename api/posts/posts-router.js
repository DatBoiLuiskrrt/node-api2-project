// implement your posts router here
const Posts = require("../posts/posts-model");
const router = require("express").Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((posts) => {
      if (!posts) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        res.json(posts);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Posts.insert(req.body)
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(500).json({
          message: "The posts information could not be retrieved",
        });
      });
  }
});
router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  }

  Posts.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The post information could not be modified" });
    });
});
router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        Posts.remove(post.id).then((resp) => {
          res.status(200).json(post);
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "The post could not be removed" });
    });
});

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((commentById) => {
      res.json(commentById);
    })
    .catch((err) => {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
        error: err.message,
      });
    });
});

module.exports = router;
