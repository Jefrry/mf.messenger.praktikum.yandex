const validationPassword = (val) => /^([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\{\}\[\]\-\+_\=]+)$/.test(val);
const validationPhone = (val) => /^[0-9]{11,13}$/.test(val);
const validationEmpty = (val) => val !== '';
const validationEmail = (val) => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((val));
export { validationPassword, validationPhone, validationEmpty, validationEmail };
//# sourceMappingURL=validator.js.map