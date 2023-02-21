import { service } from ".";

// 分類選項
export const fetchCategorySelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Data",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

// 修改分類
export const ModifyCategorySelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
// 刪除分類
export const DeleteCategorySelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Delete",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

// 新增/修改類別
export const ModifySubjectSelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Subject/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
// 刪除類別
export const DeleteSubjectSelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Subject/Delete",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
export const fetchSubjectSelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Subject/Select",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};

// 版本選項
export const fetchVersionSelect = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Version/Select",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
// 新增/修改版本
export const ModifyVersion = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Version/Modify",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};
// 刪除版本
export const DeleteVersion = (data) => {
  return new Promise((resolve, reject) => {
    service({
      url: "/Category/Version/Delete",
      method: "POST",
      data,
    })
      .then(async (res) => await resolve(res.data))
      .catch((error) => reject(error));
  });
};