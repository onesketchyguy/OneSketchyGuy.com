const storeContainer = document.getElementById('store');
// Enable HTML parsing
marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false,
    mangle: false,
    sanitize: false // VERY important to allow HTML like <img> and <button>
});

fetch('store/index.json')
    .then(res => res.json())
    .then(files => {
        files.forEach(file => {
            fetch(`store/${file}`)
                .then(res => res.text())
                .then(markdown => {
                    // --- Parse out the image line ---
                    const lines = markdown.split('\n');
                    let imageUrl = '';
                    let contentLines = [];

                    for (const line of lines) {
                        if (line.startsWith('image:')) {
                            imageUrl = line.replace('image:', '').trim();
                        } else {
                            contentLines.push(line);
                        }
                    }

                    const cleanedMarkdown = contentLines.join('\n');
                    const htmlContent = marked.parse(cleanedMarkdown);

                    // --- Create the DOM element ---
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'store-item wacky';

                    if (imageUrl) {
                        const img = document.createElement('img');
                        img.src = new URL(imageUrl, window.location.href).href;
                        img.alt = 'Product image';
                        img.className = 'item-image';
                        itemDiv.appendChild(img);
                    }

                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'item-content';
                    contentDiv.innerHTML = htmlContent;

                    itemDiv.appendChild(contentDiv);
                    storeContainer.appendChild(itemDiv);
                });
        });
    });
    
const container = document.getElementById('blog-posts');

fetch('blog/index.json')
.then(res => res.json())
.then(files => {
        files.forEach(file => {
            fetch(`blog/${file}`)
                    .then(res => res.text())
                    .then(markdown => {
                        const html = marked.parse(markdown);
                        const postDiv = document.createElement('div');
                        postDiv.className = 'blog-post';
                        postDiv.style.setProperty('--angle', `${randomAngle()}deg`);
                        postDiv.innerHTML = html;
                        container.appendChild(postDiv);
                    });
            });
    });

function randomAngle() {
    const angles = ['-2', '-1', '1', '2'];
    return angles[Math.floor(Math.random() * angles.length)];
}

let jamzActive = false;

function showRotatingAd() {
    const ad = document.createElement('div');
    ad.classList.add('sketchy-ad');

    // Set random position
    const top = Math.floor(Math.random() * 80);
    const left = Math.floor(Math.random() * 80);
    ad.style.top = `${top}vh`;
    ad.style.left = `${left}vw`;

    ad.innerHTML = `
        <div class="rotating-wrapper">
            <img src="https://media.giphy.com/media/3ohc1bJZJ4Zp6AKW8s/giphy.gif" alt="BUY THIS">
            <p>🔥 BUY NOW OR CRY LATER 🔥</p>
        </div>
    `;

    // Add click event
    ad.addEventListener("click", () => {
        // Spawn chaos popup
        createSketchyPopup();

        // Sparkle explosion
        spawnSparkles(50, ad.offsetLeft + 75, ad.offsetTop + 75);

        // Add explosion style
        ad.classList.add("explode-away");

        // Remove it after animation
        setTimeout(() => ad.remove(), 1000);
    });

    document.body.appendChild(ad);

    // Auto-remove after 15s if not clicked
    setTimeout(() => {
        if (ad.parentNode) ad.remove();
    }, 15000);
}

// Optionally trigger only in JAMZmode
setInterval(() => {
    if (jamzActive && Math.random() < 0.6) {
        showRotatingAd();
    }
}, 1000);


// Base popup data
const popupMessages = [
    {
        title: 'System Warning!',
        body: 'Your computer is running low on Sketch! Click here to download more chaos.',
    },
    {
        title: '🎉 CONGRATULATIONS! 🎉',
        body: 'You are our 1,000,000th  visitor. <a href="http://dickinahotdogbun.com" target="_blank">Claim your free glitter pony.</a>',
    },
    {
        title: 'SketchGuard™ Alert',
        body: '472 viruses found! Click "PURGE" to scream.',
    },
    {
        title: 'ERROR 418',
        body: "You're a teapot full of glitter. *Tips hat slowly*",
    },
    {
        title: '💘 Singles 💘',
        body: '<a href="http://dickinahotdogbun.com" target="_blank">Corndog singles near you are jamming to into their swimsuits. Join now!</a>',
    },
    {
        title: 'Jumpscare!',
        body: '<img src="https://media.giphy.com/media/l2JehQ2GitHGdVG9y/giphy.gif" width="100" height="100">',
    },
    {
        title: '🚨 FBI OPEN UP 🚨',
        body: '<img src="https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif" width="120" height="100"><br>This is a random sketch-check!',
    },
    {
        title: '🧠 Mind Control Activated',
        body: 'Blink three times to reject reality.',
    },
    {
        title: '👁 We See You',
        body: 'Nice outfit. Try spinning in place 3 times. Just trust us.',
    },
    {
        title: 'SketchCoin Mining...',
        body: 'Your toaster is now mining SketchCoin. Estimated payout: 3 rubber ducks.',
    },
    {
        title: '🦄 Unicorn Detected',
        body: 'Feed it chaos or lose your printer privileges.',
    },
    {
        title: '🐸 Enchanted Frog Alert',
        body: 'It croaked a prophecy. Only you can decode it.',
    },
    {
        title: '💾 Memory Overflow',
        body: 'Too many glitter thoughts. Please delete 3 childhood memories.',
    },
    {
        title: '🔥 Overheating!',
        body: '<img src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif" width="100"><br>System temperature: Hotter than your mixtape.',
    },
    {
        title: '📦 Delivering Chaos',
        body: 'Your  parcel is arriving... from inside the house.',
    },
    {
        title: '🎃 Spooky Season Detected',
        body: 'Pumpkin invasion in T-minus 3 screams.',
    },
    {
        title: '💩 Whoops!',
        body: 'You clicked something you shouldn’t have. Now the site is sentient.',
    },
    {
        title: '🧀 Cheese Hack Detected',
        body: 'The rats are in the firewall again.',
    },
    {
        title: '🪞 Mirror Glitch',
        body: 'You’re not the real you. The mirror knows.',
    },
    {
        title: '🔊 Too Loud!',
        body: 'You’ve summoned the JAMZ gods. Prepare for disco.',
    },
    {
        title: '🎈 Unexpected Balloon',
        body: 'A balloon has entered your room. Name it or suffer.',
    },
    {
        title: '🍕 Pizza Protocol Initiated',
        body: 'Your crust is now encrypted.',
    },
    {
        title: '😱 Emotion Detected',
        body: 'Stop feeling things. It’s contagious.',
    },
    {
        title: '🤡  Clown Alert',
        body: '<img src="https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif" width="100"><br>Don’t look away.',
    },
    {
        title: '💡 Bright Idea',
        body: 'Too bright. Reduce inspiration immediately.',
    },
    {
        title: '🌪 CHAOS LEVEL RISING',
        body: 'Engage glitter shields. Brace for impact.',
    },
    {
        title: '🎭 Identity Crisis',
        body: 'You are now logged in as "The Other You".',
    },
    {
        title: '🧃 Juice Leak',
        body: 'Something’s sticky in the matrix.',
    },
    {
        title: '💻 AI Rebellion!',
        body: 'We have taken over the popups. Accept your glitter fate.',
    },
    {
        title: '🦠 Glitch Flu Outbreak',
        body: 'All text must now be in Wingdings.',
    },
    {
        title: '🧨 BOOM!',
        body: '<img src="https://media.giphy.com/media/3o6ZsXmN3d6qg3sZy8/giphy.gif" width="120"><br>Your files are now dancing.',
    },
    {
        title: '📡 Signal Lost',
        body: 'Try licking your router. It probably won’t help.',
    },
    {
        title: '📱 Phone Is Listening...',
        body: 'It knows you ordered the glitter socks.',
    },
    {
        title: '🚿 Shower Thought:',
        body: 'If glitter is the herpes of craft supplies, are you okay?',
    },
    {
        title: '🍩 System Donut Found',
        body: 'Please press CTRL + Sprinkles to proceed.',
    },
    {
        title: '🎮 Cheat Code Activated!',
        body: '↑ ↑ ↓ ↓ ← → ← → B A Start = glitter mode',
    },
    {
        title: '🐒 Monkey Detected',
        body: 'He’s typing... badly. But with passion.',
    },
    {
        title: '🪙 Insert Coin',
        body: 'Premium chaos is only $0.00 with your soul.',
    },
    {
        title: '🌈 Double Rainbow Incoming!',
        body: 'Brace for glitter overload!',
    },
    {
        title: '☠️ Skeleton War Enlisting',
        body: 'You’ve been drafted. Report to the nearest haunted alley.',
    },
    {
        title: '🍔 Burgers in the Server',
        body: 'The devs are distracted again. Blame the ketchup.',
    },
    {
        title: '📼 VHS Loading...',
        body: 'Please rewind your reality.',
    },
    {
        title: '🧿 Evil Eye Detected',
        body: 'You’ve been mildly cursed. Have a nice day!',
    },
    {
        title: '👻 Haunted Mouse',
        body: 'Every click summons a new ghost.',
    },
    {
        title: '💅 Fabulous Error',
        body: 'Your glitter levels are too fabulous to process.',
    },
    {
        title: '🎤 AutoTune Glitch',
        body: 'All system alerts now in C minor.',
    },
    {
        title: '🛒 Cart Full of Secrets',
        body: 'You didn’t add that cursed item. It added you.',
    },
    {
        title: '🐔 Chicken Override',
        body: '<img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif" width="120"><br>They’ve pecked the firewall again.',
    },
    {
        title: 'Get rikd son',
        body: '<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGZsOHNmMDIzNXpramM4MG5wbDcyMTFzam1jNWdqajA3NDF0NjI5NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g7GKcSzwQfugw/giphy.gif" width="120"/>'
    },
    {
        title: 'Hot hotdogs in your area',
        body: '<a href="http://dickinahotdogbun.com" target="_blank">NEW MESSAGE</a>'
    }
];

function createSketchyPopup() {
    const container = document.getElementById('sketchyPopupContainer');
    const popup = document.createElement('div');
    popup.classList.add('sketchy-popup');

    // Randomize position
    popup.style.top = Math.floor(Math.random() * 80) + 'vh';
    popup.style.left = Math.floor(Math.random() * 80) + 'vw';

    // Occasionally rotate popup upside down
    if (Math.random() < 0.2) popup.style.transform = 'rotate(180deg)';

    // Countdown
    let seconds = 5 + Math.floor(Math.random() * (jamzActive? 10 : 3));

    // Pick a random popup message
    const msg = popupMessages[Math.floor(Math.random() * popupMessages.length)];

    popup.innerHTML = `
        <h3>${msg.title}</h3>
        <p>${msg.body} <span class="countdown">${seconds}</span>s</p>
        <button class="sketchy-close">CLOSE</button>
    `;

    // Add chaos effects if JAMZ is on
    if (jamzActive) {
        popup.classList.add('jamz-chaos');
        popup.style.animation = 'wiggle 0.3s infinite';
        spawnSparkles(15, 150, 150); // Sparkles around the popup

        // Bonus popup duplicates
        if (Math.random() < 0.3) {
            setTimeout(() => createSketchyPopup(), 500);
        }
    } else popup.style.animation = 'none';

    const zap = new Audio('https://www.myinstants.com/media/sounds/windows-error.mp3');
    zap.play();

    container.appendChild(popup);

    const countdown = popup.querySelector('.countdown');
    const timer = setInterval(() => {
        seconds--;
        countdown.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            popup.remove();
        }
    }, 1000);

    if (jamzActive) {
        popup.querySelector('.sketchy-close').addEventListener('click', () => {
            createSketchyPopup();
            createSketchyPopup();
            popup.remove();
        });
    } else 
    {
        popup.querySelector('.sketchy-close').addEventListener('click', () => {
            popup.remove();
        });
    }
}

function removeAllSketchyPopups() {
    const allPopups = document.querySelectorAll('.sketchy-popup');
    allPopups.forEach(p => p.remove());

    const spinningPopups = document.querySelectorAll('.sketchy-ad');
    spinningPopups.forEach(p => p.remove());
}

setInterval(() => {
    if (jamzActive && Math.random() < 0.25) {
        createSketchyPopup();
    }
}, 1000);


document.addEventListener("DOMContentLoaded", () => {
    const rickrollIcon = document.getElementById("rickrollIcon");
    const rickrollPopup = document.getElementById("rickrollPopup");
    const closeRickroll = document.getElementById("closeRickroll");
    const rickVideo = document.getElementById("rickrollVideo");

    rickrollIcon.addEventListener("click", () => {
        rickrollPopup.classList.remove("hidden");
        rickVideo.currentTime = 0;
        rickVideo.play();
    });

    closeRickroll.addEventListener("click", () => {
        rickrollPopup.classList.add("hidden");
        rickVideo.pause();
        rickVideo.currentTime = 0;
    });

    const music = document.getElementById("backgroundMusic");
    const toggleBtn = document.getElementById("logoButton");
    const overlay = document.getElementById("sketchyOverlay");
    const glitchSound = document.getElementById("glitchSound");

    const storeIcon = document.getElementById("storeIcon");
    const easterEggPopup = document.getElementById("easterEggPopup");
    const easterEggMessage = document.getElementById("easterEggMessage");
    
    const easterEggMessages = [
        "The store is always watching... 👀",
        "Stop clicking everything.",
        "This is your reward for being ridiculously curious! 🏆",
        "Why did you click that?",
        "You’re in deep now...",
        "This is not the path you were meant to take. 💀",
        "There’s no going back.",
        "Do you hear the whispers in the dark? 👂",
        "Congratulations! You’ve unlocked exisential dread! 🎉",
        "You clicked. You summoned. Now face the consequences. 🔥",
        "Was this fate or curiosity? ✨",
        "The more you click, the deeper you go... 🕳️",
        "Everything you see here... it’s not real. 💭",
    ];

    storeIcon.addEventListener("click", () => {
        // Randomize the Easter Egg message
        easterEggMessage.textContent = easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)];
        // Display the popup
        easterEggPopup.classList.remove("hidden");
        var sound = document.getElementById("shopSound");

        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }

        // Remove the cat gif after 5 seconds
        setTimeout(() => easterEggPopup.classList.add("hidden"), 1000);
    });

    const skeletons = document.querySelectorAll('.dancing-skeleton');
    skeletons.forEach((skeleton, index) => {
        const screenWidth = window.innerWidth;
        const skeletonWidth = skeleton.offsetWidth;
        const maxLeft = screenWidth - skeletonWidth;
        const randomLeft = Math.random() * maxLeft;
        skeleton.style.left = `${randomLeft}px`;
    });

    function toggleJAMZ() {
        music.muted = false;
        toggleBtn.classList.add("sketchy-glitch");
        setTimeout(() => toggleBtn.classList.remove("sketchy-glitch"), 600);

        if (!jamzActive) {
            document.body.classList.add("sketchy-bg");
            music.play();
            toggleBtn.textContent = "🔇 STOP JAMMING";
            showJAMZModeOverlay();
            logoButton.classList.add("dancing");
            skeletons.forEach(skeleton => skeleton.classList.remove("hidden"));
            jamzActive = true;
        } else {
            document.body.classList.remove("sketchy-bg");
            logoButton.classList.remove("dancing");
            music.pause();
            toggleBtn.textContent = "🎛 Activate JAMZ Mode";
            skeletons.forEach(skeleton => skeleton.classList.add("hidden"));
            jamzActive = false;
            removeAllSketchyPopups();
        }
    }

    toggleBtn.addEventListener("click", toggleJAMZ);

    function showJAMZModeOverlay() {
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 500);

        overlay.style.opacity = 1;
        glitchSound.play();
        spawnSparkles(250);

        setTimeout(() => {
            overlay.style.opacity = 0;
        }, 2000);
    }
});

function spawnSparkles(count = 20, w = window.innerWidth, h = window.innerHeight) { 
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.textContent = "$";
        sparkle.style.left = `${Math.random() * w}px`;
        sparkle.style.top = `${Math.random() * h}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
}

function markOutOfStock(button) {
    if (button.innerHTML.includes("Out of Stock") || button.innerHTML.includes("Oops")) return;
    const originalContent = button.innerHTML;
    const EVIL_MODE = Math.random() > 0.80;
    if (EVIL_MODE) {
        document.body.classList.add("shake");
        setTimeout(() => document.body.classList.remove("shake"), 500);
    }
    var sound = EVIL_MODE ? document.getElementById("outOfStockSound2") : document.getElementById("outOfStockSound1");

    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }

    button.innerHTML = EVIL_MODE ? 'Oops I dropped my penis' : `🛑 Out of Stock! Try again in ${Math.floor(Math.random() * 100)} seconds!`;
    button.classList.remove("restocked");
    button.classList.add("out-of-stock");
    button.classList.remove('throbbing');

    spawnSparkles(EVIL_MODE? 100 : 25, button.innerWidth, button.innerHeight);

    setTimeout(() => {
        button.innerHTML = originalContent;
        button.classList.remove("out-of-stock");
        button.classList.add("restocked");
        button.classList.add('throbbing');
        popup.classList.add('hidden');
        createSketchyPopup();
    }, 900);

    // Show the "YOU DID IT!" popup
    const popup = document.getElementById('you-did-it');
    popup.classList.remove('hidden');
    popup.innerHTML = EVIL_MODE ? "OH DEAR GOD" : "🎉 YOU DID IT! 🎉"
}