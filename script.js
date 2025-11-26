// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking on a link
  for (const link of document.querySelectorAll(".nav-links a")) {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  }
}

// Profile Image Modal (Home and About pages)
const profileImgBtn = document.getElementById("profileImgBtn");
const aboutImgBtn = document.getElementById("aboutImgBtn");
const profileModal = document.getElementById("profileModal");
const closeButtons = document.querySelectorAll(".close");

// Function to open modal
function openModal(modal) {
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

// Function to close modal
function closeModal(modal) {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Profile image button click handler
if (profileImgBtn) {
  profileImgBtn.addEventListener("click", () => {
    openModal(profileModal);
  });
}

// About page image button click handler
if (aboutImgBtn) {
  aboutImgBtn.addEventListener("click", () => {
    openModal(profileModal);
  });
}

// Close button handlers
for (const button of closeButtons) {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
}

// Close modal when clicking outside
globalThis.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
});

// Contact Form Submission with Confirmation Modal
const contactForm = document.getElementById("contactForm");
const confirmModal = document.getElementById("confirmModal");
const successModal = document.getElementById("successModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let formData = null;

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Store form data
    formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Show confirmation modal
    openModal(confirmModal);
  });
}

// Confirm submission
if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    // Close confirmation modal
    closeModal(confirmModal);

    // Here you would normally send the form data to a server
    console.log("Form submitted:", formData);

    // Reset form
    if (contactForm) {
      contactForm.reset();
    }

    // Show success modal
    setTimeout(() => {
      openModal(successModal);
    }, 300);

    // Auto-close success modal after 3 seconds
    setTimeout(() => {
      closeModal(successModal);
    }, 3300);
  });
}

// Cancel submission
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    closeModal(confirmModal);
    formData = null;
  });
}

// Smooth scroll for anchor links
for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  }
}, observerOptions);

// Observe elements for animation
for (const el of document.querySelectorAll(
  ".skill-card, .project-card, .education-card, .interest-card, .timeline-item"
)) {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
}

// Add active class to current page in navigation
const currentPage =
  globalThis.location.pathname.split("/").pop() || "index.html";
for (const link of document.querySelectorAll(".nav-links a")) {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
}

// Form validation with visual feedback
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea"
);

for (const input of formInputs) {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "" && input.hasAttribute("required")) {
      input.style.borderColor = "#f56565";
    } else {
      input.style.borderColor = "#48bb78";
    }
  });

  input.addEventListener("focus", () => {
    input.style.borderColor = "#667eea";
  });
}

// Typing effect disabled to preserve HTML formatting
// The hero title will display immediately with proper HTML rendering

// Add parallax effect to hero section
globalThis.addEventListener("scroll", () => {
  const scrolled = globalThis.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll(".project-card");
for (const card of projectCards) {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
}

// Keyboard accessibility for modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    for (const modal of document.querySelectorAll(".modal")) {
      if (modal.style.display === "block") {
        closeModal(modal);
      }
    }
  }
});

// Add loading animation
globalThis.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

console.log("Portfolio website loaded successfully! 🚀");
