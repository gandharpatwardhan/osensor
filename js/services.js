angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('ValuesService', [function(){

    // this service is used to store the last value retrieved from the device
    values = {"pH":'7',"temperature":'10'};
    device = {"name":"","id":""};
    var dateToPh = {};
    
    var deviceData = {"date": {}};
	var setValues = function(data){
		//post the analysis to the server
		values.pH = data.pH;
        values.temperature = data.t;
        //alert('Set: ' + values);
	};
    
    var getValues = function(){
		//post the analysis to the server
        //alert(values);
		return values;
	};
    
    var setDevice = function(data){
		//post the analysis to the server
		device.name = data.name;
        device.id = data.id;
        //alert('Set: ' + values);
	};
    
    var getDevice = function(){
		//post the analysis to the server
        //alert(values);
		return device;
        
        
	};
    
    var setDeviceData = function(data){
		//post the analysis to the server
        //alert("Setting d data" + data);
		//deviceData = {};
        
        //deviceData = {};
        
        deviceData = data;
        
        //alert('Set: ' + values);
	};
    
    var getDeviceData = function(){
		//post the analysis to the server
        //alert(values);
        /*
    var formatData =  {
    "date": {
      1: {
        "pH": "6",
        "temp": "40",
      },
      2: {
        "pH": "7",
        "temp": "50"
      },
      3: {
        "pH": "8",
        "temp": "60"
      },
      4: {
        "pH": "9",
        "temp": "70"
      }
    };
      */  
        //console.log(deviceData);
		return deviceData;
	};
    
	
    return {
			setValues : setValues,
			getValues : getValues,
            setDevice : setDevice,
            getDevice : getDevice,
            getDeviceData : getDeviceData,
            setDeviceData : setDeviceData
        };
}]);