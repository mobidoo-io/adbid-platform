#!/bin/bash

echo "📦 Post-build: Copying static HTML files to dist..."

# Copy legal and policy pages
cp privacy-policy.html dist/ 2>/dev/null || echo "⚠️  privacy-policy.html not found"
cp terms-of-service.html dist/ 2>/dev/null || echo "⚠️  terms-of-service.html not found"
cp cookie-policy.html dist/ 2>/dev/null || echo "⚠️  cookie-policy.html not found"
cp gdpr.html dist/ 2>/dev/null || echo "⚠️  gdpr.html not found"
cp security.html dist/ 2>/dev/null || echo "⚠️  security.html not found"

# Copy other pages
cp about.html dist/ 2>/dev/null || echo "⚠️  about.html not found"
cp careers.html dist/ 2>/dev/null || echo "⚠️  careers.html not found"
cp blog.html dist/ 2>/dev/null || echo "⚠️  blog.html not found"
cp pricing.html dist/ 2>/dev/null || echo "⚠️  pricing.html not found"
cp documentation.html dist/ 2>/dev/null || echo "⚠️  documentation.html not found"
cp contact.html dist/ 2>/dev/null || echo "⚠️  contact.html not found"
cp campaigns.html dist/ 2>/dev/null || echo "⚠️  campaigns.html not found"
cp analytics.html dist/ 2>/dev/null || echo "⚠️  analytics.html not found"
cp platforms.html dist/ 2>/dev/null || echo "⚠️  platforms.html not found"
cp meta-ads.html dist/ 2>/dev/null || echo "⚠️  meta-ads.html not found"
cp guides.html dist/ 2>/dev/null || echo "⚠️  guides.html not found"

# Copy JS and CSS folders
if [ -d "js" ]; then
    cp -r js dist/
    echo "✅ Copied js folder"
fi

if [ -d "css" ]; then
    cp -r css dist/
    echo "✅ Copied css folder"
fi

echo "✅ Post-build complete!"