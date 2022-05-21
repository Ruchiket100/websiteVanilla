// we are using scroll-magic (gsap also integreated) for animation
let controller;
let sectionScene;

function animateSections() {
    // init controller
    controller = new ScrollMagic.Controller();
    // Selectors
    const sections = document.querySelectorAll(".section");
    const nav = document.querySelector(".nav-header");
    // Animate each Section
    sections.forEach((section) => {
        const revealImg = section.querySelector(".reveal-img");
        const revealText = section.querySelector(".reveal-text");
        const heroImg = section.querySelector("img");
        // gsap timeline
        const tl = gsap.timeline({
            defaults: {
                duration: 1,
            },
        });
        tl.fromTo(revealImg, {
            x: '0%'
        }, {
            x: '100%',
            ease: "power2.inOut"
        })
        tl.fromTo(
            heroImg, {
                scale: 2,
            }, {
                scale: 1
            }, '-=1'
        ); // -=1 means start executing 1s before default timeline
        tl.fromTo(revealText, {
            x: '0%'
        }, {
            x: '100%',
            ease: "power2.inOut"
        }, '-=0.5')
        tl.fromTo(nav, {
            y: '-100%'
        }, {
            y: '0%'
        }, '-=0.5')
    });
}

animateSections();