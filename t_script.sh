#!/bin/bash

PROJECT_DIR=/home/tracker/project
HOME_DIR=/home/tracker
LOG_DIR=$HOME_DIR/node-server-log
NODE_SERVER_NAME="serverNode.js"

#mutable
SERVER_PID=""

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NORMAL='\033[0m'

echo_warning () { echo -e >&2 "${YELLOW}$1${NORMAL}"; }
echo_success () { echo -e >&2 "${GREEN}$1${NORMAL}"; }
echo_error () { echo -e >&2 "${RED}$1${NORMAL}"; }
echo_info () { echo -e >&2 "${BLUE}$1${NORMAL}"; }

function run_node_server2 () {
  PATH_TO_SERVER=$1
  echo_info "starting node server"
  nohup node ${PATH_TO_SERVER} > $LOG_DIR/standart.log 2>$LOG_DIR/error.log &
  echo_success "node server started"
}

function run_node_server () {
  SERVER_FILE_NAME=$1
  check_file ${PROJECT_DIR}/${SERVER_FILE_NAME}
  #node ${PROJECT_DIR}/${NODE_SERVER_NAME} > /dev/null &
  nohup node ${PROJECT_DIR}/${NODE_SERVER_NAME} > $LOG_DIR/standart.log 2>$LOG_DIR/error.log &
  echo_success "node server started"
}

function stop_node_server () {
  SERVER_FILE_NAME=$1
  ps -ef | grep $SERVER_FILE_NAME | grep -v grep | awk '{print $2}' | xargs kill
}

function server_status () {
  SERVER_FILE_NAME=$1
  PID=$(ps -ef | grep $SERVER_FILE_NAME | grep -v grep | awk '{print $2}')
  echo $PID
}

function check_file () {
  if [ -e $1 ]; then
    echo_success "file exists: ${1}"
  else
    echo_error "file not exists: ${1}"
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
  if [ "$1" == "edu" ]; then
    #re='^[0-9]+$'
    #pid="$(pgrep -f serverNode | awk '{ print $1 }')"
    if [ "$2" == "-start" ]; then
      #if ! [[ $pid =~ $re ]] ; then
      #  run_node_server
      #else
      #  echo_error "server already running"
      #fi
      run_node_server
    fi
    if [ "$2" == "-stop" ]; then
      #if ! [[ $pid =~ $re ]] ; then
      #  echo this server does not exists
      #else
      #  echo this server exists -- kill him
      #  kill $pid
      #fi
      stop_node_server
    fi
    if [ "$2" == "-status" ]; then
      server_status ${PROJECT_DIR}/${NODE_SERVER_NAME}
    fi
  fi
else
    echo "No parameters"
    echo "Try t_script.sh -help"
fi

