'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { RadioGroup } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Plus, Edit, Trash2, MoreHorizontal, User, Search, Filter, Download } from 'lucide-react'

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' }
]

const selectOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'editor', label: 'Editor' },
  { value: 'moderator', label: 'Moderator' }
]

const radioOptions = [
  { value: 'option1', label: 'Option 1', description: 'This is the first option' },
  { value: 'option2', label: 'Option 2', description: 'This is the second option' },
  { value: 'option3', label: 'Option 3', description: 'This is the third option' }
]

export default function CMSComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [radioValue, setRadioValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const [progressValue, setProgressValue] = useState(65)
  const [sliderValue, setSliderValue] = useState(50)
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">CMS Components Demo</h1>
        <p className="text-gray-600">A comprehensive showcase of all available UI components for the CMS system.</p>
      </div>

      {/* Basic Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                With Icon
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>Text input and textarea components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Enter text..." />
            <Input placeholder="With icon..." icon={<Search className="h-4 w-4" />} />
            <Textarea placeholder="Enter description..." />
            <Input disabled placeholder="Disabled input" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status and category indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Active</Badge>
              <Badge variant="secondary">Pending</Badge>
              <Badge variant="destructive">Error</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Dropdown</CardTitle>
            <CardDescription>Single selection dropdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              options={selectOptions}
              value={selectedValue}
              onValueChange={setSelectedValue}
              placeholder="Select a role"
            />
            <p className="text-sm text-gray-600">Selected: {selectedValue || 'None'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Checkbox & Switch</CardTitle>
            <CardDescription>Boolean input controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Checkbox
              id="terms"
              checked={checkboxValue}
              onCheckedChange={setCheckboxValue}
              label="Accept terms and conditions"
            />
            <Switch
              id="notifications"
              checked={switchValue}
              onCheckedChange={setSwitchValue}
              label="Enable notifications"
            />
            <Switch id="dark-mode" label="Dark mode" description="Switch to dark theme" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radio Group</CardTitle>
            <CardDescription>Single choice selection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup options={radioOptions} value={radioValue} onValueChange={setRadioValue} />
            <p className="text-sm text-gray-600">Selected: {radioValue || 'None'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progress & Slider</CardTitle>
            <CardDescription>Progress indicators and range controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Progress Bar</label>
              <Progress value={progressValue} showLabel />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                  -10%
                </Button>
                <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                  +10%
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slider Control</label>
              <Slider value={sliderValue} onValueChange={setSliderValue} showValue min={0} max={100} step={5} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Organized content sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p>This is the overview content. Here you can see general information.</p>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <p>Analytics data and charts would be displayed here.</p>
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <p>Reports and detailed analysis would be shown here.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
          <CardDescription>Display and manage tabular data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search users..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      trigger={
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      }
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Modal Dialog</CardTitle>
          <CardDescription>Overlay dialogs for user interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Large Modal
            </Button>
          </div>

          <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Make changes to user information here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input id="name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input id="email" defaultValue="john@example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    Role
                  </label>
                  <Select options={selectOptions} defaultValue="user" placeholder="Select role" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Notification and status messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert>
              <AlertDescription>This is a default alert message for general information.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertDescription>This is a destructive alert for error messages.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>Visual dividers and spacing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p>Content above separator</p>
              <Separator className="my-4" />
              <p>Content below separator</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center space-x-4">
              <span>Left content</span>
              <Separator orientation="vertical" />
              <span>Right content</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
