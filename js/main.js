let currentQuestion = 0;
let userAnswers = [];
let assessmentResults = {};

// Career paths data
const careerPaths = {
    'software-dev': {
        name: 'Software Development',
        weeks: [
            {
                title: 'Foundation',
                days: [
                    { day: 1, topic: 'Programming Basics', description: 'Introduction to programming concepts and syntax' },
                    { day: 2, topic: 'Data Structures', description: 'Understanding arrays, objects, and basic algorithms' },
                    { day: 3, topic: 'Web Technologies', description: 'HTML, CSS, and JavaScript fundamentals' },
                    { day: 4, topic: 'Frontend Development', description: 'Building responsive user interfaces' },
                    { day: 5, topic: 'Project Day', description: 'Create a simple web application' }
                ]
            },
            {
                title: 'Advanced Topics',
                days: [
                    { day: 1, topic: 'Backend Development', description: 'Server-side programming and databases' },
                    { day: 2, topic: 'API Development', description: 'Creating and consuming RESTful APIs' },
                    { day: 3, topic: 'Testing & Deployment', description: 'Unit testing and deployment processes' },
                    { day: 4, topic: 'Best Practices', description: 'Code organization and documentation' },
                    { day: 5, topic: 'Final Project', description: 'Build a full-stack application' }
                ]
            }
        ]
    },
    'data-science': {
        name: 'Data Science',
        weeks: [
            {
                title: 'Foundation',
                days: [
                    { day: 1, topic: 'Python for Data Science', description: 'Basic Python programming for data analysis' },
                    { day: 2, topic: 'Data Analysis', description: 'Working with pandas and numpy' },
                    { day: 3, topic: 'Data Visualization', description: 'Creating visualizations with matplotlib and seaborn' },
                    { day: 4, topic: 'Statistical Analysis', description: 'Basic statistics and probability' },
                    { day: 5, topic: 'Project Day', description: 'Analyze a real-world dataset' }
                ]
            },
            {
                title: 'Advanced Topics',
                days: [
                    { day: 1, topic: 'Machine Learning Basics', description: 'Introduction to ML algorithms' },
                    { day: 2, topic: 'Feature Engineering', description: 'Preparing data for ML models' },
                    { day: 3, topic: 'Model Evaluation', description: 'Testing and validating ML models' },
                    { day: 4, topic: 'Deep Learning Intro', description: 'Basic neural networks' },
                    { day: 5, topic: 'Final Project', description: 'Build a predictive model' }
                ]
            }
        ]
    }
    // Add more career paths here
};

// Initialize all pages
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAssessment();
    initializeFeedback();
    initializeModules();
    handleFormSubmissions();
});

// Navigation and Form Handling
function initializeNavigation() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Add authentication logic here
            console.log('Login attempt:', { email, password });
            window.location.href = 'assessment.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Add registration logic here
            console.log('Registration:', { name, email, password });
            window.location.href = 'login.html';
        });
    }
}

// Assessment Functionality
function initializeAssessment() {
    const questionContainer = document.getElementById('question-container');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const saveBtn = document.getElementById('saveBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (questionContainer) {
        displayQuestion();
        updateProgress();

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    displayQuestion();
                    updateProgress();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentQuestion > 0) {
                    currentQuestion--;
                    displayQuestion();
                    updateProgress();
                }
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (userAnswers[currentQuestion] !== undefined) {
                    alert('Answer saved successfully!');
                } else {
                    alert('Please select an answer before saving.');
                }
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', handleAssessmentSubmission);
        }
    }
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    if (!questionContainer || !questions[currentQuestion]) return;

    const question = questions[currentQuestion];
    questionContainer.innerHTML = `
        <div class="question-card">
            <div class="question-number">
                Question ${currentQuestion + 1} of ${questions.length}
                <span class="question-category">${question.category}</span>
            </div>
            <div class="question-text">${question.question}</div>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <div class="option-item ${userAnswers[currentQuestion] === index ? 'selected' : ''}" 
                         onclick="selectOption(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    updateNavigationButtons();
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;
    const options = document.querySelectorAll('.option-item');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
}

function updateProgress() {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

function handleAssessmentSubmission() {
    if (userAnswers.includes(undefined) || userAnswers.length !== questions.length) {
        alert('Please answer all questions before submitting.');
        return;
    }

    assessmentResults = calculateResults();
    saveResults(assessmentResults);
    window.location.href = 'results.html';
}

function calculateResults() {
    const results = {
        technical: 0,
        analytical: 0,
        leadership: 0,
        creativity: 0,
        recommendedPaths: []
    };

    // Calculate scores based on answers
    userAnswers.forEach((answer, index) => {
        const question = questions[index];
        // Add scoring logic here based on question categories and answers
    });

    // Determine recommended paths based on scores
    determineRecommendedPaths(results);

    return results;
}

// Feedback Form Functionality
function initializeFeedback() {
    const ratingStars = document.querySelectorAll('.rating-star');
    const feedbackForm = document.getElementById('feedbackForm');

    if (ratingStars) {
        ratingStars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                updateStarRating(rating);
            });
        });
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmission);
    }
}

function updateStarRating(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        star.classList.toggle('active', starRating <= rating);
    });
}

function handleFeedbackSubmission(e) {
    e.preventDefault();
    const feedback = {
        rating: document.querySelectorAll('.rating-star.active').length,
        categories: {
            assessmentQuality: document.querySelector('input[name="assessment-quality"]').value,
            aiRecommendations: document.querySelector('input[name="ai-recommendations"]').value,
            userExperience: document.querySelector('input[name="user-experience"]').value,
            careerGuidance: document.querySelector('input[name="career-guidance"]').value
        },
        comments: document.getElementById('comments').value
    };

    // Save feedback
    console.log('Feedback submitted:', feedback);
    alert('Thank you for your feedback!');
    window.location.href = 'dashboard.html';
}

// Learning Modules Functionality
function initializeModules() {
    const careerPathSelect = document.getElementById('careerPath');
    if (careerPathSelect) {
        careerPathSelect.addEventListener('change', updateModuleContent);
    }
}

function updateModuleContent() {
    const careerPathSelect = document.getElementById('careerPath');
    const moduleContent = document.getElementById('moduleContent');
    if (!careerPathSelect || !moduleContent) return;

    const selectedPath = careerPathSelect.value;
    const pathData = careerPaths[selectedPath];

    if (pathData) {
        moduleContent.innerHTML = generateModuleHTML(pathData);
    }
}

function generateModuleHTML(pathData) {
    return `
        <h3>2-Week Learning Module: ${pathData.name}</h3>
        ${pathData.weeks.map((week, weekIndex) => `
            <div class="module-week">
                <h4>Week ${weekIndex + 1}: ${week.title}</h4>
                <ul>
                    ${week.days.map(day => `
                        <li>
                            <strong>Day ${day.day}:</strong> ${day.topic}
                            <p>${day.description}</p>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('')}
    `;
}

// Utility Functions
function saveResults(results) {
    localStorage.setItem('assessmentResults', JSON.stringify(results));
}

function loadResults() {
    return JSON.parse(localStorage.getItem('assessmentResults') || '{}');
}

function determineRecommendedPaths(results) {
    // Add logic to determine recommended career paths based on assessment results
    const thresholds = {
        technical: 0.7,
        analytical: 0.7,
        leadership: 0.7,
        creativity: 0.7
    };

    if (results.technical > thresholds.technical) {
        results.recommendedPaths.push('software-dev');
    }
    if (results.analytical > thresholds.analytical) {
        results.recommendedPaths.push('data-science');
    }
    // Add more path recommendations based on scores
}