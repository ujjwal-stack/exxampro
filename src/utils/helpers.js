// Time formatting utilities
const timeUtils = {
    // Format seconds to MM:SS format
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    // Convert minutes to readable format
    formatDuration: (minutes) => {
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    },

    // Get time difference in readable format
    getTimeAgo: (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    }
};

// Grading and scoring utilities
const gradingUtils = {
    // Calculate percentage score
    calculateScore: (correct, total) => {
        return Math.round((correct / total) * 100);
    },

    // Get letter grade from percentage
    getLetterGrade: (score) => {
        if (score >= 97) return { grade: 'A+', color: 'text-green-600', bgColor: 'bg-green-100' };
        if (score >= 93) return { grade: 'A', color: 'text-green-600', bgColor: 'bg-green-100' };
        if (score >= 90) return { grade: 'A-', color: 'text-green-600', bgColor: 'bg-green-100' };
        if (score >= 87) return { grade: 'B+', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        if (score >= 83) return { grade: 'B', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        if (score >= 80) return { grade: 'B-', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        if (score >= 77) return { grade: 'C+', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        if (score >= 73) return { grade: 'C', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        if (score >= 70) return { grade: 'C-', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        if (score >= 60) return { grade: 'D', color: 'text-orange-600', bgColor: 'bg-orange-100' };
        return { grade: 'F', color: 'text-red-600', bgColor: 'bg-red-100' };
    },

    // Get performance message based on score
    getPerformanceMessage: (score) => {
        if (score >= 95) return "Outstanding performance! Excellent mastery of the subject.";
        if (score >= 85) return "Great job! You have a strong understanding of the material.";
        if (score >= 75) return "Good work! You understand most concepts well.";
        if (score >= 65) return "Fair performance. Consider reviewing the topics you missed.";
        return "You may want to review the material and try again.";
    },

    // Calculate improvement from previous attempts
    calculateImprovement: (currentScore, previousScores) => {
        if (!previousScores || previousScores.length === 0) return null;
        const lastScore = previousScores[previousScores.length - 1];
        const improvement = currentScore - lastScore;
        return {
            improvement,
            isImprovement: improvement > 0,
            message: improvement > 0 ? `+${improvement} points from last attempt` : 
                     improvement < 0 ? `${improvement} points from last attempt` : 
                     'Same score as last attempt'
        };
    }
};

// Form validation utilities
const validationUtils = {
    // Validate email format
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate password strength
    validatePassword: (password) => {
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters long');
        if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
        if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
        if (!/\d/.test(password)) errors.push('Password must contain at least one number');
        
        return {
            isValid: errors.length === 0,
            errors,
            strength: errors.length === 0 ? 'Strong' : 
                     errors.length <= 2 ? 'Medium' : 'Weak'
        };
    },

    // Validate form data
    validateRegistration: (formData) => {
        const errors = {};
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
        
        if (!formData.email || !validationUtils.isValidEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        const passwordValidation = validationUtils.validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.errors[0];
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};

// Data processing utilities
const dataUtils = {
    // Shuffle array (for randomizing questions)
    shuffleArray: (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Group items by a property
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },

    // Calculate statistics from array of numbers
    calculateStats: (numbers) => {
        if (numbers.length === 0) return null;
        
        const sorted = [...numbers].sort((a, b) => a - b);
        const sum = numbers.reduce((a, b) => a + b, 0);
        
        return {
            min: Math.min(...numbers),
            max: Math.max(...numbers),
            mean: sum / numbers.length,
            median: sorted[Math.floor(sorted.length / 2)],
            sum
        };
    },

    // Deep clone object
    deepClone: (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (Array.isArray(obj)) return obj.map(item => dataUtils.deepClone(item));
        
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = dataUtils.deepClone(obj[key]);
            }
        }
        return cloned;
    }
};

// Local storage utilities
const storageUtils = {
    // Save data to localStorage with error handling
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get data from localStorage with error handling
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    // Remove item from localStorage
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    // Clear all localStorage data
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// Export all utilities
const utils = {
    time: timeUtils,
    grading: gradingUtils,
    validation: validationUtils,
    data: dataUtils,
    storage: storageUtils
};

export default utils;
export const time = timeUtils;
export const grading = gradingUtils;
export const validation = validationUtils;
export const data = dataUtils;
export const storage = storageUtils;
