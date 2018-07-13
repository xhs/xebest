define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
 function(oj, ko, $, app) {
  
    function HomeViewModel() {
      var self = this

      self.toggleDrawer = app.toggleDrawer
      self.router = app.router

      self.loadPage = function(data, event) {
        console.log(data)
        console.log(event)
        var target = event.currentTarget ? event.currentTarget : event.srcElement
        console.log(target)
        console.log(target.getAttribute('data-key'))

        self.router.store({
          key: target.getAttribute('data-key')
        })
        self.router.go('page')
      }

      self.connected = function() {
        // Implement if needed
      }

      self.disconnected = function() {
        // Implement if needed
      }

      self.transitionCompleted = function() {
        // Implement if needed
      }
    }

    return new HomeViewModel()
  }
)
