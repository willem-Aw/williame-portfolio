/*export const translationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                        entry.target.classList.add('animate-translation');
                        translationObserver.unobserve(entry.target);
                }
        })
}, {
        threshold: 0.3,
});

export const fadeObserver = new IntersectionObserver(entries => {
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


export const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
                console.log(entry.isIntersecting);
                if (entry.isIntersecting) {
                        entry.target.classList.add('reveal');  
                        revealObserver.unobserve(entry.target);
                }
        })
}, {
        threshold: 0.3,
        rootMargin: '-30px 0px -30px 0px'
});*/

export class CustomObserver {
        /**
         * Create a new CustomObserver instance.
         *
         * @param {Object} configs - A mapping of observer names to IntersectionObserver options.
         * @param {string} configs.key - The name of the observer.
         * @param {Object} configs[key] - The options for the observer.
         * @param {number} [configs[key].threshold=0] - The threshold value for the observer.
         * @param {string} [configs[key].root=null] - The root element for the observer.
         * @param {string} [configs[key].rootMargin='0px 0px 0px 0px'] - The root margin for the observer.
         */
        constructor(configs) {
                this.observers = {};

                // Set up observers based on provided configurations
                Object.keys(configs).forEach(key => {
                        this.observers[key] = new IntersectionObserver((entries) => {
                                this.handleEntries(entries, key);
                        }, configs[key]);
                });
        }

        /**
         * Handles the entries provided by the IntersectionObserver.
         *
         * @param {array} entries - The entries provided by the IntersectionObserver.
         * @param {string} key - The name of the observer that triggered the callback.
         */
        handleEntries(entries, key) {
                entries.forEach(entry => {
                        if (entry.isIntersecting) {
                                switch (key) {
                                        case 'translation':
                                                entry.target.classList.add('animate-translation');
                                                this.observers[key].unobserve(entry.target);
                                                break;
                                        case 'fade':
                                                entry.target.classList.add('show');
                                                break;
                                        case 'reveal':
                                                entry.target.classList.add('reveal');
                                                this.observers[key].unobserve(entry.target);
                                                break;
                                }
                        } else if (key === 'fade') {
                                entry.target.classList.remove('show');
                        }
                });
        }

        /**
         * Observes a single element with the specified observer type.
         *
         * @param {HTMLElement} element - The DOM element to be observed.
         * @param {string} type - The type of observer to use for observing the element.
         */

        observeElement(element, type) {
                if (this.observers[type]) {
                        this.observers[type].observe(element);
                } else {
                        console.warn(`No observer found for type: ${type}`);
                }
        }

        /**
         * Observes multiple elements with the specified observer type.
         *
         * @param {NodeList|Array} elements - The list of DOM elements to be observed.
         * @param {string} type - The type of observer to use for observing the elements.
         */

        observeElements(elements, type) {
                elements.forEach(el => this.observeElement(el, type));
        }
}

const activeElement = (element) => {
        const sectionId = element.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

        if (navLink === null) {
                return;
        }

        navLink.parentElement.parentElement.querySelectorAll('.active-link').forEach(n => n.classList.remove('active-link'));
        navLink.classList.add('active-link');
}

/**
 * Highlight the active link in the navigation menu when a section is in view
 * @param {IntersectionObserverEntry[]} entries 
 * @param {IntersectionObserver} observer 
 */
// Function to handle intersection changes for sections
export const handleSectionIntersect = (entries, observer) => {
        entries.forEach(entry => {
                if (entry.intersectionRatio > observer.thresholds[0]) {
                        activeElement(entry.target);
                }
        });
};

/**
 * show the scroll to top button when the first section is off of the viewport
 * @param {IntersectionObserverEntry[]} entries 
 */
export const handleScrollUpIntersect = (entries) => {
        const scrollUpButton = document.querySelector('#scroll-up');
        entries.forEach(entry => {
                if (entry.isIntersecting) {
                        scrollUpButton.classList.remove('show');
                } else {
                        scrollUpButton.classList.add('show');
                }
        });
};

/**
 * Set or remove the box-shadow of the header depending on the scroll
 * position of the main content.
 * @param {HTMLElement} topHeader - The header element
 * @param {HTMLElement} mainContent - The main element
 */
export function setHeaderShadow(topHeader, mainContent) {
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

/**
 * Check mail validation
 * @param {string} email 
 * @returns 
 */
export function validate_email(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

/**
 * Toggles the dark mode theme on the body element and updates the theme preference in local storage.
 * 
 * @param {HTMLElement} body - The body element to toggle the theme class on.
 * @param {HTMLInputElement} btnThemeToggler - The toggle button input element used to determine the theme state.
 * @param {string} theme - The class name representing the dark theme to be toggled.
 */
export const toggleDarkMode = (body, btnThemeToggler, theme, getCurrentTheme) => {
        body.classList.toggle(theme);

        setTimeout(() => {
                if (btnThemeToggler.checked) {
                        localStorage.setItem('dark-theme-set', getCurrentTheme());
                } else {
                        localStorage.removeItem('dark-theme-set', getCurrentTheme());
                }
        }, 500);
}