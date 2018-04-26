
#!/bin/bash
 
#echo "12345678" | sudo -S  su

killall -9 node

export DISPLAY=:0.0

node /home/${USER}/Desktop/coap-gateway-demo/server &

firefox localhost:3000 &

