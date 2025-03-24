document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons
    const difficultyFilters = document.querySelectorAll('.difficulty-filter .filter-btn');
    const topicFilters = document.querySelectorAll('.topic-filter .filter-btn');
    const questionCards = document.querySelectorAll('.question-card');
    const solutionButtons = document.querySelectorAll('.show-solution');

    // Function to filter questions based on difficulty and topic
    function filterQuestions() {
        const selectedDifficulty = document.querySelector('.difficulty-filter .filter-btn.active').dataset.difficulty;
        const selectedTopic = document.querySelector('.topic-filter .filter-btn.active').dataset.topic;

        questionCards.forEach(card => {
            const cardDifficulty = card.dataset.difficulty;
            const cardTopic = card.dataset.topic;
            
            const difficultyMatch = selectedDifficulty === 'all' || cardDifficulty === selectedDifficulty;
            const topicMatch = selectedTopic === 'all' || cardTopic === selectedTopic;

            if (difficultyMatch && topicMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event listeners to difficulty filters
    difficultyFilters.forEach(button => {
        button.addEventListener('click', () => {
            difficultyFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterQuestions();
        });
    });

    // Add click event listeners to topic filters
    topicFilters.forEach(button => {
        button.addEventListener('click', () => {
            topicFilters.forEach(btn => btn.classList.remove('active'));
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
            button.textContent = isHidden ? 'Hide Solution' : 'Show Solution';
            
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