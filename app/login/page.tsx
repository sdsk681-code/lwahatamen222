"use client";
import React, { useState, useEffect } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  ShieldCheck,
  Mail,
  Lock,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { getAllowedAdminEmail, isAllowedAdminEmail } from "@/lib/allowed-admin-email";

const getFriendlyAuthError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-api-key":
        return "إعداد Firebase Authentication غير صالح. تحقق من مفتاح Firebase API ومن تفعيل خدمة Authentication."
      case "auth/operation-not-allowed":
        return "تسجيل الدخول بالبريد وكلمة المرور غير مفعل في Firebase Authentication."
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "بيانات الدخول غير صحيحة. تحقق من كلمة المرور والحساب الإداري."
      case "auth/too-many-requests":
        return "تم حظر المحاولات مؤقتًا بسبب كثرة المحاولات الفاشلة. حاول لاحقًا."
      case "auth/network-request-failed":
        return "فشل الاتصال أثناء تسجيل الدخول. تحقق من الشبكة ثم أعد المحاولة."
      default:
        return `فشل تسجيل الدخول: ${error.code}`
    }
  }

  if (error instanceof Error && error.message) {
    if (error.message.includes("API key not valid")) {
      return "Firebase Authentication يرفض المفتاح الحالي. تحقق من API key أو من تفعيل خدمة Authentication."
    }

    return `فشل تسجيل الدخول: ${error.message}`
  }

  return "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة لاحقاً."
}

export default function LoginPage() {
  const allowedAdminEmail = getAllowedAdminEmail();
  const [email, setEmail] = useState(allowedAdminEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { user, loading: authLoading } = useAuth();
  const requiresEmailInput = !allowedAdminEmail;

  useEffect(() => {
    if (!authLoading && user) {
      navigate.replace("/");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("error") === "unauthorized-email") {
      setError("هذا البريد غير مصرح له بالدخول إلى لوحة التحكم.");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalizedEmail = (requiresEmailInput ? email : allowedAdminEmail).trim().toLowerCase();

    if (!isAllowedAdminEmail(normalizedEmail)) {
      setError("هذا البريد غير مصرح له بالدخول إلى لوحة التحكم.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("أدخل كلمة المرور للمتابعة.");
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, normalizedEmail, password);

      if (!isAllowedAdminEmail(result.user.email)) {
        await auth.signOut();
        setError("هذا البريد غير مصرح له بالدخول إلى لوحة التحكم.");
        setLoading(false);
        return;
      }

      navigate.push("/");
    } catch (error) {
      console.error("Failed to sign in:", error);
      setError(getFriendlyAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans overflow-hidden relative"
      dir="rtl"
      style={{ background: "linear-gradient(135deg, #060918 0%, #0d1535 40%, #0a1628 70%, #060c1a 100%)" }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 w-full max-w-[420px] mx-4">
        {/* Glow behind card */}
        <div className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(99,102,241,0.2), transparent 60%)", filter: "blur(1px)" }} />

        <div className="relative rounded-3xl overflow-hidden"
          style={{ background: "rgba(13,20,44,0.85)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}>

          {/* Top accent bar */}
          <div className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(59,130,246,0.8), transparent)" }} />

          <div className="p-8 sm:p-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }} />
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}>
                  <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.8} />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1.5 tracking-tight">مرحباً بعودتك</h1>
              <p className="text-sm" style={{ color: "rgba(148,163,184,0.9)" }}>
                {requiresEmailInput ? "أدخل البريد الإلكتروني وكلمة المرور للدخول" : "أدخل كلمة المرور للدخول إلى لوحة التحكم"}
              </p>
              {allowedAdminEmail ? (
                <p className="mt-2 text-xs" style={{ color: "rgba(99,102,241,0.9)" }}>
                  الدخول محصور ببريد إداري واحد مصرح له.
                </p>
              ) : null}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {!requiresEmailInput ? (
                <div className="px-4 py-3 rounded-xl text-sm text-right"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", color: "#c7d2fe" }}>
                  <span className="block text-xs mb-1" style={{ color: "rgba(165,180,252,0.8)" }}>
                    البريد الإداري المعتمد
                  </span>
                  <span className="font-medium">{allowedAdminEmail}</span>
                </div>
              ) : null}

              {requiresEmailInput ? (
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold tracking-wide uppercase"
                    style={{ color: "rgba(148,163,184,0.7)" }}>
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: "rgba(99,102,241,0.7)" }} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="admin@example.com"
                      className="w-full pr-10 pl-4 py-3.5 text-sm rounded-xl outline-none transition-all duration-200 disabled:opacity-50"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#e2e8f0",
                        caretColor: "#6366f1",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(99,102,241,0.5)";
                        e.target.style.background = "rgba(99,102,241,0.08)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.08)";
                        e.target.style.background = "rgba(255,255,255,0.04)";
                      }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold tracking-wide uppercase"
                  style={{ color: "rgba(148,163,184,0.7)" }}>
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "rgba(99,102,241,0.7)" }} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    placeholder="********"
                    className="w-full pr-10 pl-4 py-3.5 text-sm rounded-xl outline-none transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#e2e8f0",
                      caretColor: "#6366f1",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(99,102,241,0.5)";
                      e.target.style.background = "rgba(99,102,241,0.08)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5" }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  boxShadow: "0 4px 24px rgba(99,102,241,0.4), 0 1px 0 rgba(255,255,255,0.1) inset",
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }} />
                {loading ? (
                  <span className="relative flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  <span className="relative flex items-center gap-2">
                    تسجيل الدخول
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </span>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs" style={{ color: "rgba(100,116,139,0.7)" }}>
                © 2026 BCare — جميع الحقوق محفوظة
              </p>
            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-px w-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" }} />
        </div>
      </div>
    </div>
  );
}
