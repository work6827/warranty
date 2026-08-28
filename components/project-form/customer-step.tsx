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
import { useLocale } from '@/lib/i18n/locale-context'

export function CustomerStep() {
  const { locale } = useLocale()
  const c = (en: string, id: string) => locale === 'id' ? id : en
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

  useEffect(() => {
    let active = true
    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`)
    }

    void query.then(({ data }) => { if (active) setExistingCustomers(data || []) })
    return () => { active = false }
  }, [searchQuery, supabase])

  const handleCreateCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert(c('Name and phone are required', 'Nama dan nomor telepon wajib diisi'))
      return
    }

    const { data, error } = await supabase
      .from('customers')
      .insert([newCustomer])
      .select()
      .single()

    if (error) {
      alert(c('Error creating customer: ', 'Gagal membuat pelanggan: ') + error.message)
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
      alert(c('Please select a customer', 'Silakan pilih pelanggan'))
      return
    }
    setStep('project')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{c('Step 1: Customer Information', 'Langkah 1: Informasi Pelanggan')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={customerData ? 'existing' : 'new'} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">{c('New Customer', 'Pelanggan Baru')}</TabsTrigger>
            <TabsTrigger value="existing">{c('Existing Customer', 'Pelanggan Terdaftar')}</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  {c('Customer Name', 'Nama Pelanggan')} <span className="text-destructive">*</span>
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
                  {c('Phone Number', 'Nomor Telepon')} <span className="text-destructive">*</span>
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
                <Label htmlFor="email">{c('Email (Optional)', 'Email (Opsional)')}</Label>
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
                <Label htmlFor="address">{c('Address (Internal Only)', 'Alamat (Internal Saja)')}</Label>
                <Textarea
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  placeholder={c('Full address', 'Alamat lengkap')}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleCreateCustomer} size="lg" className="h-10">
                {c('Continue to Project', 'Lanjut ke Proyek')}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="existing" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="search">{c('Search Customer', 'Cari Pelanggan')}</Label>
                <Input
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={c('Search by name or phone...', 'Cari berdasarkan nama atau telepon...')}
                  className="h-10"
                />
              </div>

              <div className="max-h-96 space-y-2 overflow-y-auto">
                {existingCustomers.length === 0 ? (
                  <p className="py-8 text-center text-muted-foreground">{c('No customers found', 'Pelanggan tidak ditemukan')}</p>
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
                {c('Continue to Project', 'Lanjut ke Proyek')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
