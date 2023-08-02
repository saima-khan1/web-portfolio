// uniqueIdentifier.js
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

// Function to generate a unique identifier (UUIDv4)
function generateUniqueId() {
  return uuidv4();
}

// Get the unique identifier from the browser's local storage or session storage
let uniqueId =
  localStorage.getItem('uniqueId') || sessionStorage.getItem('uniqueId');

// If the unique identifier is not set, generate a new one and store it
if (!uniqueId) {
  uniqueId = generateUniqueId();
  sessionStorage.setItem('uniqueId', uniqueId); // Use localStorage if you want it to persist across sessions
}

// Send a request to the backend with the unique identifier
fetch('/visitor_count', {
  headers: {
    'X-Unique-Id': uniqueId,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Update the count in your HTML element or do other actions with the count
    console.log('Visitor count:', data.count);
  })
  .catch((error) => {
    console.error('Error updating visitor count:', error);
  });
