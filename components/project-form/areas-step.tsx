'use client'

import { useState } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const commonAreas = [
  'Living Room',
  'Master Bedroom',
  'Bedroom 2',
  'Bedroom 3',
  'Kitchen',
  'Dining Room',
  'Bathroom',
  'Office',
  'Lobby',
  'Reception',
  'Meeting Room',
  'Windows',
  'Facade',
]

export function AreasStep() {
  const { areas, addArea, removeArea, setStep } = useProjectFormStore()
  const [newAreaName, setNewAreaName] = useState('')

  const handleAddArea = () => {
    if (!newAreaName.trim()) return
    addArea(newAreaName.trim())
    setNewAreaName('')
  }

  const handleQuickAdd = (name: string) => {
    addArea(name)
  }

  const handleContinue = () => {
    if (areas.length === 0) {
      alert('Please add at least one area')
      return
    }
    setStep('products')
  }

  const handleBack = () => {
    setStep('project')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 3: Project Areas</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add areas or rooms where products will be installed
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick add common areas */}
        <div className="space-y-2">
          <Label>Quick Add Common Areas</Label>
          <div className="flex flex-wrap gap-2">
            {commonAreas.map((area) => (
              <Badge
                key={area}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => handleQuickAdd(area)}
              >
                + {area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Add custom area */}
        <div className="space-y-1.5">
          <Label htmlFor="new-area">Add Custom Area</Label>
          <div className="flex gap-2">
            <Input
              id="new-area"
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              placeholder="Enter area name"
              className="h-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddArea()
                }
              }}
            />
            <Button onClick={handleAddArea} className="h-10">
              Add
            </Button>
          </div>
        </div>

        {/* Current areas */}
        {areas.length > 0 && (
          <div className="space-y-2">
            <Label>Project Areas ({areas.length})</Label>
            <div className="space-y-2">
              {areas.map((area) => (
                <div
                  key={area.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-foreground">{area.name}</div>
                    {area.items.length > 0 && (
                      <Badge variant="secondary">
                        {area.items.length} product{area.items.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArea(area.id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            Back
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            Continue to Products
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
