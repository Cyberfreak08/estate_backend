import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  try {
    // console.log("addign ");
    res.status(200).json({message:"Adding Message"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
