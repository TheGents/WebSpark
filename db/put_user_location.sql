UPDATE user_profile SET location = $2, location_score = -84.62058300000001 WHERE facebook_auth_id = $1
RETURNING *;