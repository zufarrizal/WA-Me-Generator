document.getElementById('waForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const link = document.getElementById('link').value;

    if (!phone || !message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nomor HP dan Pesan wajib diisi!',
        });
        return;
    }

    let waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    if (link) {
        waLink += `%0A%0A${encodeURIComponent(link)}`;
    }

    document.getElementById('generatedLink').innerHTML = `<a href="${waLink}" target="_blank">${waLink}</a>`;
    document.querySelector('.result').style.display = 'block';

    Swal.fire({
        icon: 'success',
        title: 'Link berhasil dibuat!',
        text: 'Link WA sudah siap digunakan.',
        showConfirmButton: false,
        timer: 1500
    });
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

    Swal.fire({
        icon: 'success',
        title: 'Link disalin!',
        text: 'Link berhasil disalin ke clipboard.',
        showConfirmButton: false,
        timer: 1500
    });
});
