const express = require("express");
const { getAllUsers, getUserById, UpdateUserById, deleteUserById, createUser } = require("../controller/userController");

const userRouter = express.Router();

const path = require("path");
const multer = require("multer");

// gives us destination and filename at destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/user');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// checks if the file is a image or not:
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


userRouter.route("/").get(getAllUsers).post(upload.single('user') , createUser);
userRouter.route("/:uid").get(getUserById).delete(deleteUserById).patch(upload.single('user') , UpdateUserById);


module.exports = userRouter;