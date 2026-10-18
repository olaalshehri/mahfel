
<?php

const EVENT_SELECT = 'SELECT * FROM events';

function Events($data)
{
    return [
        'id' => $data['id'],
        'slug' => $data['slug'],
        'title' => $data['title'],
        'description' => $data['description'],
        'date' => $data['date'],
        'time' => $data['time'],
        'city' => $data['city'],
        'venue' => $data['venue'],
        'image' => $data['image'],
        'category' => $data['category'],
        'type' => $data['type'],
        'organizer' => $data['organizer'],
        'price' => $data['price'],
    ];
}

function listEvents()
{
    $rows = db()->query(EVENT_SELECT)->fetchAll();

    json(array_map('Events', $rows));
}

function findEventById($id) { // id = 1 / slug =rose-festival;
    $stmt =db()->prepare (
    'SELECT * FROM events WHERE id = :id LIMIT 1');

    $stmt->execute([':id' => $id]);
    return $stmt->fetch(); // fetch jest one row
}

function getEventById($id)
{
    $event = findEventById($id);

    if (!$event) {
        json(['error' => 'لم يتم العثور على الفعالية'], 404);
        return;
    }

    json($event);
}
