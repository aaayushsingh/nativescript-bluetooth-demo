var observable = require("data/observable");
var observableArray = require("data/observable-array");
var frameModule = require("ui/frame");
var bluetooth = require("nativescript-bluetooth");
var dialogs = require("ui/dialogs");
var DemoAppModel = (function (_super) {
  __extends(DemoAppModel, _super);
  function DemoAppModel() {
    _super.call(this);
  }
  
  DemoAppModel.prototype.doIsBluetoothEnabled = function () {
    bluetooth.isBluetoothEnabled().then(function(enabled) {
      dialogs.alert({
        title: "Enabled?",
        message: enabled ? "Yes" : "No",
        okButtonText: "OK, thanks"
      });
    });
  };

  function doFind(peri){
    console.log("miss me?");
    // var navigationEntry = {
    //   moduleName: "services-page",
    //   context: {
    //     info: "something you want to pass to your page",
    //     foo: 'bar',
    //     peripheral: peri
    //   },
    //   animated: true
    // };
    // var topmost = frameModule.topmost();
    // topmost.navigate(navigationEntry);

  }

  var observablePeripheralArray = new observableArray.ObservableArray();

  DemoAppModel.prototype.peripherals = observablePeripheralArray;
  
  DemoAppModel.prototype.onPeripheralTap = function (args) {
    var index = args.index;
    console.log('!!&&&&***** Clicked item with index ' + index);
    var peri = DemoAppModel.prototype.peripherals.getItem(index);
    console.log("--- peri selected: " + peri.UUID);
    //console.dir(peri);
    


//     bluetooth.connect(
//     {
//       UUID: _peripheral.UUID,
//       // NOTE: we could just use the promise as this cb is only invoked once
//       onConnected: function (peripheral) {
//         console.log("------- Peripheral connected: " + JSON.stringify(peripheral));
//         peripheral.services.forEach(function(value) {
//           console.log("---- ###### adding service: " + value.UUID);
//           _peripheral.services.push(value);
//         });
//         _peripheral.set('isLoading', false);
//       },
//       onDisconnected: function (peripheral) {
//         dialogs.alert({
//           title: "Disconnected",
//           message: "Disconnected from peripheral: " + JSON.stringify(peripheral),
//           okButtonText: "OK, thanks"
//         });
//       }
//     }
//   );
// }

    var navigationEntry = {
      moduleName: "services-page",
      context: {
        info: "something you want to pass to your page",
        foo: 'bar',
        peripheral: peri
      },
      animated: true
    };
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
  };

  // DemoAppModel.prototype.doScanForHeartrrateMontitor = function () {
  //   var that = this;

  //    bluetooth.hasCoarseLocationPermission().then(
  //     function(granted) {
  //       if (!granted) {
  //         bluetooth.requestCoarseLocationPermission();
  //       } else {
  //         var heartrateService = "180d";
  //         var omegaService = "12345678-9012-3456-7890-1234567890ee";

  //         that.set('isLoading', true);
  //         // reset the array
  //         observablePeripheralArray.splice(0, observablePeripheralArray.length); 
  //         bluetooth.startScanning(
  //           {
  //             // beware: the peripheral must advertise ALL these services
  //             serviceUUIDs: [heartrateService],
  //             seconds: 4,
  //             onDiscovered: function (peripheral) {
  //               var obsp = new observable.Observable(peripheral);
  //               observablePeripheralArray.push(obsp);
  //             }
  //           }
  //         ).then(function() {
  //           that.set('isLoading', false);
  //         },
  //         function (err) {
  //           that.set('isLoading', false);
  //           dialogs.alert({
  //             title: "Whoops!",
  //             message: err,
  //             okButtonText: "OK, got it"
  //           });
  //         });
  //       }
  //     }
  //    );
  // };

  DemoAppModel.prototype.doStartScanning = function () {
    var that = this;

    // On Android 6 we need this permission to be able to scan for peripherals in the background.
     bluetooth.hasCoarseLocationPermission().then(
      function(granted) {
        if (!granted) {
          bluetooth.requestCoarseLocationPermission();
        } else {
          that.set('isLoading', true);
          // reset the array
          observablePeripheralArray.splice(0, observablePeripheralArray.length); 
          bluetooth.startScanning(
            {
              serviceUUIDs: [], // pass an empty array to scan for all services
              seconds: 4, // passing in seconds makes the plugin stop scanning after <seconds> seconds
              onDiscovered: function (peripheral) {
                if(peripheral.name=="Electronic Scale"){
                    //doFind(peripheral);
                    //console.dir(peripheral);
                    //kuchNameSochLe();
                      
                } else {
                  console.log("Name Error");
                }
                var obsp = new observable.Observable(peripheral);
                observablePeripheralArray.push(obsp);
              }
            }
          ).then(function() {
            that.set('isLoading', false);
          },
          function (err) {
            that.set('isLoading', false);
            dialogs.alert({
              title: "Whoops!",
              message: err,
              okButtonText: "OK, got it"
            });
          });
        }
      }
    );
  };

  DemoAppModel.prototype.doStopScanning = function () {
    var that = this;
    bluetooth.stopScanning().then(function() {
      that.set('isLoading', false);
    },
    function (err) {
      dialogs.alert({
        title: "Whoops!",
        message: err,
        okButtonText: "OK, so be it"
      });
    });
  };

/*
  DemoAppModel.prototype.doWrite = function () {
    // send 1 byte to switch a light on
    var data = new Uint8Array(1);
    data[0] = 1;

    bluetooth.write(
      {
        peripheralUUID: mostRecentlyFoundperipheralUUID,
        serviceUUID: "B9401000-F5F8-466E-AFF9-25556B57FE6D", // TODO dummy
        characteristicUUID: "B9402001-F5F8-466E-AFF9-25556B57FE6D", // TODO dummy
        value: data.buffer,
        awaitResponse: true // if false you will not get notified of errors (fire and forget) 
      }
    ).then(
      function(result) {
        dialogs.alert({
          title: "Write result",
          message: JSON.stringify(result),
          okButtonText: "OK, splendid"
        });
      },
      function (err) {
        dialogs.alert({
          title: "Whoops!",
          message: err,
          okButtonText: "Hmmkay"
        });
      }
    );
  };
*/
  return DemoAppModel;
})(observable.Observable);
exports.DemoAppModel = DemoAppModel;
exports.mainViewModel = new DemoAppModel();
