#!/bin/bash




# Check if argument is provided
if [ -z "$1" ]
then
    echo "No argument supplied"
    exit 1
fi

echo $1;

# Construct the script name
script_name="test/tests/$1.sh"

# Check if the script exists
if [ ! -f $script_name ]
then
    echo "Script $script_name does not exist"
    exit 1
fi

# Run the script
bash $script_name