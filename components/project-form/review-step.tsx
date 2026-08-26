'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { generateShortToken } from '@/lib/utils/token'
import { formatDate } from '@/lib/utils/date'

function SectionMarker({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
      {children}
    </span>
  )
}

export function ReviewStep() {
  const router = useRouter()
  const supabase = createClient()
  const { customerData, projectData, areas, photos, setStep, reset } = useProjectFormStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')

  const totalItems = areas.reduce((sum, area) => sum + area.items.length, 0)
  const itemsWithWarranty = areas.flatMap((a) => a.items).filter((i) => i.warranty?.is_enabled).length

  const handleBack = () => {
    setStep('warranty')
  }

  const uploadPhoto = async (photo: any, projectId: string) => {
    const fileExt = photo.file.name.split('.').pop()
    const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('project-photos').upload(fileName, photo.file)

    if (uploadError) throw uploadError

    const {
      data: { publicUrl },
    } = supabase.storage.from('project-photos').getPublicUrl(fileName)

    return { path: fileName, url: publicUrl }
  }

  const handlePublish = async () => {
    if (!customerData) {
      setError('Customer information is missing')
      return
    }

    setLoading(true)
    setError('')
    setUploadProgress('Creating project...')

    let createdProjectId: string | null = null
    const uploadedPaths: string[] = []

    try {
      // Generate project ID
      const { data: projectIdData, error: idError } = await supabase.rpc('generate_project_id')
      if (idError) throw idError
      const projectId = projectIdData as string

      // Generate public token
      const publicToken = generateShortToken()

      // Create project
      setUploadProgress('Saving project details...')
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          project_id: projectId,
          customer_id: customerData.id,
          name: projectData.name,
          project_type: projectData.project_type,
          address: projectData.address,
          installation_date: projectData.installation_date,
          notes: projectData.notes,
          status: 'published',
          public_token: publicToken,
          published_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (projectError) throw projectError
      createdProjectId = project.id

      // Create areas and items
      setUploadProgress('Adding products...')
      for (const area of areas) {
        const { data: createdArea, error: areaError } = await supabase
          .from('project_areas')
          .insert({
            project_id: project.id,
            name: area.name,
            sort_order: area.sort_order,
          })
          .select()
          .single()

        if (areaError) throw areaError

        // Create items for this area
        for (const item of area.items) {
          const { data: createdItem, error: itemError } = await supabase
            .from('project_items')
            .insert({
              project_id: project.id,
              area_id: createdArea.id,
              product_id: item.product_id,
              quantity: item.quantity,
              unit: item.unit,
              installation_date: item.installation_date,
              installer_id: item.installer_id,
              batch_number: item.batch_number,
              custom_specifications: item.custom_specifications,
              custom_maintenance: item.custom_maintenance,
              customer_notes: item.customer_notes,
              internal_notes: item.internal_notes,
            })
            .select()
            .single()

          if (itemError) throw itemError

          // Create warranty if configured
          if (item.warranty?.is_enabled) {
            const { error: warrantyError } = await supabase.from('warranties').insert({
              project_item_id: createdItem.id,
              is_enabled: item.warranty.is_enabled,
              start_date: item.warranty.start_date,
              duration_months: item.warranty.duration_months,
              expiration_date: item.warranty.expiration_date,
              terms: item.warranty.terms,
            })

            if (warrantyError) throw warrantyError
          }
        }
      }

      // Upload and save photos
      if (photos.length > 0) {
        setUploadProgress(`Uploading photos (0/${photos.length})...`)
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i]
          setUploadProgress(`Uploading photos (${i + 1}/${photos.length})...`)

          const { path, url } = await uploadPhoto(photo, project.id)
          uploadedPaths.push(path)

          const { error: photoError } = await supabase.from('project_photos').insert({
            project_id: project.id,
            file_path: path,
            file_url: url,
            photo_type: photo.photo_type,
            is_customer_visible: photo.is_customer_visible,
            caption: photo.caption,
          })
          if (photoError) throw photoError
        }
      }

      // Reset form and redirect
      setUploadProgress('Complete!')
      reset()
      router.push(`/admin/projects/${project.id}/published`)
    } catch (err: any) {
      console.error('Error creating project:', err)
      if (uploadedPaths.length > 0) {
        const { error: storageCleanupError } = await supabase.storage
          .from('project-photos')
          .remove(uploadedPaths)
        if (storageCleanupError) console.error('Error cleaning up uploaded photos:', storageCleanupError)
      }
      if (createdProjectId) {
        const { error: projectCleanupError } = await supabase
          .from('projects')
          .delete()
          .eq('id', createdProjectId)
        if (projectCleanupError) console.error('Error cleaning up partial project:', projectCleanupError)
      }
      setError(err.message || 'Failed to create project')
    } finally {
      setLoading(false)
      setUploadProgress('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 7: Review & Publish</CardTitle>
        <p className="text-sm text-muted-foreground">Review your project before publishing</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-foreground">
            <SectionMarker>✓</SectionMarker>
            Customer Information
          </h3>
          <div className="ml-8 rounded-lg bg-secondary p-4">
            <p className="font-medium text-foreground">{customerData?.name}</p>
            <p className="text-sm text-muted-foreground">{customerData?.phone}</p>
            {customerData?.email && <p className="text-sm text-muted-foreground">{customerData.email}</p>}
          </div>
        </div>

        <Separator />

        {/* Project */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-foreground">
            <SectionMarker>✓</SectionMarker>
            Project Details
          </h3>
          <div className="ml-8 space-y-1 rounded-lg bg-secondary p-4">
            <p className="font-medium text-foreground">{projectData.name}</p>
            <p className="text-sm text-muted-foreground">
              Type: {projectData.project_type.charAt(0).toUpperCase() + projectData.project_type.slice(1)}
            </p>
            {projectData.installation_date && (
              <p className="text-sm text-muted-foreground">
                Installation: {formatDate(projectData.installation_date)}
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Areas & Products */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-foreground">
            <SectionMarker>{totalItems}</SectionMarker>
            Products Across {areas.length} Area{areas.length !== 1 ? 's' : ''}
          </h3>
          <div className="ml-8 space-y-2">
            {areas.map((area) => (
              <div key={area.id} className="rounded-lg bg-secondary p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-medium text-foreground">{area.name}</p>
                  <Badge variant="secondary">
                    {area.items.length} product{area.items.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <div className="space-y-1">
                  {area.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        • {item.product?.brand} {item.product?.name}
                      </span>
                      {item.warranty?.is_enabled && (
                        <Badge variant="outline" className="text-xs">
                          {item.warranty.duration_months}mo warranty
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Photos */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-foreground">
            <SectionMarker>{photos.length}</SectionMarker>
            Installation Photos
          </h3>
          {photos.length > 0 ? (
            <div className="ml-8 text-sm text-muted-foreground">
              <p>{photos.filter((p) => p.is_customer_visible).length} photos will be visible to customers</p>
              <p>{photos.filter((p) => !p.is_customer_visible).length} internal photos</p>
            </div>
          ) : (
            <p className="ml-8 text-sm text-muted-foreground">No photos uploaded</p>
          )}
        </div>

        <Separator />

        {/* Warranty Summary */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-foreground">
            <SectionMarker>{itemsWithWarranty}</SectionMarker>
            Warranty Coverage
          </h3>
          <div className="ml-8 rounded-lg bg-secondary p-4">
            <p className="text-sm text-muted-foreground">
              {itemsWithWarranty} of {totalItems} products have warranty coverage
            </p>
          </div>
        </div>

        {/* Validation warnings */}
        {totalItems === 0 && (
          <Alert variant="destructive">No products added. Please add at least one product before publishing.</Alert>
        )}

        {error && <Alert variant="destructive">{error}</Alert>}

        {uploadProgress && <Alert>{uploadProgress}</Alert>}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} disabled={loading} className="h-10">
            Back
          </Button>
          <Button onClick={handlePublish} size="lg" disabled={loading || totalItems === 0} className="h-10">
            {loading ? 'Publishing…' : 'Save & Generate QR'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
