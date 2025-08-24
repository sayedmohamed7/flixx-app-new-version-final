// Global state object to store application-wide data, including the current page, search parameters, and API configuration.
var global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0
  },
  api: {
    apiKey: '2635839629d3c675dd8efe3cc11cb4f8',
    apiURL: 'https://api.themoviedb.org/3/'
  },
  currentUser: null // To store the currently logged-in user
};




/**
 * Handles user registration.
 * It retrieves user data from the registration form, validates it,
 * and saves the new user to localStorage.
 */
function registerUser(event) {
  event.preventDefault(); // Prevents the form from submitting normally

  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeat-password').value;

  if (password !== repeatPassword) {
    displayMessage('Passwords do not match.', 'error');
    return;
  }
  if (!username || !password || !firstName || !lastName) {
    displayMessage('Please fill in all fields.', 'error');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    displayMessage('Username already taken. Please choose another one.', 'error');
    return;
  }

  const newUser = { firstName, lastName, username, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  displayMessage('Registration successful! Redirecting to login...', 'success');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
}

/**
 * Handles user login.
 * It retrieves credentials from the login form and validates them
 * against the data stored in localStorage.
 */
function loginUser(event) {
  event.preventDefault(); // Prevents the form from submitting normally

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    global.currentUser = user;
    displayMessage('Login successful! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  } else {
    displayMessage('Invalid username or password.', 'error');
  }
}

/**
 * Handles user logout.
 * Clears the user session from localStorage and redirects to the home page.
 */
function logout() {
  localStorage.removeItem('currentUser'); // Remove the current user from localStorage
  global.currentUser = null;
  displayMessage('Logged out successfully.', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}






/**
 * Checks if a user is currently logged in and updates the navigation.
 * Also redirects to the login page if the user is not authenticated.
 */
function checkLoginStatus() {
  const user = localStorage.getItem('currentUser');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const contentContainer = document.getElementById('content-container');

  // Check if a user is NOT logged in and we are on a protected page
  if (!user && global.currentPage !== '/login.html' && global.currentPage !== '/register.html') {
    // Hide the content immediately to prevent flickering
    if (contentContainer) {
        contentContainer.style.display = 'none';
    }
    // Redirect to the login page
    window.location.href = '/login.html';
    return; // Exit the function to prevent further execution
  }
  
  // If the user is authenticated, set the global user object
  if (user) {
    global.currentUser = JSON.parse(user);
    // Hide login/register links
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';

    // Create and show the welcome message and logout link if they don't exist
    let welcomeMessage = document.getElementById('welcome-message');
    let logoutLink = document.getElementById('logout-link');
    
    const navList = document.querySelector('.main-header nav ul');
    const welcomeMsgElm = document.getElementById('welcome-message-div');

    if (!logoutLink) {
      const logoutLi = document.createElement('li');
      logoutLi.innerHTML = `<a class="nav-link" id="logout-link" href="#">Logout</a>`;
      if (navList) navList.appendChild(logoutLi);
      logoutLink = document.getElementById('logout-link'); // Re-assign after creation
      if (logoutLink) logoutLink.addEventListener('click', logout);
    }

    if (!welcomeMessage) {
        const welcomeLi = document.createElement('span');
        welcomeLi.innerHTML = `Welcome, ${global.currentUser.firstName}!`;

        if (navList) welcomeMsgElm.appendChild(welcomeLi);
        welcomeMessage = document.getElementById('welcome-message'); // Re-assign after creation
    }
    
    // Ensure the new links are visible
    if (welcomeMessage) welcomeMessage.style.display = 'block';
    if (logoutLink) logoutLink.style.display = 'block';

  } else {
    global.currentUser = null;
    // Show login/register links
    if (loginLink) loginLink.style.display = 'block';
    if (registerLink) registerLink.style.display = 'block';
    
    // Hide the welcome message and logout link if they exist
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutLink = document.getElementById('logout-link');
    if (welcomeMessage) welcomeMessage.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'none';
  }
}



// A function is required to display the 20 most popular movies on the homepage.
function displayPopularMovies() {
  fetchAPIData('movie/popular', function(data) {
    var results = data.results;
    results.forEach(function(movie) {
      // Create a div element for each movie card.
      var div = document.createElement('div');
      div.classList.add('card');
      // Build the card's inner HTML using string concatenation.
      div.innerHTML = '<a href="movie-details.html?id=' + movie.id + '">' +
      (movie.poster_path ?
        '<img src="https://image.tmdb.org/t/p/w500/' + movie.poster_path + '" class="card-img-top" alt="' + movie.title + '" />' :
        '<img src="images/no-image.jpg" class="card-img-top" alt="' + movie.title + '" />') +
        '</a>' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + movie.title + '</h5>' +
        '<p class="card-text">' +
        '<small class="text-muted">Release: ' + movie.release_date + '</small>' +
        '</p>' +
        '</div>';
      var container = document.getElementById('popular-movies');
      container.appendChild(div);
    });
  });
}

// A similar function is needed to display the 20 most popular TV shows on their page.
function displayPopularShows() {
  fetchAPIData('tv/popular', function(data) {
    var results = data.results;
    results.forEach(function(show) {
      var div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = '<a href="tv-details.html?id=' + show.id + '">' +
        (show.poster_path ?
          '<img src="https://image.tmdb.org/t/p/w500' + show.poster_path + '" class="card-img-top" alt="' + show.name + '" />' :
          '<img src="images/no-image.jpg" class="card-img-top" alt="' + show.name + '" />') +
        '</a>' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + show.name + '</h5>' +
        '<p class="card-text">' +
        '<small class="text-muted">Aired: ' + show.first_air_date + '</small>' +
        '</p>' +
        '</div>';
      document.getElementById('popular-shows').appendChild(div);
    });
  });
}

// A function to display detailed information for a single movie, retrieving the ID from the URL.
function displayMovieDetails() {
  var movieId = window.location.search.split('=')[1];
  fetchAPIData('movie/' + movieId, function(movie) {
    // Set a background image for the movie details page.
    displayBackgroundImage('movie', movie.backdrop_path);
    var div = document.createElement('div');
    // Construct the HTML for the movie details section.
    div.innerHTML = '<div class="details-top">' +
      '<div>' +
      (movie.poster_path ?
        '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" class="card-img-top" alt="' + movie.title + '" />' :
        '<img src="images/no-image.jpg" class="card-img-top" alt="' + movie.title + '" />') +
      '</div>' +
      '<div>' +
      '<h2>' + movie.title + '</h2>' +
      '<p>' +
      '<i class="fas fa-star text-primary"></i>' +
      ' ' + movie.vote_average.toFixed(1) + ' / 10' +
      '</p>' +
      '<p class="text-muted">Release Date: ' + movie.release_date + '</p>' +
      '<p>' + movie.overview + '</p>' +
      '<h5>Genres</h5>' +
      '<ul class="list-group">' +
      movie.genres.map(function(genre) {
        return '<li>' + genre.name + '</li>';
      }).join('') +
      '</ul>' +
      '<a href="' + movie.homepage + '" target="_blank" class="btn">Visit Movie Homepage</a>' +
      '</div>' +
      '</div>' +
      '<div class="details-bottom">' +
      '<h2>Movie Info</h2>' +
      '<ul>' +
      '<li><span class="text-secondary">Budget:</span> $' + movie.budget.toLocaleString() + '</li>' +
      '<li><span class="text-secondary">Revenue:</span> $' + movie.revenue.toLocaleString() + '</li>' +
      '<li><span class="text-secondary">Runtime:</span> ' + movie.runtime + ' minutes</li>' +
      '<li><span class="text-secondary">Status:</span> ' + movie.status + '</li>' +
      '</ul>' +
      '<h4>Production Companies</h4>' +
      '<div class="list-group">' +
      movie.production_companies.map(function(comp) {
        return '<span>' + comp.name + '</span>';
      }).join(', ') +
      (movie.production_companies.length ? "." : 'Unknown.') + '</div>' +
      '</div>';
    document.getElementById('movie-details').appendChild(div);
  });
}

// A function to display detailed information for a single TV show, similar to the movie details function.
function displayShowDetails() {
  var showId = window.location.search.split('=')[1];
  fetchAPIData('tv/' + showId, function(show) {
    displayBackgroundImage('show', show.backdrop_path);
    var div = document.createElement('div');
    div.innerHTML = '<div class="details-top">' +
      '<div>' +
      (show.poster_path ?
        '<img src="https://image.tmdb.org/t/p/w500' + show.poster_path + '" class="card-img-top" alt="' + show.original_name + '" />' :
        '<img src="images/no-image.jpg" class="card-img-top" alt="' + show.original_name + '" />') +
      '</div>' +
      '<div>' +
      '<h2>' + show.original_name + '</h2>' +
      '<p>' +
      '<i class="fas fa-star text-primary"></i>' +
      ' ' + show.vote_average.toFixed(1) + ' / 10' +
      '</p>' +
      '<p class="text-muted">Last Air Date: ' + show.last_air_date + '</p>' +
      '<p>' + show.overview + '</p>' +
      '<h5>Genres</h5>' +
      '<ul class="list-group">' +
      show.genres.map(function(genre) {
        return '<li>' + genre.name + '</li>';
      }).join('') +
      '</ul>' +
      '<a href="' + show.homepage + '" target="_blank" class="btn">Visit Show Homepage</a>' +
      '</div>' +
      '</div>' +
      '<div class="details-bottom">' +
      '<h2>Show Info</h2>' +
      '<ul>' +
      '<li><span class="text-secondary">Number Of Episodes: </span> ' + show.number_of_episodes + '</li>' +
      '<li>' +
      '<span class="text-secondary">Last Episode To Air:</span> ' + show.last_episode_to_air.name +
      '</li>' +
      '<li><span class="text-secondary">Status:</span> ' + show.status + '</li>' +
      '</ul>' +
      '<h4>Production Companies</h4>' +
      '<div class="list-group">' +
      show.production_companies.map(function(comp) {
        return '<span>' + comp.name + '</span>';
      }).join(', ') +
      (show.production_companies.length ? "." : 'Unknown.') + '</div>' +
      '</div>';
    document.getElementById('show-details').appendChild(div);
  });
}

// A function to create a semi-transparent background image overlay on details pages.
function displayBackgroundImage(type, backgroundPath) {
  var overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = 'url(https://image.tmdb.org/t/p/original/' + backgroundPath + ')';
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100%';
  overlayDiv.style.width = '100%';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';
  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// The main search function retrieves a search term and type from URL parameters, validates the input, and initiates an API call.
function search() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  switch (global.search.type) {
        case 'movie':
          document.querySelector('.search-radio #movie').checked = true;
          break;
        case 'tv':
          document.querySelector('.search-radio #tv').checked = true;
          break;
      }

  // Check if a search term was provided before making the API call.
  if (global.search.term !== null && global.search.term !== '') {
    searchAPIData(function(data) {
      var results = data.results;
      var total_pages = data.total_pages;
      var page = data.page;
      var total_results = data.total_results;

      // Update the global state with search results data.
      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;

      if (results.length === 0) {
        showAlert('No results found!');
        return;
      }
      displaySearchResults(results);
      document.querySelector('#search-term').value = global.search.term;
    });
  } else {
    showAlert('Please enter a search term!');
  }
}

// A function is needed to display the search results in the UI, clearing previous results and showing the total count.
function displaySearchResults(results) {
  // Clear previous results to avoid duplication.
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach(function(result) {
    var div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = '<a href="' + global.search.type + '-details.html?id=' + result.id + '">' +
      (result.poster_path ?
        '<img src="https://image.tmdb.org/t/p/w500/' + result.poster_path + '" class="card-img-top" alt="' +
        (global.search.type === 'tv' ? result.name : result.title) + '" />' :
        '<img src="images/no-image.jpg" class="card-img-top" alt="' +
        (global.search.type === 'tv' ? result.name : result.title) + '" />') +
      '</a>' +
      '<div class="card-body">' +
      '<h5 class="card-title">' + (global.search.type === 'tv' ? result.name : result.title) + '</h5>' +
      '<p class="card-text">' +
      '<small class="text-muted">Release: ' +
      (global.search.type === 'tv' ? result.first_air_date : result.release_date) +
      '</small>' +
      '</p>' +
      '</div>';
    document.querySelector('#search-results-heading').innerHTML = '<h2>' + results.length + ' of ' + global.search.totalResults + ' Results for: "' + global.search.term + '"</h2>';
    document.querySelector('#search-results').appendChild(div);
  });
  // Display the pagination buttons after the results are shown.
  displayPagination();
}

// A pagination feature is required with "Previous" and "Next" buttons, including event listeners for navigation.
function displayPagination() {
  var div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = '<button class="btn btn-primary" id="prev">Prev</button>' +
    '<button class="btn btn-primary" id="next">Next</button>' +
    '<div class="page-counter">Page ' + global.search.page + ' of ' + global.search.totalPages + '</div>';
  document.querySelector('#pagination').appendChild(div);

  // Disable the 'previous' button if on the first page.
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable the 'next' button if on the last page.
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Add event listener for the 'next' button.
  document.querySelector('#next').addEventListener('click', function() {
    global.search.page++;
    searchAPIData(function(data) {
      displaySearchResults(data.results);
    });
  });

  // Add event listener for the 'previous' button.
  document.querySelector('#prev').addEventListener('click', function() {
    global.search.page--;
    searchAPIData(function(data) {
      displaySearchResults(data.results);
    });
  });
}

// Helper function to display messages
function displayMessage(message, type) {
  const alertEl = document.querySelector('.alert');
  if (alertEl) {
    alertEl.textContent = message;
    // Remove previous classes and add the new one
    alertEl.classList.remove('alert-success', 'alert-error');
    alertEl.classList.add(`alert-${type}`);
    // Hide the message after a few seconds
    setTimeout(() => {
      alertEl.textContent = '';
      alertEl.classList.remove(`alert-${type}`);
    }, 3000);
  } else {
    // If the alert element doesn't exist, create a temporary one
    const tempAlert = document.createElement('div');
    tempAlert.className = `alert alert-${type}`;
    tempAlert.textContent = message;
    document.body.prepend(tempAlert);
    setTimeout(() => {
      tempAlert.remove();
    }, 3000);
  }
}

// A function to show a loading spinner and a separate function to hide it are necessary for user feedback.
function showSpinner() {
  document.querySelector('.spinner-overlay').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner-overlay').classList.remove('show');
}

// Core data fetching must be done using vanilla AJAX (`XMLHttpRequest`). Two functions are needed: a general one and a specialized one for search.
function fetchAPIData(endpoint, callback) {
  var API_KEY = global.api.apiKey;
  var API_URL = global.api.apiURL;
  var url = API_URL + endpoint + '?api_key=' + API_KEY + '&language=en-US';

  showSpinner();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    // Check if the request is complete.
    if (this.readyState == 4) {
      hideSpinner();
      // Check for a successful response (status 200).
      if (this.status == 200) {
        callback(JSON.parse(this.responseText));
      } else {
        console.log('Error fetching data');
      }
    }
  };
  xhr.send();
}

function searchAPIData(callback) {
  var API_KEY = global.api.apiKey;
  var API_URL = global.api.apiURL;
  var url = API_URL + 'search/' + global.search.type + '?api_key=' + API_KEY + '&language=en-US&query=' + global.search.term + '&page=' + global.search.page;

  showSpinner();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      hideSpinner();
      if (this.status == 200) {
        callback(JSON.parse(this.responseText));
      } else {
        console.log('Error searching data');
      }
    }
  };
  xhr.send();
}

// A function to highlight the active navigation link based on the current page.
function highlightActiveLink() {
  var links = document.querySelectorAll('.nav-link');
  links.forEach(function(link) {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
    if (global.currentPage === '/index.html' && link.getAttribute('href') === '/') {
        link.classList.add('active');
    }
  });
}

// A utility function is needed to display temporary alert messages.
function showAlert(message, className) {
  if (className === undefined) {
    className = 'error';
  }
  var alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(function() {
    alertEl.remove();
  }, 3000);
}

// The app's main entry point is an `init` function that determines the current page and calls the appropriate display functions, which is triggered when the DOM is fully loaded.
function init() {
    // Check the login status as soon as the page loads
  checkLoginStatus();

  switch (global.currentPage) {
    case '/':
    case '/index.html':
      addLoginEventListener();
      addRegisterEventListener();
      displayPopularMovies();
      displaySlider();
      break;
    case '/shows.html':
      addLoginEventListener();
      addRegisterEventListener();
      displayPopularShows();
      break;
    case '/movie-details.html':
      addLoginEventListener();
      addRegisterEventListener();
      displayMovieDetails();
      break;
    case '/tv-details.html':
      addLoginEventListener();
      addRegisterEventListener();
      displayShowDetails();
      break;
    case '/search.html':
      addLoginEventListener();
      addRegisterEventListener();
      search();
      break;
      case '/login.html':
        addLoginEventListener();
      addRegisterEventListener();
      break;
      case '/register.html':
        addLoginEventListener();
      addRegisterEventListener();
      break;
  }
  const hamburgerButton = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('nav');
// Function to toggle the navigation menu
function toggleMobileMenu() {
  hamburgerButton.classList.toggle('is-active');
  navMenu.classList.toggle('active');
}

// Add the event listener functions to the file
function addLoginEventListener() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
  }
}

function addRegisterEventListener() {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', registerUser);
  }
}

// Event listener for the hamburger button
hamburgerButton.addEventListener('click', toggleMobileMenu);

// You may want to close the menu if a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});


  // Call the highlight function on every page load to ensure the correct nav link is active.
  highlightActiveLink();
}

// A homepage slider is required to display "now playing" movies using a library like Swiper.
function displaySlider() {
    var sliderWrapper = document.getElementById('now-playing-slider');
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');

    var slidesData = [];
    var intervalId;
    var isDragging = false;
    var startX;
    var scrollLeft;

    fetchAPIData('movie/now_playing', function(data) {
        slidesData = data.results;
        renderSlides();
        startSlider();
    });

    function renderSlides() {
        sliderWrapper.innerHTML = '';
        slidesData.forEach(function(movie) {
            var div = document.createElement('div');
            div.classList.add('slider-slide');
            div.innerHTML = '<a href="movie-details.html?id=' + movie.id + '">' +
                '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" alt="' + movie.title + '" />' +
                '</a>' +
                '<h4 class="slider-rating">' +
                '<i class="fas fa-star text-secondary"></i> ' + movie.vote_average.toFixed(1) + ' / 10' +
                '</h4>';
            sliderWrapper.appendChild(div);
        });
    }

    function startSlider() {
        intervalId = setInterval(function() {
            var currentScroll = sliderWrapper.scrollLeft;
            var maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
            var newScroll = window.innerWidth < 500 ? currentScroll + 300 : currentScroll + 250; // Scroll by the width of one slide + gap

            if (newScroll >= maxScroll) {
                newScroll = 0;
            }
            sliderWrapper.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }, 4000);
    }

    function stopSlider() {
        clearInterval(intervalId);
    }

    // Mouse and Touch Events for dragging
    sliderWrapper.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - sliderWrapper.offsetLeft;
        scrollLeft = sliderWrapper.scrollLeft;
        stopSlider();
    });

    sliderWrapper.addEventListener('mouseleave', function() {
        if (isDragging) {
            isDragging = false;
            startSlider();
        }
    });

    sliderWrapper.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            startSlider();
        }
    });

    sliderWrapper.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.pageX - sliderWrapper.offsetLeft;
        var walk = (x - startX) * 2; // Multiplier for faster scrolling
        sliderWrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    sliderWrapper.addEventListener('touchstart', function(e) {
        isDragging = true;
        startX = e.touches[0].pageX - sliderWrapper.offsetLeft;
        scrollLeft = sliderWrapper.scrollLeft;
        stopSlider();
    });

    sliderWrapper.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            startSlider();
        }
    });

    sliderWrapper.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.touches[0].pageX - sliderWrapper.offsetLeft;
        var walk = (x - startX) * 2;
        sliderWrapper.scrollLeft = scrollLeft - walk;
    });
    
}

// Add an event listener to run the init function once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', init);
