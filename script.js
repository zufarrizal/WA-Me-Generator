document.getElementById('waForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const link = document.getElementById('link').value;

    if (!phone || !message) {
        alert("Nomor HP dan Pesan wajib diisi.");
        return;
    }

    let waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    if (link) {
        waLink += `%0A%0A${encodeURIComponent(link)}`;
    }

    document.getElementById('generatedLink').innerHTML = `<a href="${waLink}" target="_blank">${waLink}</a>`;
    document.querySelector('.result').style.display = 'block';
});

// Fungsi untuk menyalin link
document.getElementById('copyBtn').addEventListener('click', function () {
    const generatedLink = document.getElementById('generatedLink').innerText;

    // Membuat elemen input untuk menyalin teks
    const tempInput = document.createElement('input');
    tempInput.value = generatedLink;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert("Link berhasil disalin!");
});
