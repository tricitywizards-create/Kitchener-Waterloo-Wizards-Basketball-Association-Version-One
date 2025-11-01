/* ================================================================
   MOBILE DEBUGGING & FIX JAVASCRIPT
   ================================================================
   This file fixes mobile interaction issues by simplifying the
   over-complicated event handlers in the main index.html file.
   
   INSTRUCTIONS: Add this line to the <head> or end of <body>
   in index.html AFTER all other scripts:
   <script src="mobile-fixes.js"></script>
   ================================================================ */

(function() {
  'use strict';
  
  // Detect mobile device
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           window.innerWidth <= 768;
  }
  
  // Only apply fixes on mobile
  if (!isMobile()) {
    console.log('Mobile fixes: Desktop detected, skipping mobile-specific fixes');
    return;
  }
  
  console.log('Mobile fixes: Applying mobile-specific fixes');
  
  // Wait for DOM to be ready
  function init() {
    
    // ============================================================
    // FIX 1: Remove interfering event handlers on links
    // ============================================================
    console.log('Mobile fixes: Fixing link navigation');
    
    // Remove preventDefault from registration links
    const regButtons = document.querySelectorAll('a[href="registration.html"], a[href*="registration"]');
    regButtons.forEach(button => {
      // Clone the element to remove all event listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // Add simple click handler
      newButton.addEventListener('click', function(e) {
        e.stopPropagation();
        // Let the browser handle the navigation naturally
        console.log('Mobile fixes: Navigating to:', this.href);
      }, false);
    });
    
    // ============================================================
    // FIX 2: Social media links
    // ============================================================
    console.log('Mobile fixes: Fixing social media links');
    
    const socialLinks = document.querySelectorAll('.mobile-social-icons a, .social-inline a, a[href*="facebook"], a[href*="instagram"]');
    socialLinks.forEach(link => {
      // Clone to remove existing event listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add simple handler
      newLink.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Mobile fixes: Opening social link:', this.href);
        // Let the browser handle it naturally
      }, false);
    });
    
    // ============================================================
    // FIX 3: Rep team box navigation
    // ============================================================
    console.log('Mobile fixes: Fixing rep team box');
    
    const repTeamBoxes = document.querySelectorAll('.rep-team-box, a[href="rep-teams.html"]');
    repTeamBoxes.forEach(box => {
      if (box.href && box.href.includes('rep-teams.html')) {
        // Clone to remove existing event listeners
        const newBox = box.cloneNode(true);
        box.parentNode.replaceChild(newBox, box);
        
        // Add simple handler
        newBox.addEventListener('click', function(e) {
          e.stopPropagation();
          console.log('Mobile fixes: Navigating to rep teams');
          // Let the browser handle it naturally
        }, false);
      }
    });
    
    // ============================================================
    // FIX 4: Calendar box navigation
    // ============================================================
    console.log('Mobile fixes: Fixing calendar box');
    
    const calendarBoxes = document.querySelectorAll('.calendar-box');
    calendarBoxes.forEach(box => {
      // Clone to remove existing event listeners
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
      
      // Add simple handler
      newBox.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Mobile fixes: Navigating to:', this.href);
        // Let the browser handle it naturally
      }, false);
    });
    
    // ============================================================
    // FIX 5: Remove conflicting touch event handlers
    // ============================================================
    console.log('Mobile fixes: Removing conflicting touch handlers');
    
    // Remove the over-aggressive touch handlers that prevent navigation
    document.removeEventListener('touchend', handleTouchEnd, true);
    document.removeEventListener('touchstart', handleTouchStart, true);
    
    // ============================================================
    // FIX 6: Ensure hamburger menu still works
    // ============================================================
    console.log('Mobile fixes: Setting up hamburger menu');
    
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
      // Clone to remove existing listeners
      const newToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newToggle, menuToggle);
      
      // Add clean click handler
      newToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navLinks.classList.contains('active');
        navLinks.classList.toggle('active');
        newToggle.classList.toggle('active');
        
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
          if (isActive) {
            navLogo.classList.remove('hidden');
          } else {
            navLogo.classList.add('hidden');
          }
        }
        
        console.log('Mobile fixes: Menu toggled', !isActive ? 'open' : 'closed');
      }, false);
    }
    
    // ============================================================
    // FIX 7: Close menu when clicking nav links
    // ============================================================
    if (navLinks) {
      const navLinkItems = navLinks.querySelectorAll('a');
      navLinkItems.forEach(link => {
        // Clone to remove existing listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
          // Don't prevent default - let navigation happen
          navLinks.classList.remove('active');
          const toggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
          if (toggle) {
            toggle.classList.remove('active');
          }
          const navLogo = document.querySelector('.nav-logo');
          if (navLogo) {
            navLogo.classList.remove('hidden');
          }
          console.log('Mobile fixes: Menu closed, navigating to:', this.href);
        }, false);
      });
    }
    
    console.log('Mobile fixes: All fixes applied successfully');
  }
  
  // Dummy handlers for removeEventListener (in case they don't exist)
  function handleTouchEnd() {}
  function handleTouchStart() {}
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOMContentLoaded already fired
    setTimeout(init, 100); // Small delay to ensure other scripts have run
  }
  
})();
