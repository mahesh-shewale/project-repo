var HtmlReporter = require('protractor-html-screenshot-reporter');

var today = new Date(),
timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';

var reporter=new HtmlReporter({
    baseDirectory: './protractor-results-html/', 
    docTitle: 'Protractor Reporter',
    docName: 'protractor-tests-report.html'
});

exports.config = {
  allScriptsTimeout: 250000,

  specs: [
     'Login_scenario.js',
     'movie_details_scenario.js',
   //  'video_details_scenario.js'
   //  'detail-page.js'
   //'detail-page.js'  
   // 'Dashboard_scenario.js',
   // 'asset_library_scenario.js',
   // 'tags_scenario.js'
  ],
  
  capabilities: {
    'browserName': 'firefox'
  },

  //directConnect : true,
  //firefoxPath: '\/usr\/bin\/firefox',

  // multiCapabilities: [{
  //   'browserName': 'chrome'
  // }, {
  //   'browserName': 'firefox'
  // }],

  rootElement: '[ng-app]',
  framework: 'jasmine',

  params: {
    baseUrl: process.env.BASE_URL,
    userID: process.env.USER_ID,
    password: process.env.PASSWORD
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 250000
  },

/*
   onPrepare: function() {
         jasmine.getEnv().addReporter(reporter);

         var mkdirp = require('mkdirp');
         var reportFolder = "./protractor-result-junit-xml/";
         require('jasmine-reporters');
         mkdirp(reportFolder, function(err) {
         if (err) {
           console.error(err);
         } else {
           jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(reportFolder, true, true));
         }
     });
   }    */
};


