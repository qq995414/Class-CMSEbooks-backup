import { service } from ".";

// 經銷商選項
export const fetchSubDealerSelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/SubDealer/Select",
      method: "POST",
      data
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const ModifySubDealerData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/SubDealer/Modify",
      method: "POST",
      data
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};


export const fetchSubDealerData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/SubDealer/Data",
      method: "POST",
      data
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
