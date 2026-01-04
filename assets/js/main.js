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
        // emailjs.sendForm('service_2l932je', 'template_o69ay3u', '#contact-form').then(() => {
        emailjs.sendForm('service_t738uba', 'template_o69ay3u', '#contact-form').then(() => {
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

/* Scroll Event in project */
document.addEventListener('DOMContentLoaded', function () {
    const leftItems = document.querySelectorAll('#projects [data-left] [item]');
    const rightItems = document.querySelectorAll('#projects [data-right] [item]');
    const leftContainer = document.querySelector('#projects [data-left]');

    // Function to update active item
    function updateActiveItem() {
        const containerRect = leftContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        let closestItem = null;
        let closestDistance = Infinity;
        let closestIndex = -1;

        // Find which item is closest to the middle of the viewport
        leftItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const itemMiddle = itemRect.top + (itemRect.height / 2);
            const viewportMiddle = window.innerHeight / 2;
            const distance = Math.abs(viewportMiddle - itemMiddle);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
                closestIndex = index;
            }
        });

        // Update active class
        if (closestItem) {
            leftItems.forEach(item => item.classList.remove('active'));
            closestItem.classList.add('active');

            // Get the active item ID (1-based)
            const activeItemId = parseInt(closestItem.getAttribute('data-leftitem'));

            // Update right items with animation classes
            updateRightItemsAnimation(activeItemId);
        }
    }

    // Dynamic function to update right items animation
    function updateRightItemsAnimation(activeItemId) {
        const totalItems = rightItems.length;

        rightItems.forEach(item => {
            const itemId = parseInt(item.getAttribute('data-rightitem'));
            item.classList.remove('prev', 'active', 'next');

            if (itemId === activeItemId) {
                item.classList.add('active');
            }
            // Handle previous item (with wrap-around)
            else if (itemId === (activeItemId - 1 > 0 ? activeItemId - 1 : totalItems)) {
                item.classList.add('prev');
            }
            // Handle next item (with wrap-around)
            else if (itemId === (activeItemId + 1 <= totalItems ? activeItemId + 1 : 1)) {
                item.classList.add('next');
            }
        });
    }

    // Initial setup
    updateActiveItem();

    // Update on scroll
    window.addEventListener('scroll', updateActiveItem);

    // Also update on window resize
    window.addEventListener('resize', updateActiveItem);

    // Add click functionality to items
    // leftItems.forEach(item => {
    //     item.addEventListener('click', function (e) {
    //         e.stopPropagation();
    //         // e.preventDefault();
    //         // Scroll to make this item centered in the viewport
    //         const itemTop = this.offsetTop;
    //         const itemHeight = this.clientHeight;
    //         const containerTop = leftContainer.offsetTop;

    //         window.scrollTo({
    //             top: containerTop + itemTop - (window.innerHeight / 2) + (itemHeight / 2),
    //             behavior: 'smooth'
    //         });
    //         // debugger;
    //         // item.scrollTo({
    //         //     behavior: 'smooth',
    //         //     top: 0
    //         // });
    //     });
    // });
});

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
