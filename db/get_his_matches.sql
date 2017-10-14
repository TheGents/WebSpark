-- SELECT chick_id, id FROM matches WHERE dude_id = $1 AND chick_swipe IS NOT null AND dude_swipe IS NOT null;
SELECT matches.chick_id, matches.id, matches.rated, user_profile.first_name, user_profile.facebook_pic FROM matches 
JOIN user_profile
ON user_profile.facebook_auth_id = chick_id
WHERE dude_id = $1
AND chick_swipe = 'true'
AND dude_swipe = 'true'