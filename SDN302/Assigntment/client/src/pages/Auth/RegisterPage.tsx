import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { GrApple } from "react-icons/gr";
// Validation Schema
const registerValidationSchema = Yup.object({
  membername: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  YOB: Yup.date().required("Date of birth is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      membername: "",
      email: "",
      password: "",
      confirmPassword: "",
      YOB: new Date("2000-01-01"),
      gender: false,
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      try {
        setLoading(true);
        await register(values);
        // Registration successful - redirect to login page
        navigate("/auth/login", {
          state: { message: "Registration successful! Please login." },
        });
      } catch (err) {
        setSubmitError(
          err instanceof Error
            ? err.message
            : "Registration failed. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const getFieldError = (fieldName: string) => {
    return formik.touched[fieldName as keyof typeof formik.touched] &&
      formik.errors[fieldName as keyof typeof formik.errors]
      ? formik.errors[fieldName as keyof typeof formik.errors]
      : null;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
              ◉
            </div>
            <h1 className="text-3xl font-black">LUXE SCENT</h1>
          </div>
          <p className="text-lg leading-relaxed text-slate-300 max-w-md">
            Experience the art of apothecary. Our scents are curated for the
            bold, the elegant, and the timeless.
          </p>
        </div>

        {/* Featured Perfume Image */}
        <div className="relative h-96">
          <img
            alt="Featured Perfume"
            className="w-full h-full object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgWrmqYHbRZGBwZtKP5Acb5zXN4Gf-aljovSoQfbovliq-S1_PXQXgkuDfgEFwcst6IuxPt6hF70sHHLZvVt5iKLlu5ssYW_Mwz3W0kLJUO2HpO9d8tvb9O-CympZ0AnH1L2QSn1x4r9vkwOK7AKEStXSgilSnoAs5w-jp0N2hMoOxqzuJhTPwGk_uv5amOL2pT-tylY_MgdPRi12jvrtg7a1qIfB9lKJQzGtwENnSEO08wDZC_KIHiDoTVx_F_Z8qu7MYEOuRzic"
          />
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-primary transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Pinterest
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Our Story
          </a>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex flex-col justify-center p-8 lg:p-12">
        <div className="max-w-md mx-auto w-full max-h-screen overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <Link
              to="/auth/login"
              className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-primary text-white font-bold rounded-lg transition-all"
            >
              Register
            </Link>
          </div>

          {/* Form Title */}
          <div className="mb-6">
            <h2 className="text-3xl font-black mb-2">Join Us</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Create your scent profile and explore our collection.
            </p>
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                name="membername"
                value={formik.values.membername}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John Doe"
                className={`w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border ${
                  getFieldError("membername")
                    ? "border-red-500"
                    : "border-slate-200 dark:border-slate-700"
                } rounded-lg focus:outline-none focus:border-primary transition-colors`}
              />
              {getFieldError("membername") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("membername") as string}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="email@example.com"
                  className={`w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border ${
                    getFieldError("email")
                      ? "border-red-500"
                      : "border-slate-200 dark:border-slate-700"
                  } rounded-lg focus:outline-none focus:border-primary transition-colors`}
                />
              </div>
              {getFieldError("email") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("email") as string}
                </p>
              )}
            </div>

            {/* Year of Birth */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Year of Birth
              </label>
              <input
                type="date"
                name="YOB"
                value={formik.values.YOB.toISOString().split("T")[0]}
                onChange={(e) =>
                  formik.setFieldValue("YOB", new Date(e.target.value))
                }
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border ${
                  getFieldError("YOB")
                    ? "border-red-500"
                    : "border-slate-200 dark:border-slate-700"
                } rounded-lg focus:outline-none focus:border-primary transition-colors`}
              />
              {getFieldError("YOB") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("YOB") as string}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold mb-2">Gender</label>
              <select
                name="gender"
                value={formik.values.gender ? "female" : "male"}
                onChange={(e) =>
                  formik.setFieldValue("gender", e.target.value === "female")
                }
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border ${
                    getFieldError("password")
                      ? "border-red-500"
                      : "border-slate-200 dark:border-slate-700"
                  } rounded-lg focus:outline-none focus:border-primary transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {getFieldError("password") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("password") as string}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400">🔒</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border ${
                    getFieldError("confirmPassword")
                      ? "border-red-500"
                      : "border-slate-200 dark:border-slate-700"
                  } rounded-lg focus:outline-none focus:border-primary transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {getFieldError("confirmPassword") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("confirmPassword") as string}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 mt-6"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
            <span className="text-xs uppercase font-bold text-slate-500">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold">
              <FcGoogle />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold">
              <GrApple />
              Apple
            </button>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            By proceeding, you agree to our{" "}
            <a href="#" className="text-primary hover:underline font-bold">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline font-bold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
