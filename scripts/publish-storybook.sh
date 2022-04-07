#!/bin/sh

check_storybook_built() {
    if [ ! -d "./storybook-static" ]; then
        read -r -p "No Storybook directory was found. Build it now? [y/N] " RESPONSE
        echo

        if [[ "$RESPONSE" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            yarn run build:storybook 
            echo
        else
            echo "\nExiting...\n"
            exit
        fi
    fi
}

check_valid_username() {
    if [[ "$1" =~ ^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$ ]]; then
        return 0
    fi
    return 1
}

prompt_username() {
    local github_username
    read -p 'Enter Github username: ' github_username
    echo $github_username
}

ensure_github_username() {
    local github_username=$1
    if [ "$1" == "" ]; then
        ### Get Github username from credentials stored in keychain ###

        # Get credentials ignoring error if not found (this won't actually output any passwords)
        local github_credentials=$(security find-internet-password -s github.com 2> /dev/null)

        # Parse the username from the output
        if [ "$github_credentials" != "" ]; then
            github_username=$(echo "$github_credentials" | sed -n -E 's/.*"acct"<blob>="([^"]+)".*/\1/p')
        fi

        check_valid_username $github_username
        if [ ! $? -eq 0 ]; then
            github_username=$(prompt_username)
            echo
        fi
    fi

    # Fallback to manual input if no credentials found
    check_valid_username $github_username
    while ! [[ $? -eq 0 ]]; do
        echo "\033[31;40mERROR:\033[0m username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.\n"
        github_username=$(prompt_username)
        echo
        check_valid_username $github_username
    done

    echo $github_username
}

attempt_publish() {
    local repo="https://github.com/$1/leafygreen-ui.git"

    local repo_with_emphasis="\033[1mhttps://github.com/\033[4m$1\033[24m/leafygreen-ui.git\033[0m"

    echo "About to publish Storybook to $repo_with_emphasis\n"
    read -r -p "Are you sure this is correct? [y/N] " response

    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        yarn run release:site --repo $repo
    else
        echo "\nExiting without publishing...\n"
    fi
}

check_storybook_built
attempt_publish $(ensure_github_username $1)