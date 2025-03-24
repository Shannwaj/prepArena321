document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons
    const categoryFilters = document.querySelectorAll('.category-filter .filter-btn');
    const difficultyFilters = document.querySelectorAll('.difficulty-filter .filter-btn');
    const questionCards = document.querySelectorAll('.question-card');
    const solutionButtons = document.querySelectorAll('.show-solution');

    // Function to filter questions based on category and difficulty
    function filterQuestions() {
        const selectedCategory = document.querySelector('.category-filter .filter-btn.active')?.dataset.category || 'all';
        const selectedDifficulty = document.querySelector('.difficulty-filter .filter-btn.active')?.dataset.difficulty || 'all';

        questionCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardDifficulty = card.dataset.difficulty;
            
            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const difficultyMatch = selectedDifficulty === 'all' || cardDifficulty === selectedDifficulty;

            if (categoryMatch && difficultyMatch) {
                card.style.display = 'block';
                card.classList.add('fade-in');
                setTimeout(() => {
                    card.classList.remove('fade-in');
                }, 500);
            } else {
                card.style.display = 'none';
            }
        });

        // Display message if no results found
        const visibleCards = Array.from(questionCards).filter(card => card.style.display !== 'none');
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (visibleCards.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No matching problems found</h3>
                    <p>Try changing your filter selection</p>
                `;
                document.querySelector('.questions-container').appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Add click event listeners to category filters
    categoryFilters.forEach(button => {
        button.addEventListener('click', () => {
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterQuestions();
        });
    });

    // Add click event listeners to difficulty filters
    difficultyFilters.forEach(button => {
        button.addEventListener('click', () => {
            difficultyFilters.forEach(btn => btn.classList.remove('active'));
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

    // Language tabs functionality
    const languageTabs = document.querySelectorAll('.language-tab');
    const languageContents = document.querySelectorAll('.language-content');

    // Add click event listeners to language tabs
    languageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const language = tab.dataset.language;
            
            // Update active tab
            languageTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected language content
            languageContents.forEach(content => {
                if (content.dataset.language === language) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Count problems by category and difficulty and update filter buttons with counts
    function updateFilterCounts() {
        // Count by category
        const categoryCount = {
            all: questionCards.length
        };
        
        // Count by difficulty
        const difficultyCount = {
            all: questionCards.length
        };
        
        // Count problems for each category and difficulty
        questionCards.forEach(card => {
            const category = card.dataset.category;
            const difficulty = card.dataset.difficulty;
            
            categoryCount[category] = (categoryCount[category] || 0) + 1;
            difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
        });
        
        // Update category filter buttons with counts
        categoryFilters.forEach(button => {
            const category = button.dataset.category;
            const count = categoryCount[category] || 0;
            
            // Add count badge if not already present
            if (!button.querySelector('.count-badge')) {
                const badge = document.createElement('span');
                badge.className = 'count-badge';
                badge.textContent = count;
                button.appendChild(badge);
            } else {
                button.querySelector('.count-badge').textContent = count;
            }
        });
        
        // Update difficulty filter buttons with counts
        difficultyFilters.forEach(button => {
            const difficulty = button.dataset.difficulty;
            const count = difficultyCount[difficulty] || 0;
            
            // Add count badge if not already present
            if (!button.querySelector('.count-badge')) {
                const badge = document.createElement('span');
                badge.className = 'count-badge';
                badge.textContent = count;
                button.appendChild(badge);
            } else {
                button.querySelector('.count-badge').textContent = count;
            }
        });
    }

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

    // Initialize page
    updateFilterCounts();
}); 