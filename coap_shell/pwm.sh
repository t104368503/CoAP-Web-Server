#!/bin/bash

 sh /home/${USER}/libcoap-develop/examples/./coap-client -m post coap://[aaaa::212:4b00:3a5:$1]:5683/sen/led -e pwm=$2




