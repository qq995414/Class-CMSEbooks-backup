import { service } from ".";

export const fetchNewsList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/News/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const fetchNewsData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/News/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const modifyNewsList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/News/Modify",
      method: "POST",
      data,
      headers: {
        "Content-Type": "multipart/form-data;",
        Function: "PORTAL",
      },
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const DeleteNewsList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/News/Delete",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

