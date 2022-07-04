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
import { contextBridge, app } from 'electron';

import ParadoxParser from './parsers/paradox';

contextBridge.exposeInMainWorld('api', {
    getParsers: () => {
        let parsers = [];
        parsers.push(ParadoxParser.getParserSettings())

        return parsers;
    },
    getParserSettings(parser) {
        switch (parser) {
            case 'paradox':
                return ParadoxParser.getParserSettings();
            default:
                return {}
        }
    },
    getAllFileNamesSync(parser, pathToApp) {
        switch (parser) {
            case 'paradox':
                return ParadoxParser.getAllFileNamesSync(pathToApp);
            default:
                return []
        }
    },
    parseFile(parser, pathToApp, name, language) {
        switch (parser) {
            case 'paradox':
                return ParadoxParser.parseFile(pathToApp, name, language);
            default:
                return {}
        }
    },
    stringifyStructure(parser, structure, language, pathToApp, name) {
        switch (parser) {
            case 'paradox':
                return ParadoxParser.stringifyStructure(structure, language, pathToApp, name);
            default:
                return {}
        }
    },

    getProjects: () => {
        let projects = {};
        let pathToProjects = app.getPath('appData') + '/projects';
        let files = fs.readdirSync(pathToProjects);
        files.forEach(file => {
            let pathToFile = path.join(pathToProjects, file);
            let str = fs.readFileSync(pathToFile, 'utf8');
            let project = JSON.parse(str);
            projects[id] = {
                ...project,
                id: file.replace('.json', '')
            };
        });
        return projects;
    },

    saveProject(project) {
        let pathToProjects = app.getPath('appData') + '/projects';
        let pathToFile = path.join(pathToProjects, project.id + '.json');
        delete project.id;
        fs.writeFileSync(pathToFile, JSON.stringify(project));
    },
    
    deleteProject(id) {
        let pathToProjects = app.getPath('appData') + '/projects';
        let pathToFile = path.join(pathToProjects, id + '.json');
        fs.unlinkSync(pathToFile);
    }
})