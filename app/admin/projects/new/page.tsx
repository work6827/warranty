'use client'

import { useEffect } from 'react'
import { useProjectFormStore } from '@/lib/store/project-form-store'
import { StepIndicator } from '@/components/project-form/step-indicator'
import { CustomerStep } from '@/components/project-form/customer-step'
import { ProjectStep } from '@/components/project-form/project-step'
import { AreasStep } from '@/components/project-form/areas-step'
import { ProductsStep } from '@/components/project-form/products-step'
import { InstallationStep } from '@/components/project-form/installation-step'
import { WarrantyStep } from '@/components/project-form/warranty-step'
import { ReviewStep } from '@/components/project-form/review-step'

export default function NewProjectPage() {
  const { currentStep } = useProjectFormStore()

  // Reset form when component mounts
  useEffect(() => {
    // Only reset if explicitly requested
    // reset()
  }, [])

  const renderStep = () => {
    switch (currentStep) {
      case 'customer':
        return <CustomerStep />
      case 'project':
        return <ProjectStep />
      case 'areas':
        return <AreasStep />
      case 'products':
        return <ProductsStep />
      case 'installation':
        return <InstallationStep />
      case 'warranty':
        return <WarrantyStep />
      case 'review':
        return <ReviewStep />
      default:
        return <CustomerStep />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Create Halla+ Digital Passport
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Follow the steps to create a complete project passport
          </p>
        </div>

        <StepIndicator />

        <div className="mt-8">{renderStep()}</div>
      </div>
    </div>
  )
}
