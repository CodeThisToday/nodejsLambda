const cheerio = require('cheerio');
const moment = require('moment');

function petsFromHTML (html) {
    // console.log(html);
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
//
// function formatJobs (list) {
//     return list.reduce((acc, job) => {
//         return `${acc}${job.job} in ${job.location} closing on ${moment(job.closing).format('LL')}\n\n`;
//     }, 'We found:\n\n');
// }

module.exports = {
    petsFromHTML
    // formatJobs
};