#!/usr/bin/env bash

mkdir .build;

npx rollup resolve-callback.module.js \
--file .build/resolve-callback.bundle.js \
--format umd \
--name 'resolveCallback' \
--compact;
