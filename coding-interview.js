// Difficulty filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const questionCards = document.querySelectorAll('.question-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const difficulty = button.getAttribute('data-difficulty');
        
        questionCards.forEach(card => {
            if (difficulty === 'all' || card.getAttribute('data-difficulty') === difficulty) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Show/Hide solution functionality
const solutionButtons = document.querySelectorAll('.show-solution');

solutionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const solutionExplanation = button.nextElementSibling;
        const isHidden = solutionExplanation.classList.contains('hidden');
        
        if (isHidden) {
            solutionExplanation.classList.remove('hidden');
            button.textContent = 'Hide Solution';
        } else {
            solutionExplanation.classList.add('hidden');
            button.textContent = 'Show Solution';
        }
    });
});

// Code highlighting
document.addEventListener('DOMContentLoaded', () => {
    Prism.highlightAll();
});

// Resource card hover effect
const resourceCards = document.querySelectorAll('.resource-card');

resourceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Create PDF resources directory
function createResourcesDirectory() {
    // This would typically be handled by the backend
    console.log('Resources directory structure would be created here');
}

// Download handling
document.querySelectorAll('[download]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent default behavior for now as files don't exist
        e.preventDefault();
        alert('PDF download will be available soon!');
    });
}); 