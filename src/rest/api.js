/* @flow */
const root = '/api';
const headers = new Headers({
  'Content-Type': 'application/json'
});
const routes = {
  companies: 'companies'
};

class Api {
  execute = (entity :String, options :Object, id :String) => {
    let url = `${root}/${routes[entity]}`;

    if (id) {
      url += `/${id}`;
    }

    return fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((responseObject) => {
      return id || options.method === 'POST' ? responseObject : responseObject._embedded[entity];
    });
  }

  get = (entity :String, id :String) => {
    return this.execute(entity, {
      method: 'GET',
      headers: headers
    }, id);
  }

  getAll = (entity :String) => {
    return this.execute(entity, {
      method: 'GET',
      headers: headers
    });
  }

  create = (entity :String, data :Object) => {
    return this.execute(entity, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
  }

  update = (entity :String, data :Object, id :String) => {
    return this.execute(entity, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    }, id);
  }
}
export default new Api();
