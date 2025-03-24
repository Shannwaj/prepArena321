document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and question cards
    const subjectFilters = document.querySelectorAll('.subject-filters .filter-btn');
    const questionCards = document.querySelectorAll('.question-card');
    const solutionButtons = document.querySelectorAll('.show-solution');

    // Function to filter questions based on subject
    function filterQuestions() {
        const selectedSubject = document.querySelector('.subject-filters .filter-btn.active').dataset.subject;

        questionCards.forEach(card => {
            const cardSubject = card.dataset.subject;
            
            if (selectedSubject === 'all' || cardSubject === selectedSubject) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event listeners to subject filters
    subjectFilters.forEach(button => {
        button.addEventListener('click', () => {
            subjectFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterQuestions();
        });
    });

    // Add click event listeners to solution buttons
    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const solution = button.nextElementSibling;
            const isHidden = solution.classList.contains('hidden');
            
            // Toggle solution visibility
            solution.classList.toggle('hidden');
            button.textContent = isHidden ? 'Hide Explanation' : 'Show Explanation';
            
            // Add smooth animation
            if (!isHidden) {
                solution.style.maxHeight = '0';
                solution.style.opacity = '0';
            } else {
                solution.style.maxHeight = solution.scrollHeight + 'px';
                solution.style.opacity = '1';
            }
        });
    });

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

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