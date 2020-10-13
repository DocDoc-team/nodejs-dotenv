# nodejs-dotenv

[![Build Status](https://travis-ci.org/DocDoc-team/nodejs-dotenv.svg?branch=main)](https://travis-ci.org/DocDoc-team/nodejs-dotenv)
[![Code Coverage](https://scrutinizer-ci.com/g/DocDoc-team/nodejs-dotenv/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/DocDoc-team/nodejs-dotenv/?branch=main)

Package load all .env files as [Symfony](https://symfony.com/)

In all environments, the following files are loaded if they exist, the latter taking precedence over the former:

* .env                contains default values for the environment variables needed by the app
* .env.local          uncommitted file with local overrides
* .env.$APP_ENV       committed environment-specific defaults
* .env.$APP_ENV.local uncommitted environment-specific overrides

[symfony doc](https://symfony.com/doc/current/configuration.html#configuration-multiple-env-files)