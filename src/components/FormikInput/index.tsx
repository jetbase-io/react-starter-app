import type { InputHTMLAttributes } from 'react'
import type { FormikValues, useFormik } from 'formik'

export interface FormikInputProps<T extends FormikValues> {
  formik: ReturnType<typeof useFormik<T>>
  fieldName: keyof T
  labelText?: string
  placeholder?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete']
}

export const FormikInput = <T extends FormikValues>({
  formik,
  fieldName,
  placeholder,
  labelText,
  type,
  autoComplete,
}: FormikInputProps<T>) => {
  return (
    <div>
      {!!labelText && (
        <label htmlFor="" className="block text-sm font-bold text-gray-600">
          {labelText}
        </label>
      )}
      <input
        name={String(fieldName)}
        placeholder={placeholder ?? `Type your ${String(fieldName)}...`}
        value={formik.values[fieldName]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type={type ?? 'text'}
        className="w-full p-2 mt-1 border border-gray-300 rounded"
        autoComplete={autoComplete}
      />
      {formik.touched[fieldName] && formik?.errors?.[fieldName] ? (
        <p className="text-red-500">{formik.errors[fieldName]?.toString()}</p>
      ) : null}
    </div>
  )
}
