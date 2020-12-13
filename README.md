# Setup development 

1. Fork/clone this repository 
2. Create an account on [BitSkins](https://bitskins.com/)
3. In accountt setting enable Secure Access and API Access
4. Take note of the `BitSkinsSecret` that is given when enabling API Access
5. Take note of your `API Key` that can be found in your settings
6. Create a `.env` file in `/api`
7. Create a vairable called `BIT_SKINS_SECRET` and assign it the value of the secret you noted down earlier
8. Create a variable called `API_KEY` and assign it the value of the Api Key given from BitSkins
9.  Navigate to the root of the directory and run the command `make build`
10.  After the containers finsih building run `make up`
11.  Navigate to  `http://localhost:3000/` and ensure the app is running

# How to use 
1. From the main page of the application enter any user's 64 bit Id (end goal is to use username). A quick way to find them is through [this site](https://steamid.io/lookup)
2. Click the `Search` button
3. After loading and generating prices a table will be displayed with the user's items and the total value of their inventory
4. Click home and repeat 

### If anyone knows of a Steam endpoint that returns all CSGO item prices (not one call per item) please let me know. BitSkins is not an ideal endpoint for this