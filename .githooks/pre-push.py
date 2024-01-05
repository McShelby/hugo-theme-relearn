#!/usr/bin/env python3

# This script avoids to push branches starting with a "#". This is the way
# how I store ticket related feature branches that are work in progress.

# Once a feature branch is finished, it will be rebased to mains HEAD,
# its commits squashed, merged into main and the branch deleted afterwards.

# Call this script from your ".git/hooks/pre-push" file like this (supporting
# Linux, Windows and MacOS)

#	#!/bin/sh
#	python3 .githooks/pre-push.py

import subprocess
import re

# This hook is called with the following parameters:
# $1 -- Name of the remote to which the push is being done
# $2 -- URL to which the push is being done
# If pushing without using a named remote, those arguments will be equal.

# Information about the commits being pushed is supplied as lines to
# the standard input in the form:
# <local ref> <local sha1> <remote ref> <remote sha1>
# This hook prevents the push of commits that belong to branches starting with
# an "#" (whiwork in progress).

def main():
    local_branch = subprocess.check_output(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], universal_newlines=True).strip()
    wip_prefix = "^#\d+(?:\b.*)$"
    message = 'The branch {local_branch} can not be pushed as it starts with a '#' which marks it as work in progress'

    if re.match(wip_prefix, local_branch):
        print(message)
        exit(1)

    exit(0)

if __name__ == "__main__":
    main()
