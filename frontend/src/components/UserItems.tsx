import React, { useEffect, useState } from 'react';
import * as service from '../api/service';
import { useLocation, useHistory } from 'react-router-dom';
import { ItemTable } from './ItemTable';
import { mapTableItem } from '../constants/utils';
import { Grid, LinearProgress } from '@material-ui/core';
import { ProfileDataDisplay } from './ProfileDataDisplay';
import { Popup } from './Popup';
import { getItemsError } from '../constants/strings';

export const UserItems: React.FC<any> = () => {
  const location = useLocation();
  const history = useHistory();

  const [userItems, setUserItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [itemsWithPrice, setItemsWithPrice] = useState([]);
  const [getDuplicates, setGetDuplicates] = useState([]);
  const [error, setError] = useState(false);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [userId] = useState(location.pathname.split('/')[2]);
  const [profileData, setProfileData] = useState<any>();

  useEffect(() => {
    if (!loaded) {
      service
        .getCounterStrikeSteamInventory({ bitId: userId })
        .then((res) => {
          if (res === null) {
            /** null response normally indicates typo  */
            setError(true);
          } else {
            setUserItems(res?.descriptions);
            setGetDuplicates(res?.assets);
          }
        })
        .catch((err: any) => {
          if (err.response) {
            setError(true);
          }
        });
      service.getPrices().then((res) => {
        setItemsWithPrice(res?.prices);
      });
      service.getSteamProfile({ bitId: userId }).then((res) => {
        setProfileData(res?.response.players[0]);
      });
    }
    setLoaded(true);
  }, [userId, loaded]);

  // make sure items are marketable
  let marketableItems = userItems.filter(
    (item: any) => item.marketable === 1 && item.type !== 'Base Grade Graffiti'
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
        <Popup
          show={error}
          error
          title="An error has occured"
          body={getItemsError}
          setShow={setError}
          okAction={() => history.push('/')}
        />
        {inventoryValue === 0 ? (
          <>
            <LinearProgress />
          </>
        ) : (
          <>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <ProfileDataDisplay
                inventoryWorth={totalPrice}
                userName={profileData.personaname}
                avatarSrc={profileData.avatar}
              />
              <ItemTable data={filteredItems.map((i) => mapTableItem(i))} />
            </Grid>
          </>
        )}
      </>
    );
  };

  return <>{render()}</>;
};
