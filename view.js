document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeGallery();
    initializeRoomTabs();
    initializeBookingForm();
    initializeMobileMenu();
    initializeAnimations();
    initializeMap();
    initializeReviews();
    initializeAmenities();
    initializeStickyHeader();
});

// Gallery functionality
function initializeGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const viewAllBtn = document.querySelector('.view-all');

    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0;
    const maxIndex = thumbnails.length - 1;

    // Gallery images (for demo purposes)
    const galleryImages = [
        '/placeholder.svg?height=500&width=1200',
        '/placeholder.svg?height=500&width=1200&text=Room',
        '/placeholder.svg?height=500&width=1200&text=Dining',
        '/placeholder.svg?height=500&width=1200&text=Bathroom'
    ];

    // Set click handlers for thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            setActiveImage(index);
        });
    });

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
            setActiveImage(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
            setActiveImage(currentIndex);
        });
    }

    // View all button - simulate opening a gallery modal
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            openGalleryModal();
        });
    }

    // Set active image
    function setActiveImage(index) {
        // Update main image
        if (mainImage && galleryImages[index]) {
            mainImage.src = galleryImages[index];

            // Add fade effect
            mainImage.classList.add('fade');
            setTimeout(() => {
                mainImage.classList.remove('fade');
            }, 500);
        }

        // Update active thumbnail
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });

        currentIndex = index;
    }

    // Gallery modal (simplified for demo)
    function openGalleryModal() {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '&times;';

        const modalImage = document.createElement('img');
        modalImage.src = galleryImages[currentIndex];

        const modalNav = document.createElement('div');
        modalNav.className = 'modal-nav';

        const modalPrev = document.createElement('button');
        modalPrev.className = 'modal-prev';
        modalPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';

        const modalNext = document.createElement('button');
        modalNext.className = 'modal-next';
        modalNext.innerHTML = '<i class="fas fa-chevron-right"></i>';

        // Assemble modal
        modalNav.appendChild(modalPrev);
        modalNav.appendChild(modalNext);
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalImage);
        modalContent.appendChild(modalNav);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Add event listeners
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modalPrev.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
            modalImage.src = galleryImages[currentIndex];
        });

        modalNext.addEventListener('click', () => {
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
            modalImage.src = galleryImages[currentIndex];
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-content {
                position: relative;
                width: 80%;
                max-width: 1000px;
            }
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                background: none;
                border: none;
                cursor: pointer;
            }
            .modal-nav {
                position: absolute;
                top: 50%;
                width: 100%;
                display: flex;
                justify-content: space-between;
                transform: translateY(-50%);
            }
            .modal-prev, .modal-next {
                background-color: rgba(255, 255, 255, 0.5);
                color: #333;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .modal-prev:hover, .modal-next:hover {
                background-color: rgba(255, 255, 255, 0.8);
            }
            .modal-content img {
                width: 100%;
                height: auto;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize with first image
    setActiveImage(0);
}

// Room tabs functionality
function initializeRoomTabs() {
    const roomTabs = document.querySelectorAll('.room-tab');
    const optionTabs = document.querySelectorAll('.option-tab');

    // Room type data
    const roomData = {
        single: {
            title: 'Single Occupancy',
            price: '₹12,000',
            description: 'Private room with attached bathroom, perfect for those who value privacy and personal space.',
            image: '/placeholder.svg?height=200&width=300&text=Single Room',
            features: ['Single Bed', 'Attached Bathroom', 'Air Conditioned', 'Fully Furnished']
        },
        double: {
            title: 'Double Sharing',
            price: '₹9,000',
            description: 'Shared room with one roommate, offering a balance between privacy and affordability.',
            image: '/placeholder.svg?height=200&width=300&text=Double Room',
            features: ['Two Beds', 'Attached Bathroom', 'Air Conditioned', 'Study Table']
        },
        triple: {
            title: 'Triple Sharing',
            price: '₹7,500',
            description: 'Economical option with three occupants sharing a spacious room.',
            image: '/placeholder.svg?height=200&width=300&text=Triple Room',
            features: ['Three Beds', 'Attached Bathroom', 'Ceiling Fan', 'Wardrobe']
        }
    };

    // Room tabs click handler
    roomTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const roomType = tab.getAttribute('data-room');

            // Update active tab
            roomTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update room details
            updateRoomDetails(roomType);
        });
    });

    // Booking widget option tabs
    optionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const roomType = tab.getAttribute('data-option');

            // Update active tab
            optionTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update price in booking widget
            const priceElement = document.querySelector('.booking-header .price');
            if (priceElement && roomData[roomType]) {
                priceElement.textContent = roomData[roomType].price;
            }
        });
    });

    // Update room details based on selected room type
    function updateRoomDetails(roomType) {
        if (!roomData[roomType]) return;

        const data = roomData[roomType];

        // Update room image
        const roomImage = document.querySelector('.room-image img');
        if (roomImage) roomImage.src = data.image;

        // Update room title
        const roomTitle = document.querySelector('.room-header h3');
        if (roomTitle) roomTitle.textContent = data.title;

        // Update room price
        const roomPrice = document.querySelector('.room-header .price');
        if (roomPrice) roomPrice.textContent = data.price;

        // Update room description
        const roomDesc = document.querySelector('.room-description');
        if (roomDesc) roomDesc.textContent = data.description;

        // Update room features
        const featuresContainer = document.querySelector('.room-features');
        if (featuresContainer) {
            // Clear existing features
            featuresContainer.innerHTML = '';

            // Add new features
            const icons = ['bed', 'bath', 'snowflake', 'couch'];
            data.features.forEach((feature, index) => {
                const featureEl = document.createElement('div');
                featureEl.className = 'feature';
                featureEl.innerHTML = `
                    <i class="fas fa-${icons[index % icons.length]}"></i>
                    <span>${feature}</span>
                `;
                featuresContainer.appendChild(featureEl);
            });
        }

        // Also update booking widget option tab
        const optionTab = document.querySelector(`.option-tab[data-option="${roomType}"]`);
        if (optionTab) {
            optionTabs.forEach(t => t.classList.remove('active'));
            optionTab.classList.add('active');

            // Update price in booking widget
            const priceElement = document.querySelector('.booking-header .price');
            if (priceElement) {
                priceElement.textContent = data.price;
            }
        }
    }
}

// Booking form functionality
function initializeBookingForm() {
    const bookingForm = document.querySelector('.booking-form');
    if (!bookingForm) return;

    // Set min date for move-in date to today
    const moveInDate = document.getElementById('move-in');
    if (moveInDate) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        moveInDate.min = `${yyyy}-${mm}-${dd}`;
    }

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form inputs
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const moveIn = document.getElementById('move-in');
        const duration = document.getElementById('duration');

        // Validate form
        let isValid = true;

        if (!name || !name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        } else {
            clearError(name);
        }

        if (!phone || !phone.value.trim()) {
            showError(phone, 'Please enter your phone number');
            isValid = false;
        } else if (!validatePhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phone);
        }

        if (!moveIn || !moveIn.value) {
            showError(moveIn, 'Please select a move-in date');
            isValid = false;
        } else {
            clearError(moveIn);
        }

        // If form is valid, show success message
        if (isValid) {
            // Get selected room type
            const activeTab = document.querySelector('.option-tab.active');
            const roomType = activeTab ? activeTab.getAttribute('data-option') : 'single';

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'booking-success';
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Booking Request Sent!</h3>
                <p>Thank you, ${name.value}. We've received your booking request for a ${roomType} room starting from ${formatDate(moveIn.value)} for ${duration.value} months.</p>
                <p>Our team will contact you at ${phone.value} shortly to confirm your booking.</p>
                <button class="close-success">Close</button>
            `;

            // Add success message styles
            const style = document.createElement('style');
            style.textContent = `
                .booking-success {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    z-index: 1000;
                    max-width: 90%;
                    width: 400px;
                }
                .success-icon {
                    font-size: 50px;
                    color: #10b981;
                    margin-bottom: 20px;
                }
                .booking-success h3 {
                    margin-bottom: 15px;
                    color: #10b981;
                }
                .booking-success p {
                    margin-bottom: 15px;
                    color: #4b5563;
                }
                .close-success {
                    background-color: #06b6d4;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    margin-top: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .close-success:hover {
                    background-color: #0891b2;
                }
                .booking-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                }
            `;
            document.head.appendChild(style);

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'booking-overlay';

            // Add to DOM
            document.body.appendChild(overlay);
            document.body.appendChild(successMessage);

            // Close button functionality
            const closeBtn = document.querySelector('.close-success');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(successMessage);
                    document.body.removeChild(overlay);
                    bookingForm.reset();
                });
            }
        }
    });

    // Phone validation
    function validatePhone(phone) {
        // Simple validation - adjust as needed for your country's format
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    // Show error message
    function showError(input, message) {
        // Remove any existing error
        clearError(input);

        // Add error class to input
        input.classList.add('error');

        // Create error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;

        // Insert error after input
        input.parentNode.insertBefore(error, input.nextSibling);

        // Add error styles
        if (!document.querySelector('.error-styles')) {
            const style = document.createElement('style');
            style.className = 'error-styles';
            style.textContent = `
                .error {
                    border-color: #ef4444 !important;
                }
                .error-message {
                    color: #ef4444;
                    font-size: 0.75rem;
                    margin-top: 5px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Clear error message
    function clearError(input) {
        input.classList.remove('error');
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
            error.parentNode.removeChild(error);
        }
    }

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn') && window.innerWidth <= 768) {
        const header = document.querySelector('header .container');
        if (!header) return;

        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        header.appendChild(mobileBtn);

        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        // Get navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        let menuHTML = '';

        navLinks.forEach(link => {
            menuHTML += `<a href="${link.getAttribute('href')}" class="mobile-menu-link">${link.innerHTML}</a>`;
        });

        // Add login button
        menuHTML += `<a href="#" class="mobile-menu-link"><i class="fas fa-user"></i> Login / Sign Up</a>`;

        mobileMenu.innerHTML = menuHTML;
        document.body.appendChild(mobileMenu);

        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-btn {
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-dark);
                cursor: pointer;
            }
            
            .mobile-menu {
                position: fixed;
                top: 0;
                right: -280px;
                width: 280px;
                height: 100%;
                background-color: white;
                z-index: 1001;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                transition: right 0.3s ease;
                padding: 60px 20px 20px;
            }
            
            .mobile-menu.active {
                right: 0;
            }
            
            .mobile-menu-link {
                display: block;
                padding: 15px 0;
                border-bottom: 1px solid var(--gray-200);
                color: var(--text-dark);
                font-weight: 500;
            }
            
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: none;
            }
            
            .mobile-menu-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-dark);
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block;
                }
                
                .nav-buttons .nav-link {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);

        // Add close button to mobile menu
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenu.prepend(closeBtn);

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);

        // Toggle mobile menu
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Close mobile menu
        function closeMenu() {
            mobileMenu.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }
}

// Animations
function initializeAnimations() {
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .fade {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .animate-fade-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        .animate-fade-in-left {
            animation: fadeInLeft 0.5s ease forwards;
        }
        
        .animate-fade-in-right {
            animation: fadeInRight 0.5s ease forwards;
        }
        
        .animate-delay-1 {
            animation-delay: 0.1s;
        }
        
        .animate-delay-2 {
            animation-delay: 0.2s;
        }
        
        .animate-delay-3 {
            animation-delay: 0.3s;
        }
        
        .animate-delay-4 {
            animation-delay: 0.4s;
        }
        
        .animate-delay-5 {
            animation-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.amenity-card, .nearby-place, .property-card, .highlight-card');

        elements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;

            if (isVisible && !element.classList.contains('animated')) {
                element.classList.add('animated', 'animate-fade-in');
                element.classList.add(`animate-delay-${(index % 5) + 1}`);
            }
        });
    };

    // Run on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Add hover animations to buttons
    const buttons = document.querySelectorAll('.book-now-btn, .view-property-btn, .gallery-nav, .room-tab, .option-tab');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Map functionality (simulated)
function initializeMap() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // Create a simulated map marker that pulses
    const marker = document.querySelector('.map-marker');
    if (marker) {
        // Add click handler to marker
        marker.addEventListener('click', () => {
            // Open Google Maps in a new tab (simulated)
            window.open('https://maps.google.com/?q=Phursungi,Pune', '_blank');
        });

        // Make marker interactive
        marker.style.cursor = 'pointer';
        marker.title = 'Click to view on Google Maps';
    }

    // Add zoom controls to map
    const zoomControls = document.createElement('div');
    zoomControls.className = 'map-controls';
    zoomControls.innerHTML = `
        <button class="map-zoom-in"><i class="fas fa-plus"></i></button>
        <button class="map-zoom-out"><i class="fas fa-minus"></i></button>
    `;
    mapContainer.appendChild(zoomControls);

    // Add map controls styles
    const style = document.createElement('style');
    style.textContent = `
        .map-controls {
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .map-zoom-in, .map-zoom-out {
            width: 30px;
            height: 30px;
            background-color: white;
            border: none;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .map-zoom-in:hover, .map-zoom-out:hover {
            background-color: #f3f4f6;
        }
        
        .map-container {
            cursor: grab;
        }
        
        .map-container:active {
            cursor: grabbing;
        }
    `;
    document.head.appendChild(style);

    // Simulate map interactions
    let isDragging = false;
    let startX, startY;

    mapContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        mapContainer.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Simulate map panning by moving the background image slightly
        mapContainer.style.backgroundPosition = `calc(50% + ${deltaX}px) calc(50% + ${deltaY}px)`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        mapContainer.style.transition = 'background-position 0.3s ease';
        mapContainer.style.backgroundPosition = '50% 50%';
    });

    // Zoom controls (simulated)
    const zoomIn = document.querySelector('.map-zoom-in');
    const zoomOut = document.querySelector('.map-zoom-out');

    if (zoomIn && zoomOut) {
        let zoomLevel = 1;

        zoomIn.addEventListener('click', () => {
            if (zoomLevel < 1.5) {
                zoomLevel += 0.1;
                updateZoom();
            }
        });

        zoomOut.addEventListener('click', () => {
            if (zoomLevel > 0.8) {
                zoomLevel -= 0.1;
                updateZoom();
            }
        });

        function updateZoom() {
            const mapImg = mapContainer.querySelector('img');
            if (mapImg) {
                mapImg.style.transform = `scale(${zoomLevel})`;
                mapImg.style.transition = 'transform 0.3s ease';
            }
        }
    }
}

// Reviews functionality
function initializeReviews() {
    const reviewsSection = document.querySelector('.reviews-section');
    if (!reviewsSection) return;

    const viewAllBtn = document.querySelector('.view-all-reviews');
    if (!viewAllBtn) return;

    // Sample reviews data
    const allReviews = [{
            name: 'Rahul Sharma',
            date: 'March 2023',
            rating: 5,
            comment: 'I\'ve been staying at Zolo Wisdom for 6 months now and it\'s been a great experience. The rooms are clean, staff is friendly, and the food is delicious. Highly recommended for students and working professionals.'
        },
        {
            name: 'Priya Patel',
            date: 'February 2023',
            rating: 4,
            comment: 'Good accommodation with all the necessary amenities. The location is convenient with easy access to public transport. The WiFi could be better during peak hours, but overall a good place to stay.'
        },
        {
            name: 'Amit Kumar',
            date: 'January 2023',
            rating: 5,
            comment: 'Clean rooms, tasty food, and friendly staff. The security is excellent, and I feel safe staying here. The common areas are well maintained, and there are regular activities organized for residents.'
        },
        {
            name: 'Sneha Gupta',
            date: 'December 2022',
            rating: 4,
            comment: 'Zolo Wisdom offers good value for money. The rooms are spacious and well-furnished. The food quality is consistent, and they accommodate dietary preferences. The only downside is occasional water shortage.'
        },
        {
            name: 'Vikram Singh',
            date: 'November 2022',
            rating: 3,
            comment: 'Average experience. The location is good but maintenance could be better. Staff is helpful though and responds quickly to issues.'
        }
    ];

    // Show only first 2 reviews initially
    let visibleReviews = 2;

    // View all reviews button functionality
    viewAllBtn.addEventListener('click', () => {
        if (visibleReviews === 2) {
            // Show all reviews
            showReviews(allReviews.length);
            viewAllBtn.textContent = 'Show Less';
        } else {
            // Show only first 2 reviews
            showReviews(2);
            viewAllBtn.textContent = 'View All Reviews';
        }
    });

    // Function to show specified number of reviews
    function showReviews(count) {
        const reviewCards = document.querySelector('.review-cards');
        if (!reviewCards) return;

        // Remove existing review cards (except the button)
        const existingCards = reviewCards.querySelectorAll('.review-card');
        existingCards.forEach(card => card.remove());

        // Add reviews
        for (let i = 0; i < Math.min(count, allReviews.length); i++) {
            const review = allReviews[i];
            const reviewCard = createReviewCard(review);
            reviewCards.insertBefore(reviewCard, viewAllBtn);
        }

        visibleReviews = count;
    }

    // Create a review card
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';

        // Generate stars HTML
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }

        card.innerHTML = `
            <div class="reviewer-info">
                <div class="reviewer-avatar">
                    <img src="/placeholder.svg?height=50&width=50" alt="Reviewer">
                </div>
                <div class="reviewer-details">
                    <h4>${review.name}</h4>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">
                    ${starsHTML}
                </div>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
        `;

        return card;
    }

    // Initialize with first 2 reviews
    showReviews(2);
}

// Amenities functionality
function initializeAmenities() {
    const amenitiesSection = document.querySelector('.amenities-section');
    if (!amenitiesSection) return;

    // Make amenities interactive
    const amenityCards = document.querySelectorAll('.amenity-card');

    amenityCards.forEach(card => {
        card.addEventListener('click', () => {
            // Show amenity details in a tooltip
            showAmenityTooltip(card);
        });
    });

    // Show amenity tooltip
    function showAmenityTooltip(card) {
        // Remove any existing tooltips
        const existingTooltip = document.querySelector('.amenity-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Get amenity name
        const amenityName = card.querySelector('span').textContent;

        // Amenity details (sample data)
        const amenityDetails = {
            'High-Speed WiFi': 'Enjoy seamless connectivity with our 100 Mbps fiber internet connection available throughout the property.',
            'Meals Included': 'Three nutritious meals daily with vegetarian and non-vegetarian options. Special meals on weekends.',
            'Furnished Rooms': 'Fully furnished rooms with bed, mattress, study table, chair, and wardrobe.',
            'Air Conditioning': 'Split AC units in all rooms with individual temperature control.',
            'TV Lounge': 'Common TV lounge with premium channels and streaming services.',
            'Fitness Center': 'Well-equipped gym with cardio and strength training equipment.',
            'Housekeeping': 'Regular housekeeping services to keep your space clean and tidy.',
            '24/7 Security': 'Round-the-clock security with CCTV surveillance and secure access.'
        };

        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'amenity-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h4>${amenityName}</h4>
                <button class="tooltip-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="tooltip-content">
                <p>${amenityDetails[amenityName] || 'Details not available.'}</p>
            </div>
        `;

        // Add tooltip styles
        const style = document.createElement('style');
        style.textContent = `
            .amenity-tooltip {
                position: absolute;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 15px;
                z-index: 100;
                max-width: 300px;
                animation: fadeIn 0.3s ease;
            }
            
            .tooltip-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .tooltip-header h4 {
                margin: 0;
                color: var(--primary);
            }
            
            .tooltip-close {
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-light);
                font-size: 1rem;
            }
            
            .tooltip-content p {
                margin: 0;
                color: var(--text-light);
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);

        // Position tooltip near the card
        const cardRect = card.getBoundingClientRect();
        document.body.appendChild(tooltip);

        const tooltipRect = tooltip.getBoundingClientRect();

        // Position tooltip centered below the card
        tooltip.style.top = `${window.scrollY + cardRect.bottom + 10}px`;
        tooltip.style.left = `${cardRect.left + (cardRect.width / 2) - (tooltipRect.width / 2)}px`;

        // Close tooltip on button click
        const closeBtn = tooltip.querySelector('.tooltip-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                tooltip.remove();
            });
        }

        // Close tooltip when clicking outside
        document.addEventListener('click', function closeTooltip(e) {
            if (!tooltip.contains(e.target) && !card.contains(e.target)) {
                tooltip.remove();
                document.removeEventListener('click', closeTooltip);A
            }
        });
    }
}

// Sticky header functionality
function initializeStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add box shadow when scrolled
        if (scrollTop > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Scrolling down
            header.style.transform = `translateY(-${headerHeight}px)`;
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // Add header styles
    const style = document.createElement('style');
    style.textContent = `
        header {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        header.scrolled {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}