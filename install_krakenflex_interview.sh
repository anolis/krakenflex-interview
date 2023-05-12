#!/bin/bash

# Check for git
if ! command -v git &> /dev/null; then
    echo "Git is not installed."
    read -p "Would you like to install Git? (y/n): " install_git
    if [ "$install_git" = "y" ]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y git
        elif command -v yum &> /dev/null; then
            sudo yum install -y git
        else
            echo "Unsupported package manager. Please install Git manually."
            exit 1
        fi
    else
        echo "Please install Git and rerun the script."
        exit 1
    fi
fi

# Download and extract Node.js
wget https://nodejs.org/dist/v20.1.0/node-v20.1.0-linux-x64.tar.xz
sudo mkdir -p /opt/node-v20.1.0-linux-x64
sudo tar -xf node-v20.1.0-linux-x64.tar.xz --strip-components 1 -C /opt/node-v20.1.0-linux-x64

# Add Node.js to PATH
echo 'export PATH=$PATH:/opt/node-v20.1.0-linux-x64/bin' >> ~/.bashrc
source ~/.bashrc

# Check and set Git user.name and user.email
git_username=$(git config --global user.name)
git_email=$(git config --global user.email)

if [ -z "$git_username" ]; then
    read -p "Git user.name is not set. Would you like to set it? (y/n): " set_username
    if [ "$set_username" = "y" ]; then
        read -p "Enter your Git user.name: " git_username
        git config --global user.name "$git_username"
    fi
fi

if [ -z "$git_email" ]; then
    read -p "Git user.email is not set. Would you like to set it? (y/n): " set_email
    if [ "$set_email" = "y" ]; then
        read -p "Enter your Git user.email: " git_email
        git config --global user.email "$git_email"
    fi
fi

# Check for SSH key and generate new key if not found
if [ ! -f ~/.ssh/id_rsa.pub ]; then
    read -p "SSH key not found. Would you like to generate a new key? (y/n): " generate_key
    if [ "$generate_key" = "y" ]; then
        ssh-keygen -t rsa -b 4096 -N "" -f ~/.ssh/id_rsa
        echo "New SSH key generated."

    fi
fi

# Ask user to add their public key to GitHub
read -p "Please make ure you have added your public key to GitHub. Press enter to continue."

# Clone the repository
git clone https://github.com/anolis/krakenflex-interview
cd krakenflex-interview

# Prompt user for API key
read -p "Enter your Krakenflex API key: " api_key

# Save API key to file
default_key_path="./keys/api-key.txt"
read -p "Enter the path to save API key (default: $default_key_path): " key_path
key_path="${key_path:-$default_key_path}"
mkdir -p "$(dirname "$key_path")"
echo "$api_key" > "$key_path"

# Inform the user that the installation is complete and how to run the script
echo "Installation is complete. To run the script, execute 'node index.js' in the krakenflex-interview folder."
