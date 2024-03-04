const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn } = require("../middlewares/index")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.status(400).json({ code: 400, message: 'Username already exists' });
                return;
            }

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            User.create({ username, password: hashPass })
                .then(user => {
                    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret);
                    res.status(200).json({ user, token });
                })
                .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err: err.message }));
        })
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (!user) {
                res.status(401).json({ code: 401, message: 'Username not registered' });
                return;
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.status(401).json({ code: 401, message: 'Incorrect password' });
                return;
            }

            const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret);
            res.json({ user, token });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ code: 500, message: 'DB error while fetching user', err });
        });
});

router.get('/logout', (req, res) => {
    // No es necesario hacer nada para el logout con JWT
    res.status(200).json({ code: 200, message: 'Logout successful' });
});

router.get('/isloggedin', isLoggedIn, (req, res) => {
    // Si llega a este punto, significa que el token es válido y el usuario está autenticado
    res.json(req.user);
});



module.exports = router;
