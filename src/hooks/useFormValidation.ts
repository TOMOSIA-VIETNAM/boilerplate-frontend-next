import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface ValidationErrors {
  [key: string]: string
}

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules: ValidationRules
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const rules = validationRules[name]
      if (!rules) return null

      // Required validation
      if (rules.required && !value.trim()) {
        return 'This field is required'
      }

      // Skip other validations if field is empty and not required
      if (!value.trim() && !rules.required) {
        return null
      }

      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        return `Minimum length is ${rules.minLength} characters`
      }

      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        return `Maximum length is ${rules.maxLength} characters`
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Invalid format'
      }

      // Custom validation
      if (rules.custom) {
        return rules.custom(value)
      }

      return null
    },
    [validationRules]
  )

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {}
    let isValid = true

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, (values[fieldName] as string) || '')
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validationRules, validateField])

  const handleChange = useCallback(
    (name: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }))

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    },
    [errors]
  )

  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }))

      const error = validateField(name, (values[name] as string) || '')
      setErrors((prev) => ({ ...prev, [name]: error || '' }))
    },
    [values, validateField]
  )

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const isFormValid = useCallback(() => {
    return Object.keys(validationRules).every((fieldName) => {
      const value = (values[fieldName] as string) || ''
      return !validateField(fieldName, value)
    })
  }, [values, validationRules, validateField])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    isFormValid: isFormValid(),
    setValues,
    setErrors
  }
}
