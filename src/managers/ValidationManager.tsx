function isEmpty(c: string | object | any[]) {
  if (typeof c === "string" || Array.isArray(c)) {
    if (!c[0]) return true;
  }
  if (typeof c === "object") return JSON.stringify(c) === JSON.stringify({});
}

function inRange(c: string, min: number, max: number) {
  return c.length <= max && c.length >= min;
}

function contains(c: string, reg: RegExp) {
  for (let char of c) if (char.match(reg)) return true;
  return false;
}

function isEqual(c: string, n: number) {
  return c.length === n;
}

function firstToUpper(c: string) {
  let a = c[0].toUpperCase();
  a += c.substr(1);
  return a;
}

const ERRORS = {
  empty: (c: string) => `Pole nie powinno być puste`,
  notInRange: (c: string, min: number, max?: number) =>
    `${firstToUpper(c)} jest złej długości (${
      max ? `od ${min} do ${max}` : `przynajmniej ${min}`
    } znaków)`,
  badCharacters: (c: string, valid: string) =>
    `${firstToUpper(c)} zawiera błędne znaki (dozwolone ${valid})`,
  badSyntax: (c: string) => `${firstToUpper(c)} ma złą składnię`,
  badPassword: `Twoje hasło powinno zawierać: \nPrzynajmniej jedną małą literę \nPrzynajmniej jedną wielką literę\nPrzynajmniej jedną cyfrę`,
  passwordsDontMatch: `Podane hasła nie są takie same`
};

function nameValidator(c: string) {
  let fieldName = "nazwa użytkownika",
    min = 3,
    max = 20;
  if (isEmpty(c)) return ERRORS.empty(fieldName);
  if (!inRange(c, min, max)) return ERRORS.notInRange(fieldName, min, max);
  if (!c.match(/^[a-zA-Z0-9][a-zA-Z0-9 -_]+$/))
    return ERRORS.badCharacters(
      fieldName,
      "małe i wielkie litery a-z bez ogonków oraz cyfry"
    );
  return;
}

function emailValidator(c: string) {
  let fieldName = "e-mail";
  if (isEmpty(c)) return ERRORS.empty(fieldName);
  if (
    !c.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    return ERRORS.badSyntax(fieldName);
  return;
}

function passwordValidator(c: string) {
  let fieldName = "hasło",
    min = 8;
  if (isEmpty(c)) return ERRORS.empty(fieldName);
  if (!inRange(c, min, 9999)) return ERRORS.notInRange(fieldName, min);
  if (!contains(c, /[a-z]/) || !contains(c, /[A-Z]/) || !contains(c, /[0-9]/))
    return ERRORS.badPassword;
  return;
}

function passwordConfirmationValidator(c: string, pass: string) {
  if (c !== pass) return ERRORS.passwordsDontMatch;
  return;
}

function oldPasswordValidator(c: string) {
  let fieldName = "hasło";
  if (isEmpty(c)) return ERRORS.empty(fieldName);
  return;
}

export {
  nameValidator,
  emailValidator,
  passwordValidator,
  passwordConfirmationValidator,
  oldPasswordValidator
};
