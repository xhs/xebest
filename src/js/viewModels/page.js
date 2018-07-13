define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
 function(oj, ko, $, app) {
  
    function PageViewModel() {
      var self = this

      self.router = app.router

      self.back = function() {
        self.router.go('home')
      }

      self.connected = function() {
        // Implement if needed
        console.log(self.router.retrieve())
      }

      self.disconnected = function() {
        // Implement if needed
      }

      self.transitionCompleted = function() {
        // Implement if needed
      }
    }

    return new PageViewModel()
  }
)
