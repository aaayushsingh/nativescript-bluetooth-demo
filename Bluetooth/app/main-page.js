var observable = require("data/observable");
var observableArray = require("data/observable-array");
var frameModule = require("ui/frame");
var vmModule = require("./main-view-model");
var bluetooth = require("nativescript-bluetooth");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    var service = page.bindingContext;
    service.set("hexor", getHexor());
    //var war = new DemoAppModel();
    console.log("...?");
    doStartScanning();

    // function goGoGo(arg) {
    //     var navigationEntry = {
    //         moduleName: "services-page",
    //         context: {
    //             info: "something you want to pass to your page",
    //             foo: 'bar',
    //             peripheral: peri
    //         },
    //         animated: true
    //     };
    // var topmost = frameModule.topmost();
    // topmost.navigate(navigationEntry);
    // };
    
    function doStartScanning () {
    var that = this;

    // On Android 6 we need this permission to be able to scan for peripherals in the background.
     bluetooth.hasCoarseLocationPermission().then(
      function(granted) {
          console.log("mil gaya?");
        if (!granted) {
          bluetooth.requestCoarseLocationPermission();
          
        } else {
            // reset the array
            console.log("kuch to ho raha hai..!");
          //observablePeripheralArray.splice(0, observablePeripheralArray.length); 
          bluetooth.startScanning(
            {
                
              serviceUUIDs: [], // pass an empty array to scan for all services
              seconds: 10, // passing in seconds makes the plugin stop scanning after <seconds> seconds
              onDiscovered: function (peripheral) {
                // var obsp = new observable.Observable(peripheral);
                // observablePeripheralArray.push(obsp);
                console.log("mil gaya.. Here are the details!");
                
                console.dir(peripheral);
                //connect();
              }
            }
          ).then(function() {
              console.log("scan khatam hogayi...!");
              
            //that.set('isLoading', false);
          },
          function (err) {
            //that.set('isLoading', false);
            console.log("kachu gadbad hai be..");
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

    function likhDo(peripheral) {
            
            
            bluetooth.write({
                  peripheralUUID: "01:02:03:04:05:92",
                  serviceUUID: "fff0",
                  characteristicUUID: "fff1",
                  value: '0xFE,0x03,0x01,0x00,0xAA,0x19,0x01,0xB0'
                }).then(function (result) {
                  //service.set("feedback", 'value written!');
                  console.log("writing!")
                  //service.set("feedbackTimestamp", getTimestamp());
                  var data = new Array(result.value);
                    //console.dir(result);
                    //console.dir(result.value);
                    //   var heartRate = data[1];
                    //service.set("notifData", data);
                    console.log("write result!");
                    //service.set("feedback", result.value);
                    //service.set("moreData", result.valueRaw);
                }, function (errorMsg) {
                    //service.set("feedback", errorMsg);
                    //service.set("feedbackTimestamp", getTimestamp());
                });
        

    };

    function connect() {
       bluetooth.connect(
          {
            UUID: "01:02:03:04:05:92",
            // NOTE: we could just use the promise as this cb is only invoked once
            onConnected: function (peripheral) {
              console.log("------- Peripheral connected: " + JSON.stringify(peripheral));
              peripheral.services.forEach(function(value) {
                console.log("---- ###### adding service: " + value.UUID);
                //_peripheral.services.push(value);
              });
              console.log("connected!")
              console.dir(peripheral);
              // var navigationEntry = {
              //       moduleName: "services-page",
              //       context: {
              //         info: "something you want to pass to your page",
              //         foo: 'bar',
              //         peripheral: peripheral
              //       },
              //       animated: true
              //     };
              //     var topmost = frameModule.topmost();
              //     topmost.navigate(navigationEntry);
              //likhDo(peripheral);
              //_peripheral.set('isLoading', false);
            },
            onDisconnected: function (peripheral) {
              dialogs.alert({
                title: "Disconnected",
                message: "Disconnected from peripheral: " + JSON.stringify(peripheral),
                okButtonText: "OK, thanks!"
              });
            }
        }
      );
      console.log("calling likhDo()")
      
    }

    // function padhLo() {
    //     bluetooth.startNotifying({
    //     peripheralUUID: "01:02:03:04:05:92",
    //     serviceUUID: "fff0",
    //     characteristicUUID: "fff4",
    //     onNotify: function(result) {
    //       // result.value is an ArrayBuffer. Every service has a different encoding.
    //       // fi. a heartrate monitor value can be retrieved by:
    //       //   var data = new Uint8Array(result.value);
    //       //   var heartRate = data[1];
    //       var data = new Uint8Array(result.value);
    //       console.log("===================================================================================");
    //       console.log("hogaya iska kaam");
    //       console.log("===================================================================================");
    //       //   var heartRate = data[1];
    //       service.set("notifData", data);
    //       //service.set("feedback", result.value);
    //       service.set("moreData", result.valueRaw);
    //       service.set("feedbackTimestamp", getTimestamp());
    //     }
    //   }).then(function (result) {
    //     service.set("feedback", result.value);
    //     service.set("feedbackRaw", result.valueRaw);
    //     service.set("feedbackTimestamp", getTimestamp());
    //   });
    // };
    //DemoAppModel.prototype.doStartScanning;

    //function getHexor(a,b,c,d,e,f)
    function getHexor() {
        
        var a = parseInt("0x03", 16);
        var b = parseInt("0x01", 16);
        var c = parseInt("0x00", 16);
        var d = parseInt("0xAA", 16);
        var e = parseInt("0x19", 16);
        var f = parseInt("0x01", 16);
        
        return (((a^b)^(c^d))^(e^f));
    }

    function chkHex(b){return b>100 ? invHex(b/10)+b%10 : b }
    function getHex(b) {return "0123456789abcdef".indexOf(b.toString().toLowerCase());}
    function invHex(b) {return "0123456789abcdef".charAt(b);}
}


exports.pageLoaded = pageLoaded;

exports.onPeripheralTap = vmModule.mainViewModel.onPeripheralTap;