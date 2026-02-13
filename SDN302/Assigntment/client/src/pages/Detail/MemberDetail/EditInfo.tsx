import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemberDetail, useUpdateMember } from "../../../hooks";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";

// Validation Schema
const editInfoValidationSchema = Yup.object({
  membername: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Full name is required"),
  YOB: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date(1900, 0, 1), "Date of birth must be after 1900")
    .required("Date of birth is required"),
  gender: Yup.boolean().required("Gender is required"),
});

const EditInfo = () => {
  const { member, loading: fetchLoading } = useMemberDetail();
  const { updateMember, loading: updateLoading, error } = useUpdateMember();
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      membername: "",
      YOB: new Date(),
      gender: true,
    },
    validationSchema: editInfoValidationSchema,
    onSubmit: async (values) => {
      if (!member?._id) return;

      const result = await updateMember(member._id, values);

      if (result) {
        // Success - navigate back to profile
        setSuccessMessage("Infomation changed successfully!");
      }
    },
  });

  // Initialize form data when member data is loaded
  useEffect(() => {
    if (member) {
      formik.setValues({
        membername: member.membername,
        YOB: new Date(member.YOB),
        gender: member.gender,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  const getFieldError = (fieldName: keyof typeof formik.values) => {
    const error = formik.touched[fieldName] && formik.errors[fieldName];
    return error && typeof error === "string" ? error : null;
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Please login to edit your profile</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Information</h1>
        <p className="text-gray-500">
          Update your personal profile details and preferences.
        </p>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Full Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="membername"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  Full Name
                </Label>
                <Input
                  id="membername"
                  name="membername"
                  value={formik.values.membername}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`bg-gray-50 ${
                    getFieldError("membername")
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {getFieldError("membername") && (
                  <p className="text-xs text-red-500">
                    {getFieldError("membername")}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label
                  htmlFor="YOB"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  Date of Birth
                </Label>
                <Input
                  id="YOB"
                  name="YOB"
                  type="date"
                  value={
                    formik.values.YOB instanceof Date
                      ? formik.values.YOB.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    formik.setFieldValue("YOB", new Date(e.target.value));
                  }}
                  onBlur={formik.handleBlur}
                  max={new Date().toISOString().split("T")[0]}
                  className={`bg-gray-50 ${
                    getFieldError("YOB")
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {getFieldError("YOB") && (
                  <p className="text-xs text-red-500">{getFieldError("YOB")}</p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  Gender
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formik.values.gender ? "male" : "female"}
                  onChange={(e) => {
                    formik.setFieldValue("gender", e.target.value === "male");
                  }}
                  onBlur={formik.handleBlur}
                  className={`flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    getFieldError("gender")
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {getFieldError("gender") && (
                  <p className="text-xs text-red-500">
                    {getFieldError("gender")}
                  </p>
                )}
              </div>

              {/* Email Address (Read-only) */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-600 uppercase"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={member.email}
                  className="bg-gray-100"
                  disabled
                />
              </div>
            </div>
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                disabled={updateLoading || !formik.isValid}
                className="px-6 bg-orange-600 hover:bg-orange-700"
              >
                {updateLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditInfo;
