let jestGlobal = require("@jest/globals");
let {beforeEach, afterEach, test, beforeAll} = jestGlobal;

let tempProcessEnv = {};
let envPath = '';

beforeAll(() => {
    envPath = (__dirname + '/../.env');
});

beforeEach(() => {
    tempProcessEnv = process.env;
    process.env = {};
});

afterEach(() => {
    process.env = tempProcessEnv;
})

let SymfonyEnv = require('../../index');

test('parse environment .env + .env.local', () => {
    let envPath = (__dirname + '/../.env');
    let config = SymfonyEnv(envPath);

    let expected = {
        "TARGET": "env.local",
        "LOCAL": "1"
    };

    expect(expected).toStrictEqual(config);
});

test('parse environment dev env', () => {
    let envPath = (__dirname + '/../.env');
    let config = SymfonyEnv(envPath, {APP_ENV: 'dev'});

    let expected = {
        "APP_ENV": "dev",
        "LOCAL": "1",
        "DEV": "1",
        "DEV_LOCAL": "1",
        "TARGET": "env.dev.local"
    };

    expect(expected).toStrictEqual(config);
});

test('env overwrite default params', () => {
    let envPath = (__dirname + '/../.env');
    let config = SymfonyEnv(envPath, {PARAM1: "p1", TARGET: "p3"});

    let expected = {
        "TARGET": "env.local",
        "LOCAL": "1",
        "PARAM1": "p1",
    };

    expect(expected).toStrictEqual(config);
});