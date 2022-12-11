#!/usr/bin/env bash

npm cache clean --force;

npm run clean;

npx rimraf resolve-callback.js;
