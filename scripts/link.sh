#!/bin/sh

npm run bootstrap && \
npm run link && \
{
    npm run build
    } || {
        npm run bootstrap
        } && \
npm run build && \
cd ../mms/client && \
npm link @leafygreen-ui/Button