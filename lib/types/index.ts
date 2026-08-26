import { Database } from './database'

// Type helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Entity types
export type Customer = Tables<'customers'>
export type Project = Tables<'projects'>
export type ProjectArea = Tables<'project_areas'>
export type Category = Tables<'categories'>
export type CategorySpecification = Tables<'category_specifications'>
export type Product = Tables<'products'>
export type Installer = Tables<'installers'>
export type ProjectItem = Tables<'project_items'>
export type Warranty = Tables<'warranties'>
export type ProjectPhoto = Tables<'project_photos'>
export type ServiceRecord = Tables<'service_records'>
export type Setting = Tables<'settings'>

// Extended types with relations
export type ProjectWithCustomer = Project & {
  customer: Customer
}

export type ProjectItemWithDetails = ProjectItem & {
  product: Product & {
    category: Category
  }
  area: ProjectArea
  installer: Installer | null
  warranty: Warranty | null
}

export type ProjectFullDetails = Project & {
  customer: Customer
  areas: (ProjectArea & {
    items: ProjectItemWithDetails[]
  })[]
  photos: ProjectPhoto[]
  service_records: (ServiceRecord & {
    technician: Installer | null
  })[]
}

// Form types
export type CustomerFormData = {
  name: string
  phone: string
  email?: string
  address?: string
  notes?: string
}

export type ProjectFormData = {
  customer_id: string
  name: string
  project_type: Project['project_type']
  address?: string
  installation_date?: string
  notes?: string
}

export type AreaFormData = {
  name: string
  sort_order?: number
}

export type ProductFormData = {
  category_id: string
  brand: string
  name: string
  series?: string
  sku?: string
  specifications: Record<string, any>
  default_warranty_months: number
  maintenance_instructions?: string
  image_url?: string
}

export type ProjectItemFormData = {
  area_id: string
  product_id: string
  quantity: number
  unit: string
  installation_date?: string
  installer_id?: string
  batch_number?: string
  custom_specifications?: Record<string, any>
  custom_maintenance?: string
  customer_notes?: string
  internal_notes?: string
}

export type WarrantyFormData = {
  is_enabled: boolean
  start_date: string
  duration_months: number
  expiration_date: string
  terms?: string
}

// Utility types
export type WarrantyStatus = 'active' | 'expiring_soon' | 'expired' | 'no_warranty'
export type ProjectStatus = 'draft' | 'published' | 'archived'
export type PhotoType = 'before' | 'during' | 'after'
export type ServiceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled'

// View models for UI
export type ProjectSummary = {
  id: string
  project_id: string
  customer_name: string
  project_name: string
  project_type: string
  installation_date: string | null
  status: ProjectStatus
  categories: string[]
  item_count: number
  warranty_count: number
}

export type WarrantySummary = {
  product_name: string
  category_name: string
  area_name: string
  status: WarrantyStatus
  expiration_date: string
  days_remaining: number
}

// API response types
export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Passport data structure
export type PassportData = {
  project: Project
  customer: {
    name: string
    phone: string
  }
  areas: {
    id: string
    name: string
    items: {
      id: string
      product: {
        brand: string
        name: string
        series: string | null
        category: {
          name: string
        }
      }
      quantity: number
      unit: string
      installation_date: string | null
      specifications: Record<string, any>
      maintenance: string | null
      warranty: {
        status: WarrantyStatus
        expiration_date: string
        terms: string | null
      } | null
    }[]
  }[]
  photos: {
    url: string
    type: PhotoType | null
    caption: string | null
  }[]
  service_records: {
    date: string
    type: string
    status: ServiceStatus
    notes: string | null
  }[]
}
