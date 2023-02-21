import { service } from ".";

export const fetchSettingData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Setting/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};



export const ModifySettingData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Setting/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};




export const ModifySettingCode = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Setting/Code/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};

