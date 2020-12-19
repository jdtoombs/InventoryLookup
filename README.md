[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/jdtoombs/InventoryLookup/pulls)

# Initial setup
1. Make sure you have [Docker](https://docs.docker.com/desktop/) and [npm](https://www.npmjs.com/get-npm) installed
2. If you wish to take advantage of the scripts and make commands listed below you need some form of bash (i.e Git Bash)

# Setup development 
1. Fork/clone this repository 
2. Create an account on [BitSkins](https://bitskins.com/)
3. In account settings enable Secure Access and API Access
4. Take note of the `BitSkinsSecret` that is given when enabling API Access (underneath the QR code)
5. Take note of your `API Key` that can be found in your settings
6. With both the `API Key` and `BitSkinsSecret` noted down run `./scripts/make-env-files` in bash and enter corresponding values as prompted
7. While still in the root run the command `make build`
8. After the containers finish building run `make up`
9. Navigate to  `http://localhost:3000/` and ensure the app is running

# How to use 
1. From the main page of the application enter any user's 64 bit Id (end goal is to use username). A quick way to find them is through [this site](https://steamid.io/lookup)
2. Click the `Search` button
3. Ensure the user's inventory is loaded, if not check the `.env` file has the correct secret and key information 
4. After loading and generating prices a table will be displayed with the user's items and the total value of their inventory
5. Click home and repeat 