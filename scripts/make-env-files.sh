#!/bin/bash

echo 'Enter the Bit Skins secret provided to you when you enable secure access.'
read -p 'Bit Skins Secret: ' varBitSkinsSecret

echo 'Enter the BitSkins API key provided to you after enabling API access.'
read -p 'Bit Skins API Key: ' varBitSkinsApiKey

echo 'Enter Steam API key received from https://steamcommunity.com/dev/apikey: '
read -p 'Steam API Key: ' varSteamApiKey

# create .env file for the api if it does not exist
if test -f "./api/.env"; then 
    echo 'API .env has already been created'
else
echo \
"
BIT_SKINS_SECRET=$varBitSkinsSecret
BIT_SKINS_API_KEY=$varBitSkinsApiKey
STEAM_API_KEY=$varSteamApiKey" >> ./api/.env
fi

# create .env file for frontend
if test -f "./frontend/.env"; then 
    echo 'Frontend .env has already been created'
else
echo \
"CHOKIDAR_USEPOLLING=true" >> ./frontend/.env
fi

echo 'If the API fails to fetch user inventory double check the secret and key matches those provided.'