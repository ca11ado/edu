#!/bin/bash

HOME_PATH=/home/tracker
TRACKER_HOST=project

if [ $# -gt 0 ]; then
  if [ "$1" == "-help" ]; then
    echo 'управление серверами с нодой'
    echo 't_script.sh tracker -start'
    echo 't_script.sh tracker -stop'
    echo 't_script.sh tracker -status'
  fi
  if [ "$1" == "-list" ]; then
    echo "$(ps ax | grep node)"
  fi
  if [ "$1" == "tracker" ]; then
    re='^[0-9]+$'
    pid="$(pgrep -f serverNode | awk '{ print $1 }')"
    if [ "$2" == "-start" ]; then
      if ! [[ $pid =~ $re ]] ; then
        echo starting node server
        nohup node $HOME_PATH/$TRACKER_HOST/serverNode.js > $HOME_PATH/node-server-log/standart.log 2>$HOME_PATH/node-server-log/error.log &
        echo server running
      else
        echo this server already exists
      fi
    fi
    if [ "$2" == "-stop" ]; then
      if ! [[ $pid =~ $re ]] ; then
        echo this server does not exists
      else
        echo this server exists -- kill him
        kill $pid
      fi
    fi
    if [ "$2" == "-status" ]; then
      if ! [[ $pid =~ $re ]] ; then
        echo this server does not exists
      else
        echo this server exists
        echo $pid
      fi
    fi
  fi
else
    echo "No parameters"
    echo "Try t_script.sh -help"
fi
