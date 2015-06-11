// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://youtube.com/**'
  ]);
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.inicio', {
      url: '/inicio',
      views: {
        'tab-inicio': {
          templateUrl: 'templates/tab-inicio.html',
          controller: 'InicioCtrl'
        }
      }
    })

    .state('tab.instrucoes', {
      url: '/instrucoes',
      views: {
        'tab-instrucoes': {
          templateUrl: 'templates/tab-instrucoes.html',
          controller: 'InstrucoesCtrl'
        }
      }
    })


    .state('tab.conheca', {
      url: '/conheca',
      views: {
        'tab-conheca': {
          templateUrl: 'templates/tab-conheca.html',
          controller: 'ConhecaCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/inicio');

  })
  .config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

  }])

.factory('Projetos', function() {
  return {
    all: function() {
      var projetoString = window.localStorage['projetos'];
      if (projetoString) {
        return angular.fromJson(projetoString);
      }
      return [];
    },
    save: function(projeto) {
      window.localStorage['projetos'] = angular.toJson(projeto);
    },
    newProject: function(projetoTitulo) {
      // Add a new project
      return {
        titulo: projetoTitulo,
        metas: [],
        count: 0
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['ultimoProjetoAtivo']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['ultimoProjetoAtivo'] = index;
    }
  }
})

;