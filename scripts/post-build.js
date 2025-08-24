const fs = require("fs");
const path = require("path");

console.log("🔧 Running post-build script...");

// Create the root index.html for redirects
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <script>
        // Detect user's preferred language
        function getPreferredLanguage() {
            // Check if user has a saved preference
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang && ['en', 'de'].includes(savedLang)) {
                return savedLang;
            }
            
            // Check browser language
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('de')) {
                return 'de';
            }
            
            // Default to English
            return 'en';
        }
        
        // Redirect to appropriate language immediately
        const preferredLang = getPreferredLanguage();
        window.location.replace('/' + preferredLang + '/');
    </script>
    <noscript>
        <meta http-equiv="refresh" content="0; url=/en/">
    </noscript>
</head>
<body>
    <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
        <h2>Redirecting...</h2>
        <p>If you are not redirected automatically, <a href="/en/">click here for English</a> or <a href="/de/">hier für Deutsch</a>.</p>
    </div>
</body>
</html>`;

// Create .htaccess for Apache servers (GoDaddy, Hostinger, etc.)
const htaccess = `# Enable rewrite engine
RewriteEngine On

# Redirect root to index.html (which handles JS redirect)
DirectoryIndex index.html

# Handle trailing slashes for locale routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !/$
RewriteRule ^(en|de)$ /$1/ [R=301,L]

# Custom 404 handling
ErrorDocument 404 /404.html

# Security headers (if supported)
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>`;

// Create Netlify redirects (for Netlify testing)
const netlifyRedirects = `# Netlify redirects file
# Redirect root to /en/ by default
/    /en/    302

# Handle language-specific redirects based on Accept-Language header
/    /de/    302    Language=de
/    /en/    302    Language=en

# Fallback for any unmatched routes to 404
/*   /404.html   404`;

// Write files
const outDir = path.join(process.cwd(), "out");

try {
  fs.writeFileSync(path.join(outDir, "index.html"), indexHtml);
  console.log("✅ Created root index.html");

  fs.writeFileSync(path.join(outDir, ".htaccess"), htaccess);
  console.log("✅ Created .htaccess for Apache servers (GoDaddy)");

  fs.writeFileSync(path.join(outDir, "_redirects"), netlifyRedirects);
  console.log("✅ Created _redirects for Netlify");

  console.log("🎉 Post-build script completed successfully!");
} catch (error) {
  console.error("❌ Error in post-build script:", error);
  process.exit(1);
}
