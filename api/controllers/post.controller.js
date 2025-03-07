import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get posts!" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get post!" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to add post!" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to update post!" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "This Post can be removed only by the post owner!" });
    }
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post removed successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to delete post!" });
  }
};
