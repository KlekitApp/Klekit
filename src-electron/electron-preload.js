/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import { contextBridge } from 'electron';
import fs from 'fs';
import path from 'path';

contextBridge.exposeInMainWorld('api', {
    getAllFileNamesSync: function getAllFileNamesSync(dir) {
        let files = fs.readdirSync(dir);
        let result = [];
        files.forEach(file => {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                result = result.concat(getAllFileNamesSync(path.join(dir, file)));
            } else {
                if (file.includes('.yml')) {
                    result.push(path.join(dir, file));
                }
            }
        }
        );
        return result;
    },
    parseFile(file) {
        let str;
        try {
            str = fs.readFileSync(file, 'utf8');
        } catch (error) {
            return {
                data: [],
                comments: [],
                length: 0
            };
        }; 
        let strArray = str.split('\n');
        let strLength = strArray.length;
        // find index of string in strArray that match /^l_/ and remove all before that but save in variable
        let startIndex = strArray.findIndex(item => item.trim().match(/^l_/));
        if (startIndex === -1) {
            return {
                data: [],
                comments: [],
                length: 0
            };
        }
        let comments = strArray.slice(0, startIndex);
        let language = strArray[startIndex].trim().replace(':', '').replace('l_', '');
        strArray = strArray.slice(startIndex+1);
        let result = {
            data: [],
            comments: comments.map((item, key) => ({
                line: key,
                text: item,
                isComment: true
            })),    
            length: strLength,
            language,
            startIndex,
        };
        strArray.forEach((str, line) => {
            let formatedStr = str.trim();
            if (formatedStr.length === 0) return;
            if (formatedStr.match(/^[#].*$/)) {
                result.comments.push({
                    line: line+startIndex+1,
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
                // get substring from formatedStr between quotes and ignore quotes with backslash
                let regex = /"(?:\\.|[^"\\])*"/;
                let value;
                if (!formatedStr.match(regex)) {
                    value = formatedStr;
                } else {
                    value = formatedStr.match(regex)[0];
                }

                
                result.data.push({
                    key,
                    line: line+startIndex+1,
                    value,
                    version
                })
            }
        });

        return result;
    },
    
    stringifyStructure(structure, file) {
        let result = [];
        let preparedStructure = {
            ..._.groupBy(structure.comments, 'line'),
            ..._.groupBy(structure.data, 'line')
        }
        for (let i = 0; i < structure.length; i++) {
            if (i === startIndex) {
                result[i] = "l_"+structure.language+":";
            } else if (!preparedStructure[i] || preparedStructure[i].length === 0) {
                result[i] = '';
            } else if (preparedStructure[i].length === 1 && preparedStructure[i][0].isComment) {
                result[i] = preparedStructure[i][0].text;
            } else {
                result[i] = ' '+preparedStructure[i][0].key+':'+preparedStructure[i][0].version+' '+preparedStructure[i][0].value;
            }
        }
        result = result.join('\n');
        if (file) {
            fs.writeFileSync(result, str);
        }
        return result;
    }
})