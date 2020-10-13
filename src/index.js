const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

let extendConfig = (config, file) => {
    if (fs.existsSync(file)) {
        const parsed = dotenv.parse(fs.readFileSync(file, {encoding: 'utf8'}));
        config = Object.assign(config, parsed);
    }

    return config;
}

/**
 * @param {String} envPath
 * @param {Object} defaultConfig
 * @returns {Object}
 * @constructor
 *
 * @see https://symfony.com/doc/current/configuration.html#configuration-multiple-env-files
 * @see https://symfony.com/doc/current/configuration.html#selecting-the-active-environment
 */
let SymfonyDotEnv = (envPath, defaultConfig = {}) => {
    let config = Object.assign({}, defaultConfig);
    let processEnv = {...process.env};
    let pathEnv = path.normalize(envPath);

    config = extendConfig(config, pathEnv);
    config = extendConfig(config, `${pathEnv}.local`);
    config = extendConfig(config, `${pathEnv}.${config.APP_ENV}`);
    config = extendConfig(config, `${pathEnv}.${config.APP_ENV}.local`);

    return Object.assign(config, processEnv);
}

module.exports = SymfonyDotEnv