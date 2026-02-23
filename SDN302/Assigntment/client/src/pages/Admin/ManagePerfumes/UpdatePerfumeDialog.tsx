import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { brandAPI } from "../../../services/brandAPI";
import type { IBrand, IPerfume } from "../../../types/type";
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
import { Edit } from "lucide-react";
interface UpdatePerfumeFormData {
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string;
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string;
  brand: string;
}
interface UpdatePerfumeDialogProps {
  perfume: IPerfume;
  onSubmit: (data: UpdatePerfumeFormData) => Promise<void>;
}
const TARGET_AUDIENCE_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "unisex", label: "Unisex" },
] as const;
const perfumeValidationSchema = Yup.object({
  perfumeName: Yup.string()
    .min(2, "Perfume name must be at least 2 characters")
    .max(50, "Perfume name must not exceed 50 characters")
    .required("Perfume name is required"),
  uri: Yup.string().url().required("uri is require"),
  description: Yup.string().required("Description is required"),
  brand: Yup.string().required("brand is required"),

  price: Yup.number()
    .min(1, "perfume price must greater than 1")
    .required("price is required"),
  concentration: Yup.string().required("concentration is require"),
  ingredients: Yup.string().required("ingregients is require"),
  volume: Yup.number()
    .min(1, "volume must greater than 1")
    .required("volume is required"),
  targetAudience: Yup.string()
    .required("Target audience is required")
    .oneOf(["male", "female", "unisex"], "Invalid target audience"),
});
const UpdatePerfumeDialog = ({
  perfume,
  onSubmit,
}: UpdatePerfumeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [brands, setBrands] = useState<IBrand[]>([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await brandAPI.getAllBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);
  const formik = useFormik({
    initialValues: {
      perfumeName: perfume.perfumeName || "",
      uri: perfume.uri || "",
      price: perfume.price || 0,
      concentration: perfume.concentration || "",
      brand: perfume.brand._id || "",
      description: perfume.description || "",
      ingredients: perfume.ingredients || "",
      volume: perfume.volume || 0,
      targetAudience: perfume.targetAudience || "male",
    },
    enableReinitialize: true,
    validationSchema: perfumeValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitError("");
      try {
        await onSubmit(values);
        resetForm();
        setOpen(false);
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Failed to update Perfume",
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
      <DialogContent className="sm:max-w-[1200px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Perfume</DialogTitle>
            <DialogDescription>
              Add a new Perfume to your catalog. Fill in the details below.
            </DialogDescription>
          </DialogHeader>

          {/* Error Message */}
          {submitError && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {submitError}
            </div>
          )}

          <FieldGroup className="py-4">
            <div className="flex ">
              <Field className="">
                <Label htmlFor="perfumeName">
                  Perfume Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="perfumeName"
                  name="perfumeName"
                  value={formik.values.perfumeName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume name"
                  className={
                    formik.touched.perfumeName && formik.errors.perfumeName
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.perfumeName && formik.errors.perfumeName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.perfumeName}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="uri">
                  Perfume URI <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="uri"
                  name="uri"
                  value={formik.values.uri}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume uri"
                  className={
                    formik.touched.uri && formik.errors.uri
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.uri && formik.errors.uri && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.uri}
                  </p>
                )}
              </Field>
            </div>
            <div className="flex">
              <Field>
                <Label htmlFor="price">
                  Perfume price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume price"
                  className={
                    formik.touched.price && formik.errors.price
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.price}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="concentration">
                  Perfume concentration <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="concentration"
                  name="concentration"
                  value={formik.values.concentration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume concentration"
                  className={
                    formik.touched.concentration && formik.errors.concentration
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.concentration &&
                  formik.errors.concentration && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.concentration}
                    </p>
                  )}
              </Field>
            </div>
            <div className="flex">
              <Field>
                <Label htmlFor="description">
                  Perfume description <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume description"
                  className={
                    formik.touched.description && formik.errors.description
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="ingredients">
                  Perfume ingredients <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ingredients"
                  name="ingredients"
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume ingredients"
                  className={
                    formik.touched.ingredients && formik.errors.ingredients
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.ingredients && formik.errors.ingredients && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.ingredients}
                  </p>
                )}
              </Field>
            </div>
            <div className="flex">
              <Field>
                <Label htmlFor="volume">
                  Perfume volume <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="volume"
                  name="volume"
                  type="number"
                  value={formik.values.volume}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Perfume volume"
                  className={
                    formik.touched.volume && formik.errors.volume
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {formik.touched.volume && formik.errors.volume && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.volume}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="targetAudience">
                  Target Audience <span className="text-red-500">*</span>
                </Label>
                <select
                  id="targetAudience"
                  name="targetAudience"
                  value={formik.values.targetAudience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    formik.touched.targetAudience &&
                    formik.errors.targetAudience
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                >
                  {TARGET_AUDIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formik.touched.targetAudience &&
                  formik.errors.targetAudience && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.targetAudience}
                    </p>
                  )}
              </Field>
            </div>
            <div className="flex">
              <Field>
                <Label htmlFor="brand">
                  Brand <span className="text-red-500">*</span>
                </Label>
                <select
                  id="brand"
                  name="brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    formik.touched.brand && formik.errors.brand
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
                {formik.touched.brand && formik.errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.brand}
                  </p>
                )}
              </Field>
            </div>
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
              {formik.isSubmitting ? "Updateting..." : "Uppdate Perfume"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePerfumeDialog;
