#!/usr/bin/env bash

npx terser .build/resolve-callback.bundle.js \
--compress \
--keep-classnames \
--keep-fnames \
--output resolve-callback.js;
