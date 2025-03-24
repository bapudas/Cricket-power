// DOM Elements
const matchesContainer = document.getElementById('matchesContainer');
const refreshBtn = document.getElementById('refreshBtn');
const scorecardModal = document.getElementById('scorecardModal');
const closeBtn = document.getElementById('closeBtn');
const modalBody = document.getElementById('modalBody');
let deferredPrompt;

// Sample data - replace with API calls in production
const sampleMatches = [
    // Replace this line:
const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY');

// With your actual key:
const response = await fetch('https://api.cricapi.com/v1/currentMatches?apikey=f62eceea-09d2-45a4-9b6e-42b3afdada5d');
    {
        id: 1,
        team1: "India",
        team2: "Australia",
        score: "IND 287/6 (45.2) | AUS 286/9 (50)",
        status: "India need 4 runs in 28 balls",
        details: {
            batting: "India: Rohit Sharma 89 (102), Kohli 56 (72)",
            bowling: "Australia: Starc 2/45 (10), Cummins 2/50 (10)",
            partnership: "78 runs (12.4 overs) between Rohit and Kohli",
            requiredRR: "5.12",
            recent: "4 . 1 6 . | Last 5 overs: 32/1"
        }
    },
    {
        id: 2,
        team1: "England",
        team2: "New Zealand",
        score: "ENG 312/8 (50) | NZ 245/7 (38.1)",
        status: "New Zealand need 68 runs in 71 balls",
        details: {
            batting: "New Zealand: Williamson 78* (89), Conway 42 (51)",
            bowling: "England: Wood 3/52 (9), Rashid 2/45 (10)",
            partnership: "112 runs (18.3 overs) between Williamson and Conway",
            requiredRR: "5.74",
            recent: "1 4 . 2 6 | Last 5 overs: 28/0"
        }
    }
];

// Display matches
function displayMatches(matches) {
    matchesContainer.innerHTML = '';
    
    if (matches.length === 0) {
        matchesContainer.innerHTML = '<div class="no-matches">No live matches currently</div>';
        return;
    }
    
    matches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-teams">${match.team1} vs ${match.team2}</div>
            <div class="match-status">${match.status}</div>
            <div class="match-score">${match.score}</div>
            <button class="view-btn" data-id="${match.id}">View Details</button>
        `;
        matchesContainer.appendChild(matchCard);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const matchId = parseInt(e.target.getAttribute('data-id'));
            showScorecard(matchId);
        });
    });
}

// Show scorecard modal
function showScorecard(matchId) {
    const match = sampleMatches.find(m => m.id === matchId);
    if (match) {
        modalBody.innerHTML = `
            <h2>${match.team1} vs ${match.team2}</h2>
            <p><strong>Score:</strong> ${match.score}</p>
            <p><strong>Status:</strong> ${match.status}</p>
            <hr>
            <h3>Batting:</h3>
            <p>${match.details.batting}</p>
            <h3>Bowling:</h3>
            <p>${match.details.bowling}</p>
            <h3>Partnership:</h3>
            <p>${match.details.partnership}</p>
            <h3>Required Run Rate:</h3>
            <p>${match.details.requiredRR}</p>
            <h3>Recent:</h3>
            <p>${match.details.recent}</p>
        `;
        scorecardModal.style.display = 'block';
    }
}

// Close modal
function closeModal() {
    scorecardModal.style.display = 'none';
}

// Simulate API fetch
function fetchMatches() {
    matchesContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading matches...</div>';
    
    // Simulate API delay
    setTimeout(() => {
        displayMatches(sampleMatches);
    }, 1000);
}

// PWA Installation
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.createElement('button');
    installBtn.id = 'installBtn';
    installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
    document.body.appendChild(installBtn);
    installBtn.style.display = 'block';
    
    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted install');
            }
            deferredPrompt = null;
        });
    });
});

// Event Listeners
refreshBtn.addEventListener('click', fetchMatches);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === scorecardModal) {
        closeModal();
    }
});

// Initial load
fetchMatches();
