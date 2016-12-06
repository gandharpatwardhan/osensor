

angular.module('app.controllers', [])
  
.controller('homePageCtrl', ['$scope', '$stateParams', 'ValuesService', '$ionicModal', '$timeout', '$cordovaBluetoothSerial', '$ionicLoading', '$ionicPlatform', '$cordovaSQLite', '$localStorage',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, ValuesService,  $ionicModal,  $timeout, $cordovaBluetoothSerial, $ionicLoading, $ionicPlatform, $cordovaSQLite, $localStorage) {
    
    $scope.swiper = {};
    $scope.data = {};

    $scope.onReadySwiper = function (swiper) {

        console.log('here');
        $scope.swiper = swiper;
    };
   
    // $scope.swiper.slideTo(9);
    /*
     parseData = function(mydata)
    {
        // only take the last value of the data
        // data wud be ; seperated
        
        var strarr = mydata.split(";");
        elem= strarr.pop();
        return elem;
    }
    */

     
    // var ab = "1.24;5.75;4.28;6.26";
    //var last = parseData(ab);
    //alert(last);
    var formatData = $localStorage.deviceData;
    
    
    var isEmpty = function(obj) {
        //alert('In isempty');
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        //alert('returning true');
        return true;
    }

    var tempDate = new Date();
    var visitDate = new Date (tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDay());
    var currDate = visitDate.getMilliseconds();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                     ];
    var mydatestr = tempDate.getUTCDate() + "-" + monthNames[tempDate.getUTCMonth()] + " " + tempDate.getHours() + ":" + tempDate.getUTCMinutes();
    
    ValuesService.setDeviceData($localStorage.deviceData);
    
    $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    scope: $scope
  }).then(function(modal1) {
    $scope.modal = modal1;
  });
    
    openModal = function() {
    $timeout(function(){ 
        $scope.modal.show(); 
    },0);
        
        // call the connect function
  };
    
    closeModal = function() {
    $timeout(function(){ 
        $scope.modal.hide();
    },0);
        
        // call the connect function
  };
    
    
    show = function() {
    $ionicLoading.show({
      template: 'Scanning... <ion-spinner class="spinner-energized"></ion-spinner>'
    });
  };
  hide = function(){
    $ionicLoading.hide();
  };

    
    parseData = function(mydata)
    {
        // only take the last value of the data
        // data wud be ; seperated
        
        var strarr = mydata.split(";",2);
        elem= strarr.pop();
        elemPh = parseFloat(elem)/100;
        //elem = strarr.pop();
        return elemPh;
    };
    
    
    setSlider = function()
    {
        console.log("In set slider");
        
        console.log($scope.data.val);
        //$scope.swiper.slideTo(4);
        $scope.currPhValue = parseFloat($scope.data.val).toFixed(1);
        console.log($scope.currPhValue);
        if($scope.currPhValue >= 1 && $scope.currPhValue < 2)
                    $scope.swiper.slideTo(0);
        if($scope.currPhValue >= 2 && $scope.currPhValue < 3)
                    $scope.swiper.slideTo(1);
        if($scope.currPhValue >= 3 && $scope.currPhValue < 4)
                    $scope.swiper.slideTo(2);
        if($scope.currPhValue >= 4 && $scope.currPhValue < 5)
                    $scope.swiper.slideTo(3);
        if($scope.currPhValue >= 5 && $scope.currPhValue < 6)
            {
                console.log("Sliding from 5 to 6");

                $scope.swiper.slideTo(4);
            }
        if($scope.currPhValue >= 6 && $scope.currPhValue < 7)
            $scope.swiper.slideTo(5);
        if($scope.currPhValue >= 7 && $scope.currPhValue < 8)
            $scope.swiper.slideTo(6);
        if($scope.currPhValue >= 8 && $scope.currPhValue < 9)
            $scope.swiper.slideTo(7);
        if($scope.currPhValue >= 9 && $scope.currPhValue < 10)
            $scope.swiper.slideTo(8);
        if($scope.currPhValue >= 10 && $scope.currPhValue < 11)
            $scope.swiper.slideTo(9);
        if($scope.currPhValue >= 11 && $scope.currPhValue < 12)
            $scope.swiper.slideTo(10);
        if($scope.currPhValue >= 12 && $scope.currPhValue < 13)
            $scope.swiper.slideTo(11);
        if($scope.currPhValue >= 13 && $scope.currPhValue < 14)
            $scope.swiper.slideTo(12);
        
            $timeout(function(){},10);
    }
    sendReadCommand = function()
    {
        //alert('calling write command');
        $cordovaBluetoothSerial.write("*R#", function()
            {
                // write success
                r();
            },
            function()
            {
                // write failure
                //alert("Could not send read command to device");
            }
        );
    };
    
    r = function()
    {
        //var i = 0;
        //hide();
    
        //alert('calling read home');
        $timeout(function(){},3000);
        $cordovaBluetoothSerial.read(function(data1) 
        {
            alert('Inside Read(): Data:- ' + data1);
            data = parseData(data1);
            //alert('after parsing: ' + data);
            // currently the format of data is not known. Setting the value directly into pH Value
            var tempDate = new Date();

            //$localStorage.deviceData =  {"date": {1: {"pH": "6","temp": "40"}}};
            //$localStorage.deviceData[visitDate.getTime()].pH = data;
            //ValuesService.setValues($localStorage.deviceData);
            var timeobj = tempDate.getTime();

            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                             ];
            var mydatestr = tempDate.getUTCDate() + "-" + monthNames[tempDate.getUTCMonth()] + " " + tempDate.getHours() + ":" + tempDate.getUTCMinutes();
            if(isEmpty($localStorage.deviceData))
            {
                $localStorage.deviceData =  {"date": {1: {"pH": "6","temp": "40"}}};
            }
            $localStorage.deviceData.date[mydatestr] = {"pH":"", "temp":""};
            //alert(mydatestr);
            if(!isEmpty(data))
            {
                data = parseFloat(data).toFixed(1);
                $localStorage.deviceData.date[mydatestr].pH = data;
                //alert('phvalue is: ' + $localStorage.deviceData.date[mydatestr].pH);

                $scope.currPhValue = data;
                ValuesService.setDeviceData($localStorage.deviceData);
                alert('pH data from device: ' + data);
                //$scope.currPhValue = devicedata.pH;
                /*
                if($scope.currPhValue >= 4 && $scope.currPhValue < 5)
                    $scope.mycolor = "bg_red";
                if($scope.currPhValue >= 5 && $scope.currPhValue < 6)
                    $scope.mycolor = "bg_orange";
                if($scope.currPhValue >= 6 && $scope.currPhValue < 7)
                    $scope.mycolor = "bg_yellow";
                if($scope.currPhValue >= 7 && $scope.currPhValue < 8)
                    $scope.mycolor = "bg_lime";
                if($scope.currPhValue >= 8 && $scope.currPhValue < 9)
                    $scope.mycolor = "bg_green";
                if($scope.currPhValue >= 9 && $scope.currPhValue < 10)
                    $scope.mycolor = "bg_blue";
                if($scope.currPhValue >= 10 && $scope.currPhValue < 11)
                    $scope.mycolor = "bg_violet";
                */
                if($scope.currPhValue >= 1 && $scope.currPhValue < 2)
                    $scope.swiper.slideTo(0);
                if($scope.currPhValue >= 2 && $scope.currPhValue < 3)
                            $scope.swiper.slideTo(1);
                if($scope.currPhValue >= 3 && $scope.currPhValue < 4)
                            $scope.swiper.slideTo(2);
                if($scope.currPhValue >= 4 && $scope.currPhValue < 5)
                    $scope.swiper.slideTo(3);
                if($scope.currPhValue >= 5 && $scope.currPhValue < 6)
                    $scope.swiper.slideTo(4);
                if($scope.currPhValue >= 6 && $scope.currPhValue < 7)
                    $scope.swiper.slideTo(5);
                if($scope.currPhValue >= 7 && $scope.currPhValue < 8)
                    $scope.swiper.slideTo(6);
                if($scope.currPhValue >= 8 && $scope.currPhValue < 9)
                    $scope.swiper.slideTo(7);
                if($scope.currPhValue >= 9 && $scope.currPhValue < 10)
                    $scope.swiper.slideTo(8);
                if($scope.currPhValue >= 10 && $scope.currPhValue < 11)
                    $scope.swiper.slideTo(9);
                if($scope.currPhValue >= 11 && $scope.currPhValue < 12)
                    $scope.swiper.slideTo(10);
                if($scope.currPhValue >= 12 && $scope.currPhValue < 13)
                    $scope.swiper.slideTo(11);
                if($scope.currPhValue >= 13 && $scope.currPhValue < 14)
                    $scope.swiper.slideTo(12);

            }
            else
            {
                alert("data from device is empty");
            }
            $timeout(function(){},0);
            //$scope.$apply;
            //alert('closing modal');
           
            //closeModal();
        });
    }
    
    $scope.connect = function(deviceid,devicename) {
    
        // disable the list till we reach a conclusion and then enable
            $cordovaBluetoothSerial.connect(deviceid).subscribe(function() { 
                $storage = $localStorage;
                
               // alert('Connecting to: ' + $storage.name);
                $cordovaBluetoothSerial.isConnected(
                    function() {
                        //alert("Bluetooth is connected");
                        
                        if(typeof(Storage) != "undefined") {
                            $localStorage.name = devicename;
                            $localStorage.id = deviceid;

                            //alert("Data stored in localstorage!");
                            } 
                            else {
                                alert("LocalStorage not supported!");
                            }
                        //r();
                        $scope.ButtonString = "Read pH value";
                        $scope.ConnectionStatus = "Connected";
                        closeModal();
                        $timeout(function(){},1);
                    },
                    function() {
                        alert("Bluetooth is *not* connected");
                    }
                );},
        function() {
                str = devicename;
                str += " not available";
                alert(str);
            });
    }
    
    
    

    var connectSuccess = function() 
    { 
        $cordovaBluetoothSerial.isConnected(
            function() {
                //alert("Connect Success. Bluetooth is connected. Reading data");
                $timeout(function(){},3000);
                //r();
                $scope.ButtonString = "Read pH value";
                $scope.ConnectionStatus = "Connected";
                        $timeout(function(){},1);
            },
            function() {
                alert("Bluetooth is *not* connected");
            }
        );
    };
    
    var connectFailure = function() {
                str = '20:16:04:07:35:15';
                str += " not available";
                alert(str);
                //hide();
                //alert('opening modal');
                //openModal();
                
                show();
        var iscalled = false;
        var discover = function(flag)
        {
            if(!flag)
            {
                $cordovaBluetoothSerial.discoverUnpaired(function(devices) {
                        openModal();
                        $scope.allDevices = devices;
                        $cordovaBluetoothSerial.list(function(devices1) {
                            //alert('discovering');
                            $scope.allDevices1 = devices1;
                            }, 
                            function() { alert('No device found');
                                       discover(true);}
                            );
                    
                        $scope.$apply();
                        $timeout(hide,0);
                        discover(true);
                    }, 
                    function() { alert('No device found');
                               discover(true);}
                );
            }
        }
        discover(false);
    };
    
    var onNoDevice = function(){
        $cordovaBluetoothSerial.discoverUnpaired(function(devices) {
                    
                    //show();
                    $timeout(hide,5000);
                    $scope.allDevices = devices;
                   // alert("Device name: " + device.name + "    Device id: " + device.id);
                    $scope.$apply();
                }, 
                function() { alert('No device found');}
                );
            
                //openModal();
    }
    
    e = function(){
        $cordovaBluetoothSerial.enable(
            
            function() {
                alert("Bluetooth is  enabled");
                $storage = $localStorage;
                //alert($storage.id);
                //alert('connecting on localstorage 11');
                $timeout(function(){},100);
                $cordovaBluetoothSerial.connect($localStorage.id).subscribe(connectSuccess,connectFailure, function() { alert('complete always executed after success')});
            },
            function() {
                console.log("Could not enable Bluetooth");
                //alert("Could not enable Bluetooth");
            }
        );
    };

    c = function() {
        $cordovaBluetoothSerial.isConnected(
                    function() {
                        alert("Bluetooth is already connected");
                        //r();
                         $scope.ButtonString = "Read pH value";
                        $scope.ConnectionStatus = "Connected";
                        $timeout(function(){},1);
                        
                    },
                    function() {
                        alert("Bluetooth is *not* connected");
                        e();
                    }
                );
    };

    //$scope.currPhValue = "2";

    
    $scope.mycolor = "button-energized";

    $scope.ConnectionStatus = "Not Connected";
    
    $scope.ButtonString = "Connect";
    
    $ionicPlatform.ready(c,function(){});
     
    
   
}])
   
.controller('devicePageCtrl', ['$scope', '$stateParams', '$cordovaBluetoothSerial', 'ValuesService', '$state', '$localStorage',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any ang    ular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaBluetoothSerial, ValuesService, $state,$localStorage) {

    $scope.allDevices = [];
    $scope.allDevices1 = [];
        $cordovaBluetoothSerial.enable(
            
            function() {
                console.log("Bluetooth is enabled");
                alert("Bluetooth is  enabled");
                
                $cordovaBluetoothSerial.list(function(devices) {
                $scope.allDevices = devices;
                    foreach(device in devices)
                    {
                        alert("Device name: " + device.name + "    Device id: " + device.id);   
                    }
                    
                    $scope.$apply();
                }, 
                function() { alert('No device found');}
                );
                
                $cordovaBluetoothSerial.list(function(devices1) {
                $scope.allDevices1 = devices1;
                    
                $scope.$apply();
                }, 
                function() { alert('No device found');}
                );
                
                // list all the devices now
               
            },
            function() {
                console.log("Could not enable Bluetooth");
                //alert("Could not enable Bluetooth");
            }
        );
    
    $scope.scan= function(){
        $cordovaBluetoothSerial.discoverUnpaired(function(devices1) {
                $scope.allUnpairedDevices = devices1;
                    $scope.$apply();
                }, 
                function() { alert('No device found');}
                );
    };
    
    $scope.connect = function(deviceid,devicename) {
        
        $cordovaBluetoothSerial.isConnected(
                    function() {
                        alert("Bluetooth is already connected");
                    },
                    function() {
                        alert("Bluetooth is *not* connected");
                    }
                );
    
        // disable the list till we reach a conclusion and then enable
        $scope.isEnabled = "true"
            $cordovaBluetoothSerial.connect(deviceid).subscribe(function() { 
                
                alert($localStorage);
                if($localStorage == '')
                {
                    $localStorage.device = {"name":"ac","id":"11"};
                }
                else
                {
                    $localStorage.device.name = devicename;
                    $localStorage.device.id = deviceid;
                }
                $storage = $localStorage;
                
                alert($storage.device.name);
                $cordovaBluetoothSerial.isConnected(
                    function() {
                        //alert("Bluetooth is connected");
                        $cordovaBluetoothSerial.read(function(data) {
                            //alert('Inside Read');
                            var devicedata ={"pH":'3',"t":''};
                            // currently the format of data is not known. Setting the value directly into pH Value
                            devicedata.pH = data;
                            ValuesService.setValues(devicedata);
                            alert('pH from device: ' + devicedata.pH);
                            $state.go('homePage');
                        })
                    },
                    function() {
                        alert("Bluetooth is *not* connected");
                    }
                );},
        function() {
                str = devicename;
                str += " not available";
                alert(str);
            });
    }
}])
   
.controller('historyPageCtrl', ['$scope', '$stateParams', 'ValuesService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,ValuesService) {

    /*
    var tempDate = new Date();
    var visitDate = new Date (tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDay());
    alert(visitDate.getTime());
    
    var startDate1=visitDate.getTime();
    var endDate1 =visitDate.getTime();
    
    
    
    */
    
    //console.log(storedDeviceData);
    var storedDeviceData = ValuesService.getDeviceData();
    
    var mydata = [];
    var keys = [];
    var labels = [];
    if(storedDeviceData != null)
    {
        for(key in storedDeviceData.date)
        {
            keys.push(key);
        }
    }

    keys.sort(function(a, b){return b -a});
    alert("length: " + keys.length);
    for(i=0; i< 12 && i < keys.length; i++)
    {
        //alert(keys[i]);
        mydata.push(storedDeviceData.date[keys[i]].pH); 
        // labels are actually dates in milliseconds which need to be converted into date-time format
        //convert date to string
        
        //
        var tmp = new Date(keys[i]).toUTCString();
        //alert(tmp);
        if(keys[i] > 3)
            {
                var str = tmp;
                labels.push(str);
            }
        else
            labels.push(keys[i]);
        
    }
  //$scope.labels = ["10th Aug", "11th Aug", "12th Aug", "13th Aug", "14th Aug", "15th Aug", "16th Aug"];
    $scope.labels = labels;
    // get the last 12 values
    // 
    $scope.data = mydata;
    
    
   
    Chart.defaults.global.defaultFontColor = '#ffff00';
//  $scope.labels = ["10th Aug", "11th Aug", "12th Aug", "13th Aug", "14th Aug", "15th Aug", "16th Aug"];
  //$scope.series = ['pH', 'Temp'];
    $scope.series = ['pH'];
 //  $scope.colours = ['#FFFF00','#FF0000'];
    $scope.colours = ['#FFFF00'];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  //$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1',showLine:true, fill: false, }, 
                             ];
    
  $scope.options = {
      global: {
          defaultFontColor:'#FFFF00',showLine:true, fill: false,
      },
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          label:'pH',
          type: 'linear',
          display: true,
          position: 'left',
          fontColor : 'red',
          scaleLabel: {
            display: true,
            labelString: 'pH Value'
            },
        }
          /*,
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          color : 'white',
        scaleLabel: {
            display: true,
            labelString: 'temperature'
            }
        }*/
      ]
    },
/*
legend: {
            display: true,
            labels: {
                fontColor: '#FFFF00'
            }
        },*/
title: {
            display: true,
            text: 'pH Value & Temp Chart',
            fontColor: '#FFFF00',
            position: 'bottom'
        },
      showLines : true,
    
  };
    
    //alert($localStorage.name);
  
    $scope.onezoneDatepicker = {
    date: new Date(2016,9,1), // MANDATORY                     
    mondayFirst: false,                
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],                    
    daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],     
    startDate: new Date(2016,8,1),             
    endDate: new Date(),            
    /*disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: disableDates,
    disableDaysOfWeek: disableDaysOfWeek,*/
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: [
    {
        date: new Date(2016, 1, 7),
        color: '#8FD4D9',
        textColor: '#fff'
    },
    {
        date: new Date(2016, 1, 18)
    },
    {
        date: new Date(2016, 1, 19)
    },
    {
        date: new Date(2016, 1, 20)
    }
],
    callback: function(value){
        // your code
        // we need to find the appropriate data for the given date
        //alert(value);
        var startdateval = Date.parse(value);
        var d = new Date(startdateval);
        var startinmil = d.getTime();
        //alert(startinmil);
        startDate1 = startinmil;
        //got the date in number
        // now get the data for this date from localstorage
        
        getGraphData();
        $scope.data = [
    [2, 7, 8, 7, 8, 7, 8],
    [50, 55, 70, 58, 45, 65, 75]
  ];
        
    }
}
      
      $scope.onezoneDatepickerEnd = {
    date: new Date(2016,9,1), // MANDATORY                     
    mondayFirst: false,                
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],                    
    daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],     
    startDate: new Date(2016,8,1),             
    endDate: new Date(),                    
    /*disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: disableDates,
    disableDaysOfWeek: disableDaysOfWeek,*/
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: [
    {
        date: new Date(2016, 1, 7),
        color: '#8FD4D9',
        textColor: '#fff'
    },
    {
        date: new Date(2016, 1, 18)
    },
    {
        date: new Date(2016, 1, 19)
    },
    {
        date: new Date(2016, 1, 20)
    }
],
    callback: function(value){
        // your code
        // we need to find the appropriate data for the given date
        console.log(value);
        $scope.data= [
    [4, 7, 11, 7, 3, 11, 12],
    [10, 25, 70, 58, 45, 65, 75]
  ];
        console.log($scope.data);
        
        var enddateval = Date.parse(value);
        var d = new Date(enddateval);
        endDate1 = d.getTime();
        
        getGraphData();
    }
}

      
      
}])

.controller('recommendationPageCtrl', ['$scope', '$stateParams', 'ValuesService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,ValuesService) {

      
}])

.controller('aboutUsPageCtrl', ['$scope', '$stateParams', 'ValuesService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,ValuesService) {

      
}])

.controller('settingsPageCtrl', ['$scope', '$stateParams', 'ValuesService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,ValuesService) {

      
}])