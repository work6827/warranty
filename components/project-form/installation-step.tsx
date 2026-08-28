'use client'

import { useState, useEffect } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { createClient } from '@/lib/supabase/client'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert } from '@/components/ui/alert'

export function InstallationStep() {
  const supabase = createClient()
  const { areas, photos, addPhoto, removePhoto, updatePhoto, updateItem, setStep } = useProjectFormStore()

  const [installers, setInstallers] = useState<any[]>([])

  useEffect(() => {
    let active = true
    void supabase.from('installers').select('*').eq('is_active', true).order('name')
      .then(({ data }) => { if (active) setInstallers(data || []) })
    return () => { active = false }
  }, [supabase])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files')
        continue
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 5MB`)
        continue
      }

      // Create preview
      const preview = URL.createObjectURL(file)

      addPhoto({
        id: crypto.randomUUID(),
        file,
        preview,
        is_customer_visible: true,
      })
    }

    // Reset input
    e.target.value = ''
  }

  const handleUpdateInstaller = (itemId: string, installerId: string) => {
    updateItem(itemId, { installer_id: installerId === 'none' ? undefined : installerId })
  }

  const handleUpdateInstallationDate = (itemId: string, date: string) => {
    updateItem(itemId, { installation_date: date || undefined })
  }

  const handleContinue = () => {
    setStep('warranty')
  }

  const handleBack = () => {
    setStep('products')
  }

  const allItems = areas.flatMap((area) => area.items.map((item) => ({ ...item, area_name: area.name })))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 5: Installation Documentation</CardTitle>
        <p className="text-sm text-muted-foreground">Upload photos and add installation details</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Installation Details per Product */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Installation Details</h3>
          {allItems.length === 0 ? (
            <Alert>No products added yet. Please add products first.</Alert>
          ) : (
            <div className="space-y-3">
              {allItems.map((item) => (
                <div key={item.id} className="space-y-3 rounded-lg border border-border bg-card p-4">
                  <div>
                    <p className="font-medium text-foreground">{item.product?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.area_name} • {item.quantity} {item.unit}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Installation Date</Label>
                      <Input
                        type="date"
                        value={item.installation_date || ''}
                        onChange={(e) => handleUpdateInstallationDate(item.id, e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Installation Technician</Label>
                      <Select
                        value={item.installer_id || 'none'}
                        onValueChange={(value) => handleUpdateInstaller(item.id, value ?? 'none')}
                      >
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select technician">
                            {(value: string) =>
                              value === 'none'
                                ? 'No technician assigned'
                                : installers.find((i) => i.id === value)?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No technician assigned</SelectItem>
                          {installers.map((installer) => (
                            <SelectItem key={installer.id} value={installer.id}>
                              {installer.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photo Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Installation Photos</h3>
            <Button
              variant="outline"
              onClick={() => document.getElementById('photo-upload')?.click()}
              className="h-9 gap-1.5"
            >
              <Upload className="size-4" />
              Upload Photos
            </Button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {photos.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border py-12 text-center">
              <p className="mb-4 text-muted-foreground">No photos uploaded yet</p>
              <Button variant="outline" onClick={() => document.getElementById('photo-upload')?.click()}>
                Upload Your First Photo
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {photos.map((photo) => (
                <div key={photo.id} className="overflow-hidden rounded-lg border border-border bg-card">
                  <img src={photo.preview} alt="Installation" className="h-40 w-full object-cover" />
                  <div className="space-y-2 p-3">
                    <Select
                      value={photo.photo_type || 'none'}
                      onValueChange={(value: any) =>
                        updatePhoto(photo.id, { photo_type: value === 'none' ? undefined : value })
                      }
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Photo type">
                          {(value: string) =>
                            ({ none: 'No type', before: 'Before', during: 'During', after: 'After' })[value]
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No type</SelectItem>
                        <SelectItem value="before">Before</SelectItem>
                        <SelectItem value="during">During</SelectItem>
                        <SelectItem value="after">After</SelectItem>
                      </SelectContent>
                    </Select>

                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={photo.is_customer_visible}
                        onChange={(e) => updatePhoto(photo.id, { is_customer_visible: e.target.checked })}
                        className="rounded"
                      />
                      Show to customer
                    </label>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePhoto(photo.id)}
                      className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Photos marked as &quot;Show to customer&quot; will appear on the public passport. Max file size:
            5MB per photo.
          </p>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            Back
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            Continue to Warranty
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
