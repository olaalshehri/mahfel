<?php

require __DIR__ . '/../config/database.php';
require __DIR__ . '/../src/helpers.php';
require __DIR__ . '/../src/controllers/EventsController.php';
require __DIR__ . '/../src/controllers/ConferencesController.php';
require __DIR__ . '/../src/controllers/UsersController.php';
require __DIR__ . '/../src/controllers/BookingsController.php';



// Allow React to connect to PHP
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Set session cookie settings
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'secure' => false,
    'samesite' => 'Lax',
]);

// Start the session

session_start();

$routes = [
    //  Method  /       Path         /    Handler
    ['GET', '~^/public/api/events$~', 'listEvents'],
    ['GET', '~^/public/api/events/(\d+)$~', 'getEventById'],
    ['GET', '~^/public/api/conferences$~', 'listConferences'],
    ['GET', '~^/public/api/conferences/(\d+)$~', 'getConferenceById'],

    ['POST', '~^/public/api/register$~', 'createUser'],
    ['POST', '~^/public/api/login$~', 'loginUser'],
    ['GET', '~^/public/api/me$~', 'getCurrentUser'],

    ['POST', '~^/public/api/bookings$~', 'createBooking'],

    ['GET', '~^/public/api/bookings$~', 'getMyBookings'],

    ['POST', '~^/public/api/logout$~', 'logout'],


];


$method = $_SERVER['REQUEST_METHOD'];
$path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

foreach ($routes as [$routeMethod, $pattern, $handler]) {
    if ($routeMethod === $method && preg_match($pattern, $path, $matches)) {
        array_shift($matches);

        try {
            $handler(...$matches);
        } catch (Throwable $e) {
            error_log($e->getMessage());
            json(['error' => 'Server Error'], 500);
        }

        exit;
    }
}
json(['error' => 'Not Found'], 404);
