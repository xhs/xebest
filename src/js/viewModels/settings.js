define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config'],
  function (oj, ko, $, app, config) {

    function SettingsViewModel() {
      var self = this

      self.router = app.router
      self.back = function () {
        self.router.go('home')
      }

      self.baseUrl = ko.observable('')
      self.changeBaseUrl = function() {
        if (!self.baseUrl()) {
          self.baseUrl(config.getBaseUrl())
        }

        config.setBaseUrl(self.baseUrl())
      }
      self.resetBaseUrl = function() {
        config.resetBaseUrl()
        self.baseUrl(config.getBaseUrl())
      }

      self.refreshInterval = ko.observable('')
      self.changeRefreshInterval = function() {
        if (!self.refreshInterval()) {
          self.refreshInterval(config.getRefreshInterval())
        }

        config.setRefreshInterval(self.refreshInterval())
      }
      self.resetRefreshInterval = function() {
        config.resetRefreshInterval()
        self.refreshInterval(config.getRefreshInterval())
      }

      self.externalMapUrl = ko.observable('')
      self.setExternalMapUrl = function() {
        if (!self.externalMapUrl()) {
          self.externalMapUrl(config.getExternalMapUrl())
        }

        config.setExternalMapUrl(self.externalMapUrl())
      }
      self.resetExternalMapUrl = function() {
        config.resetExternalMapUrl()
        self.externalMapUrl(config.getExternalMapUrl())
      }

      self.mapWidth = ko.observable('')
      self.setMapWidth = function() {
        if (!self.mapWidth()) {
          self.mapWidth(config.getMapWidth())
        }

        config.setMapWidth(self.mapWidth())
      }
      self.resetMapWidth = function() {
        config.resetMapWidth()
        self.mapWidth(config.getMapWidth())
      }

      self.mapHeight = ko.observable('')
      self.setMapHeight = function() {
        if (!self.mapHeight()) {
          self.mapHeight(config.getMapHeight())
        }

        config.setMapHeight(self.mapHeight())
      }
      self.resetMapHeight = function() {
        config.resetMapHeight()
        self.mapHeight(config.getMapHeight())
      }

      self.route = ko.observableArray([])
      self.routeString = ko.computed(function () {
        return JSON.stringify(self.route())
      })
      self.routeValue = ko.observable('')
      self.setRoute = function () {
        if (self.routeValue()) {
          self.route(JSON.parse(self.routeValue()))
          self.routeValue('')
        }

        config.setRoute(self.route())
      }
      self.resetRoute = function () {
        config.resetRoute()
        self.route(config.getRoute())
      }

      self.ifShowPositionRatios = ko.observable(false)
      self.showPositionRatios = function () {
        self.ifShowPositionRatios(true)
      }
      self.hidePositionRatios = function () {
        self.ifShowPositionRatios(false)
      }

      self.positionRatios = ko.observable({})
      self.positionRatiosString = ko.computed(function () {
        return JSON.stringify(self.positionRatios())
      })
      self.positionRatiosPrettyString = ko.computed(function () {
        return JSON.stringify(self.positionRatios(), null, 4)
      })
      self.positionRatiosValue = ko.observable('')
      self.setPositionRatios = function () {
        if (self.positionRatiosValue()) {
          self.positionRatios(JSON.parse(self.positionRatiosValue()))
          self.positionRatiosValue('')
        }

        config.setPositionRatios(self.positionRatios())
      }
      self.resetPositionRatios = function () {
        config.resetPositionRatios()
        self.positionRatios(config.getPositionRatios())
      }

      self.connected = function () {
        self.baseUrl(config.getBaseUrl())
        self.refreshInterval(config.getRefreshInterval())
        self.mapWidth(config.getMapWidth())
        self.mapHeight(config.getMapHeight())
        self.route(config.getRoute())
        self.positionRatios(config.getPositionRatios())
      }

      self.disconnected = function () {
        // Implement if needed
      }

      self.transitionCompleted = function () {
        // Implement if needed
      }
    }

    return new SettingsViewModel()
  }
)
