angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('homePage', {
    url: '/page1',
    cache: false,
    templateUrl: 'templates/homePage.html',
    controller: 'homePageCtrl'
  })

  .state('devicePage', {
    url: '/page2',
    templateUrl: 'templates/devicePage.html',
    controller: 'devicePageCtrl'
  })

  .state('historyPage', {
      cache: false,
    url: '/page3',
    templateUrl: 'templates/historyPage.html',
    controller: 'historyPageCtrl'
  })
  .state('aboutUsPage', {
    url: '/page4',
    templateUrl: 'templates/page.html',
    controller: 'aboutUsPageCtrl'
  })
  .state('recommendationPage', {
    url: '/page4',
    templateUrl: 'templates/recommendation.html',
    controller: 'recommendationPageCtrl'
  })
.state('settingsPage', {
    url: '/page4',
    templateUrl: 'templates/settings.html',
    controller: 'settingsPageCtrl'
  })
$urlRouterProvider.otherwise('/page1')

});