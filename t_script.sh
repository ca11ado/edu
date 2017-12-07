#!/bin/bash

HOME_PATH=/home/tracker
LOG_PATH=$HOME_PATH/node-server-log
TRACKER_HOST=project

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NORMAL='\033[0m'

echo_warning () { echo -e >&2 "${YELLOW}$1${NORMAL}"; }
echo_success () { echo -e >&2 "${GREEN}$1${NORMAL}"; }
echo_error () { echo -e >&2 "${RED}$1${NORMAL}"; }
echo_info () { echo -e >&2 "${BLUE}$1${NORMAL}"; }

run_node_server () {
  echo starting node server
  echo_info "starting node server"
  #nohup node $HOME_PATH/$TRACKER_HOST/serverNode.js > $LOG_PATH/standart.log 2>$LOG_PATH/error.log &
  echo_success "node server started"
}

check_path () {
  if [ -e $1 ]; then
    echo_success "path exists"
 else
    echo_error "${1} does not exist"
    exit 1
  fi
}

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
        run_node_server
      else
        echo_error "server already running"
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
    #check_path $HOME_PATH
    echo "No parameters"
    echo "Try t_script.sh -help"
fi

