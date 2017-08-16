#!/bin/sh
export PROJECT_VERSION=$(node -pe "require('./package.json').version");


echo "Project Version: ${PROJECT_VERSION}";

if [ ${PROJECT_VERSION} ] && [ "$bamboo_planRepository_branchName" == "develop" ];
then
    echo "Building and publish project";
    npm run deploy:prod && npm publish;
    echo "Published v${PROJECT_VERSION}";
fi
