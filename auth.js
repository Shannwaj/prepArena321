document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = `${tab.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const icon = button.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form validation and submission
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Sign in attempt:', { email, password, rememberMe });
        
        // Simulate successful sign in
        showSuccess('Successfully signed in!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const terms = document.getElementById('terms').checked;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        if (!terms) {
            showError('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        // Here you would typically make an API call to your backend
        console.log('Sign up attempt:', { name, email, password, terms });
        
        // Simulate successful sign up
        showSuccess('Account created successfully!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });

    // Social authentication buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`${platform} authentication clicked`);
            // Here you would implement the actual social authentication
        });
    });

    // Helper functions for showing messages
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const activeForm = document.querySelector('.auth-form.active');
        const existingError = activeForm.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        activeForm.insertBefore(errorDiv, activeForm.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const activeForm = document.querySelector('.auth-form.active');
        const existingSuccess = activeForm.querySelector('.success-message');
        
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        activeForm.insertBefore(successDiv, activeForm.firstChild);
    }

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}); 