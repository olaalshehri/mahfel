
<?php

const CONFERENCE_SELECT = 'SELECT * FROM conferences';

function Conferences($data)
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

function listConferences()
{
    $rows = db()->query(CONFERENCE_SELECT)->fetchAll();

    json(array_map('Conferences', $rows));
}

function findConferenceById($id)
{
    $stmt = db()->prepare(
        CONFERENCE_SELECT . ' WHERE id = :id LIMIT 1'
    );

    $stmt->execute([':id' => $id]);

    return $stmt->fetch();
}

function getConferenceById($id)
{
    $conference = findConferenceById($id);

    if (!$conference) {
        json(['error' => 'لم يتم العثور على المؤتمر'], 404);
        return;
    }

    json(Conferences($conference));
}
