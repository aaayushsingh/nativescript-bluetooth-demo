var observableArray = require("data/observable-array");
var observable = require("data/observable");
var frameModule = require("ui/frame");
var bluetooth = require("nativescript-bluetooth");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;

    // the Observable-wrapped objects from the previous page
    var peripheral = page.navigationContext.peripheral;
    var service = page.navigationContext.service;
    service.peripheral = peripheral;
    page.bindingContext = new observable.Observable(service);
    console.log("before write")
    bluetooth.write({
        peripheralUUID: "01:02:03:04:05:92",
        serviceUUID: "fff0",
        characteristicUUID: "fff1",
        value: '0xFE,0x03,0x01,0x00,0xAA,0x19,0x01,0xB0'
      }).then(function (result) {
        console.log("write result");
        //service.set("feedback", 'value written!');
        
        //service.set("feedbackTimestamp", getTimestamp());
        //var data = new Array(result.value);
          //console.dir(result);
          //console.dir(result.value);
          //   var heartRate = data[1];
          //service.set("notifData", data);
          console.log("write result 2,calling notify");
          notify();
          //service.set("feedback", result.value);
          //service.set("moreData", result.valueRaw);
      }, function (errorMsg) {
          //service.set("feedback", errorMsg);
          //service.set("feedbackTimestamp", getTimestamp());
      });
      function notify(){
        console.log("start notify")
          bluetooth.startNotifying({
            peripheralUUID: "01:02:03:04:05:92",
            serviceUUID: "fff0",
            characteristicUUID: "fff4",
            onNotify: function(result) {
              // result.value is an ArrayBuffer. Every service has a different encoding.
              // fi. a heartrate monitor value can be retrieved by:
              //   var data = new Uint8Array(result.value);
              //   var heartRate = data[1];
              var data = new Uint8Array(result.value);
              console.log("===================================================================================");
              console.dir(data);
              console.log("===================================================================================");
              //   var heartRate = data[1];
              //service.set("notifData", data);
              //service.set("feedback", result.value);
              //service.set("moreData", result.valueRaw);
              //service.set("feedbackTimestamp", getTimestamp());
            }
          }).then(function (result) {
            //console.dir(result);
              //console.dir(result.value);
            //service.set("feedback", result.value);
            //service.set("feedbackRaw", result.valueRaw);
            //service.set("feedbackTimestamp", getTimestamp());
          });
      }
}



// function onCharacteristicTap(args) {
//   var index = args.index;
//   var page = args.object;
//   var service = page.bindingContext;
//   var characteristic = service.characteristics[index];

//   // show an actionsheet which contains the most relevant possible options
//   var p = characteristic.properties;
//   var actions = [];
  
//   if (p.read) actions.push("read");
//   //if (p.write) actions.push("write");
//   if (p.write) actions.push("write 0x01"); // convenience method, will write hex 1, translated to a binary 1
//   //if (p.writeWithoutResponse) actions.push("writeWithoutResponse");
//   if (p.notify) actions.push("notify start");
//   if (p.notify) actions.push("notify stop");

//   dialogs.action({
//     message: "Pick a property",
//     cancelButtonText: "Cancel",
//     actions: actions
//   }).then(function (result) {
//     function getTimestamp() {
//       return new Date().toLocaleString();
//     }

//     if (result === "read") {
//       bluetooth.read({
//         peripheralUUID: service.peripheral.UUID,
//         serviceUUID: service.UUID,
//         characteristicUUID: characteristic.UUID
//       }).then(function (result) {
//         // result.value is an ArrayBuffer. Every service has a different encoding.
//         // fi. a heartrate monitor value can be retrieved by:
//         //   var data = new Uint8Array(result.value);
//         //   var heartRate = data[1];
//         service.set("feedback", result.value);
//         service.set("feedbackRaw", result.valueRaw);
//         service.set("feedbackTimestamp", getTimestamp());
//       }, function(error) {
//         service.set("feedback", error);
//         service.set("feedbackTimestamp", getTimestamp());
//       });
//     } else if (result === "write") {
//       dialogs.prompt({
//         title: "Write what exactly?",
//         message: "Please enter byte values; use 0x in front for hex and send multiple bytes by adding commas. For example 0x01 or 0x007F,0x006E",
//         cancelButtonText: "Cancel",
//         okButtonText: "Write it!!"
//       }).then(function(response) {
//         if (response.result) {
//           bluetooth.write({
//             peripheralUUID: service.peripheral.UUID,
//             serviceUUID: service.UUID,
//             characteristicUUID: characteristic.UUID,
//             value: response.text
//           }).then(function (result) {
//             service.set("feedback", result.value);
//             service.set("feedbackRaw", result.valueRaw);
//             service.set("feedbackTimestamp", getTimestamp());
//           },
//           function (errorMsg) {
//             service.set("feedback", errorMsg);
//             service.set("feedbackTimestamp", getTimestamp());
//           });
//         }
//       });
       


//     } else if (result === "write 0x01") {
      
//       bluetooth.write({
//         peripheralUUID: "01:02:03:04:05:92",
//         serviceUUID: "fff0",
//         characteristicUUID: "fff1",
//         value: '0xFE,0x03,0x01,0x00,0xAA,0x19,0x01,0xB0'
//       }).then(function (result) {
//         service.set("feedback", 'value written!');
        
//         service.set("feedbackTimestamp", getTimestamp());
//         var data = new Array(result.value);
//           //console.dir(result);
//           //console.dir(result.value);
//           //   var heartRate = data[1];
//           service.set("notifData", data);
//           console.log("write result");
//           //service.set("feedback", result.value);
//           service.set("moreData", result.valueRaw);
//       }, function (errorMsg) {
//           service.set("feedback", errorMsg);
//           service.set("feedbackTimestamp", getTimestamp());
//       });

      
//      }
//     // else if (result === "writeWithoutResponse") {
//     //   dialogs.prompt({
//     //     title: "Write what exactly?",
//     //     message: "Please enter byte values; use 0x in front for hex and send multiple bytes by adding commas. For example 0x01 or 0x007F,0x006E",
//     //     cancelButtonText: "Cancel",
//     //     okButtonText: "Write it!"
//     //   }).then(function(response) {
//     //     if (response.result) {
//     //       bluetooth.writeWithoutResponse({
//     //         peripheralUUID: service.peripheral.UUID,
//     //         serviceUUID: service.UUID,
//     //         characteristicUUID: characteristic.UUID,
//     //         value: response.text
//     //       }).then(function (result) {
//     //         service.set("feedback", 'value write requested');
//     //         service.set("feedbackTimestamp", getTimestamp());
//     //         var data = new Array(result.value);
//     //       //console.dir(result);
//     //       //console.dir(result.value);
//     //       //   var heartRate = data[1];
//     //       service.set("notifData", data);
//     //       //service.set("feedback", result.value);
//     //       service.set("moreData", result.valueRaw);
//     //       });
//     //     }
//     //   });
//     // }
//      else if (result === "notify start") {
//       bluetooth.startNotifying({
//         peripheralUUID: "01:02:03:04:05:92",
//         serviceUUID: "fff0",
//         characteristicUUID: "fff4",
//         onNotify: function(result) {
//           // result.value is an ArrayBuffer. Every service has a different encoding.
//           // fi. a heartrate monitor value can be retrieved by:
//           //   var data = new Uint8Array(result.value);
//           //   var heartRate = data[1];
//           var data = new Uint8Array(result.value);
//           console.log("===================================================================================");
//           console.dir(data);
//           console.log("===================================================================================");
//           //   var heartRate = data[1];
//           service.set("notifData", data);
//           //service.set("feedback", result.value);
//           service.set("moreData", result.valueRaw);
//           service.set("feedbackTimestamp", getTimestamp());
//         }
//       }).then(function (result) {
//         //console.dir(result);
//           //console.dir(result.value);
//         service.set("feedback", result.value);
//         service.set("feedbackRaw", result.valueRaw);
//         service.set("feedbackTimestamp", getTimestamp());
//       });
//     } else if (result === "notify stop") {
//       bluetooth.stopNotifying({
//         peripheralUUID: service.peripheral.UUID,
//         serviceUUID: service.UUID,
//         characteristicUUID: characteristic.UUID
//       }).then(function (result) {
//         service.set("feedback", 'notification stopped');
//         service.set("feedbackTimestamp", getTimestamp());
//       }, function(error) {
//         service.set("feedback", error);
//       });
//     }
//   });
// }

exports.pageLoaded = pageLoaded;
//exports.onCharacteristicTap = onCharacteristicTap;