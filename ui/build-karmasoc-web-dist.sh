#! /bin/bash
WORKSPACE=/home/ubuntu/karmasoc_services/karmasoc-web
echo "BUILDING NPM INSTALL"
npm install --prefix $WORKSPACE
echo "BUILDING NPM BUILD"
npm run build-full-workbox --prefix $WORKSPACE