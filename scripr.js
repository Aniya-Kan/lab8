document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const countrySelect = document.getElementById('country');
    const postsDiv = document.querySelector('.posts'); // Используем класс 'posts'
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        });

    const renderEntries = () => {
        postsDiv.innerHTML = '';
        entries.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry';
            entryDiv.innerHTML = `
                <p>Post #${index + 1}</p>
                <p>Country: ${entry.country}</p>
                <p>Date: ${entry.date}</p>
                <p>Message: ${entry.message}</p>
                <button onclick="deleteEntry(${index})">Delete</button>
            `;
            postsDiv.appendChild(entryDiv);
        });
    };

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEntry = {
            country: form.country.value,
            date: form.date.value,
            message: form.message.value
        };
        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));
        renderEntries();
        form.reset();
    });

    
    window.deleteEntry = (index) => {
        if (confirm('Do you really want to delete this entry?')) {
            entries.splice(index, 1);
            localStorage.setItem('entries', JSON.stringify(entries));
            renderEntries();
        }
    };

    renderEntries();
});
