export const checkEmail = (email) => {
    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return emailRegex.test(email);
  };
  export const checkNumberPhone = (numberphone) => {
    const numberPhoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return numberPhoneRegex.test(numberphone);
  };  

