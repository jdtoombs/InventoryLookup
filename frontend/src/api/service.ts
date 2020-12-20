import * as API from '../constants/API';
import { ISteamSearch, IBitSearch } from '../constants/API';
import axios from 'axios';

/** service call that gahters the user's csgo steam inventory */
export const getCounterStrikeSteamInventory = async (params: ISteamSearch) => {
  const url = API.STEAM_INVENTORY(params);
  const response = await axios.get<any>(url);
  return response.data;
};

/** service call that gathers the real world value of csgo items */
export const getPrices = async () => {
  const url = API.INVENTORY_PRICES();
  const response = await axios.post<any>(url);
  return response.data;
};

/** service call that allows the user to enter vanity name and returns the 64 bit id */
export const getUserBitId = async (params: IBitSearch) => {
  const url = API.STEAM_BIT_ID(params);
  const response = await axios.get<any>(url);
  return response.data;
};

/** service call to gather usesr's steam profile data */
export const getSteamProfile = async (params: ISteamSearch) => {
  const url = API.STEAM_PROFILE_DATA(params);
  const response = await axios.get<any>(url);
  return response.data;
};
