export interface ITableItem {
    image: any;
    price: number;
    name: string;
    id: string;
}

export const mapTableItem = (
    item: any,
  ): ITableItem => ({
    image: item.icon_url,
    price: item.price,
    name: item.market_hash_name,
    id: item.market_hash_name
});