#!/bin/bash

i=0
j=100
while [ $i != "5" ]
do
	j=100
	while [ $j != "106" ]
	do
		sh /home/${USER}/libcoap-develop/examples/./coap-client -m post coap://[aaaa::212:4b00:3a5:$j]:5683/sen/led -e led=off	
		j=$(($j+1))
		
	done

	sleep 1s
	j=100
	while [ $j != "106" ]
	do
		sh /home/${USER}/libcoap-develop/examples/./coap-client -m post coap://[aaaa::212:4b00:3a5:$j]:5683/sen/led -e led=on	
		j=$(($j+1))
	done

	sleep 1s
	
	i=$(($i+1))

	echo "$i times" 
done
