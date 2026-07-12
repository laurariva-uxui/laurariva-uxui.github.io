document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.timeline-container');
  const svg = document.getElementById('timelineSvg');
  const dots = document.querySelectorAll('.dot');

  function drawLines() {
    if (!svg || !container || dots.length === 0) return;
    
    svg.innerHTML = '';
    const { left: cLeft, top: cTop } = container.getBoundingClientRect();

    for (let i = 0; i < dots.length - 1; i++) {
      const start = dots[i].getBoundingClientRect();
      const end = dots[i+1].getBoundingClientRect();

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      
      line.setAttribute('x1', start.left + start.width / 2 - cLeft);
      line.setAttribute('y1', start.top + start.height / 2 - cTop);
      line.setAttribute('x2', end.left + end.width / 2 - cLeft);
      line.setAttribute('y2', end.top + end.height / 2 - cTop);
      
      svg.appendChild(line);
    }
  }

  // ========================================================
  // NUOVO CODICE: FUNZIONE DI LAMPEGGIO JAVASCRIPT
  // ========================================================
  let orologioLampeggio = null;
  let visibile = true;

  function avviaLampeggio() {
    // Se c'è già un lampeggio attivo, lo resettiamo
    if (orologioLampeggio) clearInterval(orologioLampeggio);

    orologioLampeggio = setInterval(() => {
      dots.forEach(dot => {
        // Facciamo lampeggiare i cerchi SOLO SE non sono aperti (senza popup visibile)
        if (!dot.classList.contains('is-open')) {
          dot.style.transition = 'opacity 0.4s ease-in-out';
          dot.style.opacity = visibile ? '0.4' : '1';
        } else {
          dot.style.opacity = '1'; // Se è aperto resta fisso al 100%
        }
      });
      visibile = !visibile;
    }, 800); // Cambia stato ogni 800 millisecondi (regola il tempo come preferisci)
  }

  // Avviamo il lampeggio automatico
  avviaLampeggio();
  // ========================================================

  dots.forEach(dot => {
    // Quando il mouse passa sopra (hover), forziamo l'opacità a 1 per non farlo sbiadire
    dot.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
    });

    // Quando il mouse esce, si riallinea al lampeggio
    dot.addEventListener('mouseleave', () => {
      if (!dot.classList.contains('is-open')) {
        dot.style.opacity = visibile ? '1' : '0.4';
      }
    });

    dot.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const isOpen = dot.classList.contains('is-open');

      dots.forEach(d => {
        d.classList.remove('is-open');
        d.style.opacity = '1'; // Reset opacità al click sugli altri
      });
      container.classList.remove('is-active');

      if (!isOpen) {
        dot.classList.add('is-open');
        dot.style.opacity = '1';
        container.classList.add('is-active'); 
      }
    });
  });

  document.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('is-open'));
    if (container) container.classList.remove('is-active');
  });

  window.addEventListener('resize', drawLines);
  
  setTimeout(drawLines, 500);
});






// HAMBURGER
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }
});






// EMAILJS
(function() {
    emailjs.init("5YJjmC-eudVzMunqS");
})();

window.onload = function() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('button-send');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        btn.innerText = 'Invio in corso...';
        btn.disabled = true;

        emailjs.sendForm('service_ckut7dz', 'template_ruhbq9o', this)
            .then(function() {
                alert('Grazie Laura! Il messaggio è stato inviato correttamente.');
                btn.innerText = 'Invia messaggio';
                btn.disabled = false;
                form.reset(); 
            }, function(error) {
                alert('Errore nell\'invio: ' + JSON.stringify(error));
                btn.innerText = 'Riprova';
                btn.disabled = false;
            });
    });
}