import { service } from ".";

export const fetchUserList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/User/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
export const modifyUserList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/User/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const featchUserData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/User/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};


export const fetchMemberList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Member/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const ModifyMemberList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Member/Modify/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchMemberData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Member/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const ModifyUserGroup = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/UserGroup/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchUserGroupList = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/UserGroup/List",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res))
      .catch((error) => reject(error));
  });
};
export const fetchUserGroupData = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/UserGroup/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const exportMemberData = (data) => {


  return new Promise((resolve, reject) => {

    service({
      method: 'post',
      url: '/Member/Export',
      Accept: '*/*',
      headers: {
        'Function': 'PORTAL',
        'Content-Type': 'application/json'
      },
      responseType: 'blob',
      data: data,
    })
      .then(async (res) => await resolve(res.data))

      .catch((error) => reject(error));
  });
};

export const fetchOrverview = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Orverview",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchOrverview1 = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Orverview",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

export const modifyPassword = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Update/Password",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

