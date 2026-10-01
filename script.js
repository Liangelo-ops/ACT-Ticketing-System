// ==========================================
// TICKET DATA
// ==========================================

// Load saved tickets from the browser.
// If there are no saved tickets yet, use these sample tickets.
let tickets = JSON.parse(localStorage.getItem('actTickets')) || [
    {
        id: '#ACT-1001',
        subject: 'Portal Password Locked',
        category: 'Technical Support',
        date: '2026-10-01',
        status: 'Resolved',
        studentId: '2026-0001',
        studentName: 'Sample Student',
        details: 'My student portal password is locked.'
    },
    {
        id: '#ACT-1002',
        subject: 'Wi-Fi Authentication Error',
        category: 'Technical Support',
        date: '2026-10-01',
        status: 'Pending',
        studentId: '2026-0002',
        studentName: 'Sample Student',
        details: 'I cannot connect to the ACT-STUDENT Wi-Fi.'
    }
];


// ==========================================
// SAVE TICKETS
// ==========================================

function saveTickets() {
    localStorage.setItem('actTickets', JSON.stringify(tickets));
}


// ==========================================
// LOAD TABLE ON STARTUP
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderTickets();
});


// ==========================================
// NAVIGATION VIEW SWITCHING
// ==========================================

function switchView(viewId, navBtnEl) {

    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(viewId).classList.add('active');

    if (navBtnEl) {
        navBtnEl.classList.add('active');
    }
}


// ==========================================
// BUTTON SHORTCUT NAVIGATION
// ==========================================

function switchTabByNav(viewId) {

    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(btn => {

        if (
            btn.getAttribute('onclick') &&
            btn.getAttribute('onclick').includes(viewId)
        ) {
            switchView(viewId, btn);
        }

    });
}


// ==========================================
// RENDER TICKETS TABLE
// ==========================================

function renderTickets() {

    const tbody = document.getElementById('ticketTableBody');

    if (!tbody) return;

    tbody.innerHTML = '';

    tickets.forEach((t, index) => {

        let statusClass = 'status-pending';

        if (t.status === 'Resolved') {
            statusClass = 'status-resolved';
        }

        tbody.innerHTML += `
            <tr>
                <td><strong>${t.id}</strong></td>

                <td>${t.subject}</td>

                <td>${t.category}</td>

                <td>${t.date}</td>

                <td>
                    <span class="status-badge ${statusClass}">
                        ${t.status}
                    </span>
                </td>

                <td>
                    <button
                        class="action-btn"
                        onclick="viewTicket(${index})">
                        View Details
                    </button>
                </td>
            </tr>
        `;
    });
}


// ==========================================
// VIEW TICKET DETAILS
// ==========================================

function viewTicket(index) {

    const ticket = tickets[index];

    if (!ticket) {
        alert('Ticket could not be found.');
        return;
    }

    alert(
        `TICKET DETAILS\n\n` +
        `Ticket ID: ${ticket.id}\n` +
        `Student ID: ${ticket.studentId || 'Not provided'}\n` +
        `Student Name: ${ticket.studentName || 'Not provided'}\n` +
        `Category: ${ticket.category}\n` +
        `Subject: ${ticket.subject}\n` +
        `Date Submitted: ${ticket.date}\n` +
        `Status: ${ticket.status}\n\n` +
        `Description:\n${ticket.details || 'No description provided.'}`
    );
}


// ==========================================
// HANDLE NEW TICKET SUBMISSION
// ==========================================

function handleTicketSubmit(event) {

    event.preventDefault();

    const studentId =
        document.getElementById('studentId').value.trim();

    const studentName =
        document.getElementById('studentName').value.trim();

    const category =
        document.getElementById('ticketCategory').value;

    const subject =
        document.getElementById('ticketSubject').value.trim();

    const details =
        document.getElementById('ticketDetails').value.trim();

    // Generate ticket ID
    const newId =
        `#ACT-${Math.floor(1000 + Math.random() * 9000)}`;

    // Get today's date
    const currentDate =
        new Date().toISOString().split('T')[0];


    // Create new ticket
    tickets.unshift({

        id: newId,

        studentId: studentId,

        studentName: studentName,

        subject: subject,

        category: category,

        details: details,

        date: currentDate,

        status: 'Pending'

    });


    // Save ticket to localStorage
    saveTickets();


    // Update ticket table
    renderTickets();


    // Clear form
    document.getElementById('ticketForm').reset();


    // Tell user their ticket ID
    alert(
        `Ticket Submitted Successfully!\n\nYour Ticket ID is ${newId}`
    );


    // Go to My Tickets
    switchTabByNav('tickets-view');
}


// ==========================================
// FILTER TICKETS
// ==========================================

function filterTickets() {

    const query =
        document
            .getElementById('ticketSearch')
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll('#ticketTableBody tr');

    rows.forEach(row => {

        row.style.display =
            row.innerText
                .toLowerCase()
                .includes(query)
                ? ''
                : 'none';

    });
}


// ==========================================
// FILTER KNOWLEDGE BASE
// ==========================================

function filterKB() {

    const query =
        document
            .getElementById('kbSearch')
            .value
            .toLowerCase();

    const items =
        document.querySelectorAll('.kb-item');

    items.forEach(item => {

        item.style.display =
            item.innerText
                .toLowerCase()
                .includes(query)
                ? ''
                : 'none';

    });
}


// ==========================================
// LOGIN MODAL
// ==========================================

function openLoginModal() {

    document
        .getElementById('loginModal')
        .classList.add('active');
}


function closeLoginModal() {

    document
        .getElementById('loginModal')
        .classList.remove('active');
}


function handleLogin(event) {

    event.preventDefault();

    alert('Signed in successfully!');

    closeLoginModal();
}
