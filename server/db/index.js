const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI ;

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Подключен к Mongo! Имя базы данных: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error("Ошибка подключения к mongo: ", err);
    });
