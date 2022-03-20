import "./index.css";
import { getUsers, deleteUser } from "./api/userApi";

// Populate table of users via API Call.
getUsers().then((result) => {
  let usersBody = "";

  result.forEach((user) => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
    </tr>`;
  });

  global.document.getElementById("users").innerHTML = usersBody;
  const links = global.document.getElementsByClassName("deleteUser");
  // Must use array.from to create a real array from A DOM colelction
  // getElementsByClassname only returns an "array like" object

  Array.from(links, (link) => {
    link.onclick = function (event) {
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
