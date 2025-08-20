#!/bin/bash
# СКОПИРУЙТЕ ВСЕ ЭТИ КОМАНДЫ В DIGITAL OCEAN WEB CONSOLE
# =====================================================

# Установка nginx и git
apt update && apt install -y nginx git curl

# Создание базового сайта для быстрой проверки
mkdir -p /var/www/adbid
cd /var/www/adbid

# Создаем красивую главную страницу
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdBid - Digital Advertising Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            padding: 30px 0;
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 2rem;
            font-weight: bold;
            color: white;
        }
        
        .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
        }
        
        .nav-links a {
            color: white;
            text-decoration: none;
            transition: opacity 0.3s;
        }
        
        .nav-links a:hover {
            opacity: 0.8;
        }
        
        .hero {
            padding: 100px 0;
            text-align: center;
        }
        
        h1 {
            font-size: 4rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            font-size: 1.5rem;
            margin-bottom: 40px;
            opacity: 0.9;
        }
        
        .cta-buttons {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            display: inline-block;
        }
        
        .btn-primary {
            background: white;
            color: #667eea;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .btn-secondary {
            background: transparent;
            color: white;
            border: 2px solid white;
        }
        
        .btn-secondary:hover {
            background: white;
            color: #667eea;
        }
        
        .features {
            padding: 80px 0;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .feature-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        .status-badge {
            display: inline-block;
            background: #4caf50;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: bold;
            margin: 20px 0;
        }
        
        footer {
            padding: 30px 0;
            text-align: center;
            background: rgba(0, 0, 0, 0.2);
            margin-top: 100px;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <div class="logo">🚀 AdBid</div>
            <ul class="nav-links">
                <li><a href="/dashboard.html">Dashboard</a></li>
                <li><a href="/campaigns.html">Campaigns</a></li>
                <li><a href="/analytics.html">Analytics</a></li>
                <li><a href="/settings.html">Settings</a></li>
            </ul>
        </nav>
    </header>
    
    <section class="hero container">
        <div class="floating">
            <h1>AdBid Platform</h1>
            <p class="subtitle">Next-Generation Digital Advertising Solution</p>
            <div class="status-badge">✅ PLATFORM ONLINE</div>
        </div>
        
        <div class="cta-buttons">
            <a href="/dashboard.html" class="btn btn-primary">Open Dashboard</a>
            <a href="/new-campaign.html" class="btn btn-secondary">Create Campaign</a>
        </div>
    </section>
    
    <section class="features container">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">Platform Features</h2>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3 class="feature-title">Advanced Analytics</h3>
                <p>Real-time performance tracking and comprehensive reporting</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">Precision Targeting</h3>
                <p>Reach your exact audience with AI-powered targeting</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">💰</div>
                <h3 class="feature-title">Smart Budgeting</h3>
                <p>Optimize your ad spend with intelligent budget allocation</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔗</div>
                <h3 class="feature-title">Multi-Platform</h3>
                <p>Manage campaigns across all major advertising platforms</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3 class="feature-title">Quick Launch</h3>
                <p>Launch campaigns in minutes with our streamlined workflow</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🛡️</div>
                <h3 class="feature-title">Secure & Reliable</h3>
                <p>Enterprise-grade security and 99.9% uptime guarantee</p>
            </div>
        </div>
    </section>
    
    <footer>
        <div class="container">
            <p>© 2024 AdBid. All rights reserved.</p>
            <p style="margin-top: 10px; opacity: 0.8;">
                Server: Digital Ocean | Domain: adbid.me | IP: 165.227.11.220
            </p>
        </div>
    </footer>
    
    <script>
        console.log('AdBid Platform Loaded Successfully');
        console.log('Version: 1.0.0');
        console.log('Server: Digital Ocean');
        console.log('Status: Online');
    </script>
</body>
</html>
EOF

# Создаем простую страницу dashboard
cat > dashboard.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>AdBid Dashboard</title>
    <style>
        body { 
            font-family: system-ui; 
            margin: 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 50px;
        }
        h1 { font-size: 3rem; }
        .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 20px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <h1>📊 AdBid Dashboard</h1>
    <div class="card">
        <h2>Welcome to your Dashboard</h2>
        <p>Campaign management system is being configured...</p>
    </div>
    <div class="card">
        <h2>Quick Stats</h2>
        <p>• Active Campaigns: 0</p>
        <p>• Total Impressions: 0</p>
        <p>• Click Rate: 0%</p>
    </div>
</body>
</html>
EOF

# Настройка nginx
cat > /etc/nginx/sites-available/adbid << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    server_name adbid.me www.adbid.me 165.227.11.220;
    
    root /var/www/adbid;
    index index.html dashboard.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    access_log /var/log/nginx/adbid_access.log;
    error_log /var/log/nginx/adbid_error.log;
}
EOF

# Активируем сайт
ln -sf /etc/nginx/sites-available/adbid /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Права доступа
chown -R www-data:www-data /var/www/adbid

# Тестируем и перезапускаем nginx
nginx -t && systemctl reload nginx

# Результат
echo ""
echo "========================================="
echo "✅ САЙТ УСПЕШНО РАЗВЕРНУТ!"
echo "========================================="
echo ""
echo "🌐 Ваш сайт доступен по адресам:"
echo "   • http://adbid.me"
echo "   • http://www.adbid.me"
echo "   • http://165.227.11.220"
echo ""
echo "📊 Dashboard: http://adbid.me/dashboard.html"
echo ""
echo "========================================="

# Проверка
curl -s http://localhost | grep -q "AdBid" && echo "✅ Сайт работает локально" || echo "⚠️ Проверьте nginx"