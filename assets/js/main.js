import { translationObserver, setHeaderShadow, fadeObserver, revealObserver, validate_email, toggleDarkMode } from './fonctions/fonctions.js';

const skillContent = document.querySelector('#skills .skills__container');
const projectContainer = document.querySelector('#projects');
const btnThemeToggler = document.querySelector("#toggle-mode");
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link')
/**Contact form */
const contactForm = document.querySelector('#contact-form'),
    senderName = document.querySelector('#contact-form-name'),
    senderMail = document.querySelector('#contact-form-email'),
    senderMessage = document.querySelector('#contact-form-message'),
    report = document.querySelector('#contact-report'),
    btnSend = document.querySelector('#contact-form-submit');
const qualification_element = document.querySelector('.qualification__container');
const servicesCards = document.querySelectorAll('#services .services__card');
const mainContent = document.querySelector('#main');
const topHeader = document.querySelector('#header');
const sections = document.querySelectorAll('section[id]');

/**
 * initialize emailJs
 */
(function () {
    try {
        emailjs.init({
            publicKey: "Vp1AX-aslbvjjPVe5",
        });
    } catch (error) {
        console.log(error.message)
    }
})();

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}
/* hid menu */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
/*remove menu mobile while clicking each link in the menu*/
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/**
 * 
 * highlight the active link of every section
 * when the section is in the viewport
 * show or hide go to the button
 */
const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']'),
            scrollUp = document.querySelector('#scroll-up')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }

        // scrollTop button show && hide
        if (window.scrollY > 600) {
            scrollUp.classList.add('show')
        } else {
            scrollUp.classList.remove('show')
        }
    })
}
window.addEventListener('scroll', scrollActive)


window.addEventListener('scroll', () => setHeaderShadow(topHeader, mainContent))
setHeaderShadow(topHeader, mainContent)

/**
 * show menu on up scroll up and hide on scroll down
*/
let lastScrollPosition = 0;
window.addEventListener("scroll", () => {
    // Get the current scroll position
    let currentScrollPosition = window.scrollY;

    if (currentScrollPosition - lastScrollPosition > 0) {
        topHeader.classList.add("hide");
    } else {
        topHeader.classList.remove("hide");
    }
    // Set the last scroll position to the current scroll position
    lastScrollPosition = currentScrollPosition;
})
// Dark and light theme
const darkTheme = "dark-theme";
const getCurrentTheme = () => document.body.classList.contains(darkTheme);
const selectedTheme = localStorage.getItem('dark-theme-set');

if (selectedTheme) {
    document.body.classList.add(darkTheme);
    btnThemeToggler.checked = true;
}
btnThemeToggler.addEventListener('click', () => toggleDarkMode(document.body, btnThemeToggler, darkTheme, getCurrentTheme));

// Sending e-mail
function sendMail(e) {
    e.preventDefault()
    // check values
    if (!(validate_email(senderMail)) && senderName === "" && senderMessage === "") {
        report.innerText = 'Veuillez vérifier les champs'
        report.classList.add('error')
        report.classList.add('show')
    } else {
        emailjs.sendForm('service_2l932je', 'template_o69ay3u', '#contact-form').then(() => {
            report.classList.remove('error')
            report.classList.add('show')
            report.innerText = "Success"

            setTimeout(() => {
                report.classList.remove('show')
                report.innerText = ""
            }, 4000);
        }, (error) => {
            console.log('Something went wrong!' + error);
        })

        senderName.value = ''
        senderMail.value = ''
        senderMessage.value = ''
    }
}
contactForm.addEventListener('submit', sendMail)

translationObserver.observe(skillContent);
revealObserver.observe(projectContainer);
fadeObserver.observe(qualification_element);
for (let servicesCard of servicesCards) {
    fadeObserver.observe(servicesCard);
}