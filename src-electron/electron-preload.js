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
import _ from 'lodash';

contextBridge.exposeInMainWorld('api', {
    getParserSettings: () => {
        return {
            metaKeys: ['version']
        }
    },
    getAllFileNamesSync(pathToApp) {
        let baseDir = path.join(pathToApp, '/game/localization/english');
        function scanFiles(dir) {
            let files = fs.readdirSync(dir);
            let result = [];
            files.forEach(file => {
                if (fs.statSync(path.join(dir, file)).isDirectory()) {
                    result = result.concat(scanFiles(path.join(dir, file)));
                } else {
                    if (file.includes('.yml')) {
                        result.push(path.join(dir, file).replace(baseDir, '').replace('_l_english.yml', ''));
                    }
                }
            });
            return result;
        }
        return scanFiles(baseDir);
    },
    parseFile(pathToApp, name, language) {
        let pathToFile = path.join(pathToApp, '/game/localization/' + language + '/' + name + '_l_' + language + '.yml');
        let str;
        try {
            str = fs.readFileSync(pathToFile, 'utf8');
        } catch (error) {
            return {
                data: [],
                comments: [],
                length: 0
            };
        }; 
        let strArray = str.split('\n');
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
        strArray = strArray.slice(startIndex+1);
        let result = {
            data: [],
            comments: comments.map((item, key) => ({
                line: key,
                text: item,
                isComment: true
            })),
            meta: {
                startIndex
            }
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
                    value: value.slice(1, -1),
                    meta: {
                        version,
                    }
                })
            }
        });

        return result;
    },
    
    stringifyStructure(structure, language, pathToApp, name) {
        let result = [];
        let preparedStructure = {
            ..._.groupBy(structure.comments, 'line'),
            ..._.groupBy(structure.data, 'line')
        }
        let maxLine = _.maxBy(Object.keys(preparedStructure), key => parseInt(key));
        for (let i = 0; i <= maxLine+1; i++) {
            if (i === structure.meta.startIndex) {
                result[i] = "l_"+language+":";
            } else if (preparedStructure[i]?.length === 1 && preparedStructure[i][0].isComment) {
                result[i] = preparedStructure[i][0].text;
            } else if (preparedStructure[i]?.length === 1) {
                result[i] = ' '+preparedStructure[i][0].key+':'+(preparedStructure[i][0].meta?.version || 0)+' "'+preparedStructure[i][0].value+'"';
            } else {
                result[i] = '';
            }
        }
        result.push('');
        result = result.join('\n');
        if (pathToApp && name && language) {
            fs.writeFileSync(path.join(pathToApp, '/game/localization/' + language + '/' + name + '_l_' + language + '.yml'), result);
        }
        return result;
    }
})