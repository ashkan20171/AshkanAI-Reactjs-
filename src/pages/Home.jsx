import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

export default function Home() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span>AshkanAI</span>  
            هوش مصنوعی حرفه‌ای شما
          </h1>

          <p>
            سریع‌ترین و هوشمندترین دستیار فارسی که پیام می‌فهمه،  
            تصویر می‌سازه، کد می‌نویسه و برای همه کارها کمکت می‌کنه.
          </p>

          <div className="hero-buttons">
            <Link to="/chat" className="btn-primary">شروع گفتگو</Link>
            <Link to="/plans" className="btn-secondary">پلن‌های حرفه‌ای</Link>
          </div>
        </div>

        <div className="hero-image glass parallax">
          <img src={heroImg} alt="AI Hero" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>✨ امکانات شگفت‌انگیز</h2>

        <div className="features-grid">
          <div className="feature-card glass">
            <span>🤖</span>
            <h3>گفتگو هوشمند</h3>
            <p>سریع، دقیق و باهوش. تجربه چت طبیعی با هوش مصنوعی.</p>
          </div>

          <div className="feature-card glass">
            <span>🧑‍💻</span>
            <h3>دستیار کدنویسی</h3>
            <p>ساخت کد، دیباگ و تحلیل پروژه‌ها با یک کلیک.</p>
          </div>

          <div className="feature-card glass">
            <span>🎨</span>
            <h3>ساخت تصویر</h3>
            <p>با یک جمله، هر تصویری که میخوای بساز.</p>
          </div>

          <div className="feature-card glass">
            <span>📄</span>
            <h3>تحلیل اسناد</h3>
            <p>آپلود PDF و فایل و دریافت خلاصه هوشمند.</p>
          </div>
        </div>
      </section>

      {/* PLANS PREVIEW */}
      <section className="plans-preview">
        <h2>🔥 پلن مورد نیازت رو انتخاب کن</h2>
        <p>از کاربر مهمان تا حرفه‌ای، برای هر کسی یک پلن هست.</p>

        <Link to="/plans" className="btn-primary big-btn">
          مشاهده پلن‌ها
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2024 AshkanAI — تمام حقوق محفوظ است</p>
      </footer>
    </div>
  );
}
