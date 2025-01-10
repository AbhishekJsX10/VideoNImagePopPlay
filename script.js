const itemsArray = [];

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - cursor.offsetWidth / 2,
    y: e.clientY - cursor.offsetHeight / 2,
    duration: 0.5,
    ease: "power2.out",
  });
});

document.addEventListener("click", function (event) {
    const clickSfx = new Audio("./assets/mixkit-select-click-1109.mp3");
    clickSfx.play();
  
    const itemType = Math.random() > 0.5 ? "video" : "image";
    let container;
    let elementWidth = 700;
  
    if (itemType === "video") {
      const videoNumber = Math.floor(Math.random() * 6) + 1;
      container = document.createElement("div");
      container.className = "video-container";
      container.innerHTML = `
          <video autoplay loop muted playsinline>
            <source src="./assets/vid-${videoNumber}.webm" type="video/webm"/>
          </video>`;
    } else {
      const imgNumber = Math.floor(Math.random() * 6) + 1;
      container = document.createElement("div");
      container.className = "img-container";
      container.innerHTML = `<img src="./assets/img-${imgNumber}.avif" alt="" />`;
    }

    document.querySelector(".items-container").appendChild(container);

    container.style.left = `${event.clientX - elementWidth / 2}px`;
    container.style.top = `${event.clientY}px`;

    // If it's a video, force play it
    if (itemType === "video") {
        const videoElement = container.querySelector('video');
        if (videoElement) {
            videoElement.play().catch(error => {
                console.log("Video play failed:", error);
            });
        }
    }

    const randomRotation = Math.random() * 10 - 5;

    gsap.set(container, {
        scale: 0,
        rotation: randomRotation,
        transformOrigin: "center",
    });

    const tl = gsap.timeline();

    const randomScale = Math.random() * 0.5 + 0.5;

    tl.to(container, {
        scale: randomScale,
        duration: 0.5,
        delay: 0.1,
    });

    tl.to(
        container,
        {
            y: () => -500,
            opacity: 1,
            duration: 4,
            ease: "none",
        },
        "<"
    ).to(container, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            container.parentNode.removeChild(container);
            const index = itemsArray.indexOf(container);
            if (index > -1) {
                itemsArray.splice(index, 1);
            }
        }
    }, "-=0.5");
});