import "whatwg-fetch";
import baseUrl from "./baseUrl";

export function getUsers() {
  return get("users");
}

export function deleteUser(userId) {
  return del(`users/${userId}`);
}

function get(url) {
  return fetch(baseUrl() + url).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(baseUrl() + url, {
    method: "DELETE",
  });
  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
