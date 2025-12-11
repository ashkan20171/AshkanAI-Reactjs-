import React from "react";
import plans from "./Plans"; // همان فایل پلن‌ها
import { useAuth } from "../context/AuthContext";

const PlansPage = () => {
  const { user, setUser } = useAuth();

  const handleUpgrade = (planKey) => {
    if (!user) {
      alert("لطفاً ابتدا وارد حساب شوید.");
      return;
    }

    const updatedUser = {
      ...user,
      plan: planKey,
      planDetails: plans[planKey],
    };

    // ذخیره در localStorage
    localStorage.setItem("ashkanai_user", JSON.stringify(updatedUser));

    // بروز رسانی AuthContext
    setUser(updatedUser);

    alert("پلن با موفقیت ارتقا یافت!");
  };

  return (
    <div className="container py-4">

      <h2 className="text-center mb-4">پلن‌های AshkanAI</h2>

      <div className="row">
        {Object.entries(plans).map(([key, plan]) => (
          <div className="col-md-3 mb-3" key={key}>
            <div className="card shadow-sm p-3 text-center">

              <h4>{plan.name}</h4>
              <p>{plan.description}</p>

              <h3 className="text-primary">
                {plan.price === 0 ? "رایگان" : plan.price.toLocaleString() + " تومان"}
              </h3>

              <hr />

              <ul className="text-start">
                <li>حداکثر پیام: {plan.maxMessages === Infinity ? "نامحدود" : plan.maxMessages}</li>
                <li>کد جنریتور: {plan.allowCodeAssistant ? "✔ فعال" : "✖ ندارد"}</li>
                <li>ساخت تصویر: {plan.allowImageGen ? "✔ فعال" : "✖ ندارد"}</li>
                <li>Task Agent: {plan.allowTaskAgent ? "✔ فعال" : "✖ ندارد"}</li>
              </ul>

              {user?.plan === key ? (
                <button className="btn btn-secondary mt-2" disabled>
                  پلن فعلی شما
                </button>
              ) : (
                <button
                  className="btn btn-warning mt-2"
                  onClick={() => handleUpgrade(key)}
                >
                  🚀 انتخاب این پلن
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
