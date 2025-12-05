import { Link } from "react-router-dom";

export default function Tools() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4 text-center">ابزارهای AshkanAI</h2>

      <div className="row g-4">

        <div className="col-md-4">
          <Link to="/tools/summarizer" className="text-decoration-none">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h4>📝 خلاصه‌ساز</h4>
              <p className="text-muted">خلاصه‌سازی خودکار متن‌ها</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/rewriter" className="text-decoration-none">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h4>♻️ بازنویسی</h4>
              <p className="text-muted">بازنویسی حرفه‌ای و خلاقانه</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/translator" className="text-decoration-none">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h4>🌍 مترجم</h4>
              <p className="text-muted">ترجمه سریع و هوشمند</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/image" className="text-decoration-none">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h4>🎨 تولید تصویر</h4>
              <p className="text-muted">تولید تصویر از متن</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/code" className="text-decoration-none">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h4>💻 دستیار کدنویسی</h4>
              <p className="text-muted">رفع خطا، توضیح کد، بهینه‌سازی</p>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/tools/agent" className="text-decoration-none">
            <div className="p-4 border rounded-4 shadow-sm bg-white">
              <h4>🤖 Task Agent</h4>
              <p className="text-muted">انجام خودکار کارها</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
