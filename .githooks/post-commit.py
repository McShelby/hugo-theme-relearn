#!/usr/bin/env python3

# Purpose:
#
# - updates the version file "layouts/partials/version.txt" with the latest
#   available commit hash after committing
#
# Installation:
#
# Call this script from your ".git/hooks/post-commit" file like this (supporting
# Linux, Windows and MacOS)
#
# ```sh
# #!/bin/sh
# python3 .githooks/post-commit.py
# ```

from datetime import datetime
import os
import re
import subprocess

def is_special_git_operation():
    git_dir = subprocess.check_output(['git', 'rev-parse', '--git-dir'], universal_newlines=True).strip()
    indicators = [
        os.path.join(git_dir, 'rebase-merge'),
        os.path.join(git_dir, 'rebase-apply'),
        os.path.join(git_dir, 'CHERRY_PICK_HEAD'),
        os.path.join(git_dir, 'MERGE_HEAD'),
        os.path.join(git_dir, 'BISECT_LOG'),
        os.path.join(git_dir, 'REVERT_HEAD'),
    ]
    return any(os.path.exists(ind) for ind in indicators)

def update_version(script_name, log_file, time, repo_name):
    if is_special_git_operation():
        print(f'{time}: {repo_name} - {script_name} - Skipping during rebase/cherry-pick/merge', file=open(log_file, "a"))
        return

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

def main():
    script_name = "POST-COMMIT"
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_file = os.path.join(script_dir, "hooks.log")
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    repo_root = subprocess.check_output(['git', 'rev-parse', '--show-toplevel'], universal_newlines=True).strip()
    repo_name = os.path.basename(repo_root)

    update_version(script_name, log_file, time, repo_name)
    exit(0)

if __name__ == "__main__":
    main()
