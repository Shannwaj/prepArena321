// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Handle dropdown on mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = toggle.parentElement;
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            dropdownToggles.forEach(toggle => {
                toggle.parentElement.classList.remove('active');
            });
        }
    });

    // Close mobile menu when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            dropdownToggles.forEach(toggle => {
                toggle.parentElement.classList.remove('active');
            });
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Animate statistics when in viewport
const stats = document.querySelectorAll('.stat-number');
let animated = false;

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
    animated = true;
};

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    const subjectInput = contactForm.querySelector('input[name="subject"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    const privacyCheckbox = contactForm.querySelector('input[name="privacy"]');

    // Form validation functions
    const validators = {
        name: (value) => {
            return value.trim().length >= 2 ? '' : 'Name must be at least 2 characters long';
        },
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Please enter a valid email address';
        },
        phone: (value) => {
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            return value.trim() === '' || phoneRegex.test(value) ? '' : 'Please enter a valid phone number';
        },
        subject: (value) => {
            return value.trim().length >= 3 ? '' : 'Subject must be at least 3 characters long';
        },
        message: (value) => {
            return value.trim().length >= 10 ? '' : 'Message must be at least 10 characters long';
        },
        privacy: (checked) => {
            return checked ? '' : 'You must agree to the privacy policy';
        }
    };

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        
        input.style.borderColor = 'red';
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }

    // Validate single field
    function validateField(input) {
        const value = input.type === 'checkbox' ? input.checked : input.value;
        const validatorName = input.name;
        const validator = validators[validatorName];
        
        if (validator) {
            const error = validator(value);
            if (error) {
                showError(input, error);
                return false;
            } else {
                clearError(input);
                return true;
            }
        }
        return true;
    }

    // Add input event listeners for real-time validation
    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => validateField(input));
            input.addEventListener('blur', () => validateField(input));
        }
    });

    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', () => validateField(privacyCheckbox));
    }

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        [nameInput, emailInput, phoneInput, subjectInput, messageInput, privacyCheckbox].forEach(input => {
            if (input && !validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.backgroundColor = '#4CAF50';
            successMessage.style.color = 'white';
            successMessage.style.padding = '1rem';
            successMessage.style.borderRadius = '8px';
            successMessage.style.marginTop = '1rem';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.insertAdjacentElement('afterend', successMessage);
            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);

        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.style.backgroundColor = '#f44336';
            errorMessage.style.color = 'white';
            errorMessage.style.padding = '1rem';
            errorMessage.style.borderRadius = '8px';
            errorMessage.style.marginTop = '1rem';
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            
            contactForm.insertAdjacentElement('afterend', errorMessage);

            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }

        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});

// Scroll-based animations for features and courses
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .course-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// JEE Mains Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Subject Filter Functionality
    const subjectFilter = document.querySelector('.subject-filter');
    if (subjectFilter) {
        const filterButtons = subjectFilter.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            // Add hover effect
            button.addEventListener('mouseenter', () => {
                const icon = button.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            });
            
            button.addEventListener('mouseleave', () => {
                const icon = button.querySelector('i');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
            
            // Click handler
            button.addEventListener('click', () => {
                const subject = button.dataset.subject;
                const questions = document.querySelectorAll('.question-card');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transform = 'translateY(0)';
                });
                
                // Add active class and transform to clicked button
                button.classList.add('active');
                button.style.transform = 'translateY(-2px)';
                
                // Animate icon
                const icon = button.querySelector('i');
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
                
                // Filter questions with smooth transitions
                questions.forEach(question => {
                    question.style.transition = 'all 0.3s ease-in-out';
                    
                    if (subject === 'all' || question.dataset.subject === subject) {
                        question.style.opacity = '0';
                        question.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            question.style.display = 'block';
                            requestAnimationFrame(() => {
                                question.style.opacity = '1';
                                question.style.transform = 'translateY(0)';
                            });
                        }, 300);
                    } else {
                        question.style.opacity = '0';
                        question.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            question.style.display = 'none';
                        }, 300);
                    }
                });
                
                // Update counter if exists
                const counter = document.querySelector('.questions-counter');
                if (counter) {
                    const visibleQuestions = Array.from(questions).filter(q => 
                        subject === 'all' || q.dataset.subject === subject
                    ).length;
                    counter.textContent = `Showing ${visibleQuestions} questions`;
                    counter.style.animation = 'fadeIn 0.3s ease-in-out';
                }
            });
        });
        
        // Initialize counter if exists
        const counter = document.querySelector('.questions-counter');
        if (counter) {
            const totalQuestions = document.querySelectorAll('.question-card').length;
            counter.textContent = `Showing ${totalQuestions} questions`;
        }
    }

    // Show/Hide Solutions
    const solutionButtons = document.querySelectorAll('.show-solution');
    solutionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const solutionSteps = button.previousElementSibling;
            const isHidden = solutionSteps.classList.contains('hidden');
            
            // Toggle solution visibility
            solutionSteps.classList.toggle('hidden');
            
            // Update button text
            button.textContent = isHidden ? 'Hide Solution' : 'Show Solution';
            
            // Add animation
            if (!isHidden) {
                solutionSteps.style.opacity = '1';
                solutionSteps.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    solutionSteps.style.opacity = '0';
                }, 50);
            } else {
                solutionSteps.style.opacity = '0';
                solutionSteps.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    solutionSteps.style.opacity = '1';
                }, 50);
            }
        });
    });

    // Resource Card Hover Effect
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // PDF Download Handling
    const pdfLinks = document.querySelectorAll('.resource-card .btn-secondary');
    pdfLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add download animation
            const icon = link.querySelector('i');
            icon.classList.remove('fa-download');
            icon.classList.add('fa-spinner', 'fa-spin');
            
            setTimeout(() => {
                icon.classList.remove('fa-spinner', 'fa-spin');
                icon.classList.add('fa-check');
                
                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-download');
                }, 1500);
            }, 1000);
        });
    });
});

// Jobs Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Job Search Functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const jobCards = document.querySelectorAll('.job-card');

    if (searchInput && searchButton) {
        let debounceTimer;

        const handleSearch = () => {
            const searchTerms = searchInput.value.toLowerCase().split(' ').filter(term => term.length > 0);
            
            if (searchTerms.length === 0) {
                jobCards.forEach(card => card.style.display = 'block');
                return;
            }

            jobCards.forEach(card => {
                const title = card.querySelector('.job-card-title h3').textContent.toLowerCase();
                const company = card.querySelector('.company-name').textContent.toLowerCase();
                const description = card.querySelector('.job-card-content p').textContent.toLowerCase();
                const location = card.querySelector('.location').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                const jobType = card.querySelector('.job-info span:first-child').textContent.toLowerCase();
                const salary = card.querySelector('.job-info span:last-child').textContent.toLowerCase();

                const searchText = `${title} ${company} ${description} ${location} ${tags.join(' ')} ${jobType} ${salary}`;
                
                const matches = searchTerms.every(term => 
                    searchText.includes(term) || 
                    tags.some(tag => tag.includes(term)) ||
                    term.length >= 3 && searchText.split(' ').some(word => word.includes(term))
                );

                card.style.display = matches ? 'block' : 'none';
            });

            // Show no results message if all cards are hidden
            const visibleCards = Array.from(jobCards).filter(card => card.style.display !== 'none');
            const noResultsMsg = document.querySelector('.no-results-message') || createNoResultsMessage();
            
            if (visibleCards.length === 0) {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }
        };

        // Create "No Results" message element
        function createNoResultsMessage() {
            const msg = document.createElement('div');
            msg.className = 'no-results-message';
            msg.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h3>No matching jobs found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            document.querySelector('.jobs-list').appendChild(msg);
            return msg;
        }

        // Debounced search for input
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleSearch, 300);
        });

        // Immediate search for button click
        searchButton.addEventListener('click', handleSearch);

        // Handle Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // Clear search
        const clearSearch = () => {
            searchInput.value = '';
            handleSearch();
        };

        // Add clear button if not exists
        if (!document.querySelector('.search-clear')) {
            const clearButton = document.createElement('button');
            clearButton.className = 'search-clear';
            clearButton.innerHTML = '<i class="fas fa-times"></i>';
            clearButton.style.display = 'none';
            searchInput.parentElement.appendChild(clearButton);

            clearButton.addEventListener('click', clearSearch);

            // Show/hide clear button based on input
            searchInput.addEventListener('input', () => {
                clearButton.style.display = searchInput.value ? 'block' : 'none';
            });
        }
    }

    // Bookmark Toggle
    const bookmarkButtons = document.querySelectorAll('.btn-save');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            // Add animation
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Filter Functionality
    const filterCheckboxes = document.querySelectorAll('.jobs-filters input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            applyFilters();
        });
    });

    // Salary Range
    const salaryRange = document.querySelector('.salary-range input[type="range"]');
    if (salaryRange) {
        salaryRange.addEventListener('input', (e) => {
            const value = e.target.value;
            const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(value);
            
            document.querySelector('.salary-values span:last-child').textContent = formattedValue;
            applyFilters();
        });
    }

    // Sort Functionality
    const sortSelect = document.querySelector('.jobs-sort select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const jobsList = document.querySelector('.jobs-list');
            const jobCardsArray = Array.from(jobCards);

            jobCardsArray.sort((a, b) => {
                if (sortValue === 'Most Recent') {
                    return -1; // Assuming newest first
                } else if (sortValue === 'Highest Paid') {
                    const salaryA = parseSalary(a.querySelector('.job-info span:last-child').textContent);
                    const salaryB = parseSalary(b.querySelector('.job-info span:last-child').textContent);
                    return salaryB - salaryA;
                }
                return 0;
            });

            jobCardsArray.forEach(card => {
                jobsList.appendChild(card);
            });
        });
    }

    // Helper function to parse salary string to number
    function parseSalary(salaryString) {
        const match = salaryString.match(/\$(\d+)K/);
        return match ? parseInt(match[1]) * 1000 : 0;
    }

    // Apply all filters
    function applyFilters() {
        const selectedJobTypes = Array.from(document.querySelectorAll('.filter-group:nth-child(1) input:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim().toLowerCase());
        
        const selectedExperience = Array.from(document.querySelectorAll('.filter-group:nth-child(2) input:checked'))
            .map(checkbox => checkbox.parentElement.textContent.trim().toLowerCase());
        
        const location = document.querySelector('.location-search input')?.value.toLowerCase();
        const salary = parseInt(document.querySelector('.salary-range input')?.value || 0);

        jobCards.forEach(card => {
            const jobType = card.querySelector('.job-info span:first-child').textContent.toLowerCase();
            const jobLocation = card.querySelector('.location').textContent.toLowerCase();
            const jobSalary = parseSalary(card.querySelector('.job-info span:last-child').textContent);

            const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.some(type => jobType.includes(type));
            const matchesLocation = !location || jobLocation.includes(location);
            const matchesSalary = jobSalary <= salary;

            if (matchesJobType && matchesLocation && matchesSalary) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Pagination
    const paginationButtons = document.querySelectorAll('.btn-page');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Scroll to top of jobs list
            document.querySelector('.jobs-list').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Course Category Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter .filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterButtons.length && courseCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                // Show/hide courses based on category
                courseCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        // Add animation
                        card.style.opacity = 0;
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // FAQ Toggle
    const faqCards = document.querySelectorAll('.faq-card');
    
    if (faqCards.length) {
        faqCards.forEach(card => {
            const heading = card.querySelector('h3');
            const content = card.querySelector('p');
            const icon = card.querySelector('h3 i');
            
            // Initially hide all FAQ answers
            content.style.display = 'none';
            
            heading.addEventListener('click', () => {
                // Toggle the visibility of the answer
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    content.style.maxHeight = '0';
                    setTimeout(() => {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.transition = 'max-height 0.3s ease';
                    }, 10);
                    
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    content.style.maxHeight = '0';
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 300);
                    
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            });
        });
    }
    
    // Course Stats Animation
    const statNumbers = document.querySelectorAll('.course-stats .stat span');
    
    if (statNumbers.length) {
        // Animate stats when they come into view
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    
                    // Add a subtle animation
                    statElement.style.animation = 'fadeInUp 0.5s ease forwards';
                    
                    // Stop observing after animation
                    observer.unobserve(statElement);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
}); 