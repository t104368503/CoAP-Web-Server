// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server);
var shell = require('shelljs');

app.use(express.static(__dirname + '/public')); 

//redirect / to our index.html file

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(client) {  
	//when the server receives clicked message, do this
	client.on('clickedip', function(data){
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./get_ip.sh',{async:true});
		child.stdout.on('data', function(data) {
			io.emit('coapip', data);
			console.log(data);
		});
	});

	client.on('clicked', function(data) {	  
			//shell.exec(' sh /home/t450/Desktop/coap-gateway-demo/coap_shell/./init_server.sh', {async:true});
    
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./init_server.sh',{async:true});
			child.stdout.on('data', function(data) {
  			io.emit('coap_server_init', data);	
		});
	});
	
	client.on('clickedPing', function(data) {	  
		//shell.exec(' sh /home/t450/Desktop/coap-gateway-demo/coap_shell/./ping_server.sh', {async:true});
		//var child = shell.exec(' sh /home/t450/Desktop/coap-gateway-demo/coap_shell/./ping_server.sh',{async:true});
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 144',{async:true});
		child.stdout.on('data', function(data) {
  			io.emit('coap_server', data);	
		});	
    });
	
	client.on('LED_on', function(data) {	  
		//shell.exec(' sh /home/t450/Desktop/coap-gateway-demo/coap_shell/./node100_on.sh', {async:true});
		
		console.log("test led on" + data);
		
		var child;
		
		if (data == 0){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 100 0',{async:true});	
		} 
		
		if (data == 1){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 101 0',{async:true});
		} 
		
		if (data == 2){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 102 0',{async:true});
		} 
		if (data == 3){
	    	child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 103 0',{async:true});
	    } 
		if (data == 4){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 104 0',{async:true});
		} 
		if (data == 5) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 105 0',{async:true});
		}
		
		child.stdout.on('data', function(data) {io.emit('node1', data);});
		
    });
	
	client.on('LED_off', function(data) {	  
		//shell.exec(' sh /home/t450/Desktop/coap-gateway-demo/coap_shell/./node100_off.sh', {async:true});
    	
		
		console.log("test led off " + data);
		
		var child;
		
		if (data == 0){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 100 1',{async:true});
		} 
		
		if (data == 1){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 101 1',{async:true});
		} 
		
		if (data == 2){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 102 1',{async:true});
		} 
		
		if (data == 3){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 103 1',{async:true});
		} 
		if (data == 4){
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 104 1',{async:true});
		} 
		
		if (data == 5) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./led.sh 105 1',{async:true});
		}	
		
		child.stdout.on('data', function(data) {io.emit('node1', data);});
	});
	
	client.on('statusNode100', function(data) {	  
		
		var child;
		
		console.log("#test status " + data);
		
		if (data == 0) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./node_status.sh 100',{async:true});
		}
		if (data == 1) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./node_status.sh 101',{async:true});
		}
		if (data == 2) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./node_status.sh 102',{async:true});
		}
		if (data == 3) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./node_status.sh 103',{async:true});
		}
		if (data == 4) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./node_status.sh 104',{async:true});
		}
		if (data == 5) {
			child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./node_status.sh 105',{async:true});
		}
		
		child.stdout.on('data', function(data) {io.emit('node1', data);	});			
	});
	
	client.on('nodeHelloworld', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./helloworld.sh',{async:true});
		child.stdout.on('data', function(data) {io.emit('node1', data);	});
	});
	
	client.on('clickedPing100', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 100',{async:true});
		child.stdout.on('data', function(data) {io.emit('node100ping', data);});			
	});
	client.on('clickedPing101', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 101',{async:true});
		child.stdout.on('data', function(data) {io.emit('node101ping', data);});			
	});
	client.on('clickedPing102', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 102',{async:true});
		child.stdout.on('data', function(data) {io.emit('node102ping', data);});			
	});
	client.on('clickedPing103', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 103',{async:true});
		child.stdout.on('data', function(data) {io.emit('node103ping', data);});			
	});
	client.on('clickedPing104', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 104',{async:true});
		child.stdout.on('data', function(data) {io.emit('node104ping', data);});			
	});
	client.on('clickedPing105', function(data) {	  	
		var child = shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./ping_node.sh 105',{async:true});
		child.stdout.on('data', function(data) {io.emit('node105ping', data);});			
	});
	
	client.on('NodePWM', function(data) {
		var res = data.split(" ");
		shell.exec(' sh /home/pi/Desktop/coap-gateway-demo/coap_shell/./pwm.sh 10'+res[0]+' '+res[1],{async:true});
		//console.log(res[0]);
		//console.log(res[1]);
	});
	
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 
