#!/usr/bin/env python3

# Purpose:
#
# - avoids to push branches starting with a "#". This is the way
#   how I store ticket related feature branches that are work in progress
#
# - updates the version file "layouts/partials/version.txt" with the latest
#   available commit hash before pushing
#
# Installation:
#
# Call this script from your ".git/hooks/pre-push" file like this (supporting
# Linux, Windows and MacOS)
#
# ```sh
# #!/bin/sh
# python3 .githooks/pre-push.py
# ```

from datetime import datetime
import os
import re
import subprocess

def check_wip_branch(script_name, log_file, time, repo_name):
    local_branch = subprocess.check_output(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], universal_newlines=True).strip()
    wip_prefix = '^#\\d+(?:\\b.*)$'
    if re.match(wip_prefix, local_branch):
        print(f'{time}: {repo_name} - {script_name} - Branch "{local_branch}" was not pushed because its name starts with a "#" which marks it as work in progress', file=open(log_file, "a"))
        print(f'{script_name} - Branch "{local_branch}" was not pushed because its name starts with a "#" which marks it as work in progress')
        exit(1)

def update_version(script_name, log_file, time, repo_name):
    file_path = 'layouts/partials/version.txt'
    try:
        f = open(file_path, 'r+')
    except OSError as e:
        print(f'{time}: {repo_name} - {script_name} - Could not open {file_path}: [{e.errno}] {e.strerror}', file=open(log_file, "a"))
        print(f'{script_name} - Could not open {file_path}: [{e.errno}] {e.strerror}')
        exit(1)
    with f:
        version = f.read().strip()
        new_version = ''
        match = re.match(r'(\d+\.\d+\.\d+)(?:\+([^+]+))?', version)
        if match:
            semver = match.group(1)
            old_hash = match.group(2)
            new_hash = subprocess.check_output(['git', 'rev-parse', 'HEAD~1']).decode('utf-8').strip()
            print(f'{time}: {repo_name} - {script_name} - old hash {old_hash} - new hash {new_hash}', file=open(log_file, "a"))
            print(f'{script_name} - old hash {old_hash} - new hash {new_hash}')
            if old_hash != new_hash:
                new_version = f'{semver}+{new_hash}'
                f.seek(0)
                f.write(new_version)
                f.truncate()
                f.close()
                subprocess.check_call(['git', 'add', file_path])
                subprocess.check_call(['git', 'commit', '--amend', '--no-edit'])
                print(f'{time}: {repo_name} - {script_name} - New version {new_version} was written to {file_path}', file=open(log_file, "a"))
            else:
                print(f'{time}: {repo_name} - {script_name} - No change in hash, file {file_path} not updated', file=open(log_file, "a"))
        else:
            print(f'{time}: {repo_name} - {script_name} - Invalid version format in {file_path}', file=open(log_file, "a"))
            print(f'{script_name} - Invalid version format in {file_path}')
            exit(1)

# This hook is called with the following parameters:
# $1 -- Name of the remote to which the push is being done
# $2 -- URL to which the push is being done
# If pushing without using a named remote, those arguments will be equal.

# Information about the commits being pushed is supplied as lines to
# the standard input in the form:
# <local ref> <local sha1> <remote ref> <remote sha1>

def main():
    script_name = "PRE-PUSH"
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_file = os.path.join(script_dir, "hooks.log")
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    repo_root = subprocess.check_output(['git', 'rev-parse', '--show-toplevel'], universal_newlines=True).strip()
    repo_name = os.path.basename(repo_root)

    check_wip_branch(script_name, log_file, time, repo_name)
    update_version(script_name, log_file, time, repo_name)
    exit(0)

if __name__ == "__main__":
    main()
