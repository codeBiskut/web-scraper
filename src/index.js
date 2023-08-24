const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.port || 3000;

const target = 'https://news.blizzard.com/en-us/starcraft2/23893118/starcraft-ii-5-0-11-patch-notes';

axios.get(target)
    .then(res => {
        const html = res.data;
        const $ = cheerio.load(html);

        let content = [];

        $('h4').each(function (){
            const unit = $(this).text();

            content.push({
                unit
            });

            app.get('/', (req, res) =>{
                res.json(content)
            });
        });

    })
    .catch(error => {
        console.error('Error fetching or parsing the page:', error);
    });

app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`)
});