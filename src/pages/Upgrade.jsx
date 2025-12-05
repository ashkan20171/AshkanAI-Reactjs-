import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

export default function Upgrade() {
  const { dict, lang } = useLanguage();
  const { user } = useAuth();

  const plans = [
    {
      id: "free",
      name: dict.plan_free,
      price: dict.free_price,
      features: [dict.f_basic_ai, dict.f_summarizer, dict.f_translator],
    },
    {
      id: "pro",
      name: dict.plan_pro,
      price: "$9 / month",
      features: [dict.f_basic_ai, dict.f_summarizer, dict.f_translator, dict.f_rewriter, dict.f_images],
    },
    {
      id: "ultimate",
      name: dict.plan_ultimate,
      price: "$19 / month",
      features: [
        dict.f_basic_ai,
        dict.f_summarizer,
        dict.f_translator,
        dict.f_rewriter,
        dict.f_images,
        dict.f_unlimited,
        dict.f_priority
      ],
    },
  ];

  return (
    <div className="container py-4" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
      <h3 className="fw-bold mb-4">{dict.upgrade_plan}</h3>

      <div className="row g-4">
        {plans.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card p-4 shadow-sm rounded-4 h-100">
              <h4 className="fw-bold">{p.name}</h4>
              <h5 className="text-primary">{p.price}</h5>

              <ul className="mt-3">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <button className="btn btn-primary mt-3 w-100">
                {dict.select_plan}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
