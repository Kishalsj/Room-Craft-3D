// Authentication management for RoomCraft 3D
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    // Get user dropdown element
    const userDropdown = document.querySelector('.user-dropdown') || 
                         document.getElementById('userDropdown');
    
    // Get the Get Started button
    const getStartedButtons = document.querySelectorAll('a[href="design-selection.html"]');
    
    if (isLoggedIn === 'true' && userDropdown) {
        // Show user dropdown
        userDropdown.classList.remove('d-none');
        
        // Update username display if element exists
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay && username) {
            usernameDisplay.textContent = username;
        }
        
        // Modify "Get Started" buttons to go directly to design page
        getStartedButtons.forEach(button => {
            button.href = 'design-selection.html';
        });
    } else if (getStartedButtons.length > 0) {
        // Redirect "Get Started" buttons to login page if not logged in
        getStartedButtons.forEach(button => {
            button.href = 'login.html';
        });
    }
    
    // Add user dropdown toggle functionality
    document.addEventListener('click', function(e) {
        if (!userDropdown) return;
        
        const userIcon = userDropdown.querySelector('.user-icon');
        const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
        
        if (userIcon && userIcon.contains(e.target)) {
            // Toggle dropdown
            dropdownMenu.classList.toggle('show');
        } else if (dropdownMenu && !dropdownMenu.contains(e.target)) {
            // Close dropdown if clicking outside
            dropdownMenu.classList.remove('show');
        }
    });
    
    // Find and set up logout button if it exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Check if we're on login page and already logged in
    if (isLoggedIn === 'true' && window.location.pathname.includes('login.html')) {
        window.location.href = 'design-selection.html';
    }
});