const person = {
  name: 'Alex',
  surname: 'Smith',
  phone: '+ 380 00 000 00 00',
};

function createTemplate(str) {

  let getNewString = function (obj) {

    Object.keys(obj).map(function (key) {
      str = str.replace(`{{${key}}}`, obj[key]);
    });

    return str
  }

  return getNewString

}

const helloTemplate = createTemplate(`Hello {{name}}`);

console.log(helloTemplate(person));

const detailsTemplate = createTemplate(`{{name}} {{name}} {{surname}}, {{phone}} `);

console.log(detailsTemplate(person));