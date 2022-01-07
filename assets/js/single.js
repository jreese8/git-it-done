var repoNameEl = document.querySelector("#repo-name");

getRepoName(); {
    var getRepoName = function() {
        // grab repo name from url query string
        var queryString = document.location.search;
        var repoName = queryString.split("=")[1];
      
        if (repoName) {
          // display repo name on the page
          repoNameEl.textContent = repoName;
      
          getRepoIssues(repoName);
        } else {
          // if no repo was given, redirect to the homepage
          document.location.replace("./index.html");
        }
      };
}

var limitWarningEl = document.querySelector("#limit-warning");

var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    if (response.ok) {
        response.json().then(function(data) {
          displayIssues(data);
      
          // check if api has paginated issues
          if (response.headers.get("Link")) {
            displayWarning(repo);
          }
        });
      }

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

// make a get request to url
fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);
  
        // check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      // if not successful, redirect to homepage
      document.location.replace("./index.html");
    }
  });
}

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
  };

  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);

  getRepoName();