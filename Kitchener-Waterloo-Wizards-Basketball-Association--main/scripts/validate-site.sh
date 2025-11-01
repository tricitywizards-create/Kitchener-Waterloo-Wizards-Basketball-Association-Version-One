#!/bin/bash

# Site Validation Script
# Checks for broken links, missing files, and proper structure

echo "🔍 Validating Kitchener-Waterloo Wizards Website..."
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found. Run this from the project root.${NC}"
    exit 1
fi

echo -e "\n📁 Checking directory structure..."

# Check required directories
for dir in css js images; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir/ directory exists"
    else
        echo -e "${RED}✗${NC} $dir/ directory missing"
        ((errors++))
    fi
done

echo -e "\n📄 Checking required files..."

# Check required root files
for file in index.html CNAME robots.txt sitemap.xml favicon.ico; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing"
        ((errors++))
    fi
done

# Check CSS files
echo -e "\n🎨 Checking CSS files..."
for file in css/mobile-fixes.css; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing"
        ((errors++))
    fi
done

# Check JS files
echo -e "\n💻 Checking JavaScript files..."
for file in js/mobile-fixes.js; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing"
        ((errors++))
    fi
done

# Check image files
echo -e "\n🖼️  Checking critical images..."
for file in "images/wizard-basketball-logo.png" "images/wizard-logo.png"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${YELLOW}⚠${NC} $file missing (may cause broken images)"
        ((warnings++))
    fi
done

# Check HTML files for broken CSS/JS references
echo -e "\n🔗 Checking HTML file references..."

html_files=(index.html about.html development.html individual-training.html 
            photo-gallery.html registration.html rep-teams.html upcoming-events.html)

for html in "${html_files[@]}"; do
    if [ -f "$html" ]; then
        # Check if CSS paths are correct
        if grep -q 'href="css/' "$html"; then
            echo -e "${GREEN}✓${NC} $html has correct CSS paths"
        else
            if grep -q 'href=".*\.css"' "$html"; then
                echo -e "${YELLOW}⚠${NC} $html may have incorrect CSS paths"
                ((warnings++))
            fi
        fi
        
        # Check if JS paths are correct
        if grep -q 'src="js/' "$html"; then
            echo -e "${GREEN}✓${NC} $html has correct JS paths"
        else
            if grep -q 'src=".*\.js"' "$html"; then
                echo -e "${YELLOW}⚠${NC} $html may have incorrect JS paths"
                ((warnings++))
            fi
        fi
    else
        echo -e "${RED}✗${NC} $html missing"
        ((errors++))
    fi
done

# Check for common mobile issues in CSS
echo -e "\n📱 Checking mobile optimization..."

if grep -q "touch-action" css/mobile-fixes.css 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Mobile touch-action rules found"
else
    echo -e "${YELLOW}⚠${NC} Mobile touch-action rules may be missing"
    ((warnings++))
fi

if grep -q "@media.*max-width.*768px" css/mobile-fixes.css 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Mobile media queries found"
else
    echo -e "${RED}✗${NC} Mobile media queries missing"
    ((errors++))
fi

# Summary
echo -e "\n=================================================="
echo -e "📊 Validation Summary:"
echo -e "=================================================="

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Site is ready.${NC}"
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Passed with $warnings warning(s).${NC}"
    exit 0
else
    echo -e "${RED}❌ Failed with $errors error(s) and $warnings warning(s).${NC}"
    exit 1
fi
