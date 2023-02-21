import { service } from ".";

// 分類選項
export const fetchCouponList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Coupon/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
export const fetchCouponData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Coupon/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
export const ModifyCouponData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Coupon/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
