const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

/**
 * @param {Object} config
 * @param {String} file
 * @param {Object}processEnv
 * @returns {Object}
 */
let extendConfig = (config, file, processEnv = {}) => {
    if (fs.existsSync(file)) {
        const parsed = dotenv.parse(fs.readFileSync(file, {encoding: 'utf8'}));
        config = Object.assign(config, parsed, processEnv);
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

    config = extendConfig(config, pathEnv, processEnv);
    config = extendConfig(config, `${pathEnv}.local`, processEnv);
    config = extendConfig(config, `${pathEnv}.${config.APP_ENV}`, processEnv);
    return extendConfig(config, `${pathEnv}.${config.APP_ENV}.local`, processEnv);
}

module.exports = SymfonyDotEnv