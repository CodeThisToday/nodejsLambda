const cheerio = require('cheerio');
const moment = require('moment');

function petsFromHTML (html) {
    const $ = cheerio.load(html);
    const allPets = $('ul.large_bullet > li');

    const petsList = [];

    allPets.each((i, el) => {
        let type = $(el).children('a').first().text();
        let link = $(el).children('a').attr('href').trim();

        let words = /\w+\s\w+/i;
        let pet = type.match(words);
        petsList.push({ pet, link});
    });

    return petsList;
}

module.exports = {
    petsFromHTML
};