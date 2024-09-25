#!/usr/bin/env python3

# This script appends the current commit hash to the version information in
# `layouts/partials/version.txt`
#
# Call this script from your ".git/hooks/pre-commit" file like this (supporting
# Linux, Windows and MacOS)

# #!/bin/sh
# echo 'execute .githooks/pre-commit.py' >> .githooks/hooks.log
# python3 .githooks/pre-commit.py

from datetime import datetime
import re
import subprocess

def main():
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    file_path = 'layouts/partials/version.txt'
    with open(file_path, 'r+') as f:
        version = f.read().strip()
        new_version = ''
        match = re.match(r'(\d+\.\d+\.\d+)(\+[^+]+)?', version)
        if match:
            semver = match.group(1)
            commit_hash = subprocess.check_output(['git', 'rev-parse', 'HEAD~1']).decode('utf-8').strip()
            new_version = f'{semver}+{commit_hash}'
            f.seek(0)
            f.write(new_version)
            f.truncate()
            subprocess.check_call(['git', 'add', file_path])
        else:
            print(f'{time}: PRE-COMMIT - Invalid version format in {file_path}', file=open(".githooks/hooks.log", "a"))
            print(f'PRE-COMMIT - Invalid version format in {file_path}')
            exit(1)
        print(f'{time}: PRE-COMMIT - New version {new_version} was written to {file_path}', file=open(".githooks/hooks.log", "a"))
        exit(0)

if __name__ == '__main__':
    main()
