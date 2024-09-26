// Global variables
let entries = JSON.parse(localStorage.getItem('entries')) || [];
let editingIndex = -1; // -1 means no editing, otherwise it will store the index of the entry being edited

const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const netBalance = document.getElementById('net-balance');
const entryTable = document.getElementById('entry-table');
const entryForm = document.getElementById('entry-form');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');

// Enable/Disable category dropdown based on the selected type
typeInput.addEventListener('change', function () {
    if (typeInput.value === 'expense') {
        categoryInput.disabled = false;
    } else {
        categoryInput.disabled = true;
        categoryInput.value = ''; // Clear category selection when type is not 'expense'
    }
});

// Load existing entries from localStorage when the page loads
document.addEventListener('DOMContentLoaded', updateEntries);

// Add new entry or edit an existing one
entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = type === 'expense' ? document.getElementById('category').value : ''; // Only use category for expenses

    if (editingIndex === -1) {
        // Add new entry
        const entry = {
            id: Date.now(),
            description,
            amount,
            type,
            category // Include category in the entry
        };
        entries.push(entry);
    } else {
        // Edit existing entry
        entries[editingIndex] = {
            ...entries[editingIndex],
            description,
            amount,
            type,
            category
        };
        editingIndex = -1;
    }

    // Clear the form
    entryForm.reset();
    categoryInput.disabled = true; // Disable category input after form submission

    // Update and store the entries
    updateEntries();
});

// Add event listeners to filter buttons
document.querySelectorAll('input[name="filter"]').forEach(filterBtn => {
    filterBtn.addEventListener('change', updateEntries);
});

// Update the entries table and totals
function updateEntries() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    entryTable.innerHTML = '';
    let filteredEntries = entries;

    if (selectedFilter !== 'all') {
        filteredEntries = entries.filter(entry => entry.type === selectedFilter);
    }

    let totalIncomeAmount = 0;
    let totalExpensesAmount = 0;

    filteredEntries.forEach(entry => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${entry.description}</td>
            <td>$${entry.amount.toFixed(2)}</td>
            <td>${entry.type}</td>
            <td>${entry.type === 'expense' ? entry.category : 'N/A'}</td> <!-- Display category -->
            <td>
                <button class="edit-btn" onclick="editEntry(${entry.id})">Edit</button>
                <button class="delete-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            </td>
        `;

        entryTable.appendChild(tr);

        // Update totals
        if (entry.type === 'income') {
            totalIncomeAmount += entry.amount;
        } else {
            totalExpensesAmount += entry.amount;
        }
    });

    totalIncome.textContent = totalIncomeAmount.toFixed(2);
    totalExpenses.textContent = totalExpensesAmount.toFixed(2);
    netBalance.textContent = (totalIncomeAmount - totalExpensesAmount).toFixed(2);

    // Store entries in localStorage
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Edit entry
function editEntry(id) {
    const entry = entries.find(entry => entry.id === id);
    editingIndex = entries.findIndex(entry => entry.id === id);
    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;
    document.getElementById('category').value = entry.category;
    categoryInput.disabled = entry.type !== 'expense'; // Enable category if editing an expense
}

// Delete entry
function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    updateEntries();
}
