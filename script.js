document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 🎈 Event Handling Section
    // =============================================
    
    // 1. Button Click Event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! 🎉";
        clickButton.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            clickButton.style.backgroundColor = '#3498db';
        }, 1000);
    });
    
    // 2. Hover Event
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Hovering trigger! ✨";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Hover over this box";
    });
    
    // 3. Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key}`;
    });
    
    // 4. Secret Actions (Bonus)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretBox.classList.add('activated');
        secretOutput.textContent = "Secret double-click activated! 🤯";
        setTimeout(() => {
            secretBox.classList.remove('activated');
        }, 2000);
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(function() {
            secretBox.classList.add('activated');
            secretOutput.textContent = "Long press detected! 🧙‍♂️";
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // =============================================
    // 🎮 Interactive Elements Section
    // =============================================
    
    // 1. Color Changing Button
    const colorButton = document.getElementById('color-button');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f'];
    let colorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorButton.style.backgroundColor = colors[colorIndex];
        colorButton.textContent = `Color Changed to ${colors[colorIndex]}`;
        
        // Reset after 1 second
        setTimeout(() => {
            colorButton.textContent = "Change My Color!";
        }, 1000);
    });
    
    // 2. Image Gallery/Slideshow
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 5000);
    
    // 3. Tabs Component
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // =============================================
    // 📋 Form Validation Section
    // =============================================
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formStatus = document.getElementById('form-status');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            formStatus.textContent = "Form submitted successfully! 🎉";
            formStatus.style.backgroundColor = "#d4edda";
            formStatus.style.color = "#155724";
            formStatus.style.display = "block";
            
            // Reset form
            setTimeout(() => {
                signupForm.reset();
                formStatus.style.display = "none";
                document.querySelectorAll('.error-message').forEach(el => {
                    el.style.display = 'none';
                });
                document.querySelector('.strength-bar').style.width = '0';
                document.querySelector('.strength-text').textContent = 'Weak';
            }, 2000);
        } else {
            formStatus.textContent = "Please fix the errors in the form.";
            formStatus.style.backgroundColor = "#f8d7da";
            formStatus.style.color = "#721c24";
            formStatus.style.display = "block";
        }
    });
    
    // Validation functions
    function validateUsername() {
        const username = usernameInput.value.trim();
        const errorElement = usernameInput.nextElementSibling;
        const regex = /^[a-zA-Z0-9]{4,20}$/;
        
        if (!username) {
            showError(errorElement, "Username is required");
            return false;
        } else if (!regex.test(username)) {
            showError(errorElement, "Username must be 4-20 characters (letters/numbers only)");
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = emailInput.nextElementSibling;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(errorElement, "Email is required");
            return false;
        } else if (!regex.test(email)) {
            showError(errorElement, "Please enter a valid email address");
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = passwordInput.nextElementSibling;
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        if (!password) {
            showError(errorElement, "Password is required");
            strengthBar.style.width = '0';
            return false;
        } else if (password.length < 8) {
            showError(errorElement, "Password must be at least 8 characters");
            strengthBar.style.width = '25%';
            strengthBar.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak';
            return false;
        } else if (password.length > 16) {
            showError(errorElement, "Password must be at less than 16 characters");
        } else {
            hideError(errorElement);
            
            // Calculate password strength
            let strength = 0;
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/\d/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            
            strengthBar.style.width = `${strength}%`;
            
            if (strength < 50) {
                strengthBar.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return strength >= 50;
        }
    }
    
    // Helper functions
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.previousElementSibling.style.borderColor = '#e74c3c';
    }
    
    function hideError(element) {
        element.style.display = 'none';
        element.previousElementSibling.style.borderColor = '#ddd';
    }
});