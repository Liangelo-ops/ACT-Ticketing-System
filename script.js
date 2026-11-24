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

    if (current
