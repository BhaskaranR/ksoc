// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.


export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8200',
  /////////////apiBaseUrl: 'https://karmasoc-alpha.com/karmaweb',
  store_dev_tools: 'monitor',
  google_map_key: 'AIzaSyDmLkfClXRna7wF1DcMatEb9PYFyYG6qzrE',
  firebase: {
    apiKey: 'AIzaSyC-TuRBbvsydtcKxhAOVnk2qPUCSQ8MmLQ',
    authDomain: 'karmasoc-148700.firebaseapp.com',
    databaseURL: 'https://karmasoc-148700.firebaseio.com',
    projectId: 'karmasoc-148700',
    storageBucket: 'karmasoc-148700.appspot.com',
    messagingSenderId: '1088480510830'
  }
};
