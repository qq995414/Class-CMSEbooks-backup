import { service } from ".";

// 分類選項
export const fetchRequestPaymentAccountList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/RequestPaymentAccount/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchRequestPaymentAccountData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/RequestPaymentAccount/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchRequestPaymentAccountModify = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/RequestPaymentAccount/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchRequestPaymentAccountExport = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/RequestPaymentAccount/Export",
      method: "POST",
      Accept: '*/*',
      headers: {
        'Function': 'PORTAL',
        'Content-Type': 'application/json'
      },
      responseType: 'blob',
      data
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};