# US JSON List Creator

US JSON List Creator is a Node.js script to generate a JSON file containing all United States counties, provinces, territories and their respective states as well as population data. Uses Axios and Cheerio to scrape [List of United States counties and county equivalents](https://en.wikipedia.org/wiki/List_of_United_States_counties_and_county_equivalents) wikipedia page to get the data. You're welcome.

## Setup
Clone this repo to your desktop and run npm install to install all the dependencies.

## Usage
After cloning the repo, go to the root direcotry and run `npm install` to clone all dependencies.


In your terminal in the root directory, type the following to scrape and then generate a current JSON list from the data.

```javascript
node json_list_creator.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)