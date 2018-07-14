/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojmodule-element', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function (oj, ko, moduleUtils) {
    function ControllerViewModel() {
      var self = this

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY)
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery)
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP)
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery)

      // Router setup
      self.router = oj.Router.rootInstance
      self.router.configure({
        'home': { label: '首页', isDefault: true },
        'page': { label: '商品详情' },
        'threshold': { label: '预警温度' },
        'commodity': { label: '运输商品' },
        'status': { label: '区块链状态' }
      })
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter()

      self.moduleConfig = ko.observable({ 'view': [], 'viewModel': null })

      self.loadModule = function () {
        ko.computed(function () {
          var name = self.router.moduleConfig.name()
          var viewPath = 'views/' + name + '.html'
          var modelPath = 'viewModels/' + name
          var masterPromise = Promise.all([
            moduleUtils.createView({ 'viewPath': viewPath }),
            moduleUtils.createViewModel({ 'viewModelPath': modelPath })
          ])
          masterPromise.then(
            function (values) {
              self.moduleConfig({ 'view': values[0], 'viewModel': values[1] })
            },
            function (reason) { }
          )
        })
      }

      // Navigation setup
      var navData = [
        {
          name: '温度阈值设置',
          id: 'threshold'
        },
        {
          name: '运输商品设置',
          id: 'commodity'
        },
        {
          name: '区块链状态',
          id: 'status'
        }
      ]
      self.navDataSource = new oj.ArrayTableDataSource(navData, { idAttribute: 'id' })

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function () { oj.OffcanvasUtils.close(self.drawerParams) })
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      }
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function () {
        return oj.OffcanvasUtils.toggle(self.drawerParams)
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function () { $('#drawerToggleButton').focus() })
    }

    return new ControllerViewModel()
  }
)
