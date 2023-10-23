const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


function checkPasswordStrength(password) {
   
    var password = document.getElementById("password").value;

       let passwordStrengthDiv = document.getElementById('password-strength');
         passwordStrengthDiv.className = '';
    
         if (password.length < 6) {
             passwordStrengthDiv.className = 'weak';
             passwordStrengthDiv.innerText = 'password is Weak';
             passwordStrengthDiv.style.color="red";
         } else if (password.length >= 6 && password.length <= 8) {
             passwordStrengthDiv.className = 'medium';
             passwordStrengthDiv.innerText = 'password is Medium';
             passwordStrengthDiv.style.color = "orange";
         } else {
             passwordStrengthDiv.className = 'strong';
             passwordStrengthDiv.innerText = 'password is Strong';
             passwordStrengthDiv.style.color = "green";
    
         }
     }

function validatePassword() {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm-password").value;
    const messageSpan = document.getElementById("message");

    if (password === confirm) {
        messageSpan.innerHTML = "Passwords match!";
        messageSpan.style.color = "green";
    } else {
        messageSpan.innerHTML = "Passwords do not match!";
        messageSpan.style.color = "red";
    }
}
function openWebsite(){
    window.open("https://vaultofcodes.com/",'_blank');
}