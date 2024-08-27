<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = htmlspecialchars($_POST['username']);
    $email = htmlspecialchars($_POST['email']);

    // Saving data to a file (you could use a database instead)
    $file = fopen('users.txt', 'a'); // Open file in append mode
    fwrite($file, $username . ',' . $email . "\n"); // Write username and email to the file
    fclose($file);

    // Redirect to dashboard
    header('Location: dashboard.php?username=' . urlencode($username));
    exit();
} else {
    echo "Invalid Request";
}
?>
