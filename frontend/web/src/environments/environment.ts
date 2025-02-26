// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBase: "http://localhost:8080",
  firebase: {
    apiKey: "AIzaSyAMm-qteuebWzW-U-Cz_gGL3azr73vbouI",
    authDomain: "cardgame-a9bac.firebaseapp.com",
    projectId: "cardgame-a9bac",
    storageBucket: "cardgame-a9bac.appspot.com",
    messagingSenderId: "780967130080",
    appId: "1:780967130080:web:0f67499219b74486b97185"
  },
  socketBase: 'ws://localhost:8081/retrieve/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
