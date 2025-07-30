import { useForm, UseFormReturn, FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Login form schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export type LoginFormData = z.infer<typeof loginSchema>

// User form schema
const userSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['admin', 'user', 'moderator']),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    confirmPassword: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.password && data.password !== data.confirmPassword) {
        return false
      }
      return true
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword']
    }
  )

export type UserFormData = z.infer<typeof userSchema>

// Profile form schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  avatar: z.string().url('Invalid URL').optional()
})

export type ProfileFormData = z.infer<typeof profileSchema>

// Generic form hook with validation
export const useFormWithValidation = <T extends FieldValues>(
  schema: z.ZodSchema<T>,
  defaultValues?: Partial<T>
): UseFormReturn<T, FieldValues> => {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>
  })
}

// Login form hook
export const useLoginForm = (defaultValues?: Partial<LoginFormData>) => {
  return useFormWithValidation(loginSchema, defaultValues)
}

// User form hook
export const useUserForm = (defaultValues?: Partial<UserFormData>) => {
  return useFormWithValidation(userSchema, defaultValues)
}

// Profile form hook
export const useProfileForm = (defaultValues?: Partial<ProfileFormData>) => {
  return useFormWithValidation(profileSchema, defaultValues)
}

// Generic form submission handler
export const createFormHandler = <T extends FieldValues>(
  onSubmit: SubmitHandler<T>,
  onError?: (errors: unknown) => void
) => {
  return (data: T) => {
    try {
      onSubmit(data)
    } catch (error) {
      onError?.(error)
    }
  }
}

// Form validation helpers
export const getFieldError = (errors: unknown, fieldName: string) => {
  return (errors as Record<string, { message: string }>)[fieldName]?.message
}

export const isFieldValid = (errors: unknown, fieldName: string) => {
  return !(errors as Record<string, { message: string }>)[fieldName]
}
