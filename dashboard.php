<?php
// Check if the username is set in the URL parameter
if (isset($_GET['username'])) {
    $username = htmlspecialchars($_GET['username']);
} else {
    $username = "Guest";
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Harmony Music Player</title>
    <link rel="stylesheet" href="dashboard.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>
  <body>
    <div class="player">
    <h2>Welcome, <?php echo $username; ?>!</h2>
    <p>This is your dashboard.</p>
      <h1>Harmony Music Player</h1>
      <input type="text" id="searchInput" placeholder="Search for a song" />
      <button id="searchButton"><i class="fa fa-search"></i></button>
      <div class="controls">
        <audio id="audio" controls>
          Your browser does not support the audio element.
        </audio>
      </div>
      <ul id="songList"></ul>
    </div>

    <script src="dashboard.js"></script>
  </body>
</html>
