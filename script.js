const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Add a click event listener to the hamburger icon
hamburger.addEventListener("click", () => {
    // Toggle the 'active' class on both the hamburger and the nav menu
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Optional: Close the menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// NEW INTERACTIVE COUNTER
const counters = document.querySelectorAll('.counter');

const runCounter = () => {
    counters.forEach(counter => {
        counter.innerText = '0'; // Reset counter
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / 200; // Speed of the counter

            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString(); // Add commas to large numbers
            }
        };
        updateCount();
    });
};

// Observer to run the counter when it's visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter();
        }
    });
}, { threshold: 0.3 }); // Runs when 30% of the section is visible

// Observe the first counter's parent section
if (counters.length > 0) {
    observer.observe(document.querySelector('.stats'));
}

// script.js
// ... keep all previous code ...

// NEW LIGHTBOX GALLERY
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'flex'; // Show the lightbox
            lightboxImg.src = item.src;
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// script.js

// ... keep your hamburger menu code at the top ...

// script.js

// ... keep your hamburger menu code at the top ...

// --- GALLERY PAGE LOGIC (UPDATED FOR MOBILE CAPTIONS) ---

// 1. IMAGE LIGHTBOX & CAPTION TOGGLE
const imageItems = document.querySelectorAll('.gallery-item[data-type="image"]');


if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    imageItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if the device is likely a touch device (not a perfect check, but good for this use case)
            const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

            if (isTouchDevice) {
                // On touch devices, use a two-tap system
                if (item.classList.contains('caption-visible')) {
                    // If caption is already visible (second tap), open lightbox
                    lightbox.style.display = 'flex';
                    lightboxImg.src = item.querySelector('img').src;
                    item.classList.remove('caption-visible'); // Reset after opening
                } else {
                    // If caption is not visible (first tap), show it
                    // First, hide any other visible captions
                    imageItems.forEach(otherItem => otherItem.classList.remove('caption-visible'));
                    item.classList.add('caption-visible');
                }
            } else {
                // On non-touch (desktop) devices, open lightbox directly on click
                lightbox.style.display = 'flex';
                lightboxImg.src = item.querySelector('img').src;
            }
        });
    });

    // --- Lightbox Closing Logic (no changes here) ---
    const closeLightbox = () => {
        lightbox.style.display = 'none';
    };

    if (lightboxClose) {
       lightboxClose.addEventListener('click', closeLightbox);
    }
   
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}


// 2. VIDEO HOVER/CLICK LOGIC (UPDATED TO PAUSE OTHERS)
const videoItems = document.querySelectorAll('.gallery-item[data-type="video"]');

videoItems.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    // --- Desktop Hover Logic (no changes here) ---
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouchDevice) {
        item.addEventListener('mouseenter', () => {
            video.play();
        });
        item.addEventListener('mouseleave', () => {
            video.pause();
        });
    }

    // --- Click Logic for both Mobile and Desktop (UPDATED) ---
    item.addEventListener('click', () => {
        if (video.paused) {
            // **THIS IS THE NEW PART:** Pause all other videos before playing this one
            videoItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('video').pause();
                }
            });
            video.play();
        } else {
            video.pause();
        }
    });

    // --- Sync overlay with video state (no changes here) ---
    video.addEventListener('play', () => item.classList.add('is-playing'));
    video.addEventListener('pause', () => item.classList.remove('is-playing'));
});

// script.js

// ... (keep all your existing code for the menu, gallery, etc.) ...

// --- CONTACT FORM LOGIC WITH EMAILJS ---
const contactForm = document.getElementById('contact-form');

// This ensures the code only runs on the contact page
if (contactForm) {
    // 1. Initialize EmailJS with your Public Key
    (function(){
        emailjs.init({
            publicKey: 'WDvZvCkqYahElEC82', // Paste your Public Key here
        });
    })();

    // 2. Add the submit event listener
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // This stops the form from refreshing the page

        const submitButton = this.querySelector('.submit-button');
        submitButton.textContent = 'Sending...'; // Give the user feedback

        // 3. Get your Service & Template IDs
        const serviceID = 'service_e346rhi'; // Paste your Service ID here
        const templateID = 'template_ho20lyv'; // Paste your Template ID here

        // 4. Send the form data
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Success message
                submitButton.textContent = 'Sent Successfully!';
                alert('Your message has been sent successfully!');
                this.reset(); // Clear the form
                setTimeout(() => {
                    submitButton.textContent = 'Send Message';
                }, 4000);
            }, (err) => {
                // Error message
                submitButton.textContent = 'Send Message';
                alert('Failed to send message. Please try again. Error: ' + JSON.stringify(err));
            });
    });
}

// script.js

// ... (keep all your existing code) ...

// --- SHLOK GENERATOR LOGIC (for Homepage) ---
const shlokDisplay = document.getElementById('shlok-display');
const generateShlokBtn = document.getElementById('generate-shlok-btn');

// This ensures the code only runs on the homepage
if (shlokDisplay && generateShlokBtn) {

    // A list of shloks. You can add as many as you want!
    const shloks = [
        "सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके ।\n शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
        "शरणागतदीनार्तपरित्राणपरायणे ।\n सर्वस्यार्तिहरे देवि नारायणि नमोऽस्तु ते ॥",
        "सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते ।\n भयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते ॥",
        "या देवी सर्वभूतेषु विष्णुमायेति शब्दिता ।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        "या देवी सर्वभूतेषु बुद्धिरूपेण संस्थिता ।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥	",
        "या देवी सर्वभूतेषु निद्रारूपेण​ संस्थिता ।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        "या देवी सर्वभूतेषु क्षुधारूपेण​​ संस्थिता ।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        "या देवी सर्वभूतेषु छायारूपेण​​​ संस्थिता ।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        "या देवी सर्वभूतेषु क्षान्तिरूपेण​​​​ संस्थिता।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
        "या देवी सर्वभूतेषु लक्ष्मीरूपेण​​​​ संस्थिता।\n नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",

        
    ];

    // Function to generate and display a random shlok
    function generateNewShlok() {
        const randomIndex = Math.floor(Math.random() * shloks.length);
        shlokDisplay.textContent = shloks[randomIndex];
    }

    // Add a click event listener to the button
    generateShlokBtn.addEventListener('click', generateNewShlok);
}
