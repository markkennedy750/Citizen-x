function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value == "") {
    setEmailError("");
  } else if (isValidEmail(value)) {
    setEmailError("");
  } else {
    setEmailError("Invalid Email");
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 9) {
    setPasswordError("Password must be 9 characters");
  } else {
    setPasswordError("");
  }
}
function validatePhoneNumber(value, setPhoneNumberError) {
  if (value.length < 11) {
    setPhoneNumberError("Phone Number Not Complete");
  } else if (value.length > 11) {
    setPhoneNumberError("Your Phone Number must be less than 11");
  } else {
    setPhoneNumberError("");
  }
}
const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
};

export default utils;
