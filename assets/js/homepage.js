var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var displayRepos = function(repos, searchTerm) {

if (repos.length === 0) {
  repoContainerEl.textContent = "No repositories found.";
  return;
}
  
    console.log(repos);
    console.log(searchTerm);

// clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;

// loop over repos
for (var i = 0; i < repos.length; i++) {
  // format repo name
  var repoName = repos[i].owner.login + "/" + repos[i].name;

// create a link for each repo
var repoEl = document.createElement("a");
repoEl.classList = "list-item flex-row justify-space-between align-center";
repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
  // create a span element to hold repository name
}

// create span to hold issue title
var titleEl = document.createElement("span");
titleEl.textContent = issues[i].title;

// append to container
issueEl.appendChild(titleEl);

// create a type element
var typeEl = document.createElement("span");

// check if issue is an actual issue or a pull request
if (issues[i].pull_request) {
  typeEl.textContent = "(Pull request)";
} else {
  typeEl.textContent = "(Issue)";
}

// append to container
issueEl.appendChild(typeEl);

  };

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element

var username = nameInputEl.value.trim();

if (username) {
  getUserRepos(username);
  nameInputEl.value = "";
} else {
  alert("Please enter a GitHub username");
}
};

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          // pass response data to dom function
          displayIssues(data);
        });
      }
      else {
        alert("There was a problem with your request!");
      }
    });
  }

  userFormEl.addEventListener("submit", formSubmitHandler);