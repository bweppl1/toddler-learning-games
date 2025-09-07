# Toddler Learning

Toddler Learning is a learning app for toddlers that includes a typing, spelling and math game. Each game has settings, allowing or customization of the games difficulty and content.

Users can sign-up to save their progress and earn achievments which are viewable in their profile.

This app was built using the MERN stack and implements JWT authentication.

## Bugs

1. typingGame -> when settings is open, first key presses triggers game feedback
2. Profile -> when refreshed "Uncaught TypeError: can't access property "username", user is null"
3. typingGame -> in google chrome, "Next Word" button doesn't work \*\*\*too few words related to most recent word

## To-Do

1. Spelling game -> check if < 2 words after removal, stop removal
2. Spelling game, fix the terrible google tts voice
3. Implement reward system(Points, Achievements)
4. Implement reset profile
5. Password recovery
