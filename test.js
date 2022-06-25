const fs = require('fs');
const yaml = require('yaml');
const _ = require('lodash');

function parseFile(file) {
    let str = fs.readFileSync(file, 'utf8');
    let strArray = str.split('\n');
    let strLength = strArray.length;
    if (!strArray[0].trim().match(/^l_/)) throw 'No start line found';
    let language = strArray.shift()

    let result = {
        data: [],
        comments: [],
        length: strLength,
        language
    };
    strArray.forEach((str, line) => {
        let formatedStr = str.trim();
        if (formatedStr.length === 0) return;
        if (formatedStr.match(/^[#].*$/)) {
            result.comments.push({
                line: line+1,
                text: str,
                isComment: true
            })
        } else {
            let splittedStr = formatedStr.split(":");
            let key = splittedStr[0];

            splittedStr.shift();
            formatedStr = splittedStr.join(':');

            splittedStr = formatedStr.split(" ");
            let version = splittedStr[0];

            splittedStr.shift();
            formatedStr = splittedStr.join(" ");

            formatedStr = formatedStr.trim();
            let value;
            if (formatedStr[0] === '"' && formatedStr[formatedStr.length-1] === '"') {
                value = formatedStr.substring(1,formatedStr.length-1);
            } else {
                throw `ERROR WITH ${key} LINE: ${line}`;
            }
            
            result.data.push({
                key,
                line: line+1,
                value,
                version
            })
        }
    });
    return result;
}

function stringifyStructure(structure) {
    let result = [structure.language];
    let preparedStructure = {
        ..._.groupBy(structure.comments, 'line'),
        ..._.groupBy(structure.data, 'line')
    }
    for (let i = 1; i < structure.length; i++) {
        if (!preparedStructure[i] || preparedStructure[i].length === 0) {
            result[i] = '';
        } else if (preparedStructure[i].length === 1 && preparedStructure[i][0].isComment) {
            result[i] = preparedStructure[i][0].text;
        } else {
            result[i] = ' '+preparedStructure[i][0].key+':'+preparedStructure[i][0].version+' '+preparedStructure[i][0].value;
        }
    }

    return result.join('\n');
}

let yml = parseFile('/Users/nosjr/Library/Application Support/Steam/steamapps/common/Crusader Kings III/game/localization/english/tutorial/ep1_tutorial_reactive_l_english.yml');

let str0 = fs.readFileSync('/Users/nosjr/Library/Application Support/Steam/steamapps/common/Crusader Kings III/game/localization/english/tutorial/ep1_tutorial_reactive_l_english.yml', 'utf8');
let str = stringifyStructure(yml);
console.log(str === str0);
//write str to file and save it
fs.writeFileSync('/Users/nosjr/Library/Application Support/Steam/steamapps/common/Crusader Kings III/game/localization/english/tutorial/ep1_tutorial_reactive_l_english_test.yml', str);
