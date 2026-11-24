// ==========================================
// CURRENT USER — Login Session Management
// ==========================================
let currentUser = JSON.parse(localStorage.getItem('actCurrentUser')) || null;

// ==========================================
// TICKET DATA
// ==========================================
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
// SAVE / LOAD FUNCTIONS
// ==========================================
function saveTickets() {
    localStorage.setItem('actTickets', JSON.stringify(tickets));
}

function saveCurrentUser() {
    if (currentUser) {
        localStorage.setItem('actCurrentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('actCurrentUser');
    }
}

// ==========================================
// UPDATE UI — Login Status & Profile Display
// ==========================================
function updateAuthUI() {
    const authArea = document.getElementById('authArea');
    const homeStatus = document.getElementById('homeLoginStatus');
    const profileDisplay = document.getElementById('profileDisplay');

    if (currentUser) {
        // ✅ LOGGED IN VIEW
        authArea.innerHTML = `
            <div class="auth-area">
                <button class="user-profile-btn" onclick="switchView('profile-view')">
                    <span class="profile-avatar">${currentUser.fullName.charAt(0).toUpperCase()}</span>
                    <span>${currentUser.fullName}</span>
                </button>
                <button class="nav-btn" onclick="logout()">Log Out</button>
            </div>
        `;
        
        if (homeStatus) {
            homeStatus.className = 'login-status-box logged-in';
            homeStatus.innerHTML = `✅ Welcome back, <strong>${currentUser.fullName}</strong>! You are logged in.`;
        }
        
        if (profileDisplay) {
            profileDisplay.innerHTML = `
                <p><strong>Full Name:</strong> ${currentUser.fullName}</p>
                <p><strong>Student ID:</strong> ${currentUser.studentId}</p>
                <p><strong>Email:</strong> ${currentUser.email || 'Not set'}</p>
            `;
        }
    } else {
        // ❌ NOT LOGGED IN VIEW
        authArea.innerHTML = `<button class="nav-btn login-nav-btn" onclick="openLoginModal()">Login</button>`;
        
        if (homeStatus) {
            homeStatus.className = 'login-status-box not-logged-in';
            homeStatus.innerHTML = '⚠️ Please log in to access all features and track your tickets.';
        }
    }
}

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
    window.scrollTo(0, 0);
}

// ==========================================
// BUTTON SHORTCUT NAVIGATION
// ==========================================
function switchTabByNav(viewId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(viewId)) {
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
                <td><span class="status-badge ${statusClass}">${t.status}</span></td>
                <td><button class="action-btn" onclick="viewTicket(${index})">View Details</button></td>
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
    const studentId = document.getElementById('studentId').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const category = document.getElementById('ticketCategory').value;
    const subject = document.getElementById('ticketSubject').value.trim();
    const details = document.getElementById('ticketDetails').value.trim();
    
    const newId = `#ACT-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toISOString().split('T')[0];
    
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
    
    saveTickets();
    renderTickets();
    document.getElementById('ticketForm').reset();
    alert(`✅ Ticket Submitted Successfully!\n\nYour Ticket ID is ${newId}`);
    switchTabByNav('tickets-view');
}

// ==========================================
// FILTER TICKETS
// ==========================================
function filterTickets() {
    const query = document.getElementById('ticketSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#ticketTableBody tr');
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

// ==========================================
// FILTER KNOWLEDGE BASE
// ==========================================
function filterKB() {
    const query = document.getElementById('kbSearch').value.toLowerCase();
    const items = document.querySelectorAll('.kb-item');
    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

// ==========================================
// LOGIN MODAL
// ==========================================
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault();
    const studentId = document.getElementById('loginStudentId').value.trim();
    const fullName = document.getElementById('loginFullName').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    currentUser = {
        studentId: studentId,
        fullName: fullName,
        email: ''
    };
    
    saveCurrentUser();
    closeLoginModal();
    updateAuthUI();
    alert(`✅ Welcome, ${fullName}! You are now logged in.`);
}

// ==========================================
// LOGOUT
// ==========================================
function logout() {
    currentUser = null;
    saveCurrentUser();
    updateAuthUI();
    switchView('home-view', document.querySelector('.nav-btn.active'));
    alert('You have been logged out.');
}

// ==========================================
// EDIT PROFILE MODAL
// ==========================================
function openEditProfileModal() {
    if (!currentUser) return;
    document.getElementById('editFullName').value = currentUser.fullName;
    document.getElementById('editEmail').value = currentUser.email || '';
    document.getElementById('editPassword').value = '';
    document.getElementById('editProfileModal').classList.add('active');
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').classList.remove('active');
}

function handleUpdateProfile(event) {
    event.preventDefault();
    const newName = document.getElementById('editFullName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();
    
    currentUser.fullName = newName;
    currentUser.email = newEmail;
    saveCurrentUser();
    updateAuthUI();
    closeEditProfileModal();
    alert('✅ Profile updated successfully!');
}

// ==========================================
// INITIALIZE WHEN PAGE LOADS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Help Desk System Loaded');
    renderTickets();
    updateAuthUI();
});
