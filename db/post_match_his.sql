INSERT INTO matches(chick_id, dude_id, chick_swipe, dude_swipe) VALUES($1, $2, null, $3)
RETURNING *