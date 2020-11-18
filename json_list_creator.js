const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const page = 'https://en.wikipedia.org/wiki/List_of_United_States_counties_and_county_equivalents';

axios.get(page).then((response) => {
    const $ = cheerio.load(response.data);
    const arr = [];
    const cityStateArr = [];
    const stateArr = [];
    let currState;

    $('body').find('.wikitable > tbody > tr > td:not(:has(a))').each((index, element) => {
        let pop = $(element).text();
        let newStr = pop.replace(/\n/g, '');
        arr.push(newStr);
    });

    $('body').find('.wikitable > tbody > tr > td:not(:has(span)) > a').each((index, element) => {
        let title  = $(element).attr('title');
        if(title.includes(',')) {
            let sArr = title.split(',');
            let obj = {
                county:sArr[0],
                state:sArr[1]
            }
            prevState = sArr[1];
            cityStateArr.push(obj);
        } else {
            //let str = title.replace(/[^\w\s]/gi, ' ')
            let obj = {
                county:title,
                state:currState
            }

            cityStateArr.push(obj);
        }
    });


    //creates an array with the states and provinces along with their beginning index for matching cases that don't have a clearly identified state on the inital scrape
    $('body').find('.wikitable > tbody > tr').each((index, element) => {
        if(index > 0) {
            if($(element).children().length > 2) {
                $(element).children().each((idx, el) => {
                    if(idx === 1) {
                        $(el).find('a:not(:has(img))').each((i, e) => {
                            if(i === 1) {
                                currState = $(e).text();
                                let obj = {
                                    state:currState,
                                    idx:parseInt(index)
                                }

                                stateArr.push(obj);
                            } else {
                                currState = $(e).text();
                                let obj = {
                                    state:currState,
                                    idx:parseInt(index)
                                }

                                stateArr.push(obj);
                            }

                        });
                    }
                });
            }
        }
    });


    //adds population data to city/state array
    for(let i = 0; i < cityStateArr.length; i++) {
        cityStateArr[i].population = arr[i];
        cityStateArr[i].district = i;

        //fixes county's that didn't have a proper state identification on the inital scrape
        if(cityStateArr[i].state === undefined) {
            for(let j = 0; j < stateArr.length; j++) {
                if((i + 1) >= stateArr[j].idx) {
                    cityStateArr[i].state = stateArr[j].state;
                }
            }
        }
    }

    //make JSON file
    let data = JSON.stringify(cityStateArr);
    fs.writeFileSync('county_state_data.json', data);
    
}).catch(err => {
    console.log(err);
});