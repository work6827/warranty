'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export function PassportPhotos({ photos }: { photos: any[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const beforePhotos = photos.filter((p) => p.photo_type === 'before')
  const duringPhotos = photos.filter((p) => p.photo_type === 'during')
  const afterPhotos = photos.filter((p) => p.photo_type === 'after')
  const otherPhotos = photos.filter((p) => !p.photo_type)

  const PhotoGrid = ({ photos, title }: { photos: any[]; title: string }) => {
    if (photos.length === 0) return null

    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo.file_url)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
            >
              <img
                src={photo.file_url}
                alt={photo.caption || 'Installation photo'}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 text-xs text-white line-clamp-2">
                  {photo.caption}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Installation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {beforePhotos.length > 0 && <PhotoGrid photos={beforePhotos} title="Before" />}
          {duringPhotos.length > 0 && <PhotoGrid photos={duringPhotos} title="During" />}
          {afterPhotos.length > 0 && <PhotoGrid photos={afterPhotos} title="After" />}
          {otherPhotos.length > 0 && <PhotoGrid photos={otherPhotos} title="Photos" />}
        </CardContent>
      </Card>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-4xl p-0">
            <img src={selectedPhoto} alt="Installation photo" className="h-auto w-full rounded-lg" />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
