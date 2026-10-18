
<?php

function createBooking()
{
    // 1. Check if the user is logged in
    if (empty($_SESSION['user_id'])) {
        json(['error' => 'يجب تسجيل الدخول لإتمام الحجز'], 401);
        return;
    }

    // 2. Read the booking data sent from React
    $data = json_decode(file_get_contents('php://input'), true);

    if (!is_array($data)) {
        json(['error' => 'بيانات الحجز غير صالحة'], 400);
        return;
    }

    $slug = trim($data['slug'] ?? '');
    $type = $data['type'] ?? '';
    $quantity = filter_var(
        $data['quantity'] ?? null,
        FILTER_VALIDATE_INT
    );

    // 3. Validate the booking details
    if (
        $slug === '' ||
        !in_array($type, ['event', 'conference'], true) ||
        $quantity === false ||
        $quantity === null ||
        $quantity < 1 ||
        $quantity > 10
    ) {
        json(['error' => 'بيانات الحجز غير مكتملة أو غير صحيحة'], 400);
        return;
    }

    // 4. Find the selected event or conference
    $table = $type === 'event' ? 'events' : 'conferences';

    $stmt = db()->prepare(
        "SELECT id, price FROM {$table} WHERE slug = :slug LIMIT 1"
    );

    $stmt->execute([':slug' => $slug]);
    $item = $stmt->fetch();

    if (!$item) {
        json(['error' => 'لم يتم العثور على الفعالية أو المؤتمر'], 404);
        return;
    }

    // 5. Calculate the price on the server
    $ticketPrice = (float) $item['price'];
    $subtotal = round($ticketPrice * $quantity, 2);
    $tax = round($subtotal * 0.15, 2);
    $total = round($subtotal + $tax, 2);

    // 6. Generate a unique booking code
    $bookingCode = strtoupper(bin2hex(random_bytes(4)));

    // 7. Save the booking in the database
    $eventId = $type === 'event' ? $item['id'] : null;
    $conferenceId = $type === 'conference' ? $item['id'] : null;

    $stmt = db()->prepare(
        'INSERT INTO bookings
        (booking_code, user_id, event_id, conference_id,
         tickets_count, total_price, booking_date)
        VALUES
        (:booking_code, :user_id, :event_id, :conference_id,
         :tickets_count, :total_price, NOW())'
    );

    $stmt->execute([
        ':booking_code' => $bookingCode,
        ':user_id' => (int) $_SESSION['user_id'],
        ':event_id' => $eventId,
        ':conference_id' => $conferenceId,
        ':tickets_count' => $quantity,
        ':total_price' => $total,
    ]);

    $bookingId = (int) db()->lastInsertId();

    // 8. Return the booking confirmation data
    json([
        'message' => 'تم إنشاء الحجز بنجاح',
        'booking' => [
            'id' => $bookingId,
            'booking_code' => $bookingCode,
            'type' => $type,
            'slug' => $slug,
            'quantity' => $quantity,
            'ticket_price' => $ticketPrice,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
        ],
    ], 201);
}

function getMyBookings()
{
    // 1. Check if the user is logged in
    if (empty($_SESSION['user_id'])) {
        json(['error' => 'يجب تسجيل الدخول لعرض حجوزاتك'], 401);
        return;
    }

    // 2. Get the user's bookings
    $stmt = db()->prepare(
    'SELECT
        b.id,
        b.booking_code,
        COALESCE(e.title, c.title) AS title,
        COALESCE(e.image, c.image) AS image,
        COALESCE(e.date, c.date) AS event_date
    FROM bookings b
    LEFT JOIN events e ON b.event_id = e.id
    LEFT JOIN conferences c ON b.conference_id = c.id
    WHERE b.user_id = :user_id
    ORDER BY b.booking_date DESC'
);

    $stmt->execute([
        ':user_id' => (int) $_SESSION['user_id'],
    ]);

    $bookings = $stmt->fetchAll();

    // 3. Return the bookings
    json([
        'bookings' => $bookings,
    ]);
}


function logout()
{
    $_SESSION = [];

    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }

    json([
        'message' => 'تم تسجيل الخروج بنجاح',
    ]);
}
