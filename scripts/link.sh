#!/bin/sh

npm run link && \
{
    npm run build
    } || {
        npm run bootstrap
        } && \
npm run build 