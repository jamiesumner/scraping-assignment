const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.npr.org/sections/pop-culture/")
            .then(function (response) {
                const $ = cheerio.load(response.data)
                $(".item-info").each(function (i, element) {
                    const result = {};

                    result.headline = $(element)
                        .children(".title")
                        .children("a")
                        .text()
                    result.summary = $(element)
                        .children(".teaser")
                        .children("a")
                        .text()
                    result.url = $(element)
                        .children(".teaser")
                        .children("a")
                        .attr("href")

                    db.Article.create(result)
                        .then(dbArticle => console.log(dbArticle))
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err))

        res.send("scrape complete")
    })


    app.get("/articles", (req, res) => {
        db.Article.find({})
            .then(dbArticle => res.json(dbArticle))
            .catch(err => console.log(err))
    })
}