const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const ferifyToken = require('../middlewares/ferifyToken');
const multer = require('multer');
const appError = require('../utils/app.Error');



// upload image in register
const diskStorage = multer.diskStorage({
    destination: function (req,file,cb) {
        console.log("FILE", file);
        cb(null, 'uploads');
    },
    filename: function (req,file,cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = `user-${Date.now()}.${ext}`;
        cb(null, filename)
    }
});

//onley image not PDF
const fileFilter = (req,file,cb)=> {
    const imageType = file.mimetype.split('/')[0];

    if (imageType == 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false);
    }
}
const uploads = multer({storage: diskStorage, fileFilter});



// get all users
router.route('/')
                .get(ferifyToken, userController.getAllUsers);

// register
router.route('/register')
                .post(uploads.single('avatar'), userController.register);

// login
router.route('/login') 
                .post(userController.login);



module.exports = router;