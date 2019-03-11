
import city from './city.json';

const getCityList = () => {
  return city.map((item) => {
    return {
      value: item.i,
      label: item.n,
      children: item.c && item.c.map((child) => {
        return {
          value: child.i,
          label: child.n,
          children: child.c && child.c.map((c) => {
            return {
              value: c.i,
              label: c.n,
            };
          }),
        };
      }),
    };
  });
};

const cityList = getCityList();

let cityArray = [];

let getList = (list) => {
  list.forEach((item) => {
    cityArray.push({
      id: item.i,
      name: item.n,
    });
    if (item.c && item.c.length > 0) {
      getList(item.c);
    }
  });
};

getList(city);

const getCityName = (code) => {
  let cityName;
  cityArray.forEach((item) => {
    if (item.id === code) {
      cityName = item.name;
    }
  });
  return cityName;
};


export { cityList, getCityName };

