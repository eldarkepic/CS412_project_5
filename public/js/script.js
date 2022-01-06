const nav = document.querySelector('nav');
const form = document.getElementById("form");
const fullname = document.getElementById("name");
const email = document.getElementById("mail");
const message = document.getElementById("message");

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 150) {
        nav.classList.add ('bg-dark', 'shadow');
    } else {
        nav.classList.remove('bg-dark', 'shadow');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkForm();
    postData();
});

function checkForm() {
    const nameElement = fullname.value.trim();
    const emailElement = email.value.trim();
    const messageElement = message.value.trim();

    if (nameElement === '') {
        errorMessage(fullname, "Name cannot be empty");
    } else {
        successMessage(fullname);
    }

    if (emailElement === '') {
        errorMessage(email, "Email cannot be empty");
    }else if (!checkEmail(emailElement)) {
        errorMessage(email, "Email is not valid");
    }else {
        successMessage(email);
    }

    if (messageElement === '') {
        errorMessage(message, "Message cannot be empty");
    } else {
        successMessage(message);
    }

}

function errorMessage(elem, message) {
    const fc = elem.parentElement;
    const small = fc.querySelector('small');
    small.innerText = message;
    fc.classList.toggle("fail");
}

function successMessage (elem) {
    const fc = elem.parentElement;
    fc.className = 'form-floating mb-3 fc succ';
}

function checkEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}


function postData () {
    let contactData = {
        fullname: fullname.value,
        email: email.value,
        message: message.value
    }
    
    let contactReq = new XMLHttpRequest();
    contactReq.open('POST', '');
    contactReq.setRequestHeader('content-type', 'application/json');
    contactReq.onload = function() {
        console.log(contactReq.responseText);
        if (contactReq.responseText == 'success') {
            alert('Email is sent sucessfully');
            fullname.value = '';
            email.value = '';
            message.value = '';
        }else {
            alert('Email is not sent')
        }
    }
    contactReq.send(JSON.stringify(contactData));
}