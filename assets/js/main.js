/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validasi bahwa variabel ada
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // Menambahkan kelas show-menu ke tag div dengan kelas nav__menu
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // Saat di klik setiap nav__link, maka akan menghapus kelas show-menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // Jika tinggi area pandang gulir lebih besar dari 200, maka akan menambahkan kelas header-gulir ke tag header
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // Ketika gulir lebih tinggi dari tinggi area pandang 560, tambahkan kelas show-scroll ke tag a dengan kelas gulir-atas
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";

// Tema yang dipilih sebelumnya (jika dipilih pengguna)
const selectedTheme = localStorage.getItem("selected-theme");

// Memperoleh tema antarmuka saat ini dengan memvalidasi kelas tema gelap
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";

// Memvalidasi jika pengguna sebelumnya memilih tema
if (selectedTheme) {
  // Jika validasi terpenuhi, akan menanyakan masalah apa yang perlu diketahui jika user mengaktifkan atau menonaktifkan tema gelap
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.innerText = selectedTheme === "dark" ? "Light Mode" : "Dark Mode";
}

// Aktifkan/nonaktifkan tema secara manual dengan tombol
themeButton.addEventListener("click", () => {
  // Tambahkan atau hapus tema gelap
  document.body.classList.toggle(darkTheme);
  // Perbarui teks tombol
  themeButton.innerText =
    getCurrentTheme() === "dark" ? "Light Mode" : "Dark Mode";
  // Menyimpan tema yang dipilih user
  localStorage.setItem("selected-theme", getCurrentTheme());
});

// Membuat tulisan bergerak
const text =
  "Halo guys, perkenalkan nama saya Akhtar Faizi Putra. Saya mahasiswa Politeknik Negeri Jakarta.";
let index = 0;

function type() {
  const typingText = document.getElementById("typing-text");
  typingText.innerHTML = text.slice(0, index);

  index++;

  if (index > text.length) {
    index = 0;
  }

  setTimeout(type, 100);
}

type();

// Inisialisasi Scroll Reveal
const sr = ScrollReveal({
  duration: 1000, // Durasi animasi (ms)
  reset: true, // Animasi diulang saat scroll ke atas
});

// Swipper animasi
var CertificationSlider = new Swiper(".certification-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: false,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  initialSlide: 1,
});

// animasi untuk setiap elemen
sr.reveal(".home", { origin: "bottom", distance: "20px", delay: 300 });
sr.reveal(".about", { origin: "bottom", distance: "50px", delay: 300 });
sr.reveal(".experience", { origin: "bottom", distance: "50px", delay: 300 });
sr.reveal(".education", { origin: "bottom", distance: "50px", delay: 300 });
sr.reveal(".portofolio", { origin: "bottom", distance: "20px", delay: 300 });
sr.reveal(".certification", { origin: "bottom", distance: "20px", delay: 300 });

// Fungsi untuk memeriksa apakah localStorage didukung
const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung web storage");
    return false;
  }
  return true;
};

// Fungsi untuk memuat data likes dari localStorage
const loadLikesFromStorage = () => {
  const likesData = JSON.parse(localStorage.getItem("PORTFOLIO_LIKES")) || {};
  for (const id in likesData) {
    const likesElement = document.getElementById("likes" + id);
    likesElement.innerText = likesData[id] + " Likes";
  }
};

// Fungsi untuk menyimpan data likes ke localStorage
const saveLikesToStorage = (likesData) => {
  localStorage.setItem("PORTFOLIO_LIKES", JSON.stringify(likesData));
};

// Fungsi untuk menambah like
const addLike = (portfolioId) => {
  const likesElement = document.getElementById("likes" + portfolioId);
  const currentLikes = parseInt(likesElement.innerText);

  // Update likes count
  const newLikes = currentLikes + 1;
  likesElement.innerText = newLikes + " Likes";

  // Simpan data likes ke localStorage
  const likesData = JSON.parse(localStorage.getItem("PORTFOLIO_LIKES")) || {};
  likesData[portfolioId] = newLikes;
  saveLikesToStorage(likesData);
};

// Menambahkan event listener untuk setiap tombol Like
document.addEventListener("DOMContentLoaded", () => {
  if (isStorageExist()) {
    loadLikesFromStorage();
  }

  const buttons = document.querySelectorAll(".portofolio__button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Mencegah tindakan default dari tautan
      addLike(index + 1); // Memanggil fungsi addLike dengan ID portofolio yang sesuai
    });
  });
});
