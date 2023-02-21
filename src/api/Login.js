import { service, getDataFromLocalStorage, setDataToLocalStorage } from ".";

export const login = (email, password) => {
  const localStorage = getDataFromLocalStorage();
  return new Promise((resolve, reject) => {
    service({
      url: "/Login",
      method: "post",
      data: {
        email: email,
        password: password,
      },
    })
      .then(({ data }) => {
        setDataToLocalStorage({
          ...localStorage,
          accessToken: data.data[0].token,
        });
        resolve(data.data);
        window.location = "/home";
      })
      .catch((error) => reject(error));
  });
};
