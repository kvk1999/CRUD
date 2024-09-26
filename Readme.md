# Income & Expense Tracker
## Overview
This project is a simple and intuitive Income & Expense Tracker built using HTML, CSS, and JavaScript. The tracker allows users to manage their finances by adding, editing, and deleting income and expense entries. The app provides real-time updates to total income, total expenses, and net balance. It also implements filtering options and stores user data in the browser using localStorage, so the data persists across sessions.

## Features

### CRUD Operations:

Create: Add new income or expense entries.
Read: View all entries in a dynamic table.
Update: Edit existing entries.
Delete: Remove entries.
Filters: Display all entries, or filter by only income or expenses using radio buttons.

Real-time Totals: Automatically calculates and displays the total income, total expenses, and net balance.

Persistent Storage: All data is stored locally in the browser's localStorage, so the data remains available even after refreshing or closing the browser.

Responsive Design: The app is mobile-friendly and adjusts to various screen sizes.

Row Selection: Highlight rows to visually differentiate selected entries in the list.

## How to Use

Add Entry:

Enter the description and amount in the respective fields.
Choose whether it's an "Income" or "Expense."
Click the "Add Entry" button to save the entry.
Edit Entry:

Click the "Edit" button next to an entry you want to modify.
The details will be loaded into the input fields, and you can make changes.
After making edits, the entry will be updated in the list.
Delete Entry:

Click the "Delete" button next to an entry to remove it from the list.

Filter Entries:

Use the radio buttons to switch between viewing all entries, only income, or only expenses.

View Totals:

The total income, total expenses, and net balance will update in real-time at the top of the screen as you add, edit, or delete entries.
Technologies Used

HTML: Structure of the web page.
CSS: Styling and layout of the app.
JavaScript: Logic for managing entries, calculating totals, and handling user interactions.
localStorage: Persistent storage for user entries in the browser.