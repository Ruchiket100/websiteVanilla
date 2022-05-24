// we are using scroll-magic (gsap also integreated) for animation
let controller;
let sectionScene;
let pageScene;

function animateSections() {
    // init controller
    controller = new ScrollMagic.Controller();
    // Selectors
    const sections = document.querySelectorAll(".section");
    const nav = document.querySelector(".nav-header");
    // Animate each Section
    sections.forEach((section, index, sections) => {
        const revealImg = section.querySelector(".reveal-img");
        const revealText = section.querySelector(".reveal-text");
        const heroImg = section.querySelector("img");
        // gsap timeline
        const tl = gsap.timeline({
            defaults: {
                duration: 1,
            },
        });
        tl.fromTo(
            revealImg, {
                x: "0%",
            }, {
                x: "100%",
                ease: "power2.out",
            }
        );
        tl.fromTo(
            heroImg, {
                scale: 2,
            }, {
                scale: 1,
                ease: "power2.out",
            },
            "-=0.7"
        ); // -=1 means start executing 1s before default timeline
        tl.fromTo(
            revealText, {
                x: "0%",
            }, {
                x: "100%",
                ease: "power2.inOut",
            },
            "-=0.5"
        );
        tl.fromTo(
            nav, {
                y: "-100%",
            }, {
                y: "0%",
            },
            "-=0.5"
        );
        // slide animation
        sectionScene = new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0.2,
                reverse: false,
            })
            .setTween(tl)
            .addIndicators({
                colorStart: "white",
                colorTrigger: "white",
                name: "section",
            })
            .addTo(controller);
        // new timeline for page
        const pageTl = gsap.timeline();
        let nextSection = section.length === index ? "end" : sections[index + 1];
        pageTl.fromTo(
            nextSection, {
                y: "0%",
            }, {
                y: "50%",
            }
        );
        pageTl.fromTo(
            section, {
                opacity: 1,
                scale: 1,
            }, {
                opacity: 0,
                scale: 0.5,
            }
        );
        pageTl.fromTo(
            nextSection, {
                y: "50%",
            }, {
                y: "0%",
            },
            "-=0.5"
        );
        //  new animation for page when scroll
        pageScene = new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0,
                duration: "100%",
            })
            .addIndicators({
                colorStart: "white",
                colorTrigger: "white",
                name: "page",
                indent: 200,
            })
            .setPin(section, {
                pushFollowers: false,
            })
            .setTween(pageTl)
            .addTo(controller);
    });
    // Selectors
    const mouse = document.querySelector(".cursor");
    const menuBar = document.querySelector(".menu-icon");

    function cursor(e) {
        mouse.style.top = e.pageY + "px";
        mouse.style.left = e.pageX + "px";
    }
    // customize cursor cirle when hovering on different elements
    function activeCursor(e) {
        let element = e.target;
        if (element.id === "logo" || element.classList.contains("menu-icon")) {
            mouse.classList.add("active");
        } else {
            mouse.classList.remove("active");
        }
        if (element.classList.contains("explore")) {
            mouse.classList.add("explore-active");
            mouse.children[0].innerText = "Tap";
            gsap.to(".title-swipe", 1, {
                y: "0",
            });
        } else {
            mouse.classList.remove("explore-active");
            mouse.children[0].innerText = "";
            gsap.to(".title-swipe", 1, {
                y: "100%",
            });
        }
    }

    function navToggle(e) {
        e.target.classList.toggle("active");
        //  check if nav is open or not
        if (e.target.classList.contains("active")) {
            // two lines crossing animation
            gsap.to(".line1", 0.5, {
                rotate: "45",
                y: "5",
                background: "black",
            });
            gsap.to(".line2", 0.5, {
                rotate: "-45",
                y: "-5",
                background: "black",
            });
            //  make logo color black
            gsap.to("#logo", 0.5, {
                color: "black",
            });
            gsap.to(".nav-bar", 1, {
                clipPath: "circle(2500px at 100% -10%)",
            });
            // to stop scrolling home page when user on navbar section
            document.body.classList.add("hide");
        }
        // close animation for navbar
        else {
            // two lines crossing animation
            gsap.to(".line1", 0.5, {
                rotate: "0",
                y: "0",
                background: "white",
            });
            gsap.to(".line2", 0.5, {
                rotate: "0",
                y: "0",
                background: "white",
            });
            //  make logo color black
            gsap.to("#logo", 0.5, {
                color: "white",
            });
            gsap.to(".nav-bar", 1, {
                clipPath: "circle(50px at 100% -10%)",
            });
            document.body.classList.remove("hide");
        }
    }
    //  Event Listeners
    window.addEventListener("mousemove", cursor);
    window.addEventListener("mouseover", activeCursor);
    menuBar.addEventListener("click", navToggle);
}

animateSections();