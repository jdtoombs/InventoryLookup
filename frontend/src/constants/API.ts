export interface ISteamSearch {
  /** the users 64 bit id */
  bitId: string;
}

export interface IBitSearch {
  /** alternative option to searching via 64 bit */
  vanityName: string;
}

// the endpoint used to get the users csgo inventory
export const STEAM_INVENTORY = (params: ISteamSearch) =>
  `http://localhost:4000/inventory/${params.bitId}`;

// the endpoint used to get the real world value of users csgo items
export const INVENTORY_PRICES = () => `http://localhost:4000/prices`;

/** the endpoint used to allow the user to enter vanity name and return the bit id to search with  */
export const STEAM_BIT_ID = (params: IBitSearch) =>
  `http://localhost:4000/bitId/lookup/${params.vanityName}`;
