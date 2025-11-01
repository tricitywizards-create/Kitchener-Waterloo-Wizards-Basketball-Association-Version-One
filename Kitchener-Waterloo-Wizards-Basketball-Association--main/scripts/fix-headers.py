#!/usr/bin/env python3
"""
Header Standardization Script
Kitchener-Waterloo Wizards Basketball Association

This script will update all HTML files to have the same navigation structure as rep-teams.html:
1. Add desktop logo before mobile-nav-top
2. Standardize logo image source to wizard-basketball-logo.png
3. Ensure consistent navigation structure across all pages
"""

import os
import re
import glob

class HeaderStandardizer:
    def __init__(self):
        self.files_updated = 0
        self.corrections_made = 0
        
        # Target navigation structure from rep-teams.html
        self.target_nav_structure = '''<nav><a href="index.html" class="logo-link" aria-label="Go to Home"><img src="images/wizard-basketball-logo.png" alt="KW Wizards Logo" class="nav-logo"></a><div class="mobile-nav-top"><a href="index.html" class="logo-link" aria-label="Go to Home"><img src="images/wizard-basketball-logo.png" alt="KW Wizards Logo" class="nav-logo"></a><div class="mobile-social-icons"><a href="https://www.facebook.com/profile.php?id=61566563145647" target="_blank" aria-label="Follow us on Facebook"><i class="fab fa-facebook"></i></a><a href="https://www.instagram.com/kitchener_waterloo_wizards/" target="_blank" aria-label="Follow us on Instagram"><i class="fab fa-instagram"></i></a></div><div class="menu-toggle" id="menu-toggle">☰</div></div><div class="nav-links" id="nav-links"><a href="index.html">Home</a><a href="about.html">About</a><a href="development.html">Development</a><a href="rep-teams.html">Rep Teams</a><a href="individual-training.html">Individual Training</a><a href="upcoming-events.html">Wizard News</a><a href="photo-gallery.html">Photo Gallery</a><a href="registration.html">Registration</a></div></nav>'''
    
    def fix_header_structure(self, filepath):
        """Fix the header structure in a single HTML file"""
        print(f"\n🔧 Processing: {filepath}")
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # 1. First, let's identify and fix the logo image source
            content = re.sub(
                r'src="images/wizard-logo-web-300x300\.png"',
                'src="images/wizard-basketball-logo.png"',
                content
            )
            
            if 'src="images/wizard-logo-web-300x300.png"' in original_content:
                print("  ✅ Updated logo image source")
                self.corrections_made += 1
            
            # 2. Find the existing <nav> section and replace it entirely
            nav_pattern = r'<nav>.*?</nav>'
            
            if re.search(nav_pattern, content, re.DOTALL):
                # Replace the entire nav section with the standardized one
                content = re.sub(nav_pattern, self.target_nav_structure, content, flags=re.DOTALL)
                print("  ✅ Standardized navigation structure")
                self.corrections_made += 1
            else:
                print("  ⚠️ No <nav> section found")
            
            # 3. Ensure mobile social icons have consistent class names
            content = re.sub(
                r'class="mobile-social-link"',
                'class="mobile-social-link"', 
                content
            )
            
            # 4. Write the updated content back to file
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print("  💾 File updated successfully")
                self.files_updated += 1
            else:
                print("  ℹ️ No changes needed")
                
        except Exception as e:
            print(f"  ❌ Error processing {filepath}: {str(e)}")
    
    def check_logo_file_exists(self):
        """Verify the target logo file exists"""
        logo_path = "images/wizard-basketball-logo.png"
        fallback_path = "images/wizard-logo-web-300x300.png"
        
        if os.path.exists(logo_path):
            print(f"✅ Target logo file exists: {logo_path}")
            return True
        elif os.path.exists(fallback_path):
            print(f"⚠️ Target logo missing, but fallback exists: {fallback_path}")
            print(f"   Consider copying {fallback_path} to {logo_path}")
            return False
        else:
            print(f"❌ Neither logo file exists!")
            return False
    
    def run_standardization(self):
        """Run header standardization on all HTML files"""
        print("🔧 HEADER STANDARDIZATION")
        print("=" * 50)
        print("🏀 Standardizing all headers to match rep-teams.html structure")
        print("=" * 50)
        
        # Check if logo file exists
        self.check_logo_file_exists()
        
        # Get all HTML files
        html_files = glob.glob("*.html")
        html_files = [f for f in html_files if not f.startswith(('mobile-scroll-test', 'website-cleanup'))]
        
        print(f"\n📋 Found {len(html_files)} HTML files to process:")
        for file in html_files:
            print(f"   📄 {file}")
        
        # Process each file
        for html_file in html_files:
            self.fix_header_structure(html_file)
        
        # Generate summary
        print("\n" + "=" * 50)
        print("📊 STANDARDIZATION SUMMARY")
        print("=" * 50)
        print(f"📄 Files Processed: {len(html_files)}")
        print(f"✅ Files Updated: {self.files_updated}")
        print(f"🔧 Total Corrections: {self.corrections_made}")
        
        if self.corrections_made > 0:
            print(f"\n💡 Headers have been standardized!")
            print(f"📱 All pages now have consistent mobile navigation")
            print(f"🖥️ All pages now have desktop logo before mobile nav")
            print(f"🏀 Logo source standardized across all pages")
        else:
            print(f"\nℹ️ All headers were already standardized!")
        
        print(f"\n🎯 Header standardization complete!")

if __name__ == "__main__":
    standardizer = HeaderStandardizer()
    standardizer.run_standardization()
