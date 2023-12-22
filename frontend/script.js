async function login(data) {
    await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            document.querySelector('header').style.top = '-100vh'
        } else {
            const error = document.getElementById('error');
            error.innerHTML = 'Invalid username or password';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        login(data);
    });
});