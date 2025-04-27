document.addEventListener("DOMContentLoaded", () => {
    const THREE = window.THREE;
    const gsap = window.gsap;

    const cakeContainer = document.getElementById("cake-container");
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffeaf3);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.domElement.id = "cake-canvas";
    renderer.domElement.style.pointerEvents = "none";
    cakeContainer.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    const cakeBaseGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
    const cakeBaseMaterial = new THREE.MeshPhongMaterial({ color: 0xf8bbd0 });
    const cakeBase = new THREE.Mesh(cakeBaseGeometry, cakeBaseMaterial);
    cakeBase.position.y = 0.25;
    cakeBase.castShadow = true;
    cakeBase.receiveShadow = true;
    cakeGroup.add(cakeBase);

    const cakeMiddleGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32);
    const cakeMiddleMaterial = new THREE.MeshPhongMaterial({ color: 0xf48fb1 });
    const cakeMiddle = new THREE.Mesh(cakeMiddleGeometry, cakeMiddleMaterial);
    cakeMiddle.position.y = 0.75;
    cakeMiddle.castShadow = true;
    cakeMiddle.receiveShadow = true;
    cakeGroup.add(cakeMiddle);

    const cakeTopGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
    const cakeTopMaterial = new THREE.MeshPhongMaterial({ color: 0xec407a });
    const cakeTop = new THREE.Mesh(cakeTopGeometry, cakeTopMaterial);
    cakeTop.position.y = 1.25;
    cakeTop.castShadow = true;
    cakeTop.receiveShadow = true;
    cakeGroup.add(cakeTop);

    const frostingPositions = [
        { y: 0.5, radius: 2, color: 0xfce4ec },
        { y: 1, radius: 1.5, color: 0xfce4ec },
        { y: 1.5, radius: 1, color: 0xfce4ec }
    ];

    frostingPositions.forEach((pos) => {
        const frostingGeometry = new THREE.TorusGeometry(pos.radius, 0.1, 16, 100);
        const frostingMaterial = new THREE.MeshPhongMaterial({ color: pos.color });
        const frosting = new THREE.Mesh(frostingGeometry, frostingMaterial);
        frosting.rotation.x = Math.PI / 2;
        frosting.position.y = pos.y;
        frosting.castShadow = true;
        cakeGroup.add(frosting);
    });

    const candlePositions = [
        { x: 0, z: 0 },
        { x: 0.5, z: 0.5 },
        { x: -0.5, z: 0.5 },
        { x: 0.5, z: -0.5 },
        { x: -0.5, z: -0.5 }
    ];

    const candles = [];
    const flames = [];

    candlePositions.forEach((pos) => {
        const candleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16);
        const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const candle = new THREE.Mesh(candleGeometry, candleMaterial);
        candle.position.set(pos.x, 1.75, pos.z);
        candle.castShadow = true;
        cakeGroup.add(candle);
        candles.push(candle);

        const flameGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const flameMaterial = new THREE.MeshPhongMaterial({
            color: 0xff9800,
            emissive: 0xff9800,
            emissiveIntensity: 1,
            shininess: 100
        });
        const flame = new THREE.Mesh(flameGeometry, flameMaterial);
        flame.position.set(pos.x, 2.05, pos.z);
        flame.scale.y = 1.5;
        cakeGroup.add(flame);
        flames.push(flame);

        const flameLight = new THREE.PointLight(0xff9800, 0.5, 1);
        flameLight.position.set(pos.x, 2.05, pos.z);
        cakeGroup.add(flameLight);
    });

    for (let i = 0; i < 50; i++) {
        const sprinkleGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.2);
        const sprinkleMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(Math.random(), 1, 0.5)
        });
        const sprinkle = new THREE.Mesh(sprinkleGeometry, sprinkleMaterial);

        const layer = Math.floor(Math.random() * 3);
        const radius = layer === 0 ? 2 : layer === 1 ? 1.5 : 1;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * radius * 0.8;

        sprinkle.position.x = Math.cos(angle) * r;
        sprinkle.position.z = Math.sin(angle) * r;
        sprinkle.position.y = layer === 0 ? 0.5 : layer === 1 ? 1 : 1.5;

        sprinkle.rotation.x = Math.random() * Math.PI;
        sprinkle.rotation.y = Math.random() * Math.PI;
        sprinkle.rotation.z = Math.random() * Math.PI;

        sprinkle.castShadow = true;
        cakeGroup.add(sprinkle);
    }

    function animate() {
        requestAnimationFrame(animate);

        flames.forEach((flame) => {
            flame.scale.y = 1.5 + Math.sin(Date.now() * 0.01) * 0.2;
            flame.scale.x = 1 + Math.sin(Date.now() * 0.01) * 0.1;
            flame.scale.z = 1 + Math.cos(Date.now() * 0.01) * 0.1;
        });

        renderer.render(scene, camera);
    }

    animate();

    let candlesLit = true;

    document.addEventListener("click", () => {
        if (candlesLit) {
            flames.forEach((flame) => {
                cakeGroup.remove(flame);
            });

            scene.children.forEach((child) => {
                if (child instanceof THREE.PointLight) {
                    cakeGroup.remove(child);
                }
            });

            for (let i = 0; i < candles.length; i++) {
                createSmokeEffect(candles[i].position);
            }

            candlesLit = false;

            if (typeof createConfetti === "function") {
                createConfetti(100);
            }
        }
    });

    function createSmokeEffect(position) {
        const smokeParticles = [];

        for (let i = 0; i < 5; i++) {
            const smokeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const smokeMaterial = new THREE.MeshBasicMaterial({
                color: 0xdddddd,
                transparent: true,
                opacity: 0.7
            });

            const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
            smoke.position.copy(position);
            smoke.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    Math.random() * 0.02 + 0.01,
                    (Math.random() - 0.5) * 0.01
                ),
                age: 0,
                maxAge: 100 + Math.random() * 50
            };

            scene.add(smoke);
            smokeParticles.push(smoke);
        }

        function animateSmoke() {
            for (let i = smokeParticles.length - 1; i >= 0; i--) {
                const particle = smokeParticles[i];

                particle.position.add(particle.userData.velocity);
                particle.userData.age++;

                particle.material.opacity = 0.7 * (1 - particle.userData.age / particle.userData.maxAge);
                particle.scale.x += 0.01;
                particle.scale.y += 0.01;
                particle.scale.z += 0.01;

                if (particle.userData.age >= particle.userData.maxAge) {
                    scene.remove(particle);
                    smokeParticles.splice(i, 1);
                }
            }

            if (smokeParticles.length > 0) {
                requestAnimationFrame(animateSmoke);
            }
        }

        animateSmoke();
    }

    gsap.to(cakeGroup.position, {
        y: "+=0.5",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    let lastScrollY = 0;
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const delta = scrollY - lastScrollY;
        cakeGroup.rotation.y += delta * 0.001;
        lastScrollY = scrollY;
    });
});