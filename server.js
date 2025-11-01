const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MyApp — Distributed System</title>

      <!-- Google Font (tùy chọn, mạng cần truy cập) -->
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">

      <style>
        :root{
          --bg1: #0f172a;
          --bg2: #0b2545;
          --accent: #7dd3fc;
          --glass: rgba(255,255,255,0.06);
        }

        *{box-sizing:border-box}
        html,body{height:100%}
        body{
          margin:0;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #e6eef8;
          background: radial-gradient(1200px 600px at 10% 10%, rgba(45,130,255,0.14), transparent 8%),
                      radial-gradient(1000px 500px at 90% 90%, rgba(0,200,255,0.06), transparent 10%),
                      linear-gradient(135deg, var(--bg1), var(--bg2));
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
          -webkit-font-smoothing:antialiased;
          -moz-osx-font-smoothing:grayscale;
        }

        /* Animated subtle background glow */
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.95; }
          50% { transform: translateY(-8px) rotate(1deg); opacity: 1; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.95; }
        }

        .card {
          width: min(920px, 96%);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(2,6,23,0.6);
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 22px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(6px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.03);
          animation: float 6s ease-in-out infinite;
        }

        /* mobile */
        @media (max-width:880px){
          .card { grid-template-columns: 1fr; padding:20px; }
        }

        .left {
          padding-right: 6px;
        }

        h1 {
          margin: 0 0 6px 0;
          font-size: 1.9rem;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #f8fafc;
        }

        .subtitle {
          margin: 0 0 16px 0;
          color: #cfeefd;
          opacity: 0.95;
          font-weight: 500;
        }

        .desc {
          margin: 0 0 18px 0;
          color: #cfe8ff;
          opacity: 0.9;
          line-height: 1.55;
        }

        .actions {
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }

        .btn {
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:10px 16px;
          border-radius:12px;
          border: none;
          cursor:pointer;
          font-weight:600;
          background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88));
          color: #003057;
          transition: transform .18s ease, box-shadow .18s ease;
          box-shadow: 0 6px 18px rgba(6,30,72,0.25);
        }
        .btn:hover{ transform: translateY(-4px); box-shadow: 0 14px 30px rgba(6,30,72,0.32); }

        .btn-outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #dff6ff;
          box-shadow: none;
        }

        .meta {
          margin-top:14px;
          font-size:0.92rem;
          color:#bfeeff;
          opacity:0.9;
        }

        /* Right panel (visual) */
        .right {
          display:flex;
          align-items:center;
          justify-content:center;
          position:relative;
        }

        .preview {
          width:100%;
          max-width:320px;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border-radius:14px;
          padding:16px;
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 8px 24px rgba(2,6,23,0.5);
        }

        .logo {
          width:64px;
          height:64px;
          border-radius:12px;
          display:inline-grid;
          place-items:center;
          font-weight:800;
          font-size:22px;
          background: linear-gradient(135deg, #7dd3fc, #60a5fa);
          color:#02203a;
          margin-bottom:12px;
        }

        .preview h3 {
          margin:0 0 8px 0;
          font-size:1.05rem;
          color:#eafcff;
        }
        .preview p {
          margin:0;
          font-size:0.95rem;
          color:#cfe8ff;
          opacity:0.9;
        }

        footer.small {
          position: absolute;
          right: 14px;
          bottom: 12px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.65);
        }

        /* small decorative floating circles */
        .glow {
          position:absolute;
          border-radius:50%;
          filter: blur(40px);
          opacity:0.12;
        }
        .g1{ width:220px; height:220px; right:-40px; top:-60px; background: #60a5fa; transform: rotate(20deg); }
        .g2{ width:160px; height:160px; left:-60px; bottom:-40px; background:#7dd3fc; }

        /* uptime badge */
        .badge {
          display:inline-block;
          padding:6px 10px;
          border-radius:999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.04);
          font-weight:600;
          font-size:0.88rem;
        }
      </style>
    </head>
    <body>
      <div class="card" role="article" aria-label="MyApp welcome card">
        <div class="left">
          <h1>Hệ tính toán phân bố - NT533.Q13</h1>
          <div class="subtitle">Nhóm 5 - Trần Minh Nhật - Huỳnh Lâm Tuấn Phong</div>
          <p class="desc">Đây là đồ án môn học của nhóm 5 - IaC & CI/CD
          <br/>Chúng em thực hiện quá trình tự động BUILD, DEPLOY hoàn toàn tự động lên K3s Cluster được dựng bởi Terraform.</p>

          <div class="actions" aria-hidden="false">
            <button class="btn" id="sayHi">Say Hi 👋</button>
            <button class="btn btn-outline" id="copyCurl" title="Copy curl command to clipboard">Copy curl</button>
          </div>

          <div class="meta">
            <span class="badge" id="uptime">Uptime: 0s</span>
            &nbsp;&middot;&nbsp;
            <span>Port: <strong>${PORT}</strong></span>
            &nbsp;&middot;&nbsp;
            <span id="nowTime"></span>
          </div>
        </div>

        <div class="right" aria-hidden="true">
          <div class="preview" role="img" aria-label="Preview panel">
            <div class="logo">MY</div>
            <h3>Service: myapp</h3>
            <p>Small footprint — big clarity. Use this as a landing for quick demos, monitoring, or CI/CD tests.</p>
          </div>
        </div>

        <div class="glow g1" aria-hidden="true"></div>
        <div class="glow g2" aria-hidden="true"></div>

        <footer class="small">Designed for demos • K3s / GitHub Actions friendly</footer>
      </div>

      <script>
        // uptime timer
        const start = Date.now();
        const upEl = document.getElementById('uptime');
        const nowEl = document.getElementById('nowTime');

        function human(ms){
          const s = Math.floor(ms/1000);
          if(s < 60) return s + 's';
          const m = Math.floor(s/60);
          if(m < 60) return m + 'm ' + (s%60) + 's';
          const h = Math.floor(m/60);
          return h + 'h ' + (m%60) + 'm';
        }

        function tick(){
          upEl.textContent = 'Uptime: ' + human(Date.now() - start);
          nowEl.textContent = new Date().toLocaleString();
        }
        tick();
        setInterval(tick, 1000);

        // interactions
        document.getElementById('sayHi').addEventListener('click', () => {
          alert('Hello! Thanks for checking MyApp 🚀');
        });

        document.getElementById('copyCurl').addEventListener('click', async () => {
          const text = 'curl -s http://localhost:${PORT}';
          try {
            await navigator.clipboard.writeText(text);
            const old = document.getElementById('copyCurl').textContent;
            document.getElementById('copyCurl').textContent = 'Copied!';
            setTimeout(()=> document.getElementById('copyCurl').textContent = old, 1200);
          } catch(e) {
            alert('Copy failed — use: ' + text);
          }
        });
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

