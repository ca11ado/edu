#!/bin/bash

PROJECT_DIR=/home/tracker/project/frontend
HOME_DIR=/home/tracker
LOG_DIR=$HOME_DIR/node-server-log
NODE_SERVER_NAME="serverNode.js"

GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NORMAL='\033[0m'

echo_warning () { echo -e >&2 "${YELLOW}$1${NORMAL}"; }
echo_success () { echo -e >&2 "${GREEN}$1${NORMAL}"; }
echo_error () { echo -e >&2 "${RED}$1${NORMAL}"; }
echo_info () { echo -e >&2 "${BLUE}$1${NORMAL}"; }

function run_node_server () {
  SERVER_PATH=${1}/${2}
  check_file $SERVER_PATH
  nohup node ${SERVER_PATH} > $LOG_DIR/standart.log 2>$LOG_DIR/error.log &
  echo_success "node server started" #todo add exit return
}

function stop_node_server () {
  SERVER_FILE_NAME=$1
  ps -ef | grep $SERVER_FILE_NAME | grep -v grep | awk '{print $2}' | xargs kill
}

function get_server_pid () {
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
    if [ "$2" == "-start" ]; then
      run_node_server ${PROJECT_DIR} ${NODE_SERVER_NAME}
    fi
    if [ "$2" == "-stop" ]; then
      get_server_pid ${PROJECT_DIR}/${NODE_SERVER_NAME} | xargs kill
    fi
    if [ "$2" == "-restart" ]; then
      get_server_pid ${PROJECT_DIR}/${NODE_SERVER_NAME} | xargs kill
      run_node_server ${PROJECT_DIR} ${NODE_SERVER_NAME}
    fi
    if [ "$2" == "-status" ]; then
      re='^[0-9]+$'
      SERVER_PID=$(get_server_pid ${PROJECT_DIR}/${NODE_SERVER_NAME})
      if [[ $SERVER_PID =~ [[:digit:]] ]]; then
        echo "server pid: ${SERVER_PID}"
      else
        echo "node server is not running: ${SERVER_PID}"
      fi
    fi
  fi
else
    echo "No parameters"
    echo "Try t_script.sh -help"
fi

