'use client'

import { useProjectFormStore } from '@/lib/store/project-form-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const projectTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
]

export function ProjectStep() {
  const { projectData, setProjectData, setStep, customerData } = useProjectFormStore()

  const handleContinue = () => {
    if (!projectData.name || !projectData.project_type) {
      alert('Please fill in required fields')
      return
    }
    setStep('areas')
  }

  const handleBack = () => {
    setStep('customer')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Step 2: Project Information</CardTitle>
        {customerData && (
          <p className="text-sm text-muted-foreground">Customer: {customerData.name}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="project-name">
              Project Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="project-name"
              value={projectData.name}
              onChange={(e) => setProjectData({ name: e.target.value })}
              placeholder="PIK Residence Renovation"
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">A descriptive name for this project</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="project-type">
              Project Type <span className="text-destructive">*</span>
            </Label>
            <Select value={projectData.project_type} onValueChange={(value: any) => setProjectData({ project_type: value })}>
              <SelectTrigger id="project-type" className="h-10 w-full">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="installation-date">Installation Date</Label>
            <Input
              id="installation-date"
              type="date"
              value={projectData.installation_date || ''}
              onChange={(e) => setProjectData({ installation_date: e.target.value })}
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Project Address (Internal Only)</Label>
            <Textarea
              id="address"
              value={projectData.address || ''}
              onChange={(e) => setProjectData({ address: e.target.value })}
              placeholder="Full project address"
              rows={3}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes">Internal Notes</Label>
            <Textarea
              id="notes"
              value={projectData.notes || ''}
              onChange={(e) => setProjectData({ notes: e.target.value })}
              placeholder="Any internal notes about this project"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={handleBack} className="h-10">
            Back
          </Button>
          <Button onClick={handleContinue} size="lg" className="h-10">
            Continue to Areas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
