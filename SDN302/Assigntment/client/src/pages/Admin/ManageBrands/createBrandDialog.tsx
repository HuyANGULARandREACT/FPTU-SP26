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
import { Field, FieldGroup } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button.tsx";
import { Plus } from "lucide-react";

interface CreateBrandFormData {
  brandName: string;
}

interface CreateBrandDialogProps {
  onSubmit: (data: CreateBrandFormData) => Promise<void>;
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

const CreateBrandDialog = ({ onSubmit }: CreateBrandDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      brandName: "",
    },
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
        <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-800 text-white rounded-15 px-7 py-5 shadow-md">
          <div className="bg-white/20 rounded-full p-1">
            <Plus className="h-5 w-5" />
          </div>
          <span className="font-medium">Add Brands</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Brand</DialogTitle>
            <DialogDescription>
              Add a new brand to your catalog. Fill in the details below.
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
              {formik.isSubmitting ? "Creating..." : "Create Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandDialog;
