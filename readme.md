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

[Live Demo Link](https://flixx-app-new-version-final.netlify.app/) 
---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sayedmohamed7/flixx-app.git
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