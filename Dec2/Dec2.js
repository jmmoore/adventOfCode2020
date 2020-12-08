/* 
Okay so we're taking in a series of strings that look like this:
[int]-[int] [single character]: [string]
I need to write a function that can parse this into variables.
My first instinct is to use regular expressions but it may be faster in terms of my knowledge to do a string split.
Once the string is split, we can do a regex to find pattern matches within the password string.
So it'll look something like:
*/

const readline = require('readline');
const fs = require('fs');
var goodPasswords = 0;
var badPasswords = 0;
var i = 0;

function parseDay2Input(line) {
    const spaceSplit = line.split(' ');
    const numbers = spaceSplit[0].split('-');
    const minOccur = numbers[0];
    const maxOccur = numbers[1];
    //console.log("The compliant number of characters is between " + minOccur + " and " + maxOccur);
    const keyChar = spaceSplit[1].charAt(0);
    const password = spaceSplit[2];
    const isThereAMatch = password.match(new RegExp(keyChar, "g"));
    
    //Sometimes there are zero matches. The .match function returns either an array or null.
    let matches = isThereAMatch ? isThereAMatch.length : 0;

    //console.log("The number of compliant characters is " + matches.length);
    if (matches >= minOccur && matches <= maxOccur) {
        goodPasswords++;
        return true;
    } else {
        badPasswords++;
        return false;
    }
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: process.stdout,
    terminal: false
})

readInterface.on('line', (input) => {
    var firstSplit = 
    parseDay2Input(input);
    //I wonder if there's a more elegant way to do this. I had issues running the console log outside of the line reader.
    i++;
    if (i == 1000) {
        console.log("Number of compliant passwords: " + goodPasswords);
        console.log("Number of incompliant passwords: " + badPasswords);
    };
});