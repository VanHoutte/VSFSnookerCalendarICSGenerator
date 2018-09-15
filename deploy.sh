#!/usr/bin/env bash

npm run init

if [[ -n "$ENVIRONMENT" ]]; then
    VARIABLE=$ENVIRONMENT
else
    VARIABLE=$*
fi

echo "========="
echo "|"$VARIABLE"|"
echo "========="

if [[ $VARIABLE == "test" ]]; then
    npm run pre-staging
    npm run staging
elif [[ $VARIABLE == "production" ]]; then
    npm run pre-production
    npm run production
elif [[ $VARIABLE == "local" ]]; then
    npm run pre-local
    npm run local
else
    npm run pre-dev
    npm run dev
fi
