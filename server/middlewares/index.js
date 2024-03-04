module.exports = {
    isLoggedIn(req, res, next) {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ code: 401, message: 'Токен недействителен' });
                } else {
                    User.findById(decodedToken.id)
                        .then(user => {
                            if (!user) {
                                res.status(401).json({ code: 401, message: 'User not found' });
                            } else {
                                req.user = user;
                                next();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ code: 500, message: 'Ошибка базы данных при выборке пользователя', err });
                        });
                }
            });
        } else {
            res.status(401).json({ code: 401, message: 'Токен не предоставлен' });
        }
    }
}
