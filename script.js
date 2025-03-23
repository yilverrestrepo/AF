// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navList = document.querySelector(".nav-list")
const headerButtons = document.querySelector(".header-buttons")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navList.classList.toggle("show")
    headerButtons.classList.toggle("show")
  })
}

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear()

// Contact Form Submission
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // In a real application, you would send this data to a server
    console.log("Form submitted:", { name, email, subject, message })

    // Show success message
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")

    // Reset form
    contactForm.reset()
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add active class to nav links on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-list a")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
})

// Property card hover effect
const propertyCards = document.querySelectorAll(".property-card")

propertyCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)"
  })
})

