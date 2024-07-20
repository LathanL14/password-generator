// List of common weak passwords
const commonWeakPasswords = [
    'password', 'Password', '123456', '12345678', '123456789', 'qwerty', 'abc123', 'password1',
    '12345', '1234567', '1234567890', 'Winter2024', 'Fall2024', 'Spring2024', 'Summer2024'
];

// Function to generate the password based on user input
function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;

    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
        alert('At least one character type must be included.');
        return;
    }

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += special;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    
    document.getElementById('password').innerText = password;
    evaluatePassword(password);

    // Increment the counter and show prompt every third use
    generateCount++;
    if (generateCount % 3 === 0) {
        alert("Thank you for using Lathan's Password Generator! Check out my other projects on my GitHub!");
    }
}

// Function to evaluate the strength of the generated password
function evaluatePassword(password) {
    const length = password.length;
    const strengthElement = document.getElementById('strength');
    const warningElement = document.getElementById('warning');

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    let score = 0;

    // Length scoring
    if (length >= 6) score++;
    if (length >= 8) score++;
    if (length >= 10) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;

    // Character types scoring
    if (hasUppercase) score += 2;
    if (hasLowercase) score += 2;
    if (hasNumbers) score += 1;
    if (hasSpecial) score += 3;

    // Check if password is made of the same character
    const allSameCharacter = password.split('').every(char => char === password[0]);
    if (allSameCharacter) {
        score = 0;
    }

    // Evaluate score
    let strength = 'Vulnerable';
    strengthElement.className = 'strength-vulnerable';

    if (score <= 3) {
        strength = 'Vulnerable';
        strengthElement.className = 'strength-vulnerable';
    } else if (score >= 4 && score <= 5) {
        strength = 'Weak';
        strengthElement.className = 'strength-weak';
    } else if (score >= 6 && score <= 7) {
        strength = 'Okay';
        strengthElement.className = 'strength-okay';
    } else if (score >= 8 && score <= 9) {
        strength = 'Medium';
        strengthElement.className = 'strength-medium';
    } else if (score >= 10 && score <= 11) {
        strength = 'Strong';
        strengthElement.className = 'strength-strong';
    } else if (score >= 12) {
        strength = 'Fortified';
        strengthElement.className = 'strength-fortified';
    }

    strengthElement.innerText = strength;

    // Trigger animation
    strengthElement.classList.add('animate-score');
    setTimeout(() => {
        strengthElement.classList.remove('animate-score');
    }, 300);

    if (length < 6) {
        warningElement.style.display = 'block';
        warningElement.innerText = 'Warning: Password is too short!';
    } else if (hasNumbers && !hasUppercase && !hasLowercase && !hasSpecial) {
        warningElement.style.display = 'block';
        warningElement.innerText = 'Warning: Password is weak if it only contains numbers.';
    } else {
        warningElement.style.display = 'none';
    }
}

// Function to assess the strength of a user-entered password
function assessPassword() {
    const password = document.getElementById('passwordInput').value;
    const length = password.length;
    const assessorScoreElement = document.getElementById('assessorScore');
    const assessorStrengthElement = document.getElementById('assessorStrength');
    const commonPasswordWarning = document.getElementById('commonPasswordWarning');
    const passwordTipsElement = document.getElementById('passwordTips');

    // Check if the entered password is in the list of common weak passwords
    if (commonWeakPasswords.includes(password)) {
        assessorStrengthElement.innerText = 'Vulnerable';
        assessorStrengthElement.className = 'strength-vulnerable';
        commonPasswordWarning.style.display = 'block';
        assessorScoreElement.innerText = '0';
        passwordTipsElement.innerHTML = '<p>Try avoiding common passwords.</p>';
        return;
    } else {
        commonPasswordWarning.style.display = 'none';
    }

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    let score = 0;

    // Length scoring
    if (length >= 6) score++;
    if (length >= 8) score++;
    if (length >= 10) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;

    // Character types scoring
    if (hasUppercase) score += 2;
    if (hasLowercase) score += 2;
    if (hasNumbers) score += 1;
    if (hasSpecial) score += 3;

    // Check if password is made of the same character
    const allSameCharacter = password.split('').every(char => char === password[0]);
    if (allSameCharacter) {
        score = 0;
        passwordTipsElement.innerHTML = '<p>Avoid using the same character repeatedly.</p>';
    }

    // Evaluate score
    let strength = 'Vulnerable';
    assessorStrengthElement.className = 'strength-vulnerable';

    if (score <= 3) {
        strength = 'Vulnerable';
        assessorStrengthElement.className = 'strength-vulnerable';
    } else if (score >= 4 && score <= 5) {
        strength = 'Weak';
        assessorStrengthElement.className = 'strength-weak';
    } else if (score >= 6 && score <= 7) {
        strength = 'Okay';
        assessorStrengthElement.className = 'strength-okay';
    } else if (score >= 8 && score <= 9) {
        strength = 'Medium';
        assessorStrengthElement.className = 'strength-medium';
    } else if (score >= 10 && score <= 11) {
        strength = 'Strong';
        assessorStrengthElement.className = 'strength-strong';
    } else if (score >= 12) {
        strength = 'Fortified';
        assessorStrengthElement.className = 'strength-fortified';
    }

    // Display the score and strength
    assessorScoreElement.innerText = score;
    assessorStrengthElement.innerText = strength;

    // Trigger animation
    assessorStrengthElement.classList.add('animate-score');
    setTimeout(() => {
        assessorStrengthElement.classList.remove('animate-score');
    }, 300);

    // Provide tips for improving password
    let tips = [];
    if (length < 12) tips.push("Increase the length to at least 12 characters.");
    if (!hasUppercase) tips.push("Add some uppercase letters.");
    if (!hasLowercase) tips.push("Add some lowercase letters.");
    if (!hasNumbers) tips.push("Add some numbers.");
    if (!hasSpecial) tips.push("Add some special characters.");
    if (allSameCharacter) tips.push("Avoid using the same character repeatedly.");
    
    if (tips.length > 0) {
        passwordTipsElement.innerHTML = `<p>Tips to improve your password:</p><ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
    } else {
        passwordTipsElement.innerHTML = '<p>Your password is strong!</p>';
    }
}

// Function to copy the generated password to the clipboard
function copyPassword() {
    const password = document.getElementById('password').innerText;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
        document.getElementById('reminder').style.display = 'block';
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Function to update the displayed password length value as the user adjusts the slider
function updateLengthValue(value) {
    document.getElementById('lengthValue').innerText = value;
}

// Event listener for the generate button
document.getElementById('generateButton').addEventListener('click', generatePassword);
