#!/bin/bash

# Directory containing the scripts
dir="test/tests"

# Check if directory exists
if [ ! -d "$dir" ]
then
    echo "Directory $dir does not exist"
    exit 1
fi

# Find and run the scripts
for script in "$dir"/*.sh
do
    if [ -f "$script" ]
    then
        echo "Running $script"
        bash "$script"
    else
        echo "No scripts found in $dir"
    fi
done