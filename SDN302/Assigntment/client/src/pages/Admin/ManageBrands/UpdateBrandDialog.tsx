import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog.tsx";
import { Field, FieldGroup } from "../../../components/ui/field.tsx";
import { Input } from "../../../components/ui/input.tsx";
import { Label } from "../../../components/ui/label.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { Edit } from "lucide-react";
import type { IBrand } from "../../../types/type";

interface UpdateBrandFormData {
  brandName: string;
}
interface UpdateBrandDialogProps {
  brand: IBrand;
  onSubmit: (data: UpdateBrandFormData) => Promise<void>;
}
// Validation Schema
const brandValidationSchema = Yup.object({
  brandName: Yup.string()
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name must not exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9\s&'-]+$/,
      "Brand name can only contain letters, numbers, spaces, &, ', and -",
    )
    .required("Brand name is required"),
});
const UpdateBrandDialog = ({ brand, onSubmit }: UpdateBrandDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formik = useFormik({
    initialValues: {
      brandName: brand.brandName || "",
    },
    enableReinitialize: true,
    validationSchema: brandValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitError("");
      try {
        await onSubmit(values);
        resetForm();
        setOpen(false);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Failed to create brand",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      formik.resetForm();
      setSubmitError("");
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-blue-50 hover:text-blue-600"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Brand</DialogTitle>
            <DialogDescription>
              Update the brand information below.
            </DialogDescription>
          </DialogHeader>

          {/* Error Message */}
          {submitError && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="brandName">
                Brand Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="brandName"
                name="brandName"
                value={formik.values.brandName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g., Chanel, Dior, Gucci"
                className={
                  formik.touched.brandName && formik.errors.brandName
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }
              />
              {formik.touched.brandName && formik.errors.brandName && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.brandName}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter a unique brand name (2-50 characters)
              </p>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                disabled={formik.isSubmitting}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Updating..." : "Update Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBrandDialog;
