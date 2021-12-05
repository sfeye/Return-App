export function validate(name, value) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regexPhone = /^(\()?[2-9]{1}\d{2}(\))?(-|\s)?[2-9]{1}\d{2}(-|\s)\d{4}$/;
  switch (name) {
    case "name":
      if (value === "") {
        return "A name is required";
      } else if (value.length < 3) {
        return "Name must be more than 3 characters";
      } else if (!String(value).includes(" ")) {
        return "Please enter a first and last name";
      }
      break;
    case "email":
      if (value === "") {
        return "An email is required";
      } else if (!regexEmail.test(String(value).toLowerCase())) {
        return "Invalid email address";
      }
      break;
    case "address":
      if (value == "") {
        return "An address is required";
      }
      break;
    case "password":
      if (value === "") {
        return "A password is required";
      } else if (value.length < 5) {
        return "Password must be more than 5 characters";
      }
      break;
    case "phone":
      if (value === "") {
        return "A phone number is required";
      } else if (!regexPhone.test(String(value).toLowerCase())) {
        return "Invalid phone number";
      }
      break;
  }
  return "";
}
