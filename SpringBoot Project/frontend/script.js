document.addEventListener('DOMContentLoaded', () => {
    const entryListDiv = document.getElementById('entry-list');
    const createEntryForm = document.getElementById('create-entry-form');
    const createErrorMessage = document.getElementById('create-error-message');
    const singleEntryView = document.getElementById('single-entry-view');
    const viewTitle = document.getElementById('view-title');
    const viewDate = document.getElementById('view-date');
    const viewContent = document.getElementById('view-content');
    const closeViewButton = document.getElementById('close-view');
    const editEntryForm = document.getElementById('edit-entry-form');
    const editIdInput = document.getElementById('edit-id');
    const editTitleInput = document.getElementById('edit-title');
    const editContentInput = document.getElementById('edit-content');
    const updateEntryButton = editEntryForm.querySelector('button[type="submit"]');
    const cancelEditButton = document.getElementById('cancel-edit');
    const editErrorMessage = document.getElementById('edit-error-message');

    const fetchAllEntries = async () => {
        try {
            const response = await fetch('/journal');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const entries = await response.json();
            displayEntries(entries);
        } catch (error) {
            entryListDiv.innerHTML = `<p class="error-message">Error loading entries: ${error.message}</p>`;
        }
    };

    const displayEntries = (entries) => {
        entryListDiv.innerHTML = '';
        if (entries.length === 0) {
            entryListDiv.innerHTML = '<p>No journal entries yet. Create one below!</p>';
            return;
        }
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry-item');
            const formattedDate = new Date(entry.date).toLocaleDateString() + ' ' + new Date(entry.date).toLocaleTimeString();
            entryDiv.innerHTML = `
                <div>
                    <h4>${entry.title}</h4>
                    <p class="date">${formattedDate}</p>
                    <p>${entry.content.substring(0, 50)}...</p>
                </div>
                <div class="entry-actions">
                    <button class="view-btn" data-id="${entry.id.$oid}">View</button>
                    <button class="edit-btn" data-id="${entry.id.$oid}">Edit</button>
                    <button class="delete-btn" data-id="${entry.id.$oid}">Delete</button>
                </div>
            `;
            entryListDiv.appendChild(entryDiv);
        });

        // Add event listeners to the newly created buttons
        addEntryEventListeners();
    };

    const addEntryEventListeners = () => {
        document.querySelectorAll('.view-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.dataset.id;
                try {
                    const response = await fetch(`/journal/id/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const entry = await response.json();
                    viewTitle.textContent = entry.title;
                    viewDate.textContent = new Date(entry.date).toLocaleDateString() + ' ' + new Date(entry.date).toLocaleTimeString();
                    viewContent.textContent = entry.content;
                    singleEntryView.style.display = 'block';
                    editEntryForm.style.display = 'none'; // Hide edit form when viewing
                } catch (error) {
                    alert(`Error fetching entry: ${error.message}`);
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.dataset.id;
                if (confirm('Are you sure you want to delete this entry?')) {
                    try {
                        const response = await fetch(`/journal/id/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        fetchAllEntries(); // Refresh the list after deletion
                    } catch (error) {
                        alert(`Error deleting entry: ${error.message}`);
                    }
                }
            });
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.dataset.id;
                try {
                    const response = await fetch(`/journal/id/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const entry = await response.json();
                    editIdInput.value = entry.id.$oid;
                    editTitleInput.value = entry.title;
                    editContentInput.value = entry.content;
                    singleEntryView.style.display = 'block';
                    editEntryForm.style.display = 'block'; // Show edit form
                } catch (error) {
                    alert(`Error fetching entry for editing: ${error.message}`);
                }
            });
        });
    };

    createEntryForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        createErrorMessage.textContent = ''; // Clear any previous error messages

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        try {
            const response = await fetch('/journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to create entry (status ${response.status})`);
            }

            createEntryForm.reset();
            fetchAllEntries(); // Refresh the list after creating a new entry
        } catch (error) {
            createErrorMessage.textContent = error.message;
        }
    });

    closeViewButton.addEventListener('click', () => {
        singleEntryView.style.display = 'none';
        editEntryForm.style.display = 'none'; // Hide edit form when closing view
    });

    editEntryForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        editErrorMessage.textContent = '';

        const id = editIdInput.value;
        const title = editTitleInput.value;
        const content = editContentInput.value;

        try {
            const response = await fetch(`/journal?id=${id}`, { // Note the query parameter for ID in PUT request
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to update entry (status ${response.status})`);
            }

            fetchAllEntries(); // Refresh the list after updating
            singleEntryView.style.display = 'none'; // Close the view/edit area
        } catch (error) {
            editErrorMessage.textContent = error.message;
        }
    });

    cancelEditButton.addEventListener('click', () => {
        singleEntryView.style.display = 'none';
        editEntryForm.style.display = 'none';
    });

    // Initial load of journal entries
    fetchAllEntries();
});