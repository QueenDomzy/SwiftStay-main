const response = await fetch('/api/recommendations', {
  method: 'POST',
  body: JSON.stringify({ userPreferences }),
  headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();
console.log(data.recommendations);
