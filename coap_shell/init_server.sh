#!/bin/bash
#echo 12345678 | sudo /home/t450/contiki-master/tools/./tunslip6 -T -s ttyUSB0 aaaa::1/64 &
#echo 12345678 | sudo ifconfig tap0 hw ether 8a:9f:2e:1f:eb:9f

sudo /home/${USER}/contiki-master/tools/./tunslip6 -T -s ttyUSB0 aaaa::1/64 &

sleep 3

sudo ifconfig tap0 hw ether 8a:9f:2e:1f:eb:9f

sleep 3

