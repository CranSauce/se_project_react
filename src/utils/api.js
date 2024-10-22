const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.wtwr.clienturl.net"
  : "http://localhost:3001";


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

function updateUserProfile(data) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, 
    },
    body: JSON.stringify({
      name: data.name,
      avatar: data.avatar,
    }),
  });
}

function likeItem(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

function dislikeItem(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",  
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}


export { getItems, addItem, deleteItem, updateUserProfile, likeItem, dislikeItem };
