'use client'

import { useState, useEffect } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export function CustomerStep() {
  const supabase = createClient()
  const { customerData, setCustomer, setStep } = useProjectFormStore()

  // New customer form
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  })

  // Existing customer search
  const [searchQuery, setSearchQuery] = useState('')
  const [existingCustomers, setExistingCustomers] = useState<any[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(
    customerData?.id || null
  )

  // Load existing customers
  useEffect(() => {
    loadCustomers()
  }, [searchQuery])

  const loadCustomers = async () => {
    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`)
    }

    const { data } = await query
    setExistingCustomers(data || [])
  }

  const handleCreateCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert('Name and phone are required')
      return
    }

    const { data, error } = await supabase
      .from('customers')
      .insert([newCustomer])
      .select()
      .single()

    if (error) {
      alert('Error creating customer: ' + error.message)
      return
    }

    setCustomer(data.id, data)
    setStep('project')
  }

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomer(customer.id)
    setCustomer(customer.id, customer)
  }

  const handleContinue = () => {
    if (!selectedCustomer) {
      alert('Please select a customer')
      return
    }
    setStep('project')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 1: Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={customerData ? 'existing' : 'new'} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New Customer</TabsTrigger>
            <TabsTrigger value="existing">Existing Customer</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Customer Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Budi Santoso"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="628123456789"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="budi@example.com"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">Address (Internal Only)</Label>
                <Textarea
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  placeholder="Full address"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleCreateCustomer} size="lg" className="h-10">
                Continue to Project
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="existing" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="search">Search Customer</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="h-10"
                />
              </div>

              <div className="max-h-96 space-y-2 overflow-y-auto">
                {existingCustomers.length === 0 ? (
                  <p className="py-8 text-center text-muted-foreground">No customers found</p>
                ) : (
                  existingCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                      className={cn(
                        'w-full rounded-lg border p-4 text-left transition-colors',
                        selectedCustomer === customer.id
                          ? 'border-primary bg-secondary'
                          : 'border-border hover:border-foreground/20'
                      )}
                    >
                      <div className="font-medium text-foreground">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                      {customer.email && (
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleContinue} size="lg" disabled={!selectedCustomer} className="h-10">
                Continue to Project
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
