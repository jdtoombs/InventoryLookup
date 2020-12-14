import React, { useEffect, useState } from "react";
import * as service from "../api/service";
import { useLocation } from "react-router-dom";
import { ItemTable } from "./ItemTable";
import { mapTableItem } from "../constants/utils";
import { Chip, LinearProgress, makeStyles } from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles({
  chip: {
    float: "right",
    marginBottom: 10,
    color: "#eeeeee",
    borderColor: "#00adb5",
  },
  moneyIcon: {
    color: "#00adb5"
  }
});

export const UserItems: React.FC<any> = () => {
  const [userItems, setUserItems] = useState([]);
  const [itemsWithPrice, setItemsWithPrice] = useState([]);
  const [getDuplicates, setGetDuplicates] = useState([]);
  const [inventoryValue, setInventoryValue] = useState(0);

  const classes = useStyles();

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    service.getCounterStrikeSteamInventory({ bitId: userId }).then((res) => {
      setUserItems(res?.descriptions);
      setGetDuplicates(res?.assets);
    });
    service.getPrices().then((res) => {
      setItemsWithPrice(res?.prices);
    });
  }, [userId]);

  // make sure items are marketable
  let marketableItems = userItems.filter(
    (item: any) => item.marketable === 1 && item.type !== "Base Grade Graffiti"
  );

  //get the market hash names to filter out larger data set
  const marketHashNames = marketableItems.map((x: any) => x.market_hash_name);

  let filteredItems = itemsWithPrice.filter((x: any) =>
    marketHashNames.includes(x.market_hash_name)
  );

  filteredItems.forEach((item: any) => {
    let foundItem: any = marketableItems.find(
      (x: any) => x.market_hash_name === item.market_hash_name
    );
    if (foundItem !== undefined) {
      foundItem.price = item.price;
      foundItem.image = item.icon_url;
    }
  });

  let count: any = {};
  getDuplicates.forEach((item: any) => {
    !(item.classid in count)
      ? (count[item.classid] = 1)
      : (count[item.classid] += 1);
  });

  const totalPrice = marketableItems
    .map((x: any) => parseFloat(x.price) * count[x.classid])
    .reduce((sum: number, b: number) => sum + b, 0.0);

  totalPrice !== 0 &&
    !isNaN(totalPrice) &&
    inventoryValue === 0 &&
    setInventoryValue(totalPrice);

  const render = () => {
    return (
      <>
        {inventoryValue === 0 ? (
          <LinearProgress />
        ) : (
          <>
            <Chip
              className={classes.chip}
              label={`This inventory's total value is $${
                Math.round(inventoryValue * 100) / 100
              } USD`}
              variant="outlined"
              color="primary"
              icon={<MonetizationOnIcon className={classes.moneyIcon}/>}
            />
            <ItemTable data={filteredItems.map((i) => mapTableItem(i))} />
          </>
        )}
      </>
    );
  };

  return <>{render()}</>;
};
