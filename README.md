# Spotify Clone MERN

## Full-Stack Music Streaming Web Application

Spotify Clone MERN is a full-stack music streaming web application built
with React.js, Node.js, Express.js, MongoDB, and Cloudinary.

The project provides a Spotify-inspired user interface where users can
browse albums and songs, search for music, play songs, view
playlists/albums, and control playback. A separate admin panel allows
administrators to upload and manage songs and albums.

## Live Deployment

-   **User Frontend:** https://spotify-clone-mern-psi.vercel.app/
-   **Admin Panel:** https://spotify-clone-mern-5ost.vercel.app/
-   **Backend API:** https://spotify-clone-mern-493i.onrender.com/

## Key Features

### User Application

-   Spotify-inspired responsive user interface
-   Home page with featured charts and songs
-   Album and playlist pages
-   Song browsing
-   Search functionality
-   Music playback
-   Play, pause, previous, and next controls
-   Progress bar and volume control
-   Current song information
-   Navigation between Home and Search
-   Responsive layout for different screen sizes

### Admin Panel

-   Separate admin dashboard
-   Add new songs
-   Upload song audio files
-   Upload song images
-   Assign songs to albums
-   Add new albums
-   Upload album artwork
-   Add album descriptions
-   Set album background colors
-   List all songs
-   List all albums
-   Delete songs
-   Delete albums

### Backend

-   REST API using Express.js
-   MongoDB database with Mongoose
-   Cloudinary integration for media storage
-   Song and album management APIs
-   CORS configuration for deployed frontends
-   Environment-based configuration

## Technology Stack

**Frontend:** React.js, JavaScript, React Router, Axios, Vite, Tailwind
CSS

**Admin Panel:** React.js, JavaScript, Axios, React Router, Vite,
Tailwind CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB

**ODM:** Mongoose

**Media Storage:** Cloudinary

**Deployment:** Vercel (frontend and admin), Render (backend)

**Tools:** VS Code, Git, GitHub, Postman

## Application Architecture

``` text
                    Spotify Clone MERN
                           │
             ┌─────────────┴─────────────┐
             │                           │
      User Frontend                 Admin Panel
        React/Vite                   React/Vite
             │                           │
             └─────────────┬─────────────┘
                           │
                           │ REST API
                           ↓
                    Node.js + Express
                           │
                ┌──────────┴──────────┐
                │                     │
                ↓                     ↓
             MongoDB              Cloudinary
          Songs & Albums        Images & Audio
```

## Application Workflow

### User Flow

``` text
Open Application
       ↓
      Home
       ↓
Browse Albums / Songs
       ↓
Search Music
       ↓
Select Song
       ↓
Music Player
       ↓
Play / Pause / Next / Previous
```

### Admin Flow

``` text
Admin Panel
     ↓
 ┌───┴──────────────┐
 ↓                  ↓
Add Song         Add Album
 ↓                  ↓
Upload Audio     Upload Artwork
 ↓                  ↓
Select Album     Add Details
 └───────┬──────────┘
         ↓
      MongoDB
         +
     Cloudinary
         ↓
   User Application
```

## Project Structure

``` text
spotify-clone-mern/
│
├── spotify-frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── assets/
│   │   │   └── frontend-assets/
│   │   ├── components/
│   │   │   ├── AlbumItem.jsx
│   │   │   ├── Display.jsx
│   │   │   ├── DisplayAlbum.jsx
│   │   │   ├── DisplayHome.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Player.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SongsItem.jsx
│   │   ├── context/
│   │   │   └── PlayerContext.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── spotify-admin/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── assets/
│   │   │   └── admin-assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── AddAlbum.jsx
│   │   │   ├── AddSong.jsx
│   │   │   ├── ListAlbum.jsx
│   │   │   └── ListSong.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── spotify-backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── mongodb.js
│   │   ├── controllers/
│   │   │   ├── albumController.js
│   │   │   └── songController.js
│   │   ├── middleware/
│   │   │   └── multer.js
│   │   ├── models/
│   │   │   ├── Album.js
│   │   │   └── Song.js
│   │   └── routes/
│   │       ├── albumRoute.js
│   │       └── songRoute.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

## Backend API

### Song Endpoints

  Method   Endpoint                 Purpose
  -------- ------------------------ ---------------
  POST     `/api/song/add`          Add a song
  GET      `/api/song/list`         Get all songs
  DELETE   `/api/song/remove/:id`   Delete a song

### Album Endpoints

  Method   Endpoint                  Purpose
  -------- ------------------------- -----------------
  POST     `/api/album/add`          Add an album
  GET      `/api/album/list`         Get all albums
  DELETE   `/api/album/remove/:id`   Delete an album

## Environment Variables

### Backend

Create:

``` text
spotify-backend/.env
```

Use the following variables:

``` env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
PORT=4000
```

For production, `FRONTEND_URL` can contain multiple comma-separated
frontend origins.

### Frontend

Create:

``` text
spotify-frontend/.env
```

``` env
VITE_API_URL=http://localhost:4000
```

### Admin

Create:

``` text
spotify-admin/.env
```

``` env
VITE_API_URL=http://localhost:4000
```

> Environment files containing credentials are not committed to GitHub.
> Use `.env.example` as a template.

## Local Setup

### Prerequisites

-   Node.js
-   npm
-   MongoDB
-   Cloudinary account
-   Git
-   VS Code

### Clone the Repository

``` bash
git clone https://github.com/Srinivas5670/spotify-clone-mern.git
cd spotify-clone-mern
```

### Backend Setup

Open a terminal:

``` bash
cd spotify-backend
npm install
npm start
```

The backend runs on:

``` text
http://localhost:4000
```

### User Frontend Setup

Open another terminal:

``` bash
cd spotify-frontend
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal.

### Admin Panel Setup

Open another terminal:

``` bash
cd spotify-admin
npm install
npm run dev
```

Vite will display the local admin panel URL in the terminal.

## Database

The application uses MongoDB to store application data.

The main collections/models are:

-   **Song**
-   **Album**

Song records contain information required for playback and album
association, while album records contain album metadata and artwork
information.

## Media Storage

Cloudinary is used to store uploaded media files.

The backend receives uploaded files through Multer and processes the
media using the Cloudinary integration.

``` text
Admin Upload
     ↓
Express API
     ↓
Multer
     ↓
Cloudinary
     ↓
Media URL
     ↓
MongoDB
     ↓
User Frontend
```

## Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Album / Playlist View

![Album View](screenshots/album.png)

### Music Player

![Music Player](screenshots/player.png)

### Search

![Search](screenshots/search.png)

### Admin Add Song

![Admin Add Song](screenshots/admin-add-song.png)

### Admin Song List

![Admin Song List](screenshots/admin-song-list.png)

### Admin Album List

![Admin Album List](screenshots/admin-album-list.png)

> If you keep screenshots in the repository, place them inside a
> `screenshots/` folder using the filenames above. If your screenshot
> filenames are different, update the paths in this section.

## Deployment Architecture

``` text
                    Vercel
                      │
             ┌────────┴────────┐
             │                 │
      User Frontend        Admin Panel
             │                 │
             └────────┬────────┘
                      │
                   HTTPS
                      ↓
                    Render
                      │
                Express API
                 /        \
                ↓          ↓
            MongoDB     Cloudinary
```

### Production Services

-   **Frontend:** Vercel
-   **Admin Panel:** Vercel
-   **Backend:** Render
-   **Database:** MongoDB
-   **Media:** Cloudinary

## Development Workflow

``` text
Code Changes
     ↓
VS Code
     ↓
Git
     ↓
GitHub
     ↓
Vercel / Render
     ↓
Production Application
```

## Security Notes

-   API credentials are stored in environment variables.
-   `.env` files are excluded from Git.
-   Cloudinary credentials are not included in source code.
-   MongoDB connection credentials are not included in the repository.
-   Production configuration should use separate environment variables.

## Future Enhancements

-   User authentication and personal accounts
-   User playlists
-   Like/favorite songs
-   Recently played songs
-   Queue management
-   Improved recommendation system
-   Enhanced admin authentication
-   Role-based access control
-   Better mobile experience
-   Production-grade error monitoring
-   More advanced music discovery features

## Author

**Srinivas Reddy**

## Credits & Acknowledgements

This project was developed with reference to tutorials and learning
resources from the GreatStack YouTube channel, along with guidance and
support from college seniors.

Special thanks to:

-   GreatStack YouTube Channel --- for tutorials and learning resources.
-   College Seniors --- for guidance and support.

## Original Reference

This project was developed based on an existing Spotify Clone project
and modified/extended for learning and project demonstration.

Original repository:

https://github.com/nuricanbrdmr/Spotify-Clone-MERN-Website

## License

This project is intended for educational, portfolio, and demonstration
purposes.
