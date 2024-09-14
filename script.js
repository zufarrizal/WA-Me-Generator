let waLink = '';

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function generateLink() {
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const link = document.getElementById('link').value.trim();
    let resultDiv = document.getElementById('result');

    const phonePattern = /^[1-9]\d{7,14}$/;

    if (phone === "") {
        showNotification('Nomor HP wajib diisi!');
        return;
    } else if (!phonePattern.test(phone)) {
        resultDiv.innerHTML = "<p class='error'>Nomor HP tidak valid. Gunakan kode negara tanpa simbol '+' dan tanpa 0 di depan.</p>";
        showNotification('Nomor HP tidak valid!');
        return;
    }

    waLink = `https://wa.me/${phone}`;

    let finalMessage = message;
    if (link !== "") {
        finalMessage += `\n\nLink: ${link}`;
    }

    if (finalMessage !== "") {
        waLink += `?text=${encodeURIComponent(finalMessage)}`;
    }

    resultDiv.innerHTML = `<a href="${waLink}" target="_blank">${waLink}</a>`;
    showNotification('Link WA berhasil dibuat!');
}

function copyLink() {
    if (waLink === '') {
        showNotification('Generate link dulu sebelum copy!');
        return;
    }
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = waLink;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showNotification('Link berhasil disalin!');
}

function resetForm() {
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('link').value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('qr-code').innerHTML = '<canvas id="qr-canvas"></canvas>';
    waLink = '';
    showNotification('Form berhasil direset!');
}

function generateQRCode() {
    if (waLink === '') {
        showNotification('Generate link dulu sebelum buat QR Code!');
        return;
    }

    const qr = new QRious({
        element: document.getElementById('qr-canvas'),
        value: waLink,
        size: 150
    });

    showNotification('QR Code berhasil dibuat!');
}
