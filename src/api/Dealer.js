import { service } from ".";

export const fetchDealerList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Dealer/Coupon/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};


export const fetchSubDealerList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/SubDealer/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
export const fetchSubDealerSelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/SubDealer/Select",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const ModifyDealer = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Dealer/Coupon/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
export const fetchDealerData= (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Dealer/Coupon/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
