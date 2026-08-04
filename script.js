document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. HEADER SCROLL EFFECT
    // ==========================================================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 2. MOBILE MENU NAVIGATION
    // ==========================================================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (mobileNavOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileMenuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================================================
    // 3. CEP INPUT MASK & FORMATTING
    // ==========================================================================
    const cepInput = document.getElementById('cepInput');
    
    cepInput.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Remove non-numeric characters
        value = value.replace(/\D/g, '');
        
        // Apply 00000-000 formatting
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        
        e.target.value = value;
    });

    // ==========================================================================
    // 4. CEP SIMULATOR FLOW
    // ==========================================================================
    const cepForm = document.getElementById('cepForm');
    const simulationProgress = document.getElementById('simulationProgress');
    const simulationResult = document.getElementById('simulationResult');
    const progressStatus = document.getElementById('progressStatus');
    const progressBar = document.getElementById('progressBar');
    
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    const valVelocidade = document.getElementById('valVelocidade');
    const valLatencia = document.getElementById('valLatencia');

    window.handleCepSubmit = (event) => {
        event.preventDefault();
        
        const cepVal = cepInput.value.trim();
        // Basic validation check (must be XXXXX-XXX)
        if (cepVal.length < 9) {
            alert('Por favor, insira um CEP válido completo.');
            return;
        }

        // Hide form and display progress
        cepForm.classList.add('hidden');
        simulationProgress.classList.remove('hidden');

        // Reset progress elements
        progressBar.style.width = '0%';
        step1.className = 'active';
        step2.className = 'pending';
        step3.className = 'pending';
        progressStatus.textContent = 'Inicializando varredura orbital...';

        // Step 1: Coordinates (1.2s)
        setTimeout(() => {
            progressBar.style.width = '35%';
            step1.className = 'done';
            step2.className = 'active';
            progressStatus.textContent = 'Buscando conexão por feixe de satélites...';
            
            // Step 2: Satellites Scan (1.6s)
            setTimeout(() => {
                progressBar.style.width = '70%';
                step2.className = 'done';
                step3.className = 'active';
                progressStatus.textContent = 'Testando velocidade de transferência e latência...';
                
                // Step 3: Performance Test (1.4s)
                setTimeout(() => {
                    progressBar.style.width = '100%';
                    step3.className = 'done';
                    progressStatus.textContent = 'Conexão calibrada com sucesso!';
                    
                    // Final Transition to Results (0.6s)
                    setTimeout(() => {
                        simulationProgress.classList.add('hidden');
                        simulationResult.classList.remove('hidden');
                        
                        // Generate randomized, highly realistic Starlink metrics
                        const randomSpeed = Math.floor(Math.random() * (230 - 145 + 1)) + 145; // 145 - 230 Mbps
                        const randomLatency = Math.floor(Math.random() * (35 - 20 + 1)) + 20;   // 20 - 35 ms
                        
                        valVelocidade.textContent = `${randomSpeed} Mbps`;
                        valLatencia.textContent = `${randomLatency} ms`;
                        
                        // Start promotional urgency countdown
                        startPromoCountdown(15 * 60); // 15 minutes
                        
                        // Scroll slightly to align result card beautifully
                        document.getElementById('simulador').scrollIntoView({ behavior: 'smooth' });
                    }, 600);
                    
                }, 1400);
                
            }, 1600);
            
        }, 1200);
    };

    // ==========================================================================
    // 5. COUNTDOWN TIMER (Urgency driver for Presell)
    // ==========================================================================
    const countdownEl = document.getElementById('countdown');
    let timerInterval;

    function startPromoCountdown(durationSeconds) {
        let timeRemaining = durationSeconds;
        
        // Clear any pre-existing timer
        if (timerInterval) clearInterval(timerInterval);
        
        const updateTimer = () => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            
            // Format leading zeroes
            const minStr = minutes < 10 ? '0' + minutes : minutes;
            const secStr = seconds < 10 ? '0' + seconds : seconds;
            
            countdownEl.textContent = `${minStr}:${secStr}`;
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                countdownEl.textContent = '00:00';
            } else {
                timeRemaining--;
            }
        };

        updateTimer(); // Initial call
        timerInterval = setInterval(updateTimer, 1000);
    }

    // ==========================================================================
    // 6. FAQ ACCORDION INTERACTIVITY
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                // Set max-height dynamically to content size for smooth transition
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
