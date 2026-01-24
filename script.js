// Common utility functions for the Professor Visit Management System

// Initialize form validation
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .form-input:invalid {
            border-color: #DC3545;
        }
        
        .form-input:valid {
            border-color: #28A745;
        }
        
        .error-message {
            color: #DC3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: none;
        }
        
        .form-input:invalid + .error-message {
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize form validation
    initFormValidation();
    
    // Set current year in footer
    setCurrentYear();
});

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function(e) {
            const text = this.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = text;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.8)';
            tooltipEl.style.color = 'white';
            tooltipEl.style.padding = '4px 8px';
            tooltipEl.style.borderRadius = '4px';
            tooltipEl.style.fontSize = '12px';
            tooltipEl.style.zIndex = '1000';
            tooltipEl.style.top = (e.pageY - 30) + 'px';
            tooltipEl.style.left = (e.pageX + 10) + 'px';
            
            document.body.appendChild(tooltipEl);
            
            this.addEventListener('mouseleave', function() {
                tooltipEl.remove();
            });
        });
    });
}

// Initialize form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('[required]');
        
        inputs.forEach(input => {
            // Create error message element
            const errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.textContent = 'This field is required';
            
            input.parentNode.insertBefore(errorEl, input.nextSibling);
            
            // Add real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.setCustomValidity('');
                    this.nextElementSibling.style.display = 'none';
                }
            });
        });
        
        // Add submit event listener
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('[required]');
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Form is valid, proceed with submission
                alert('Form submitted successfully!');
                return true;
            }
            
            return false;
        });
    });
}

// Validate individual field
function validateField(field) {
    const errorEl = field.nextElementSibling;
    
    if (!field.checkValidity()) {
        errorEl.textContent = field.validationMessage || 'This field is required';
        errorEl.style.display = 'block';
        field.classList.add('invalid');
        return false;
    } else {
        errorEl.style.display = 'none';
        field.classList.remove('invalid');
        return true;
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#28A745' : '#DC3545'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Format time
function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString('en-US', options);
}

// Debounce function for search inputs
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts
window.PVMS = {
    showNotification,
    formatDate,
    formatTime,
    validateField
};