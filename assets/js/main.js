// import { IntersectionObservers, translationObserver, setHeaderShadow, fadeObserver, revealObserver, validate_email, toggleDarkMode } from './fonctions/fonctions.js';
import { CustomObserver, handleSectionIntersect, handleScrollUpIntersect, setHeaderShadow, validate_email, toggleDarkMode } from './fonctions/fonctions.js';

const btnThemeToggler = document.querySelector("#toggle-mode");
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link')
const allSections = document.querySelectorAll('section[id]');
/**Contact form */
const contactForm = document.querySelector('#contact-form'),
    senderName = document.querySelector('#contact-form-name'),
    senderMail = document.querySelector('#contact-form-email'),
    senderMessage = document.querySelector('#contact-form-message'),
    report = document.querySelector('#contact-report'),
    btnSend = document.querySelector('#contact-form-submit');
const mainContent = document.querySelector('#main');
const topHeader = document.querySelector('#header');
/**Elements to observe */
const skillContent = document.querySelector('#skills .skills__container');
const qualification_element = document.querySelector('.qualification__container');
const projects_elements = document.querySelectorAll('#projects .projects__container .project__content');
const servicesCards = document.querySelectorAll('#services .services__card');

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
navLinks.forEach(n => n.addEventListener('click', linkAction))

const sectionObserver = new IntersectionObserver(handleSectionIntersect, {
    root: null,
    threshold: 0.5,
});
allSections.forEach(section => sectionObserver.observe(section));

const scrollUpObserver = new IntersectionObserver(handleScrollUpIntersect, {
    root: null,
    threshold: 0,
});
scrollUpObserver.observe(allSections[0]);


window.addEventListener('scroll', () => setHeaderShadow(topHeader, mainContent))
setHeaderShadow(topHeader, mainContent)

/**
 * show menu on up scroll up and hide on scroll down
*/
let lastScrollPosition = 0;
window.addEventListener("scroll", () => {
    // Get the current scroll position
    let currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        // topHeader.classList.add("hide");
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

const configs = {
    translation: {
        threshold: 0.3
    },
    fade: {
        threshold: 0.5
    },
    reveal: {
        threshold: 0.2
    }
};

const customObserver = new CustomObserver(configs);

customObserver.observeElement(skillContent, 'translation');
customObserver.observeElement(qualification_element, 'fade');
customObserver.observeElement(qualification_element, 'fade');
customObserver.observeElements(projects_elements, 'reveal');
customObserver.observeElements(servicesCards, 'fade');
