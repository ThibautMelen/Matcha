const express = require('express');
const methods = require('./methods');
const multer  = require('multer');
const auth = require('../../middlewares/auth')

const upload = multer({ dest: 'uploads/' });

module.exports = () => {
    const router = new express.Router();

    // Add User 1
    router.post('/add', methods.add);

    // Update User
    router.put('/up/:id/:new', methods.up);

    // Delete User
    router.delete('/del/:id/', methods.del);

    // Select ALL users
    router.get('/all', methods.all);

    // Select all interests
    router.get('/interests', methods.interests);

    // Select ONE users
    router.get('/:id', methods.getOne);

    // Upload image
    router.post('/image', upload.single('file'), methods.image);

    // Like a user
    router.get('/like/:id', auth, methods.like)

    // Unlike a user
    router.get('/unlike/:id', auth, methods.unlike)

    // Unlike a user
    router.get('/visit/:id', auth, methods.visit)

    // Unlike a user
    router.post('/search', auth, methods.search)

    return router;
};