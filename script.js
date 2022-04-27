const searchInput = document.querySelector(".search_box input");
const searchForm = document.getElementsByClassName("search_bar")[0];
const cardsContainer = document.querySelector(".cards_container");

window.onload = () => {
  const users = JSON.parse(localStorage.getItem("github_users")) || [];

  users.forEach(user => createPost(user));
}

function createPost({ name, login, avatar_url, public_repos, followers, following }) {
  const card = `
    <div class="card">
      <div class="card_header">
        <img src="${avatar_url}" alt="">
        <div class="card_info">
          <p class="card_name">${name}</p>
          <span class="card_username">@${login}</span>
        </div>
      </div>
      <div class="card_body">
        <div class="github_followers">
          <span class="count">${followers}</span>
          <span class="text">Followers</span>
        </div>
        <div class="github_followers">
          <span class="count">${following}</span>
          <span class="text">Following</span>
        </div>
        <div class="github_followers">
          <span class="count">${public_repos}</span>
          <span class="text">Repositories</span>
        </div>
      </div>
    </div>`;

    cardsContainer.innerHTML += card;
}

searchForm.onsubmit = async (event) => {
  event.preventDefault(); // form don't send pls :'(

  const users = JSON.parse(localStorage.getItem("github_users")) || [];
  
  const username = searchInput.value;

  const user = await fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json());

  users.push(user);

  localStorage.setItem("github_users", JSON.stringify(users))
  
  createPost(user);
}


