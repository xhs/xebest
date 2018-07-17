define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config'],
  function (oj, ko, $, app, config) {

    function PageViewModel() {
      var self = this

      self.router = app.router

      self.back = function () {
        self.router.go('home')
      }

      self.temperatureChart = null
      self.ifShowChart = ko.observable(false)

      self.commodityId = null
      self.temperature = ko.observable('-')
      self.name = ko.observable('')
      self.traces = ko.observableArray([])

      self.currentTab = ko.observable('temperature')

      self.showTemperatureTab = function () {
        self.currentTab('temperature')
      }

      self.showLogisticsTab = function () {
        self.currentTab('logistics')
        self.renderMap()
      }

      self.renderMap = function () {
        var positionRatios = config.getPositionRatios()
        var definedRoute = config.getRoute()

        var mapElement = document.getElementById('map')
        if (config.getExternalMapUrl()) {
          mapElement.style.backgroundImage = "url('" + config.getExternalMapUrl() + "')"
        }

        var mapWidth = mapElement.offsetWidth
        var mapHeight = mapElement.offsetHeight
        var routeInfo = definedRoute.map(function (name) {
          var x = positionRatios[name].x
          var y = positionRatios[name].y
          var w = positionRatios[name].w
          var h = positionRatios[name].h

          var h1 = mapHeight
          var w1 = w * h1 / h
          var padding = Math.abs(w1 - mapWidth) / 2

          var x1 = w1 * x / w
          var y1 = h1 * y / h

          var x2 = x1 - padding
          var y2 = mapHeight - y1

          console.log(JSON.stringify({ Wm: mapWidth, Hm: mapHeight }))
          console.log(positionRatios[name])
          console.log(JSON.stringify({ x1: x1, y1: y1, w1: w1, h1: h1, padding: padding }))
          console.log(JSON.stringify({ x2: x2, y2: y2 }))

          return {
            name: name,
            coordinate: [x2, y2]
          }
        })
        console.log(routeInfo)

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getLocationHistoryById.do',
          data: {
            goodsId: self.commodityId
          }
        }).done(function (data) {
          var response = JSON.parse(data)
          console.log(response)
          var states = response.resultMsg
          var logisticsInfo = {}
          for (var i = 0; i < states.length; i++) {
            var state = states[i]
            var name = state.locationName
            logisticsInfo[name] = {
              isCurrent: i === 0 // ASSUME: current location comes first
            }
          }
          console.log(logisticsInfo)

          var unArrivedColor = '#acacac'
          var arrivedColor = '#058232'
          var arrivedBorderColor = '#2fd871'
          var currentColor = '#fd2f05'
          var option = {
            grid: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            },
            xAxis: {
              show: false,
              min: 0,
              max: mapWidth
            },
            yAxis: {
              show: false,
              min: 0,
              max: mapHeight
            },
            series: [{
              type: 'scatter',
              zlevel: 2,
              data: routeInfo.map(function (item) {
                return {
                  name: item.name,
                  value: item.coordinate,
                  symbolSize: 18,
                  label: {
                    normal: {
                      show: !(logisticsInfo[item.name] && logisticsInfo[item.name].isCurrent),
                      position: 'left',
                      formatter: '{b}'
                    }
                  },
                  itemStyle: {
                    color: logisticsInfo[item.name] ? arrivedColor : unArrivedColor,
                    borderColor: logisticsInfo[item.name] ? arrivedBorderColor : unArrivedColor,
                    borderWidth: 2,
                    opacity: 1
                  }
                }
              })
            }, {
              type: 'line',
              zlevel: 2,
              showSymbol: false,
              lineStyle: {
                width: 4
              },
              itemStyle: {
                color: unArrivedColor,
              },
              data: routeInfo.map(function (item) {
                return {
                  name: item.name,
                  value: item.coordinate
                }
              })
            }, {
              type: 'line',
              zlevel: 2,
              showSymbol: false,
              itemStyle: {
                color: arrivedColor,
              },
              lineStyle: {
                width: 4
              },
              data: routeInfo.map(function (item) {
                if (logisticsInfo[item.name]) {
                  return {
                    name: item.name,
                    value: item.coordinate
                  }
                }
              }).filter(function (item) {
                return typeof item !== 'undefined'
              })
            }, {
              type: 'effectScatter',
              zlevel: 3,
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  formatter: '{b}'
                }
              },
              symbolSize: 18,
              itemStyle: {
                normal: {
                  color: currentColor
                }
              },
              data: routeInfo.map(function (item) {
                if (logisticsInfo[item.name] && logisticsInfo[item.name].isCurrent) {
                  return {
                    name: item.name,
                    value: item.coordinate,
                    symbolSize: 18
                  }
                }
              }).filter(function (item) {
                return typeof item !== 'undefined'
              })
            }]
          }
          console.log(option)

          var routeChart = echarts.init(mapElement)
          routeChart.setOption(option, true)
        })
      }

      self.printPositionRatio = function (_, event) {
        var Wp = config.getMapWidth()
        var Hp = config.getMapHeight()

        var el = document.getElementById('map')
        var w = el.offsetWidth
        var h = el.offsetHeight

        var rect = el.getBoundingClientRect()
        var x1 = event.clientX - rect.left
        var y1 = event.clientY - rect.top

        var x = x1 * Wp / w
        var y = y1 * Hp / h

        var info = {
          x: x,
          y: y,
          w: Wp,
          h: Hp
        }
        console.log(JSON.stringify(info))
      }

      self.showChart = function (_, event) {
        var target = event.currentTarget ? event.currentTarget : event.srcElement
        var commodityId = target.getAttribute('data-commodity-id')
        var locationId = target.getAttribute('data-location-id')
        console.log(commodityId)
        console.log(locationId)
        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getTemperatureHistoryByLocationId.do',
          data: {
            goodsId: commodityId,
            locationId: locationId
          }
        }).done(function (data) {
          var response = JSON.parse(data)
          console.log(response)
          var records = response.resultMsg
          var labels = []
          var values = []
          for (var i = 0; i < records.length; i++) {
            var record = records[i]
            labels.push(record.createTime)
            values.push(record.temperature)
          }

          var ctx = document.getElementById("chart").getContext('2d')
          self.temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: '历史温度',
                data: values,
                pointBackgroundColor: 'rgba(14, 208, 254, 1)',
                pointBorderColor: 'rgba(55, 111, 149, 1)',
                borderColor: 'rgba(14, 208, 254, 1)',
                borderWidth: 2,
                fill: false,
                showLine: true
              }]
            },
            options: {
              legend: {
                labels: {
                  fontColor: '#fff',
                  usePointStyle: true
                }
              },
              animation: {
                duration: 220
              },
              scales: {
                yAxes: [{
                  ticks: {
                    fontColor: '#fff'
                  },
                  gridLines: {
                    color: 'rgba(50, 93, 142, 1)'
                  }
                }],
                xAxes: [{
                  ticks: {
                    fontColor: '#fff'
                  },
                  gridLines: {
                    display: false
                  }
                }]
              }
            }
          })
        })

        self.ifShowChart(true)
      }

      self.hideChart = function () {
        self.ifShowChart(false)
        self.temperatureChart.clear()
      }

      self.update = function () {
        console.log(self.router.retrieve())
        var info = self.router.retrieve()
        self.commodityId = info.commodityId

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getTemperatureById.do',
          data: {
            goodsId: self.commodityId
          }
        }).done(function (data) {
          var response = JSON.parse(data)
          console.log(response)
          var commodity = response.resultMsg
          self.temperature(commodity.temperature)
          self.name(commodity.goodsName)
        })

        $.ajax({
          url: config.getBaseUrl() + '/coldChainLogistics/getTemperatureThreshold.do'
        }).done(function (response) {
          var threshold = response.TemperatureThreshold
          console.log('threshold: ' + threshold)

          $.ajax({
            url: config.getBaseUrl() + '/coldChainLogistics/getTemperatureHistoryById.do',
            data: {
              goodsId: self.commodityId
            }
          }).done(function (data) {
            var response = JSON.parse(data)
            console.log(response)
            var states = response.resultMsg
            var tracesValue = []
            for (var i = 0; i < states.length; i++) {
              var state = states[i]
              // TODO: make it configurable
              if (state.temperature > threshold + 5) {
                status = 'critical'
              } else {
                if (state.temperature > threshold) {
                  status = 'warning'
                } else {
                  status = 'normal'
                }
              }

              tracesValue.push({
                commodityId: state.goodsId,
                location: state.locationName,
                locationId: state.locationId,
                temperature: state.temperature,
                timestamp: state.createTime,
                status: status // FIXME: missing 'official' status here
              })
            }
            console.log(tracesValue)

            self.traces(tracesValue)
          })
        })
      }

      self.refreshTimer = null
      self.connected = function () {
        console.log('page connected')
        self.currentTab('temperature')
        self.temperature('-')
        self.name('')
        self.traces([])

        self.update()
        self.refreshTimer = setInterval(self.update, config.getRefreshInterval())
      }
      self.disconnected = function () {
        console.log('page disconnected')
        clearInterval(self.refreshTimer)
      }

      self.transitionCompleted = function () {
        // Implement if needed
      }
    }

    return new PageViewModel()
  }
)
