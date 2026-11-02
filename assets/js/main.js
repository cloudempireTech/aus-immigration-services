/* Aus Immigration Services — Interactive JavaScript */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
      }
    });
  }

  // Visa Portfolio Filter Rail
  const filterBtns = document.querySelectorAll('.filter-btn');
  const visaCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && visaCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        visaCards.forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Interactive Australian Visa Points & Scope Estimator
  const pointsForm = document.getElementById('points-calculator-form');
  if (pointsForm) {
    function calculatePoints() {
      const ageVal = parseInt(document.getElementById('calc-age')?.value || '0', 10);
      const englishVal = parseInt(document.getElementById('calc-english')?.value || '0', 10);
      const overseasExpVal = parseInt(document.getElementById('calc-overseas-exp')?.value || '0', 10);
      const ausExpVal = parseInt(document.getElementById('calc-aus-exp')?.value || '0', 10);
      const eduVal = parseInt(document.getElementById('calc-education')?.value || '0', 10);
      const ausStudyVal = parseInt(document.getElementById('calc-aus-study')?.value || '0', 10);
      const partnerVal = parseInt(document.getElementById('calc-partner')?.value || '0', 10);
      const nominationVal = parseInt(document.getElementById('calc-nomination')?.value || '0', 10);

      const totalPoints = ageVal + englishVal + overseasExpVal + ausExpVal + eduVal + ausStudyVal + partnerVal + nominationVal;

      const scoreDisplay = document.getElementById('calc-total-score');
      const statusDisplay = document.getElementById('calc-status-badge');
      const adviceDisplay = document.getElementById('calc-advice-text');

      if (scoreDisplay) scoreDisplay.textContent = totalPoints;

      if (statusDisplay && adviceDisplay) {
        if (totalPoints >= 65) {
          statusDisplay.textContent = 'Eligible for Expression of Interest (EOI)';
          statusDisplay.style.background = 'rgba(37, 211, 102, 0.2)';
          statusDisplay.style.color = '#4ade80';
          statusDisplay.style.borderColor = 'rgba(37, 211, 102, 0.4)';
          adviceDisplay.textContent = `Excellent! With ${totalPoints} points, you meet or exceed the statutory Department of Home Affairs threshold of 65 points for SkillSelect. Consult with Registered Migration Agent Biljana Saleva (MARN 0964001) to verify your skill assessment and state nomination options.`;
        } else {
          const needed = 65 - totalPoints;
          statusDisplay.textContent = `Need ${needed} More Point${needed > 1 ? 's' : ''} for 65 Pass Mark`;
          statusDisplay.style.background = 'rgba(239, 68, 68, 0.15)';
          statusDisplay.style.color = '#f87171';
          statusDisplay.style.borderColor = 'rgba(239, 68, 68, 0.35)';
          adviceDisplay.textContent = `Currently at ${totalPoints} points. You can boost your score via PTE/IELTS Superior English (+10/20), State Nomination Subclass 190 (+5), Regional Subclass 491 (+15), or partner skills. Schedule a consultation to plan your roadmap.`;
        }
      }
    }

    pointsForm.addEventListener('change', calculatePoints);
    calculatePoints();
  }
});
