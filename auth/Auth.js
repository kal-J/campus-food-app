import Auth0 from "react-native-auth0";
import credentials from "../config/auth0_configuration";

const auth0 = new Auth0(credentials);

const login = (setUser, setloggedin, setIsloading) => {
  auth0.webAuth
    .authorize({
      scope: "openid profile email",
    })
    .then((credentials) => {
      setUser(credentials);
      setloggedin(true);
      setIsloading(false);
    })
    .catch((error) => {
      console.log(error);
      setloggedin(false);
      setIsloading(false);
    });
};

const logout = (setUser, setloggedin, setIsloading) => {
  auth0.webAuth
    .clearSession({})
    .then((success) => {
      setUser({ accessToken: null });
      setloggedin(false);
      setIsloading(false);
    })
    .catch((error) => {
      console.log("Log out cancelled");
      setIsloading(false);
    });
};

export { login, logout };
