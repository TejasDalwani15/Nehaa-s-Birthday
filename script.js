document.addEventListener("DOMContentLoaded", () => {
    // Music Player Functionality
    const audio = document.getElementById("song")
    const playPauseButton = document.getElementById("play-pause")
    const progressBar = document.getElementById("progress-bar")
    const volumeControl = document.getElementById("volume")
    const progressContainer = document.querySelector(".progress-container")
  
    // Sound Effects
    const soundEffects = {
      click: new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"),
      success: new Audio("https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3"),
      sparkle: new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3"),
      whoosh: new Audio("/assets/zipper-43841.mp3"),
      pop: new Audio("https://assets.mixkit.co/active_storage/sfx/2/2-preview.mp3"),
      magic: new Audio("/assets/PRESENT  GIFT SOUND EFFECTS  COPYRIGHT FREE.mp3"),
      firework: new Audio("https://assets.mixkit.co/active_storage/sfx/1022/1022-preview.mp3"),
      heart: new Audio("https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3"),
      yayy: new Audio("/assets/Yayyy! Sound Effect.mp3"),
      perfect: new Audio("/assets/Ed Sheeran - Perfect.mp3"),
    }
  
    // Set volume for sound effects
    Object.values(soundEffects).forEach((sound) => {
      sound.volume = 0.3
    })
  
    // Function to play sound effect
    function playSound(soundName) {
      if (soundEffects[soundName]) {
        // Clone the audio to allow multiple sounds at once
        const sound = soundEffects[soundName].cloneNode()
        sound.volume = 0.3
        sound.play()
      }
    }
  
    // Set initial volume
    if (audio && volumeControl) {
      audio.volume = volumeControl.value
  
      // Play/Pause functionality
      playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
          audio.play()
          playPauseButton.textContent = "⏸️"
        } else {
          audio.pause()
          playPauseButton.textContent = "▶️"
        }
      })
  
      // Update progress bar
      audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100
        progressBar.style.width = progress + "%"
      })
  
      // Click on progress bar to seek
      progressContainer.addEventListener("click", function (e) {
        const clickPosition = e.offsetX / this.offsetWidth
        audio.currentTime = clickPosition * audio.duration
      })
  
      // Volume control
      volumeControl.addEventListener("input", function () {
        audio.volume = this.value
      })
  
      // Reset player when song ends
      audio.addEventListener("ended", () => {
        playPauseButton.textContent = "▶️"
        progressBar.style.width = "0%"
      })
    }
  
    // Interactive Heart - Modified for smooth animation from 1% to 100%
    const heart = document.getElementById("heart")
    const loveMeter = document.getElementById("love-meter")
    let lovePercentage = 0
    let heartAnimationInterval
    let isHeartAnimating = false
  
    if (heart && loveMeter) {
        heart.addEventListener("click", function () {
            if (isHeartAnimating) return;
            
            playSound(heart)
            isHeartAnimating = true;
            this.classList.add("pulse");
            lovePercentage = 1;
            loveMeter.textContent = lovePercentage + "%";
          
            heartAnimationInterval = setInterval(() => {
              lovePercentage += 1;
              
              if (lovePercentage < 100) {
                loveMeter.textContent = lovePercentage + "%";
              } else {
                loveMeter.textContent = "∞"; // After reaching 100, show infinity
              }
          
              // Optional: trigger confetti when reaching 100 (only once)
              if (lovePercentage === 100) {
                createConfetti(150);
                playSound("success");
                showLoveMessage();
              }
            }, 30);
          })
    }
  
    // Confetti function
    function createConfetti(amount) {
      const confettiContainer = document.getElementById("confetti-container")
      if (!confettiContainer) return
  
      const colors = ["#ff6b6b", "#5f27cd", "#ff9ff3", "#feca57", "#48dbfb"]
  
      for (let i = 0; i < amount; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti"
  
        // Random properties
        const size = Math.random() * 10 + 5
        const color = colors[Math.floor(Math.random() * colors.length)]
        const left = Math.random() * 100
        const duration = Math.random() * 3 + 2
        const delay = Math.random() * 2
  
        // Apply styles
        confetti.style.width = `${size}px`
        confetti.style.height = `${size}px`
        confetti.style.backgroundColor = color
        confetti.style.left = `${left}%`
        confetti.style.top = "-20px"
        confetti.style.position = "absolute"
        confetti.style.borderRadius = "50%"
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`
  
        // Add keyframes for falling animation
        const keyframes = `
                  @keyframes fall {
                      to {
                          transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                          opacity: 0;
                      }
                  }
              `
  
        const style = document.createElement("style")
        style.innerHTML = keyframes
        document.head.appendChild(style)
  
        confettiContainer.appendChild(confetti)
  
        // Remove confetti after animation
        setTimeout(
          () => {
            confetti.remove()
            style.remove()
          },
          (duration + delay) * 1000,
        )
      }
    }
  
    // Floating hearts function
    function createFloatingHearts(amount) {
      const heartsContainer = document.getElementById("hearts-container")
      if (!heartsContainer) return
  
      for (let i = 0; i < amount; i++) {
        const floatingHeart = document.createElement("div")
        floatingHeart.className = "floating-heart"
        floatingHeart.innerHTML = "❤️"
  
        // Random properties
        const size = Math.random() * 20 + 10
        const left = Math.random() * 80 + 10 // Keep within 10-90% of screen width
        const duration = Math.random() * 3 + 2
  
        // Apply styles
        floatingHeart.style.fontSize = `${size}px`
        floatingHeart.style.left = `${left}%`
        floatingHeart.style.top = "80%"
        floatingHeart.style.position = "absolute"
        floatingHeart.style.animation = `float ${duration}s ease-out forwards`
  
        // Add keyframes for floating animation
        const keyframes = `
                  @keyframes float {
                      to {
                          transform: translateY(-70vh) rotate(${Math.random() * 60 - 30}deg);
                          opacity: 0;
                      }
                  }
              `
  
        const style = document.createElement("style")
        style.innerHTML = keyframes
        document.head.appendChild(style)
  
        heartsContainer.appendChild(floatingHeart)
  
        // Remove heart after animation
        setTimeout(() => {
          floatingHeart.remove()
          style.remove()
        }, duration * 1000)
      }
    }
  
    // Show special message when love meter reaches 100%
    function showLoveMessage() {
      const messageContainer = document.createElement("div")
      messageContainer.style.position = "fixed"
      messageContainer.style.top = "50%"
      messageContainer.style.left = "50%"
      messageContainer.style.transform = "translate(-50%, -50%)"
      messageContainer.style.backgroundColor = "rgba(255, 255, 255, 0.9)"
      messageContainer.style.padding = "30px"
      messageContainer.style.borderRadius = "15px"
      messageContainer.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.2)"
      messageContainer.style.zIndex = "1000"
      messageContainer.style.maxWidth = "80%"
      messageContainer.style.textAlign = "center"
  
      messageContainer.innerHTML = `
              <h2 style="font-family: 'Dancing Script', cursive; color: #ff6b6b; font-size: 2rem; margin-bottom: 15px;">Infinite Love!</h2>
              <p style="font-size: 1.2rem; margin-bottom: 20px;">My love for you is immeasurable and endless. You mean everything to me!</p>
              <button id="close-message" style="background-color: #5f27cd; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 1rem;">Close</button>
          `
  
      document.body.appendChild(messageContainer)
  
      document.getElementById("close-message").addEventListener("click", () => {
        playSound("click")
        messageContainer.remove()
      })
    }
  
    // Photo Gallery Functionality
    const photoGallery = document.getElementById("photo-gallery")
    const photoModal = document.getElementById("photo-modal")
    const modalImage = document.getElementById("modal-image")
    const modalMessage = document.getElementById("modal-message")
    const closeModal = document.getElementById("close-modal")
    const nextPhoto = document.getElementById("next-photo")
    const prevPhoto = document.getElementById("prev-photo")
  
    // Messages for each photo - Updated with better compliments
    const photoMessages = [
      "27 April 2022, your first birthday which we celebrated together💖",
      "28th April 2023, Thanks to Technotsav I got to celebrate this amazing day with you✨",
      "28th April 2024, 3 years in a row we are still together and yes this day was too Amazing🌹",
      "Remember this night?? literally the best day of my life till now, I was with you till 2AM still can believe it 💓",
      "We both became kids on your 21st birthday 😂, you were looking too cute though 🙈, I was unable to take my eyes off you 💫",
      "On Date with my cutiee Don💕",
      "Every time I look at you, I fall in love all over again! 🌈",
      "Your beauty is timeless and incomparable! 😊",
    ]
  
    // GIFs to show with photos - Updated with better quality GIFs
    const cuteGifs = [
      "https://media.giphy.com/media/l0HU2sYgCZh3HiKnS/giphy.gif", // Beautiful hearts
      "https://media.giphy.com/media/CHmz8mMpCUW4p3vxRY/giphy.gif?cid=ecf05e47vxeqs05m7g9kpubywtre85g1hmn6hdn0ha0nqmus&ep=v1_gifs_related&rid=giphy.gif&ct=g", // Sparkling hearts
      "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif", // Heart balloons
      "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif", // Beautiful animation
      "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif", // Cute couple
      "https://media.giphy.com/media/l0HU2sYgCZh3HiKnS/giphy.gif", // Beautiful hearts
      "https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif", // Heart animation
      "https://media.giphy.com/media/k8pbfX3uXHV0KPf6RP/giphy.gif?cid=ecf05e47vxeqs05m7g9kpubywtre85g1hmn6hdn0ha0nqmus&ep=v1_gifs_related&rid=giphy.gif&ct=g", // Beautiful animation
    ]
  
    let currentPhotoIndex = 0
    let allPhotoItems = []
  
    // Initialize photo items
    function initPhotoItems() {
      allPhotoItems = Array.from(document.querySelectorAll(".photo-item"))
  
      // Add click event listeners to all photos
      allPhotoItems.forEach((item, index) => {
        item.addEventListener("click", () => {
          playSound("click")
          openPhotoModal(index)
        })
      })
    }
  
    // Initialize on page load
    if (photoGallery) {
      initPhotoItems()
    }
  
    // Close modal when clicking close button
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        playSound("click")
        photoModal.classList.remove("show")
        setTimeout(() => {
          photoModal.style.display = "none"
        }, 300)
      })
    }
  
    // Next photo button
    if (nextPhoto) {
      nextPhoto.addEventListener("click", () => {
        playSound("click")
        currentPhotoIndex = (currentPhotoIndex + 1) % allPhotoItems.length
        updateModalContent(currentPhotoIndex)
      })
    }
  
    // Previous photo button
    if (prevPhoto) {
      prevPhoto.addEventListener("click", () => {
        playSound("click")
        currentPhotoIndex = (currentPhotoIndex - 1 + allPhotoItems.length) % allPhotoItems.length
        updateModalContent(currentPhotoIndex)
      })
    }
  
    // Function to open photo modal
    function openPhotoModal(index) {
      if (!photoModal) return
  
      currentPhotoIndex = index
      updateModalContent(index)
      photoModal.style.display = "flex"
      setTimeout(() => {
        photoModal.classList.add("show")
      }, 10)
    }
  
    // Update modal content
    function updateModalContent(index) {
      if (!modalImage || !modalMessage || allPhotoItems.length === 0) return
  
      const photoSrc = allPhotoItems[index].querySelector("img").src
      const gifIndex = index % cuteGifs.length
      const messageIndex = index % photoMessages.length
  
      // Create animation effect
      modalImage.style.opacity = "0"
      modalMessage.style.opacity = "0"
  
      setTimeout(() => {
        modalImage.src = photoSrc
  
        // Show message with cute GIF
        modalMessage.innerHTML = `
                  <p>${photoMessages[messageIndex]}</p>
                  <img src="${cuteGifs[gifIndex]}" alt="Cute animation" class="modal-gif">
              `
  
        modalImage.style.opacity = "1"
        modalMessage.style.opacity = "1"
      }, 300)
    }
  
    // Allow keyboard navigation in photo modal
    document.addEventListener("keydown", (e) => {
      if (photoModal && photoModal.style.display === "flex") {
        if (e.key === "ArrowRight" && nextPhoto) {
          nextPhoto.click()
        } else if (e.key === "ArrowLeft" && prevPhoto) {
          prevPhoto.click()
        } else if (e.key === "Escape" && closeModal) {
          closeModal.click()
        }
      }
    })
  
    // Photo Upload and LocalStorage Functionality
    const photoUploadInput = document.getElementById("photo-upload")
    const uploadPhotoBtn = document.getElementById("upload-photo-btn")
    const sharePhotosBtn = document.getElementById("share-photos-btn")
  
    // Load saved photos from localStorage on page load
    if (photoGallery) {
      loadSavedPhotos()
    }
  
    if (uploadPhotoBtn && photoUploadInput) {
      uploadPhotoBtn.addEventListener("click", () => {
        playSound("click")
        photoUploadInput.click()
      })
  
      photoUploadInput.addEventListener("change", handlePhotoUpload)
    }
  
    // Share photos functionality
    if (sharePhotosBtn) {
      sharePhotosBtn.addEventListener("click", () => {
        playSound("click")
        // Create a shareable link or message
        const message = "Check out my birthday gallery! 🎂❤️"
  
        // Try to use Web Share API if available
        if (navigator.share) {
          navigator
            .share({
              title: "Birthday Gallery",
              text: message,
              url: window.location.href,
            })
            .catch((error) => {
              console.log("Error sharing:", error)
              // Fallback to clipboard
              copyToClipboard(message + " " + window.location.href)
            })
        } else {
          // Fallback to clipboard
          copyToClipboard(message + " " + window.location.href)
        }
      })
    }
  
    function copyToClipboard(text) {
      const textarea = document.createElement("textarea")
      textarea.value = texta
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
  
      // Show success message
      const successMsg = document.createElement("div")
      successMsg.className = "upload-success"
      successMsg.textContent = "Link copied to clipboard!"
      document.body.appendChild(successMsg)
  
      setTimeout(() => {
        successMsg.classList.add("show")
      }, 10)
  
      setTimeout(() => {
        successMsg.classList.remove("show")
        setTimeout(() => {
          successMsg.remove()
        }, 500)
      }, 3000)
    }
  
    function handlePhotoUpload(e) {
      const files = e.target.files
      if (!files.length) return
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.match("image.*")) continue
  
        const reader = new FileReader()
  
        reader.onload = (e) => {
          const imgSrc = e.target.result
          addNewPhotoToGallery(imgSrc)
  
          // Save to localStorage
          savePhotoToLocalStorage(imgSrc)
        }
  
        reader.readAsDataURL(file)
      }
    }
  
    function addNewPhotoToGallery(imgSrc) {
      if (!photoGallery) return
  
      // Create new photo item
      const newPhotoItem = document.createElement("div")
      newPhotoItem.className = "photo-item interactive-element"
  
      // Create image
      const img = document.createElement("img")
      img.src = imgSrc
      img.alt = "Uploaded photo"
  
      // Create delete button
      const deleteBtn = document.createElement("button")
      deleteBtn.className = "delete-photo-btn"
      deleteBtn.innerHTML = "×"
      deleteBtn.title = "Delete photo"
  
      // Add delete functionality
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation() // Prevent opening the modal when clicking delete
        playSound("pop")
  
        // Remove from localStorage
        removePhotoFromLocalStorage(imgSrc)
  
        // Remove from DOM
        newPhotoItem.remove()
  
        // Refresh photo items array
        initPhotoItems()
  
        // Show success message
        const successMsg = document.createElement("div")
        successMsg.className = "upload-success"
        successMsg.textContent = "Photo deleted successfully!"
        document.body.appendChild(successMsg)
  
        setTimeout(() => {
          successMsg.classList.add("show")
        }, 10)
  
        setTimeout(() => {
          successMsg.classList.remove("show")
          setTimeout(() => {
            successMsg.remove()
          }, 500)
        }, 3000)
      })
  
      // Add elements to the DOM
      newPhotoItem.appendChild(img)
      newPhotoItem.appendChild(deleteBtn)
      photoGallery.appendChild(newPhotoItem)
  
      // Refresh all photo items and their event listeners
      initPhotoItems()
  
      // Show success message
      const successMsg = document.createElement("div")
      successMsg.className = "upload-success"
      successMsg.textContent = "Photo added successfully!"
      document.body.appendChild(successMsg)
      playSound("success")
  
      setTimeout(() => {
        successMsg.classList.add("show")
      }, 10)
  
      setTimeout(() => {
        successMsg.classList.remove("show")
        setTimeout(() => {
          successMsg.remove()
        }, 500)
      }, 3000)
  
      // Create celebration effect
      createFloatingHearts(5)
    }
  
    // Save photo to localStorage
    function savePhotoToLocalStorage(imgSrc) {
      const savedPhotos = JSON.parse(localStorage.getItem("birthdayPhotos")) || []
      savedPhotos.push(imgSrc)
      localStorage.setItem("birthdayPhotos", JSON.stringify(savedPhotos))
    }
  
    // Remove photo from localStorage
    function removePhotoFromLocalStorage(imgSrc) {
      const savedPhotos = JSON.parse(localStorage.getItem("birthdayPhotos")) || []
      const updatedPhotos = savedPhotos.filter((photo) => photo !== imgSrc)
      localStorage.setItem("birthdayPhotos", JSON.stringify(updatedPhotos))
    }
  
    // Load saved photos from localStorage
    function loadSavedPhotos() {
      const savedPhotos = JSON.parse(localStorage.getItem("birthdayPhotos")) || []
  
      savedPhotos.forEach((imgSrc) => {
        addNewPhotoToGallery(imgSrc)
      })
    }
  
    // Fireworks Animation
    const fireworksBtnElement = document.getElementById("launch-fireworks")
    const fireworksCanvas = document.getElementById("fireworks-canvas")
  
    if (fireworksBtnElement && fireworksCanvas) {
      const ctx = fireworksCanvas.getContext("2d")
      const fireworks = []
      const particles = []
  
      // Set canvas dimensions
      function resizeCanvas() {
        const container = document.querySelector(".fireworks-container")
        if (container) {
          fireworksCanvas.width = container.offsetWidth
          fireworksCanvas.height = container.offsetHeight
        }
      }
  
      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)
  
      // Firework class
      class Firework {
        constructor() {
          this.x = Math.random() * fireworksCanvas.width
          this.y = fireworksCanvas.height
          this.targetX = Math.random() * fireworksCanvas.width
          this.targetY = Math.random() * fireworksCanvas.height * 0.5
          this.speed = 2
          this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x)
          this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
          }
          this.brightness = Math.random() * 50 + 50
          this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
        }
  
        update() {
          this.x += this.velocity.x
          this.y += this.velocity.y
  
          // Check if reached target
          const distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
  
          if (distance < 5) {
            return true // Explode
          }
          return false
        }
  
        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
  
        explode() {
          const particleCount = 100
          for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(this.x, this.y, this.color))
          }
        }
      }
  
      // Particle class
      class Particle {
        constructor(x, y, color) {
          this.x = x
          this.y = y
          this.color = color
          this.radius = Math.random() * 2 + 1
          this.speed = Math.random() * 5 + 1
          this.angle = Math.random() * Math.PI * 2
          this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
          }
          this.alpha = 1
          this.decay = Math.random() * 0.03 + 0.01
        }
  
        update() {
          this.velocity.y += 0.05 // Gravity
          this.x += this.velocity.x
          this.y += this.velocity.y
          this.alpha -= this.decay
  
          return this.alpha <= 0
        }
  
        draw() {
          ctx.globalAlpha = this.alpha
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }
  
      // Animation loop
      let animationId
      function animate() {
        animationId = requestAnimationFrame(animate)
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height)
  
        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
          const explode = fireworks[i].update()
          fireworks[i].draw()
  
          if (explode) {
            fireworks[i].explode()
            fireworks.splice(i, 1)
          }
        }
  
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const remove = particles[i].update()
          particles[i].draw()
  
          if (remove) {
            particles.splice(i, 1)
          }
        }
  
        // Stop animation if no fireworks or particles
        if (fireworks.length === 0 && particles.length === 0) {
          cancelAnimationFrame(animationId)
          fireworksBtnElement.style.display = "block"
        }
      }
  
      // Launch fireworks
      fireworksBtnElement.addEventListener("click", function () {
        // Add a click animation instead of hover
        this.classList.add("fireworks-click")
        playSound("firework") // Play sound only once when clicked
        setTimeout(() => {
          this.classList.remove("fireworks-click")
        }, 300)
  
        // Rest of the fireworks code...
        this.style.display = "none"
  
        // Create initial fireworks
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            fireworks.push(new Firework())
          }, i * 200)
        }
  
        // Start animation
        animate()
  
        // Add more fireworks
        let count = 0
        const interval = setInterval(() => {
          fireworks.push(new Firework())
          count++
  
          if (count >= 15) {
            clearInterval(interval)
          }
        }, 500)
      })
    }
  
    // Virtual Gift Boxes
    const giftBoxes = document.querySelectorAll(".gift-box")
  
    giftBoxes.forEach((box) => {
      let isOpen = false
      box.addEventListener("click", function () {
        if (!isOpen) {
          // Open the gift
          this.classList.add("opened")
          playSound("magic")
          createFloatingHearts(5)
          isOpen = true
        } else {
          // Close the gift
          this.classList.remove("opened")
          playSound("whoosh")
          isOpen = false
        }
      })
    })
  
    // Animated Love Letter
    const readLetterBtn = document.getElementById("read-letter-btn")
    const typewriterText = document.getElementById("typewriter-text")
  
    if (readLetterBtn && typewriterText) {
      const loveLetterContent = `Happiest 22nd Birthday Nebbuuu Babu😂🤭,
  
  It's your 3rd birthday since we are together, not physically together now but you are in my heart anyways🤭.
  
  3 years and still feels like 3 months, it's too low for being with you I hope God has a plan for us to be together forever ❤️.

  On this birthday I wish you get everything you deserve, everything you love, and by the end of this year I wish success finally catches you and you become the person with highest income like Don of your family😂.

  There no person for me in front of you Nevuu, you are the first priority for me, you the god for me, I praise you, I bow for you, I pray for you all this because I really love you ❤️.

  Thank you for everything you did for me girl.

  You are the sweetest person alive in this tatti generation.

  Happy Birthday once again baby❤️.
  
  Be my wife soon🥹❤️

  Happy Birthday, my love! ❤️`
  
      let isTyping = false
  
      readLetterBtn.addEventListener("click", () => {
        playSound("click")
        if (isTyping) return
  
        isTyping = true
        typewriterText.textContent = ""
        readLetterBtn.textContent = "Reading..."
  
        let i = 0
        const typeSpeed = 80
        const keyboardSound = new Audio("/assets/computer-keyboard-typing-290582.mp3")
        keyboardSound.volume = 0.2
        keyboardSound.load(); // preload

        const skipTime = 3.5; // seconds to skip
        
        function typeWriter() {
          if (i < loveLetterContent.length) {
            typewriterText.textContent += loveLetterContent.charAt(i);
            
            if (i % 3 === 0) {
              keyboardSound.currentTime = skipTime; // jump to 3.5s
              keyboardSound.play();
            }
            
            i++;
            setTimeout(typeWriter, typeSpeed); // 80-100ms
          }
        }
  
        typeWriter()
      })
    }
  
    // Force scroll to top on load and prevent automatic scrolling
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  
    window.scrollTo(0, 0)
    document.body.classList.add("no-scroll")
  
    // Scroll event handling
    let isScrolled = false
    const cakeContainer = document.getElementById("cake-container")
  
    function handleScroll() {
      if (window.scrollY > 50 && !isScrolled && cakeContainer) {
        cakeContainer.classList.add("scrolled")
        document.body.classList.remove("no-scroll")
        isScrolled = true
      }
  
      // Create floating balloons on scroll
      if (Math.random() > 0.7) {
        createFloatingBalloon()
      }
    }
  
    // Add scroll event listener after a short delay
    setTimeout(() => {
      window.addEventListener("scroll", handleScroll)
  
      // Also handle touch and wheel events for mobile
      if (cakeContainer) {
        cakeContainer.addEventListener("touchmove", () => {
          if (!isScrolled) {
            window.scrollTo(0, 100) // Force a small scroll to trigger the scroll handler
          }
        })
  
        cakeContainer.addEventListener("wheel", () => {
          if (!isScrolled) {
            window.scrollTo(0, 100) // Force a small scroll to trigger the scroll handler
          }
        })
      }
  
      // Add a click handler to help with scrolling
      const scrollIndicator = document.querySelector(".scroll-indicator")
      if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
          playSound("click")
          if (!isScrolled) {
            window.scrollTo(0, 100) // Force a small scroll to trigger the scroll handler
          }
        })
      }
    }, 500)
  
    // Reset scroll position on page load
    window.addEventListener("load", () => {
      window.scrollTo(0, 0)
    })
  
    // Interactive elements throughout the page
    document.querySelectorAll(".interactive-element").forEach((element) => {
      element.addEventListener("mouseover", () => {
        element.classList.add("hover-effect")
      })
  
      element.addEventListener("mouseout", () => {
        element.classList.remove("hover-effect")
      })
  
      element.addEventListener("click", function () {
        playSound("click")
        // Create a ripple effect
        const ripple = document.createElement("span")
        ripple.className = "ripple-effect"
  
        // Position the ripple
        const rect = this.getBoundingClientRect()
        ripple.style.left = "50%"
        ripple.style.top = "50%"
  
        // Add to element and remove after animation
        this.appendChild(ripple)
        setTimeout(() => {
          ripple.remove()
        }, 600)
  
        // Add a small burst of hearts for any interactive element
        if (Math.random() > 0.7) {
          // 30% chance
          createFloatingHearts(2)
        }
      })
    })
  
    // Initial confetti burst on page load
    setTimeout(() => {
      createConfetti(50)
    }, 1000)
  
    // Create occasional floating hearts
    setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every interval
        createFloatingHearts(1)
      }
    }, 3000)
  
    // Add this code after the photoModal event listeners to close when clicking outside
    if (photoModal) {
      photoModal.addEventListener("click", (e) => {
        // Only close if clicking directly on the modal background, not its children
        if (e.target === photoModal) {
          closeModal.click()
        }
      })
    }
  
    // Add this code at the end of the DOMContentLoaded event listener to request fullscreen
    // Add fullscreen functionality
    function openFullscreen() {
      const elem = document.documentElement
  
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen()
      }
    }
  
    // Try to go fullscreen when user interacts with the page
    document.addEventListener("click", function fullscreenHandler() {
      openFullscreen()
      // Remove the event listener after first click
      document.removeEventListener("click", fullscreenHandler)
    })
  
    // Add a fullscreen button for better user experience
    const fullscreenBtn = document.createElement("button")
    fullscreenBtn.innerHTML = "Enter Fullscreen"
    fullscreenBtn.className = "fullscreen-btn"
    fullscreenBtn.addEventListener("click", openFullscreen)
    document.body.appendChild(fullscreenBtn)
  
    // Proposal Section Functionality
    const yesBtn = document.getElementById("yes-btn")
    const noBtn = document.getElementById("no-btn")
    const proposalResponse = document.getElementById("proposal-response")
    const loveQuestion = document.getElementById("love-question")
  
    if (yesBtn && noBtn && proposalResponse && loveQuestion) {
      // Make the "No" button run away when hovered
      noBtn.addEventListener("mouseover", () => {
        const parent = noBtn.parentElement
        const bounds = parent.getBoundingClientRect()
  
        const maxX = bounds.width - noBtn.offsetWidth
        const maxY = bounds.height - noBtn.offsetHeight
  
        const randX = Math.random() * maxX
        const randY = Math.random() * maxY
  
        noBtn.style.position = "absolute"
        noBtn.style.left = `${randX}px`
        noBtn.style.top = `${randY}px`
      })
  
      // Handle "Yes" button click
      yesBtn.addEventListener("click", () => {
        playSound("yayy")
        loveQuestion.style.display = "none"
        proposalResponse.innerHTML = `<p class="yay-text">Yayy! I knew it 🥹💕 I love you more Nevuu!</p>`
        createConfetti(150)
        createFloatingHearts(20)
  
        setTimeout(() => {
          proposalResponse.innerHTML += `
                  <h3>Would you be mine forever?</h3>
                  <div class="proposal-buttons">
                      <button id="yes-forever" class="proposal-btn">Forever Yes 💍</button>
                      <button id="no-forever" class="proposal-btn">No 😅</button>
                  </div>
              `
  
          const yesForever = document.getElementById("yes-forever")
          const noForever = document.getElementById("no-forever")
  
          if (yesForever && noForever) {
            // Make the "No" button for the second question run away too
            noForever.addEventListener("mouseover", function () {
              const parent = this.parentElement
              const bounds = parent.getBoundingClientRect()
  
              const maxX = bounds.width - this.offsetWidth
              const maxY = bounds.height - this.offsetHeight
  
              const randX = Math.random() * maxX
              const randY = Math.random() * maxY
  
              this.style.position = "absolute"
              this.style.left = `${randX}px`
              this.style.top = `${randY}px`
            })
  
            // Handle "Yes" button click for the second question
            yesForever.addEventListener("click", () => {
              playSound("perfect")
              proposalResponse.innerHTML = `<p class="yay-text">You just made me the happiest person alive 💖💍</p>`
              createConfetti(200)
              createFloatingHearts(30)
  
              // Add special animation for this special moment
              const specialAnimation = document.createElement("div")
              specialAnimation.className = "special-animation"
              document.body.appendChild(specialAnimation)
  
              setTimeout(() => {
                specialAnimation.remove()
              }, 5000)
            })
          }
        }, 1500)
      })
    }
  
    // Add sparkle effects that follow the cursor
    document.addEventListener("mousemove", (e) => {
      if (Math.random() > 0.95) {
        // Occasional sparkle
        const sparkle = document.createElement("div")
        sparkle.className = "sparkle"
        sparkle.style.left = e.pageX + "px"
        sparkle.style.top = e.pageY + "px"
        document.body.appendChild(sparkle)
  
        setTimeout(() => {
          sparkle.remove()
        }, 1000)
      }
    })
  
    // Add a surprise animation that appears randomly
    setInterval(() => {
      if (Math.random() > 0.98) {
        // Very occasional surprise
        const surprise = document.createElement("div")
        surprise.className = "surprise-animation"
        surprise.style.left = Math.random() * 100 + "vw"
        surprise.style.top = Math.random() * 100 + "vh"
        document.body.appendChild(surprise)
  
        setTimeout(() => {
          surprise.remove()
        }, 3000)
      }
    }, 5000)
  
    // Create floating balloons
    function createFloatingBalloon() {
      const balloonsContainer = document.createElement("div")
      if (!document.getElementById("balloons-container")) {
        balloonsContainer.id = "balloons-container"
        balloonsContainer.style.position = "fixed"
        balloonsContainer.style.bottom = "0"
        balloonsContainer.style.left = "0"
        balloonsContainer.style.width = "100%"
        balloonsContainer.style.height = "100%"
        balloonsContainer.style.pointerEvents = "none"
        balloonsContainer.style.zIndex = "99"
        document.body.appendChild(balloonsContainer)
      }
  
      const container = document.getElementById("balloons-container") || balloonsContainer
  
      const balloon = document.createElement("div")
      balloon.className = "balloon"
      balloon.style.pointerEvents = "auto" // Make balloons clickable
  
      // Randomly choose pink or gold
      const color = Math.random() > 0.5 ? "#ff9ff3" : "#ffd700"
  
      // Random properties - but keep to the sides
      const size = Math.random() * 40 + 30
      // Position balloons only on the sides (0-15% or 85-100% of screen width)
      const left = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15
      const duration = Math.random() * 10 + 10
      const delay = Math.random() * 5
  
      // Apply styles
      balloon.style.width = `${size}px`
      balloon.style.height = `${size * 1.2}px`
      balloon.style.backgroundColor = color
      balloon.style.borderRadius = "50% 50% 50% 50% / 40% 40% 60% 60%"
      balloon.style.position = "absolute"
      balloon.style.bottom = "-50px"
      balloon.style.left = `${left}%`
      balloon.style.animation = `floatBalloon ${duration}s linear ${delay}s forwards`
  
      // Add string to balloon
      const string = document.createElement("div")
      string.className = "balloon-string"
      string.style.width = "1px"
      string.style.height = "40px"
      string.style.backgroundColor = "#999"
      string.style.position = "absolute"
      string.style.bottom = "-40px"
      string.style.left = "50%"
      string.style.transform = "translateX(-50%)"
  
      balloon.appendChild(string)
      container.appendChild(balloon)
  
      // Add click event to pop the balloon
      balloon.addEventListener("click", function (e) {
        e.stopPropagation()
        playSound("pop")
        this.style.animation = "balloonPop 0.3s forwards"
        setTimeout(() => {
          this.remove()
        }, 300)
      })
  
      // Remove balloon after animation
      setTimeout(
        () => {
          if (balloon.parentNode) {
            balloon.remove()
          }
        },
        (duration + delay) * 1000,
      )
    }
  
    // Add keyframes for balloon animation
    const balloonKeyframes = `
      @keyframes floatBalloon {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(${Math.random() * 30 - 15}deg);
          opacity: 0;
        }
      }
    `
    const balloonStyle = document.createElement("style")
    balloonStyle.innerHTML = balloonKeyframes
    document.head.appendChild(balloonStyle)
  
    // Create floating balloons periodically
    setInterval(() => {
      if (Math.random() > 0.9) {
        // Reduced from 0.7 to 0.9 (less frequent)
        createFloatingBalloon()
      }
    }, 3000) // Increased from 2000 to 3000 (less frequent)
  
    // Animated Butterflies that follow cursor
    const butterfliesContainer = document.createElement("div")
    butterfliesContainer.id = "butterflies-container"
    butterfliesContainer.style.position = "fixed"
    butterfliesContainer.style.top = "0"
    butterfliesContainer.style.left = "0"
    butterfliesContainer.style.width = "100%"
    butterfliesContainer.style.height = "100%"
    butterfliesContainer.style.pointerEvents = "none"
    butterfliesContainer.style.zIndex = "99"
    document.body.appendChild(butterfliesContainer)
  
    // Create butterfly elements
    const butterflyColors = ["#ff9ff3", "#ffd700", "#5f27cd", "#ff6b6b", "#48dbfb"]
    const butterflies = []
    const butterflyCount = 5
  
    for (let i = 0; i < butterflyCount; i++) {
      const butterfly = document.createElement("div")
      butterfly.className = "butterfly"
      const color = butterflyColors[Math.floor(Math.random() * butterflyColors.length)]
  
      // Create butterfly wings
      butterfly.innerHTML = `
        <div class="wing left-wing" style="background-color: ${color}"></div>
        <div class="wing right-wing" style="background-color: ${color}"></div>
        <div class="body" style="background-color: #333"></div>
      `
  
      // Set initial position
      butterfly.style.position = "absolute"
      butterfly.style.top = Math.random() * 100 + "vh"
      butterfly.style.left = Math.random() * 100 + "vw"
      butterfly.style.transform = "translate(-50%, -50%)"
  
      // Add to container
      butterfliesContainer.appendChild(butterfly)
  
      // Store butterfly data
      butterflies.push({
        element: butterfly,
        x: Number.parseInt(butterfly.style.left),
        y: Number.parseInt(butterfly.style.top),
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        targetX: Number.parseInt(butterfly.style.left),
        targetY: Number.parseInt(butterfly.style.top),
      })
    }
  
    // Add butterfly styles
    const butterflyStyles = `
      .butterfly {
        width: 30px;
        height: 30px;
        position: absolute;
        z-index: 1000;
      }
      .wing {
        position: absolute;
        width: 15px;
        height: 20px;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        animation: flutter 0.2s infinite alternate;
      }
      .left-wing {
        left: 0;
        transform-origin: right center;
      }
      .right-wing {
        right: 0;
        transform-origin: left center;
      }
      .body {
        position: absolute;
        width: 4px;
        height: 20px;
        left: 50%;
        top: 5px;
        transform: translateX(-50%);
        border-radius: 2px;
      }
      @keyframes flutter {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(60deg);
        }
      }
    `
    const butterflyStyle = document.createElement("style")
    butterflyStyle.innerHTML = butterflyStyles
    document.head.appendChild(butterflyStyle)
  
    // Update butterfly positions
    let mouseX = 0
    let mouseY = 0
  
    document.addEventListener("mousemove", (e) => {
      mouseX = e.pageX
      mouseY = e.pageY
    })
  
    function updateButterflies() {
      butterflies.forEach((butterfly, index) => {
        // Set target to mouse position with some randomness
        if (Math.random() > 0.95) {
          butterfly.targetX = mouseX + (Math.random() * 200 - 100)
          butterfly.targetY = mouseY + (Math.random() * 200 - 100)
        }
  
        // Move towards target
        const dx = butterfly.targetX - butterfly.x
        const dy = butterfly.targetY - butterfly.y
  
        butterfly.speedX = butterfly.speedX * 0.9 + dx * 0.01
        butterfly.speedY = butterfly.speedY * 0.9 + dy * 0.01
  
        // Limit speed
        const maxSpeed = 5
        const speed = Math.sqrt(butterfly.speedX * butterfly.speedX + butterfly.speedY * butterfly.speedY)
        if (speed > maxSpeed) {
          butterfly.speedX = (butterfly.speedX / speed) * maxSpeed
          butterfly.speedY = (butterfly.speedY / speed) * maxSpeed
        }
  
        // Update position
        butterfly.x += butterfly.speedX
        butterfly.y += butterfly.speedY
  
        // Apply position
        butterfly.element.style.left = butterfly.x + "px"
        butterfly.element.style.top = butterfly.y + "px"
  
        // Rotate in direction of movement
        const angle = Math.atan2(butterfly.speedY, butterfly.speedX) * (180 / Math.PI)
        butterfly.element.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
      })
  
      requestAnimationFrame(updateButterflies)
    }
  
    updateButterflies()
  
    // Create "Write Your Wish" Canvas
    const wishSection = document.createElement("div")
    wishSection.className = "wish-section"
    wishSection.innerHTML = `
      <h3>Write Your Wish</h3>
      <div class="wish-canvas">
        <textarea id="wish-text" placeholder="Type your birthday wish here..."></textarea>
        <button id="send-wish-btn" class="wish-btn">Send Wish to the Stars ✨</button>
      </div>
    `
  
    // Add wish section to the page
    const birthdayCard = document.querySelector(".birthday-card")
    if (birthdayCard) {
      birthdayCard.appendChild(wishSection)
    }
  
    // Style the wish section
    const wishStyles = `
      .wish-section {
        margin: 40px 0;
        padding: 20px;
        background: linear-gradient(135deg, #000428 0%, #004e92 100%);
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        color: white;
        position: relative;
        overflow: hidden;
      }
      
      .wish-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(white 1px, transparent 1px);
        background-size: 30px 30px;
        opacity: 0.2;
        z-index: 0;
      }
      
      .wish-canvas {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
      }
      
      #wish-text {
        width: 100%;
        height: 100px;
        padding: 15px;
        border-radius: 10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
        resize: none;
        margin-bottom: 15px;
      }
      
      #wish-text::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      
      .wish-btn {
        background-color: #ff6b6b;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 30px;
        cursor: pointer;
        font-size: 1rem;
        transition: transform 0.3s, background-color 0.3s;
      }
      
      .wish-btn:hover {
        background-color: #ff5252;
        transform: scale(1.05);
      }
      
      .shooting-star {
        position: absolute;
        width: 100px;
        height: 2px;
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
        animation: shootingStar 1.5s linear;
        z-index: 2;
      }
      
      .shooting-star::before {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      
      @keyframes shootingStar {
        0% {
          transform: translateX(-100%) translateY(100%) rotate(-45deg);
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        100% {
          transform: translateX(200%) translateY(-200%) rotate(-45deg);
          opacity: 0;
        }
      }
      
      .wish-bubble {
        position: absolute;
        padding: 10px 15px;
        background-color: rgba(255, 255, 255, 0.9);
        color: #333;
        border-radius: 20px;
        font-size: 0.9rem;
        max-width: 200px;
        animation: floatUp 4s forwards;
        z-index: 2;
      }
      
      @keyframes floatUp {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        80% {
          opacity: 0.7;
        }
        100% {
          transform: translateY(-300px) scale(0.5);
          opacity: 0;
        }
      }
    `
  
    const wishStyle = document.createElement("style")
    wishStyle.innerHTML = wishStyles
    document.head.appendChild(wishStyle)
  
    // Add functionality to the wish button
    const sendWishBtn = document.getElementById("send-wish-btn")
    const wishText = document.getElementById("wish-text")
  
    if (sendWishBtn && wishText) {
      sendWishBtn.addEventListener("click", () => {
        const wish = wishText.value.trim()
        if (wish) {
          playSound("magic")
          createShootingStar(wishSection, wish)
          wishText.value = ""
        }
      })
    }
  
    function createShootingStar(wishSection, wish) {
      // Create shooting star
      const star = document.createElement("div")
      star.className = "shooting-star"
      star.style.top = "80%" // Start from bottom
      star.style.left = "10%" // Start from left
      wishSection.appendChild(star)
  
      // Create wish bubble
      const bubble = document.createElement("div")
      bubble.className = "wish-bubble"
      bubble.textContent = wish
      bubble.style.bottom = "20px"
      bubble.style.left = 20 + Math.random() * 60 + "%"
      wishSection.appendChild(bubble)
  
      // Remove elements after animation
      setTimeout(() => {
        star.remove()
      }, 1500)
  
      setTimeout(() => {
        bubble.remove()
      }, 4000)
    }
  })
  