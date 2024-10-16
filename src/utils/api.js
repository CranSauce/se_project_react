const baseUrl = "http://localhost:3001";


function getToken() {
  return localStorage.getItem("jwt");
}


export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}


function request(url, options) {
  return fetch(url, options).then(checkResponse);
}


function getItems() {
  return request(`${baseUrl}/items`);
}


function addItem(item) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, 
    },
    body: JSON.stringify(item),
  });
}


function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`, 
    },
  }).then((res) => {
    console.log("Response:", res);
    return res;
  });
}

export { getItems, addItem, deleteItem };
