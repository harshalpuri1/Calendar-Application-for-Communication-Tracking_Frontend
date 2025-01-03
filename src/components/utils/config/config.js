const constants = {
  strings: {
    newSessionLabel: "newSessionToken",
    regError: "Error registering user",
    logoutSucc:"Logged out successfully!"
  },
  navigationLink: {
    serverDown: "/server-down",
    serverError: "/server-error",
    loginLink: "/",
    UserDashboard:"/user",
    settings:"/settings"
  },
  constantsErrors: {
    sessionExpire: "Your session has expired. Please log in again.",
    serverError: "There was a server error. Please try again later.",
    toastId: "333",
    somethingWentWrong: "Something Went Wrong!",
    logoutErr:"Error logging out"
  },
  apiName: {
    signupAdmin: "/admin/signup",
    loginAdmin: "/admin/login",
    signupUser: "/signup/user",
    loginUser: "/login/user",
    logout: "/logout/user"
  },
 localStorage: {
  authToken: "Authorization",
  userEmail: "Email",
  token:"Token"
  
 }

};

export default constants;