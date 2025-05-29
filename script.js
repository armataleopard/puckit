// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor on hover for buy button
    const buyButton = document.querySelector('.buy-button');
    buyButton.addEventListener('mouseenter', () => {
        cursor.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23ffd700\"><path d=\"M12 2c-0.5 0-1 0.3-1.2 0.8L8.8 8H3c-0.6 0-1 0.4-1 1 0 0.3 0.1 0.5 0.3 0.7l4.6 3.4-1.7 5.5c-0.2 0.6 0.1 1.2 0.7 1.4 0.2 0.1 0.5 0.1 0.7 0l4.4-3.2 4.4 3.2c0.5 0.4 1.2 0.3 1.6-0.2 0.2-0.2 0.2-0.5 0.2-0.7l-1.8-5.5 4.6-3.4c0.5-0.4 0.6-1.1 0.2-1.6C19.9 8.1 19.7 8 19.4 8h-5.8l-2-5.2C11.4 2.3 10.9 2 10.4 2H12z\"/></svg>')";
        cursor.style.transform = 'scale(1.5) rotate(15deg)';
    });
    
    buyButton.addEventListener('mouseleave', () => {
        cursor.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23c0c0c0\"><path d=\"M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z\"/></svg>')";
        cursor.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Vault door sound effect
    const vaultDoor = document.querySelector('.vault-door');
    const metalSound = new Audio('data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMAVFlFUgAAAAYAAABPdGhlcgBUQ09OAAAACwAAAFNvdW5kIEVmZmVjdABUUlRJAAAAGgAAAFNvdW5kIEVmZmVjdCBieSBTb3VuZEpheQAAAEFQSUMAAAAlAAAAaHR0cDovL3d3dy5zb3VuZGpheS5jb20vYXBpL3NvdW5kZWZmZWMAVFJDSwAAAAEAAAA=');
    
    vaultDoor.addEventListener('mouseenter', () => {
        metalSound.play().catch(e => console.log('Audio play failed:', e));
    });
    
    // Buy button effect
    buyButton.addEventListener('click', () => {
        buyButton.classList.add('clicked');
        setTimeout(() => {
            buyButton.classList.remove('clicked');
        }, 300);
        
        // Create money particle effect
        createMoneyEffect();
    });
    
    // Create money particle effect
    function createMoneyEffect() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('money-particle');
            particle.style.setProperty('--x', Math.random() * 200 - 100 + 'px');
            particle.style.setProperty('--y', Math.random() * -300 - 50 + 'px');
            particle.style.setProperty('--rotation', Math.random() * 520 + 'deg');
            particle.style.setProperty('--delay', Math.random() * 0.3 + 's');
            
            buyButton.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const tokenName = document.querySelector('.token-name');
        // Reduced the movement range to avoid overlapping
        tokenName.style.transform = `skew(-5deg) translate(${x * 10}px, ${y * 10}px)`;
        
        // Ensure the tagline moves together with the token name to avoid overlapping
        const tagline = document.querySelector('.tagline');
        tagline.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        
        // Add slight movement to the background elements for depth
        const lights = document.querySelector('.lights');
        const smoke = document.querySelector('.smoke');
        
        lights.style.transform = `translate(${x * -5}px, ${y * -5}px)`;
        smoke.style.transform = `translate(${x * -15}px, ${y * -5}px)`;
    });
});

// Add CSS for money particles
const style = document.createElement('style');
style.textContent = `
.money-particle {
    position: absolute;
    width: 20px;
    height: 10px;
    background: #ffd700;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: money-fly 1s forwards var(--delay);
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.8);
}

.money-particle::before {
    content: '$';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #111;
    font-size: 8px;
    font-weight: bold;
}

@keyframes money-fly {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1) rotate(var(--rotation));
        opacity: 0;
    }
}

.buy-button.clicked {
    transform: skew(-5deg) scale(0.95);
}`;

document.head.appendChild(style); 