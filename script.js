document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const playerIds = document.getElementById('playerIds').value.split(',').map(id => id.trim());
    const reason = document.getElementById('reason').value;
    const output = document.getElementById('output');
    output.innerHTML = '';  // Clear previous output

    playerIds.forEach((id, index) => {
        setTimeout(() => {
            reportPlayer(id, reason, index + 1, playerIds.length);
        }, index * 5000);  // Delay between reports
    });
});

async function reportPlayer(playerId, reason, current, total) {
    const output = document.getElementById('output');
    const apiUrl = `https://apis.roblox.com/report`;
    const apiKey = 'CW8uuGpDuEe8NU+Ti52bPKZ6qwS4n6o+830cjP2iZAJHkpyWZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkluTnBaeTB5TURJeExUQTNMVEV6VkRFNE9qVXhPalE1V2lJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaGRXUWlPaUpTYjJKc2IzaEpiblJsY201aGJDSXNJbWx6Y3lJNklrTnNiM1ZrUVhWMGFHVnVkR2xqWVhScGIyNVRaWEoyYVdObElpd2lZbUZ6WlVGd2FVdGxlU0k2SWtOWE9IVjFSM0JFZFVWbE9FNVZLMVJwTlRKaVVFdGFObkYzVXpSdU5tOHJPRE13WTJwUU1tbGFRVXBJYTNCNVZ5SXNJbTkzYm1WeVNXUWlPaUk1T0RZNE5ETTJPRGt5SWl3aVpYaHdJam94TnpZeU1UTXhNVGswTENKcFlYUWlPakUzTmpJeE1qYzFPVFFzSW01aVppSTZNVGMyTWpFeU56VTVOSDAuRVBna3lZN0t2ZVpZdy1PUHdTVk1QbTEzRWFSMW1wOGZ1UDVnSzdWek5FWnlUNml3eUsxTDZBU2wyWVRLMFZINUVBclJIQ01kRGxmUTVzYkZFNUZZZ0I5blc3RDlLYWM1VDVZNTNBVWQ3dGUzRkVsbVVzYkcxNW5sb2E5X0lMdWRvTnFNYjdra0JwTWVqT0V1Yms2QmNZUG1RTmV0RVo4bVltSElzOTJHa1lfcnVRbVdFUjcwYTJSbHR3Q3hrbEhqXzM4eE9vX2ZKWDkwMXdPUHdZcElQWGJ5Y2RxUDZqZGhQTWtKbXd2QktYaGU5UUxlaHJnSEhLWFVSZFFTLXk0bkQzRHdQY0pNLXpjRmFEdVFFcTEwMDBTaTh2WVNuMjJCbnNiUlF0MW5iSndzSjNNT0dXcGVtVTFEWDFPejV3VUpqeWdXUHp4clZxZXZzUkFMeGFQWHhR';  // Replace with your actual API key

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            playerId: playerId,
            reason: reason
        })
    });

    const data = await response.json();
    const status = response.ok ? 'success' : 'failure';
    const message = status === 'success' ? `Successfully reported player ${playerId}` : `Failed to report player ${playerId}: ${data.error}`;
    output.innerHTML += `<p>${message} (${current}/${total})</p>`;
}
