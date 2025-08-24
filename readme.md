# Flixx App

A modern movie and TV show discovery app built with vanilla JavaScript, The Movie Database (TMDb) API, and custom authentication using LocalStorage.

---


# Movie and TV Show Web Application

  This document provides a comprehensive overview of the Movie and TV Show Web Application project. It outlines the project's purpose, features, and the task breakdown for each team member.

  ## Project Description
    Our web application is a dynamic platform for discovering movies and TV shows. Built with vanilla JavaScript and CSS, it provides a clean, user-friendly interface to browse popular content, view detailed information, and search for specific titles. The application leverages the [**TMDB**](https://www.themoviedb.org/) API: to fetch and display real-time data without the use of external libraries.

## Features

- User registration and login (LocalStorage-based)
- Browse popular movies and TV shows
- Search for movies and TV shows
- Responsive design with mobile navigation
- Movie and TV show details with genres, ratings, and production info
- Now Playing slider on homepage
- Alerts and loading spinners for better UX

---

## Screenshots

![Homepage Screenshot](images/Flixx%20app%20homepage.png)
![Movie Details Screenshot](images/Flixx%20app%20movie%20details.png)

## Demo

[Live Demo Link](#) 
---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/flixx-app.git
   cd flixx-app
   ```

2. **Open in your browser:**
   - Open `index.html` directly in your browser, or
   - Use a local server (recommended for routing support):
     ```bash
     npx serve .
     ```
   - Or use the Live Server extension in VS Code.

---

## Usage

- **Register:** Create a new account on the Register page.
- **Login:** Log in with your credentials.
- **Browse:** View popular movies and TV shows.
- **Search:** Use the search bar to find movies or shows.
- **Details:** Click on a movie or show for more information.
- **Logout:** Use the logout link in the navigation.

---

## Project Structure

```
flixx-app/
│
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── ... (assets)
├── index.html
├── shows.html
├── movie-details.html
├── tv-details.html
├── search.html
├── login.html
├── register.html
└── README.md
```

---

## Technologies Used

- HTML5 & CSS3 (Flexbox, Grid, Responsive Design)
- JavaScript (ES6)
- [TMDb API](https://www.themoviedb.org/documentation/api)
- LocalStorage (for authentication)
- [Font Awesome](https://fontawesome.com/) (icons)

---
## API Reference

- **TMDb API:**  
  - [API Docs](https://developers.themoviedb.org/3)
  - You need an API key (already included in the code for demo purposes).

---
## Contributing

Contributions are welcome!  
Please open an issue or submit a pull request for improvements or bug fixes.

---

## Credits

- [TMDb](https://www.themoviedb.org/) for the movie and TV data
- [Font Awesome](https://fontawesome.com/) for icons

## Team Members
  ### Sayed (Team Lead and Developer)
      As the project lead, Sayed is responsible for the core infrastructure and critical functionality.

      Project Setup: Create the project's file structure.

      API Integration: Fetch and display the most popular movies on the home page.

      Search Functionality: Implement the main search bar and radio button logic.

      User Authentication: Develop the logic for the registration form.

      Styling: Style the login and registration pages.

  ### Naira

      Naira's focus is on data presentation and core user interaction.

      Initial CSS: Set up the global CSS styles for the entire application.

      Data Display: Create the function to fetch and display detailed information on the movie details page.

      Search Results: Display the fetched search results on the search page.

      Login Functionality: Implement the client-side logic for the login form.

      Styling: Style the home page, including the movie grid and "Now Playing" slider.

  ### Heba

      Heba's tasks are centered on building the individual pages and managing the TV show-related data.

      HTML Structure: Create all the necessary HTML files for the project.

      Data Display: Develop the function to fetch and display detailed information on the TV show details page.

      Search Functionality: Handle the submission of search queries and redirect the user to the search results page.

      TV Show Page: Fetch and display a list of popular TV shows.

      Styling: Style both the movie and TV show details pages.

  ### Sohaila

      Sohaila is responsible for the interactive elements, navigation, and state management that create a seamless user experience.

      File Linking: Link the CSS and JavaScript files to all HTML pages.

      Interactive Components: Implement the "Now Playing" slider on the home page.

      Navigation: Create the logic for navigating between pages when users click on a movie or TV show.

      State Management: Implement a system to handle user login and logout status.

      Styling: Style the search results and TV shows pages.

      This detailed plan will guide our development process and help us stay on track to deliver a high-quality project.