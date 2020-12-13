export interface ISteamSearch {
  // the users 64 bit id
  bitId: string;
}

/** TODO: Update to use env files in the meantime */

// the endpoint used to get the users csgo inventory
export const STEAM_INVENTORY = (params: ISteamSearch) =>
  `http://localhost:4000/inventory/${params.bitId}`;

// the endpoint used to get the real world value of users csgo items
export const INVENTORY_PRICES = () =>
  `http://localhost:4000/prices`;
