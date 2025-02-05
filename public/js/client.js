function toggleAlert(isError = true, message) {
    const alert = document.getElementsByClassName('message')[0];
    alert.textContent = message;
    alert.style.display = 'block';
    alert.style.backgroundColor = isError ? '#ff4444' : '#00b300';

    if (!alert) return;
    
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded");

    // login form, form handling for incorrect/correct message
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        console.log("in form");
        loginForm.addEventListener('submit', async (e) => {

            console.log("form submitted");
            e.preventDefault();
            const formData = new FormData(e.target);
            const formEntries = Object.fromEntries(formData);
    
            // more secure way of retrieving getting sensitive values
            const emailBox = e.target.querySelector('[name="loginEmail"');
            const passwordBox = e.target.querySelector('[name="loginPassword"');
    
            // checking if an entry exists
            if (!formEntries.loginEmail) {
                emailBox.style.borderBottom = '2px solid #ff4444';
                emailBox.style.paddingLeft = '3px';
            }
        
            if (!formEntries.loginPassword){
                passwordBox.style.borderBottom = '2px solid #ff4444';
                passwordBox.style.paddingLeft = '3px';
            }

            if (emailBox){
                emailBox.addEventListener("input", () => {
                    if (emailBox.value !== ''){
                        emailBox.style.border = '';
                    }
                });
            }
            
            if (passwordBox) {
                passwordBox.addEventListener("input", () => {
                    if (passwordBox.value !== ''){
                        passwordBox.style.border = '';
                    }
                });
            }
        
            try {
        
                // sending a response to the website
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });
        
                // retrieving the data the website returns
                const data = await response.json();
                toggleAlert(!data.success, data.message);

                if (data.success) {
                    setTimeout(() => {
                        window.location.replace(data.redirect);
                    }, 1500);
                }
        
            } catch (err) {
                alert('An error has occurred: 400');
            }
        });
    }
    
    // signup form, form handling for incorrect/correct message
    const signupForm = document.querySelector('.signup-form');
    if (signupForm){
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formEntries = Object.fromEntries(formData);

            const usernameBox = e.target.querySelector('[name="username"]');
            const emailBox = e.target.querySelector('[name="signupEmail"]');
            const passwordBox = e.target.querySelector('[name="signupPassword"]');

            if (!formEntries.username) {
                usernameBox.style.borderBottom = "2px solid #ff4444";
                usernameBox.style.paddingLeft = "3px";
            }
            if (!formEntries.signupEmail) {
                emailBox.style.borderBottom = "2px solid #ff4444";
                emailBox.style.paddingLeft = "3px";
            }
            if (!formEntries.signupPassword) {
                passwordBox.style.borderBottom = "2px solid #ff4444";
                passwordBox.style.paddingLeft = "3px";
            }

            if (usernameBox) {
                usernameBox.addEventListener('input', () => {
                    usernameBox.style.borderBottom = '';
                    usernameBox.style.paddingLeft = '';
                });
            }
            if (emailBox) {
                emailBox.addEventListener('input', () => {
                    emailBox.style.borderBottom = '';
                    emailBox.style.paddingLeft = '';
                });
            }
            if (passwordBox) {
                passwordBox.addEventListener('input', () => {
                    passwordBox.style.borderBottom = '';
                    passwordBox.style.paddingLeft = '';
                });emailBox
            }
        
            try {
        
                // sending a response to the website
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });
        
                // retrieving the data the website returns
                const data = await response.json();
                if (!data.success) {
                    toggleAlert(!data.success, data.message);
                } else {
                    toggleAlert(!data.success, data.message);
                    setTimeout(() => {
                        window.location.replace(data.redirect);
                    }, 1500);
                }
        
            } catch (err) {
                alert('An error has occurred: 400');
            }
        });
    }

});
