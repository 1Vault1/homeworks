const URL = 'https://jsonplaceholder.typicode.com/photos?albumId=1';

const API = {
  getList: () => {
    return fetch(URL).then((res) => res.json());
  }
};