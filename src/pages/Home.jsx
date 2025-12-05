import { Link } from "react-router-dom";
import logo from "../assets/logo/ashkanai-light.png";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <img src={logo} height="120" alt="" className="mb-4 opacity-75" />

      <h1 className="display-4 fw-bold">به AshkanAI خوش آمدید</h1>
      <p className="lead mt-3 mb-4">
        نسل جدید هوش مصنوعی؛ سریع‌تر، هوشمندتر، زیباتر.  
        <br /> همراه با طراحی اختصاصی و امکانات پیشرفته.
      </p>

      <Link className="btn btn-primary btn-lg" to="/dashboard">
        ورود به داشبورد
      </Link>
    </div>
  );
}
