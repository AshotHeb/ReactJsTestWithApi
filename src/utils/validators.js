export const isRequired = (value) => value.length !== 0 ? undefined : "Fuild is Required";
export const maxLength = (length) => (value) => value.length <= length;
export const minLength = (length) => (value) => value.length >= length;
export const emailValidator = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

