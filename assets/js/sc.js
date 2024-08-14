
function appendHeaderFooter() {
    $("#header-wrapper").load("header.html");
    $("#footer-wrapper").load("footer.html");
}

function removeClickaway() {
    let el = document.getElementsByClassName('clickaway');
    for (var i = 0; i < el.length; i++) {
        el[i].remove();
    }
}

function appendClickaway() {
    let el = document.createElement('div');
    el.setAttribute('class', 'clickaway');
    document.body.prepend(el);

    el.addEventListener('click', () => {
        toggleNav();
        el.remove();
    });
}

function toggleNav() {
    let mobileHeader = document.getElementsByClassName('mobile-header-tabs')[0];
    mobileHeader.classList.toggle('open');
    if (mobileHeader.classList.contains('open')) {
        appendClickaway();
    }
    else {
        removeClickaway();
    }
}



function initBackground() {

    const backgroundContainer = document.getElementsByClassName('background-container')[0];

    if (!backgroundContainer) return;

    const images = [
        'linear-gradient(0deg, rgba(55, 65, 81, .7), rgba(55, 65, 81, .7)), url(./assets/img/sc_back.png)',
        'linear-gradient(0deg, rgba(55, 65, 81, .7), rgba(55, 65, 81, .7)), url(./assets/img/sc_back2.jpg)',
        'linear-gradient(0deg, rgba(55, 65, 81, .7), rgba(55, 65, 81, .7)), url(./assets/img/sc_back3.jpg)'
    ];

    let currentIndex = 0;

    setInterval(() => {
        backgroundContainer.style.backgroundImage = images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
    }, 5000);

}

function initAlumini() {

    let el = document.getElementsByClassName('alumini-context');
    if (!el || el.length == 0) return;

    $('.alumini-context').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                // tablet
                breakpoint: 991,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                // mobile portrait
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
}

function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}


function initSmoothScroll() {
    // Smooth scrolling when a navigation link with class "scroll" is clicked
    $(".scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });

}

function appendpreloader() {
    $("#content").css('visibility', 'hidden');
    $("#preloader").load("preloader.html");

    setTimeout(() => {
        $("#preloader").remove();
        $("#content").css("visibility", 'visible');
    }, 5000);
}

function observeUrl(currentPath = null) {
    if (!currentPath) {
        currentPath = window.location.pathname.split("/").pop();
    }

    if ((!document.getElementsByClassName("header-tabs") || !document.getElementsByClassName("header-tabs").length > 0) && (!document.getElementsByClassName("mobile-header-tabs") && !document.getElementsByClassName("mobile-header-tabs").length > 0)) {
        return;
    }

    let navTabs = document.getElementsByClassName("header-tabs")[0].children;
    let mobileNavTabs = document.getElementsByClassName("mobile-header-tabs")[0].children;

    let found = true;

    Array.from(navTabs).forEach(tab => {
        if (tab.getAttribute("data-url") === currentPath) {
            tab.classList.add("active");
            found = true;
        }
    });

    Array.from(mobileNavTabs).forEach(tab => {
        if (tab.getAttribute("data-url") === currentPath) {
            tab.classList.add("active");
            found = true;
        }
    });

    if (!found) {
        observeUrl("/products.html");
    }
}

function toggleProducts() {

    const toggleButton = document.getElementById('products-toggle');
    const productSection = document.getElementById('product-section');
    const icon = toggleButton.querySelector('i');

    toggleButton.addEventListener('mouseover', function () {
        const isOpen = productSection.classList.contains('open');
        let el = document.createElement('div');
        el.setAttribute('class', 'clickaway-products');

        if (isOpen) {
            productSection.classList.remove('open');
            productSection.style.maxHeight = null; // Reset max-height
            productSection.style.opacity = 0;     // Reset opacity
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
            el.remove();
        } else {
            productSection.classList.add('open');
            productSection.style.maxHeight = productSection.scrollHeight + 'px'; // Set max-height to scroll height
            productSection.style.opacity = 1; // Ensure opacity is set
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            document.body.prepend(el);
        }

        el.addEventListener('click', () => {
            productSection.classList.remove('open');
            productSection.style.maxHeight = null; // Reset max-height
            productSection.style.opacity = 0;     // Reset opacity
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
            el.remove();
        });
    });

    toggleButton.addEventListener('mouseout', function () {
        const isOpen = productSection.classList.contains('open');
        let el = document.getElementsByClassName('clickaway-products');

        for (var i = 0; i < el.length; i++) {
            el[i].click();
        }

    });
}

function adjustBannerForSafari() {
    if (isSafari() && window.innerWidth <= 700) {
        if (document.querySelector('.banner')) {
            document.querySelector('.banner').style.marginTop = '-7rem';
        }
    }
}

function toggleMobileProducts() {
    const toggleButton = document.getElementById('product-toggle-mobile');
    const productSection = document.getElementById('product-section-mobile');
    const icon = toggleButton.querySelector('i');

    toggleButton.addEventListener('click', function () {
        const isOpen = productSection.classList.contains('open');

        if (isOpen) {
            productSection.classList.remove('open');
            productSection.style.maxHeight = null; // Reset max-height
            productSection.style.opacity = 0;     // Reset opacity
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            productSection.classList.add('open');
            productSection.style.maxHeight = '100%'; // Set max-height to scroll height
            productSection.style.opacity = 1; // Ensure opacity is set
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
}

function quoteRequest() {

    if (!document.getElementById('queryForm')) {
        return;
    }

    document.getElementById('queryForm').onsubmit = function (event) {
        // Prevent the form from submitting the traditional way
        event.preventDefault();

        // Get the form element
        const form = event.target;

        let obj = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            reply_to: document.getElementById('email').value ?? ""
        }

        if (!obj.name && !obj.contact) {

            document.getElementById("sendMsg").innerHTML = "Please add your name and contact number";
            document.getElementById("sendMsg").style.display = "block";

            setTimeout(() => {
                document.getElementById("sendMsg").style.display = "none";
            }, 6000);

            return;
        }

        if (!obj.name) {


            document.getElementById("sendMsg").innerHTML = "Please add your name";
            document.getElementById("sendMsg").style.display = "block";

            setTimeout(() => {
                document.getElementById("sendMsg").style.display = "none";
            }, 6000);

            return;
        }

        if (!obj.contact) {

            document.getElementById("sendMsg").innerHTML = "Please add your contact number";
            document.getElementById("sendMsg").style.display = "block";

            setTimeout(() => {
                document.getElementById("sendMsg").style.display = "none";
            }, 6000);

            return;
        }

        if (!document.getElementById('preloader')) {
            let div = document.createElement('div');
            div.setAttribute('id', 'preloader');
            document.body.prepend(div);
            let overlay = document.createElement('div');
            overlay.setAttribute('class', 'clickaway');
            document.body.prepend(overlay);
            $("#preloader").load("preloader.html");

        }

        emailjs.send("service_np9eo0l", "template_3ztf7xv", {
            name: obj.name,
            contact: obj.contact,
            email: obj.email,
            message: obj.message,
        })
            .then(() => {
                $("#preloader").remove();
                $(".clickaway").remove();
                document.getElementById("sendMsg").innerHTML = "Thank You! We will get back to you soon.";
                document.getElementById("sendMsg").style.display = "block";
                setTimeout(() => {
                    document.getElementById("sendMsg").style.display = "none";
                    form.reset();
                }, 6000);
            }, (error) => {
                $("#preloader").remove();
                $(".clickaway").remove();
                console.log('FAILED...', error);
            });
    };
}


$('document').ready(() => {
    emailjs.init({
        publicKey: "bJGco7KQYnbC7CfgC",
    });
    appendpreloader();
    setTimeout(() => {
        observeUrl();
        toggleProducts();
        toggleMobileProducts();
        adjustBannerForSafari();
        quoteRequest();
    }, 5000);
    appendHeaderFooter();
    initBackground();
    initAlumini();
})