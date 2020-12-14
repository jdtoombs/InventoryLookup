import * as API from '../constants/API';
import { ISteamSearch } from '../constants/API';
import axios from 'axios';

export const getCounterStrikeSteamInventory = async (params: ISteamSearch) => {
  const url = API.STEAM_INVENTORY(params);
  const response = await axios.get<any>(url);
  return response.data;
};

export const getPrices = async () => {
  const url = API.INVENTORY_PRICES();
  const response = await axios.post<any>(url);
  return response.data;
};
