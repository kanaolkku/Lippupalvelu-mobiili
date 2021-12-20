const APILogin = async (username, password) => {
  let details = {
    'username': username,
    'password': password
  }

  let formBody = [];

  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const data = fetch('https://lippupalvelu.herokuapp.com/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody
  })
    .then(data => data.json())
    .catch(err => {
      console.log(err);
    })
  return data
}

const APIDetails = async (userToken) => {
  const data = await fetch('https://lippupalvelu.herokuapp.com/api/users/current', {
    headers: {
      "Authorization": "Bearer " + userToken
    }
  })
    .then(data => data.json())
    .catch(err => err.message);
  return data
}

module.exports = {
  APILogin,
  APIDetails
};