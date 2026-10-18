<?php

function createUser()
{
    $data = body();

    $first_name = trim($data['first_name'] ?? '');
    $last_name = trim($data['last_name'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $password = $data['password'] ?? '';

    if (!$first_name || !$last_name || !$email || !$phone || !$password) {
        json(['error' => 'جميع الحقول مطلوبة'], 400);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json(['error' => 'البريد الإلكتروني غير صالح'], 400);
        return;
    }

    if (strlen($password) < 8) {
        json(['error' => 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'], 400);
        return;
    }

    $stmt = db()->prepare(
        'SELECT id FROM users WHERE email = :email OR phone = :phone LIMIT 1'
    );

    $stmt->execute([
        ':email' => $email,
        ':phone' => $phone,
    ]);

    if ($stmt->fetch()) {
        json(['error' => 'البريد الإلكتروني أو رقم الجوال مستخدم مسبقًا'], 409);
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    db()->prepare(
        'INSERT INTO users (first_name, last_name, email, phone, password)
         VALUES (:first_name, :last_name, :email, :phone, :password)'
    )->execute([
                ':first_name' => $first_name,
                ':last_name' => $last_name,
                ':email' => $email,
                ':phone' => $phone,
                ':password' => $hashedPassword,
            ]);

    json([
        'message' => 'تم إنشاء الحساب بنجاح',
    ], 201);
}

function loginUser()
{
    $data = body();

    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        json(['error' => 'البريد الإلكتروني وكلمة المرور مطلوبان'], 400);
        return;
    }

    $stmt = db()->prepare(
        'SELECT id, first_name, last_name, email, password
         FROM users
         WHERE email = :email
         LIMIT 1'
    );

    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        json(['error' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة'], 401);
        return;
    }

    // Save the user ID in the session
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $user['id'];

    unset($user['password']);

    unset($user['password']);


    json([
        'message' => 'تم تسجيل الدخول بنجاح',
        'user' => $user,
    ]);
}


function getCurrentUser()
{
    // Check if the user is logged in
    if (empty($_SESSION['user_id'])) {
        json(['error' => 'غير مسجل الدخول'], 401);
        return;
    }

    // Get the user from the database
    $stmt = db()->prepare(
        'SELECT id, first_name, last_name, email, phone
         FROM users
         WHERE id = :id
         LIMIT 1'
    );

    $stmt->execute([
        ':id' => $_SESSION['user_id'],
    ]);

    $user = $stmt->fetch();

    if (!$user) {
        session_unset();
        session_destroy();

        json(['error' => 'المستخدم غير موجود'], 401);
        return;
    }

    json(['user' => $user]);
}


