'use client'

import { Check } from 'lucide-react'
import { useProjectFormStore, ProjectFormStep } from '@/lib/store/project-form-store'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n/locale-context'

const steps: { key: ProjectFormStep; label: string; number: number }[] = [
  { key: 'customer', label: 'Customer', number: 1 },
  { key: 'project', label: 'Project', number: 2 },
  { key: 'areas', label: 'Areas', number: 3 },
  { key: 'products', label: 'Products', number: 4 },
  { key: 'installation', label: 'Installation', number: 5 },
  { key: 'warranty', label: 'Warranty', number: 6 },
  { key: 'review', label: 'Review', number: 7 },
]

export function StepIndicator() {
  const { locale } = useLocale()
  const currentStep = useProjectFormStore((state) => state.currentStep)
  const currentStepIndex = steps.findIndex((s) => s.key === currentStep)
  const labels: Record<ProjectFormStep, string> = locale === 'id'
    ? { customer: 'Pelanggan', project: 'Proyek', areas: 'Area', products: 'Produk', installation: 'Instalasi', warranty: 'Garansi', review: 'Tinjau' }
    : { customer: 'Customer', project: 'Project', areas: 'Areas', products: 'Products', installation: 'Installation', warranty: 'Warranty', review: 'Review' }

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex
          const isCompleted = index < currentStepIndex

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full text-sm font-medium transition-colors',
                    isActive || isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {isCompleted ? <Check className="size-4" /> : step.number}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium',
                    isActive
                      ? 'text-foreground'
                      : isCompleted
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/60'
                  )}
                >
                  {labels[step.key]}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn('mx-3 h-px flex-1', isCompleted ? 'bg-primary' : 'bg-border')}
                  style={{ minWidth: '32px' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
