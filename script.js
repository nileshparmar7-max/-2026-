// ====== અહીંથી ઇવેન્ટની માહિતી સરળતાથી બદલો ======
const EVENT = {
  date: "13/09/2026, રવિવાર",
  time: "સાંજે 5.00 કલાકે",
  venue: "વટવા નગર, અમદાવાદ",
  contacts: "1. સંપર્ક સૂત્ર — ગિરીશભાઈ +91 6351 555 733 \n2. સંપર્ક સૂત્ર — નિલેશભાઈ +91-9173574776"
};

document.getElementById("eventDate").textContent = EVENT.date;
document.getElementById("eventTime").textContent = EVENT.time;
document.getElementById("eventVenue").textContent = EVENT.venue;
document.getElementById("contacts").innerText = EVENT.contacts;

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const form = document.getElementById("registrationForm");
const success = document.getElementById("success");
const progress = document.getElementById("progressBar");
form.addEventListener("input", () => {
  const fields = [...form.querySelectorAll("input,select,textarea")];
  const filled = fields.filter(x => x.value.trim()).length;
  progress.style.width = Math.max(10, Math.min(100, (filled / fields.length) * 100)) + "%";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  success.style.display = "block";
  success.scrollIntoView({behavior:"smooth", block:"center"});
});
