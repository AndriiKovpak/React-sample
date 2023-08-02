import { FormikErrors, FormikTouched } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useToastFormikErrors = <IFormData = FormikErrors<any>>(
  errors: FormikErrors<IFormData>,
  touched?: FormikTouched<IFormData>
) => {
  useEffect(() => {
    for (const [field, message] of Object.entries(errors)) {
      if (typeof touched !== "undefined" && !touched[field as keyof FormikTouched<IFormData>]) continue;
      console.error(message);
      toast.error(message as string, { position: toast.POSITION.BOTTOM_CENTER });
    }
  }, [errors, touched]);
};
