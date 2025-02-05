export const translationObserver = new IntersectionObserver(entries => {
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
});

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