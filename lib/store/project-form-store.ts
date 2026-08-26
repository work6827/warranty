import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProjectFormStep = 
  | 'customer'
  | 'project'
  | 'areas'
  | 'products'
  | 'installation'
  | 'warranty'
  | 'review'

export interface ProjectFormArea {
  id: string
  name: string
  sort_order: number
  items: ProjectFormItem[]
}

export interface ProjectFormItem {
  id: string
  area_id: string
  product_id: string
  product?: any
  quantity: number
  unit: string
  installation_date?: string
  installer_id?: string
  batch_number?: string
  custom_specifications?: Record<string, any>
  custom_maintenance?: string
  customer_notes?: string
  internal_notes?: string
  warranty?: {
    is_enabled: boolean
    start_date: string
    duration_months: number
    expiration_date: string
    terms?: string
  }
}

export interface ProjectFormPhoto {
  id: string
  file: File
  preview: string
  photo_type?: 'before' | 'during' | 'after'
  area_id?: string
  project_item_id?: string
  is_customer_visible: boolean
  caption?: string
}

interface ProjectFormState {
  // Current step
  currentStep: ProjectFormStep
  
  // Customer
  customerId?: string
  customerData?: {
    id: string
    name: string
    phone: string
    email?: string
    address?: string
  }
  
  // Project
  projectData: {
    name: string
    project_type: 'residential' | 'office' | 'commercial' | 'hospitality' | 'healthcare' | 'education' | 'other'
    address?: string
    installation_date?: string
    notes?: string
  }
  
  // Areas and items
  areas: ProjectFormArea[]
  
  // Photos
  photos: ProjectFormPhoto[]
  
  // Actions
  setStep: (step: ProjectFormStep) => void
  setCustomer: (id: string, data: any) => void
  setProjectData: (data: Partial<ProjectFormState['projectData']>) => void
  addArea: (name: string) => void
  removeArea: (id: string) => void
  updateArea: (id: string, name: string) => void
  addItem: (areaId: string, item: Omit<ProjectFormItem, 'id'>) => void
  updateItem: (itemId: string, updates: Partial<ProjectFormItem>) => void
  removeItem: (itemId: string) => void
  addPhoto: (photo: ProjectFormPhoto) => void
  updatePhoto: (id: string, updates: Partial<ProjectFormPhoto>) => void
  removePhoto: (id: string) => void
  reset: () => void
}

const initialState = {
  currentStep: 'customer' as ProjectFormStep,
  projectData: {
    name: '',
    project_type: 'residential' as const,
  },
  areas: [],
  photos: [],
}

export const useProjectFormStore = create<ProjectFormState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setStep: (step) => set({ currentStep: step }),
      
      setCustomer: (id, data) => set({ customerId: id, customerData: data }),
      
      setProjectData: (data) => set((state) => ({
        projectData: { ...state.projectData, ...data }
      })),
      
      addArea: (name) => set((state) => ({
        areas: [...state.areas, {
          id: crypto.randomUUID(),
          name,
          sort_order: state.areas.length,
          items: []
        }]
      })),
      
      removeArea: (id) => set((state) => ({
        areas: state.areas.filter(a => a.id !== id)
      })),
      
      updateArea: (id, name) => set((state) => ({
        areas: state.areas.map(a => a.id === id ? { ...a, name } : a)
      })),
      
      addItem: (areaId, item) => set((state) => ({
        areas: state.areas.map(area => 
          area.id === areaId 
            ? { 
                ...area, 
                items: [...area.items, { ...item, id: crypto.randomUUID(), area_id: areaId }]
              }
            : area
        )
      })),
      
      updateItem: (itemId, updates) => set((state) => ({
        areas: state.areas.map(area => ({
          ...area,
          items: area.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        }))
      })),
      
      removeItem: (itemId) => set((state) => ({
        areas: state.areas.map(area => ({
          ...area,
          items: area.items.filter(item => item.id !== itemId)
        }))
      })),
      
      addPhoto: (photo) => set((state) => ({
        photos: [...state.photos, photo]
      })),
      
      updatePhoto: (id, updates) => set((state) => ({
        photos: state.photos.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      
      removePhoto: (id) => set((state) => ({
        photos: state.photos.filter(p => p.id !== id)
      })),
      
      reset: () => set(initialState),
    }),
    {
      name: 'project-form-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        customerId: state.customerId,
        customerData: state.customerData,
        projectData: state.projectData,
        areas: state.areas.map(area => ({
          ...area,
          items: area.items.map(item => ({
            ...item,
            product: undefined // Don't persist full product data
          }))
        })),
        // Don't persist photos (File objects can't be serialized)
        photos: [],
      }),
    }
  )
)
