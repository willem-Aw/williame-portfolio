(function () {
    emailjs.init({
        publicKey: "Vp1AX-aslbvjjPVe5",
    });
})();

/**show menu  */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

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
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/** Slider */

$('#projects .projects__container').slick({
    arrows: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});

/**Contact form */
const contactForm = document.querySelector('#contact-form'),
    senderName = document.querySelector('#contact-form-name'),
    senderMail = document.querySelector('#contact-form-email'),
    senderMessage = document.querySelector('#contact-form-name'),
    report = document.querySelector('#contact-report'),
    btnSend = document.querySelector('#contact-form-submit');

function validate_email(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

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

/**Scroll sections && highlight active link */
const sections = document.querySelectorAll('section[id]')

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

const mainContent = document.querySelector('#main');
const topHeader = document.querySelector('#header');
function setHeaderShadow() {
    const mainObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.boundingClientRect.top < -120) {
                topHeader.classList.add('set-shadow');
            } else {
                topHeader.classList.remove('set-shadow');
            }
        });
    });
    mainObserver.observe(mainContent)
}

window.addEventListener('scroll', setHeaderShadow)
setHeaderShadow()

// show and hide menu on scroll up/down
let lastScrollPosition = 0;
window.addEventListener("scroll", () => {
    // Get the current scroll position
    let currentScrollPosition = window.scrollY;

    if (currentScrollPosition - lastScrollPosition > 0) {
        // If the scroll direction is down and the user has scrolled past the navbar, hide the navbar
        topHeader.classList.add("hide");
    } else {
        // If the scroll direction is up or the user is at the top of the page, show the navbar
        topHeader.classList.remove("hide");
    }
    // Set the last scroll position to the current scroll position
    lastScrollPosition = currentScrollPosition;
})

const qualification_element = document.querySelector('.qualification__container');
const servicesCards = document.querySelectorAll('#services .services__card');
const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.5,
})

fadeObserver.observe(qualification_element);
for (servicesCard of servicesCards) {
    fadeObserver.observe(servicesCard);
}

const skillContent = document.querySelector('#skills .skills__container');
const translationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-translation');
        } else {
            entry.target.classList.remove('animate-translation');
        }
    })
}, {
    threshold: 0.3,
});

translationObserver.observe(skillContent);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            revealObserver.unobserve(entry.target);
        }
    })
}, {
    threshold: 0.3,
    rootMargin: '-30px 0px -30px 0px'
});

const projectContainer = document.querySelector('#projects');
revealObserver.observe(projectContainer);

// Dark and light theme
const btnThemeToggler = document.querySelector("#toggle-mode");
const darkTheme = "dark-theme";

const getCurrentTheme = () => document.body.classList.contains(darkTheme);

const selectedTheme = localStorage.getItem('dark-theme-set');

if (selectedTheme) {
    document.body.classList.add(darkTheme);
    btnThemeToggler.checked = true;
}

btnThemeToggler.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);

    setTimeout(() => {
        if (btnThemeToggler.checked) {
            localStorage.setItem('dark-theme-set', getCurrentTheme());
        } else {
            localStorage.removeItem('dark-theme-set', getCurrentTheme());
        }
    }, 500);
});