# Website Testing Guide
## Kitchener-Waterloo Wizards Basketball Association

This guide helps you verify the website works smoothly on both mobile and desktop.

---

## ✅ Automated Validation

Run the automated validation script:
```bash
./scripts/validate-site.sh
```

This checks:
- Directory structure
- Required files
- CSS/JS paths
- Mobile optimizations

---

## 📱 Mobile Testing Checklist

### Navigation
- [ ] Hamburger menu (☰) opens and closes smoothly
- [ ] Menu links navigate to correct pages
- [ ] Menu closes after clicking a link
- [ ] Logo is visible and clickable
- [ ] Social media icons are tappable

### Content Interaction
- [ ] All buttons respond to taps (no delay)
- [ ] Links open correctly (internal and external)
- [ ] Registration button navigates properly
- [ ] Rep team box is tappable
- [ ] Calendar box opens events page
- [ ] Text is selectable (long-press)

### Scrolling
- [ ] Smooth vertical scrolling
- [ ] No horizontal scroll (content fits screen)
- [ ] Fixed navigation stays at top
- [ ] Back to top button works

### Forms (Registration Page)
- [ ] Input fields are tappable
- [ ] No zoom when focusing inputs
- [ ] Dropdown menus work
- [ ] Submit button responds

### Visual
- [ ] Images load properly
- [ ] Text is readable (not too small)
- [ ] Buttons are at least 44x44px (easy to tap)
- [ ] Colors and animations display correctly

---

## 💻 Desktop Testing Checklist

### Navigation
- [ ] Horizontal navigation menu displays
- [ ] No hamburger menu visible
- [ ] Logo is visible and clickable
- [ ] All nav links work on hover and click
- [ ] Social media links (Facebook, Instagram) work

### Layout
- [ ] Content is centered and properly sized
- [ ] Sections have proper spacing
- [ ] Images are not stretched or pixelated
- [ ] Rep team box positioned correctly
- [ ] Calendar displays properly

### Interaction
- [ ] All buttons work
- [ ] Links change color on hover
- [ ] Smooth animations and transitions
- [ ] No mobile-specific elements visible

### Performance
- [ ] Page loads quickly
- [ ] Smooth scrolling
- [ ] No layout shifts
- [ ] Animations run smoothly

---

## 🧪 Browser Testing

Test on these browsers:

### Mobile
- Safari (iOS)
- Chrome (iOS)
- Chrome (Android)
- Samsung Internet (Android)

### Desktop
- Chrome
- Safari
- Firefox
- Edge

---

## 🐛 Common Issues & Solutions

### Issue: Links don't work on mobile
**Solution:** Check that `css/mobile-fixes.css` and `js/mobile-fixes.js` are loaded

### Issue: Hamburger menu doesn't open
**Solution:** Verify `js/mobile-fixes.js` is loaded after other scripts

### Issue: Page zooms when tapping input fields (iOS)
**Solution:** Ensured with `font-size: 16px !important` in inputs

### Issue: Duplicate logos on mobile
**Solution:** Fixed with `mobile-fixes.css` hiding desktop logo on mobile

### Issue: 300ms tap delay on mobile
**Solution:** Fixed with `touch-action: manipulation` in CSS

---

## 📊 Performance Metrics

Target metrics:
- **Load time:** < 3 seconds
- **First Contentful Paint:** < 1.5 seconds
- **Time to Interactive:** < 3.5 seconds
- **Lighthouse score:** > 90

Test with:
- Chrome DevTools Lighthouse
- Google PageSpeed Insights
- WebPageTest

---

## 🚀 Quick Test Commands

### Start local server (if needed):
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then open: http://localhost:8000
```

### View in mobile simulator:
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device (iPhone, iPad, Android)
4. Test interactions

---

## ✨ Key Features to Test

1. **Year-round registration** - Verify registration page loads
2. **Rep team signup** - Check rep team box links to correct page
3. **Event calendar** - Ensure upcoming events page accessible
4. **Contact information** - Verify email and phone links work
5. **Social media** - Test Facebook and Instagram links
6. **Photo gallery** - Check images load properly
7. **Mobile menu** - Verify smooth open/close animation

---

## 📝 Testing Notes

- Test on real devices when possible (simulators don't catch everything)
- Check in both portrait and landscape orientations
- Test with slow network (3G) to verify performance
- Verify touch targets are at least 44x44px
- Ensure text contrast meets accessibility standards

---

## 🎯 Success Criteria

The site is ready when:
- ✅ All validation checks pass
- ✅ Mobile navigation works smoothly
- ✅ All links and buttons respond immediately
- ✅ Content is readable on all devices
- ✅ No console errors in browser
- ✅ Forms submit properly
- ✅ Images load correctly
- ✅ Social media links open

---

**Last Updated:** 2025-11-01
**Version:** 1.0
