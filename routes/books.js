const express = require("express");
const Book = require("../models/Book");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

// Add Book (Admin Only)
router.post("/", authenticateUser, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access Denied" });

  const { title, author, isbn } = req.body;
  try {
    const newBook = new Book({ title, author, isbn });
    await newBook.save();
    res.status(201).json({ message: "Book Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
