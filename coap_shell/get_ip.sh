
ip -4 route get 8.8.8.8 | awk {'print $7'} | tr -d '\n'

