# UI Components

Bộ sưu tập các UI components được thiết kế với Tailwind CSS và shadcn/ui.

## Components

### Button

Component button với nhiều variants và sizes khác nhau.

```tsx
import { Button } from '@/components/ui/button'
;<Button variant="default" size="default">
  Click me
</Button>
```

### Card

Component card để hiển thị nội dung có cấu trúc.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
;<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Card content goes here</CardContent>
</Card>
```

### Input

Component input với support cho icon và validation states.

```tsx
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
;<Input type="email" placeholder="Enter your email" icon={<Mail className="w-4 h-4" />} error={hasError} />
```

### LoadingSpinner

Component loading spinner với nhiều sizes và colors.

```tsx
import { LoadingSpinner } from '@/components/ui/loading-spinner'
;<LoadingSpinner size="md" color="blue" />
```

### Alert

Components alert để hiển thị thông báo với các variants khác nhau.

```tsx
import { AlertError, AlertSuccess, AlertWarning, AlertInfo } from '@/components/ui/alert'

<AlertError>This is an error message</AlertError>
<AlertSuccess>This is a success message</AlertSuccess>
<AlertWarning>This is a warning message</AlertWarning>
<AlertInfo>This is an info message</AlertInfo>
```

### InfoCard

Component để hiển thị thông tin với styling đẹp.

```tsx
import { InfoCard } from '@/components/ui/info-card'
import { Info } from 'lucide-react'
;<InfoCard variant="blue" title="Demo Credentials" icon={<Info className="w-4 h-4" />}>
  <p>Email: admin@example.com</p>
  <p>Password: password</p>
</InfoCard>
```

### PageLoader

Component loading cho toàn bộ trang.

```tsx
import { PageLoader } from '@/components/ui/page-loader'
;<PageLoader message="Loading your data..." size="lg" />
```

### Toast

Component toast để hiển thị thông báo tạm thời.

```tsx
import { Toast } from '@/components/ui/toast'
;<Toast
  variant="success"
  title="Success!"
  description="Your action was completed successfully."
  onClose={() => setShowToast(false)}
  autoClose={true}
  duration={5000}
/>
```

### Separator

Component separator để phân chia nội dung.

```tsx
import { Separator } from '@/components/ui/separator'
;<Separator className="my-4" />
```

## Hooks

### useFormValidation

Hook để quản lý form validation một cách chuyên nghiệp.

```tsx
import { useFormValidation } from '@/hooks/useFormValidation'

const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 6
  }
}

const { values, errors, touched, handleChange, handleBlur, validateForm, isFormValid } = useFormValidation(
  { email: '', password: '' },
  validationRules
)
```

## Styling

Tất cả components sử dụng Tailwind CSS classes và có thể được customize thông qua className prop hoặc variants.

## Accessibility

Các components được thiết kế với accessibility in mind, bao gồm:

- Proper ARIA labels
- Keyboard navigation
- Screen reader support
- Focus management
