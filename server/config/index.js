const express = require("express");

const cors = require("cors");

module.exports = (app) => {
    app.set("trust proxy", 1);

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:4200",
        })
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
};
