// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create animated background particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#6366f1',
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
scene.add(ambientLight);

// Add point lights
const pointLight1 = new THREE.PointLight(0x6366f1, 2);
pointLight1.position.set(20, 20, 20);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x818cf8, 2);
pointLight2.position.set(-20, -20, -20);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x4f46e5, 1.5);
pointLight3.position.set(0, 30, -20);
scene.add(pointLight3);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Parallax effect on scroll
let scrollPercent = 0;
document.addEventListener('scroll', () => {
    scrollPercent = 
        (document.documentElement.scrollTop || document.body.scrollTop) /
        ((document.documentElement.scrollHeight || document.body.scrollHeight) - 
        document.documentElement.clientHeight);
});

// Enhanced 3D Card Tilt Effect
const cards = document.querySelectorAll('.feature-card, .course-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(50px)
            scale(1.05)
        `;
        
        // Add glow effect on hover
        card.style.boxShadow = `
            0 5px 15px rgba(99, 102, 241, 0.2),
            0 0 30px rgba(99, 102, 241, 0.1)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        card.style.boxShadow = 'none';
    });
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Enhanced particle animation
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;
    
    // Wave effect for particles
    const positions = particlesMesh.geometry.attributes.position.array;
    const time = Date.now() * 0.0001;
    
    for(let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i] * 0.5) * 0.01;
    }
    particlesMesh.geometry.attributes.position.needsUpdate = true;

    // Smooth mouse movement
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    particlesMesh.rotation.y += 0.3 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.3 * (targetY - particlesMesh.rotation.x);

    // Enhanced parallax effect
    camera.position.z = 30 + scrollPercent * 15;
    camera.rotation.x = scrollPercent * 0.3;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate(); 