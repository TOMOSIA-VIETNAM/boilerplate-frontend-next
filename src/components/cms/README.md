# CMS Components

A comprehensive collection of reusable components designed for Content Management Systems (CMS) and admin dashboards.

## Components Overview

### 🗂️ DataTable

Advanced table component with sorting, pagination, search, and row actions.

**Features:**

- ✅ Sorting (ascending/descending)
- ✅ Pagination with configurable page size
- ✅ Global search functionality
- ✅ Row selection (single/multiple)
- ✅ Row actions (view, edit, delete)
- ✅ Bulk actions for selected rows
- ✅ Custom column rendering
- ✅ Responsive design

**Usage:**

```tsx
import { DataTable } from '@/components/cms'
;<DataTable
  data={data}
  columns={columns}
  pageSize={10}
  searchable={true}
  sortable={true}
  selectable={true}
  actions={[
    {
      label: 'Delete Selected',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (selectedRows) => handleDelete(selectedRows),
      variant: 'destructive'
    }
  ]}
  rowActions={[
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: (row) => handleEdit(row)
    }
  ]}
/>
```

### 🪟 Modal Components

Flexible modal system with different variants for various use cases.

**Components:**

- `Modal` - Basic modal with backdrop
- `ConfirmModal` - Confirmation dialog
- `FormModal` - Modal with form layout

**Features:**

- ✅ Backdrop click to close
- ✅ ESC key to close
- ✅ Multiple sizes (sm, md, lg, xl, full)
- ✅ Customizable header and footer
- ✅ Portal rendering

**Usage:**

```tsx
import { Modal, ConfirmModal, FormModal } from '@/components/cms'

// Basic Modal
<Modal isOpen={isOpen} onClose={onClose} title="Title">
  Content here
</Modal>

// Confirm Modal
<ConfirmModal
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  title="Confirm Action"
  message="Are you sure?"
  variant="destructive"
/>

// Form Modal
<FormModal
  isOpen={isOpen}
  onClose={onClose}
  onSubmit={handleSubmit}
  title="Edit User"
>
  <FormFields />
</FormModal>
```

### 🔽 Select Components

Enhanced select components with advanced features.

**Components:**

- `Select` - Single/Multi select with search
- `Autocomplete` - Async search with custom rendering

**Features:**

- ✅ Single and multi-select modes
- ✅ Searchable options
- ✅ Keyboard navigation
- ✅ Custom option rendering
- ✅ Async search support
- ✅ Loading states

**Usage:**

```tsx
import { Select, Autocomplete } from '@/components/cms'

// Single Select
<Select
  options={options}
  value={value}
  onChange={setValue}
  searchable={true}
  label="Select Option"
/>

// Multi Select
<Select
  options={options}
  value={values}
  onChange={setValues}
  multi={true}
  searchable={true}
/>

// Autocomplete
<Autocomplete
  options={options}
  value={selectedOption}
  onChange={setSelectedOption}
  onSearch={async (query) => await searchAPI(query)}
  placeholder="Search..."
/>
```

### 📝 Form Components

Pre-configured form components for common use cases.

**Components:**

- `Form` - Form container with submit handling
- `FormField` - Field wrapper with label and error
- `FormSection` - Section grouping
- `TextField` - Text input field
- `TextareaField` - Multi-line text input
- `SelectField` - Select dropdown field
- `AutocompleteField` - Autocomplete field

**Pre-configured Fields:**

- `EmailField` - Email input with validation
- `PasswordField` - Password input
- `PhoneField` - Phone number input
- `UrlField` - URL input
- `NameField` - Name input
- `AddressField` - Address input
- `DateField` - Date picker
- `TimeField` - Time picker
- `NumberField` - Number input
- `DescriptionField` - Description textarea
- `ContentField` - Content textarea

**Usage:**

```tsx
import { Form, FormSection, EmailField, NameField, SelectField } from '@/components/cms'
;<Form onSubmit={handleSubmit}>
  <FormSection title="Basic Information">
    <div className="grid grid-cols-2 gap-4">
      <NameField name="name" label="Full Name" required />
      <EmailField name="email" label="Email Address" required />
    </div>
    <SelectField name="role" label="Role" options={roleOptions} searchable={true} />
  </FormSection>
</Form>
```

## Demo Page

Visit `/dashboard/cms-components` to see all components in action with interactive examples.

## Styling

All components use Tailwind CSS and follow the design system established in the project. They are fully responsive and accessible.

## TypeScript Support

All components include comprehensive TypeScript definitions for type safety and better developer experience.

## Accessibility

Components follow WCAG guidelines and include:

- Keyboard navigation
- ARIA labels
- Focus management
- Screen reader support
- High contrast support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

- React 18+
- Next.js 13+
- Tailwind CSS
- Lucide React (for icons)
- TypeScript
