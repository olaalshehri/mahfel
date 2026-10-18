<?php

define('DB_HOST', 'localhost');
define('DB_NAME', 'mahfel');
define('DB_USER', 'root');
define('DB_PASS', '');

function db(): PDO
{
    // Reuse the same database connection to retrieve the correct last inserted ID.
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;

    } catch (PDOException $e) {
        error_log($e->getMessage());
        http_response_code(500);
        exit('Database connection failed');

        // TODO: Later, use sendResponse() from helpers/response.php
        // sendResponse(500, false, 'Database connection failed');
    }
}