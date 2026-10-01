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
        status: 'Resolved'
    },
    {
        id: '#ACT-1002',
        subject: 'Wi-Fi Authentication Error',
        category: 'Technical Support',
        date: '2026-10-01',
        status: 'Pending'
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

        const statusClass =
            t.status === 'Resolved'
                ? 'status-resolved'
                : 'status-pending';

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
                        onclick="toggleStatus(${index})">
                        Toggle Status
                    </button>
                </td>
            </tr>
        `;
    });
}


// ==========================================
// HANDLE NEW TICKET SUBMISSION
// ==========================================

function handleTicketSubmit(event) {

    event.preventDefault();

    const studentId =
        document.getElementById('studentId').value;

    const studentName =
        document.getElementById('studentName').value;

    const category =
        document.getElementById('ticketCategory').value;

    const subject =
        document.getElementById('ticketSubject').value;

    const details =
        document.getElementById('ticketDetails').value;

    const newId =
        `#ACT-${Math.floor(1000 + Math.random() * 9000)}`;

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


    // SAVE TICKET
    saveTickets();


    // Update table
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
// TOGGLE TICKET STATUS
// ==========================================

function toggleStatus(index) {

    if (tickets[index].status === 'Pending') {

        tickets[index].status = 'Resolved';

    } else {

        tickets[index].status = 'Pending';

    }


    // SAVE UPDATED STATUS
    saveTickets();


    // Update table
    renderTickets();
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
