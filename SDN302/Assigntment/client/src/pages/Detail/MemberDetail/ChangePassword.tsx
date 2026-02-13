import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authAPI } from "../../../services";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";

// Validation Schema
const changePasswordValidationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")

    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      if (!user?._id) return;

      try {
        setLoading(true);
        setError("");

        await authAPI.changePassword({
          id: user._id,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });

        setSuccessMessage("Password changed successfully!");
        formik.resetForm();
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to change password. Please try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  const getFieldError = (fieldName: keyof typeof formik.values) => {
    const error = formik.touched[fieldName] && formik.errors[fieldName];
    return error && typeof error === "string" ? error : null;
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Please login to change your password</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Change Password</h1>
        <p className="text-gray-500">
          Update your credentials to keep your account secure. We recommend
          using a unique password you don't use elsewhere.
        </p>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6 mb-8">
              {/* Current Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="oldPassword"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-gray-50 pr-10 ${
                      getFieldError("oldPassword")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {getFieldError("oldPassword") && (
                  <p className="text-xs text-red-500">
                    {getFieldError("oldPassword")}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="newPassword"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-gray-50 pr-10 ${
                      getFieldError("newPassword")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {getFieldError("newPassword") && (
                  <p className="text-xs text-red-500">
                    {getFieldError("newPassword")}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`bg-gray-50 pr-10 ${
                      getFieldError("confirmPassword")
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {getFieldError("confirmPassword") && (
                  <p className="text-xs text-red-500">
                    {getFieldError("confirmPassword")}
                  </p>
                )}
              </div>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Info Message */}
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-md flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-orange-700">
                After changing your password, you will stay logged in on this
                device. Any other active sessions will be required to
                re-authenticate with your new credentials for security purposes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                disabled={loading || !formik.isValid}
                className="px-6 bg-orange-600 hover:bg-orange-700"
              >
                {loading ? "Saving..." : "Save Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
