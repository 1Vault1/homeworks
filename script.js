const person = {
  name: 'Alex',
  surname: 'Smith',
  phone: '+ 380 00 000 00 00',
};

function createTemplate(str) {
  let newString;

  let getNewString = function (obj) {

    Object.keys(obj).map(function (key) {
      if (str.includes(key)) {
        str = str.replace(`{{${key}}}`, obj[key]);
      }
    });

    newString = str;

    return newString
  }

  return getNewString
}

const helloTemplate = createTemplate(`Hello {{name}}`);

console.log(helloTemplate(person));

const detailsTemplate = createTemplate(`{{name}} {{surname}}, {{phone}} `);

console.log(detailsTemplate(person));