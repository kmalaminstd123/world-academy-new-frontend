// configure swiper js for testimonial on course details page
new Swiper('.cd_testmonials_swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 5000
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        }
    }
})

// section the mid nav scroll
const midNavSec = document.querySelector('#mid_nav');
const stickyMidNav = document.querySelector('.mid_parent_sec');
const sectionTop = midNavSec.offsetTop;

window.addEventListener('scroll', () => {
  if (window.scrollY >= sectionTop) {
    stickyMidNav.classList.add('fixed');
  } else {
    stickyMidNav.classList.remove('fixed');
  }
});

// set underline under the clicked nav on mid nav
const allMidNavItems = document.querySelectorAll('.sticky_contents a')
allMidNavItems.forEach(midNavItem => {
    
    midNavItem.addEventListener('click', e => {

        allMidNavItems.forEach(item => item.classList.remove('active'))

        midNavItem.classList.add('active')
    })

    
})


// WOW active
new WOW().init();


(() => {
  const track = document.getElementById("track");
  const wrap = track.parentElement;
  const cards = Array.from(track.children);
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const dotsBox = document.getElementById("dots");

  const isMobile = () => matchMedia("(max-width:767px)").matches;

  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => activate(i, true);
    dotsBox.appendChild(dot);
  });
  const dots = Array.from(dotsBox.children);

  let current = 0;

  function center(i) {
    const card = cards[i];
    const axis = isMobile() ? "top" : "left";
    const size = isMobile() ? "clientHeight" : "clientWidth";
    const start = isMobile() ? card.offsetTop : card.offsetLeft;
    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: "smooth"
    });
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute("active", k === i));
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
  }

  function activate(i, scroll) {
    if (i === current) return;
    current = i;
    toggleUI(i);
    if (scroll) center(i);
  }

  function go(step) {
    activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
  }

  prev.onclick = () => go(-1);
  next.onclick = () => go(1);

  addEventListener(
    "keydown",
    (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    },
    { passive: true }
  );

  cards.forEach((card, i) => {
    card.addEventListener(
      "mouseenter",
      () => matchMedia("(hover:hover)").matches && activate(i, true)
    );
    card.addEventListener("click", () => activate(i, true));
  });

  let sx = 0,
    sy = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
        go((isMobile() ? dy : dx) > 0 ? -1 : 1);
    },
    { passive: true }
  );
  if (window.matchMedia("(max-width:767px)").matches) dotsBox.hidden = true;

  addEventListener("resize", () => center(current));

  toggleUI(0);
  center(0);
})();



var swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });

// particles animation
const c = document.getElementById("particles");
const ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function animate() {
  ctx.clearRect(0, 0, c.width, c.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 3);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > c.width) p.dx *= -1;
    if (p.y < 0 || p.y > c.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();
