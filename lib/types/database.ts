export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'superadmin'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role?: 'admin' | 'superadmin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'superadmin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          address: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          address?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          address?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          project_id: string
          customer_id: string
          name: string
          project_type: 'residential' | 'office' | 'commercial' | 'hospitality' | 'healthcare' | 'education' | 'other'
          address: string | null
          installation_date: string | null
          status: 'draft' | 'published' | 'archived'
          public_token: string | null
          notes: string | null
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          customer_id: string
          name: string
          project_type: 'residential' | 'office' | 'commercial' | 'hospitality' | 'healthcare' | 'education' | 'other'
          address?: string | null
          installation_date?: string | null
          status?: 'draft' | 'published' | 'archived'
          public_token?: string | null
          notes?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          customer_id?: string
          name?: string
          project_type?: 'residential' | 'office' | 'commercial' | 'hospitality' | 'healthcare' | 'education' | 'other'
          address?: string | null
          installation_date?: string | null
          status?: 'draft' | 'published' | 'archived'
          public_token?: string | null
          notes?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      project_areas: {
        Row: {
          id: string
          project_id: string
          name: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          sort_order?: number
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      category_specifications: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          data_type: 'text' | 'number' | 'percentage' | 'option'
          unit: string | null
          options: Json | null
          is_required: boolean
          is_visible_to_customer: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          data_type?: 'text' | 'number' | 'percentage' | 'option'
          unit?: string | null
          options?: Json | null
          is_required?: boolean
          is_visible_to_customer?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          data_type?: 'text' | 'number' | 'percentage' | 'option'
          unit?: string | null
          options?: Json | null
          is_required?: boolean
          is_visible_to_customer?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          brand: string
          name: string
          series: string | null
          sku: string | null
          specifications: Json
          default_warranty_months: number
          maintenance_instructions: string | null
          image_url: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          brand: string
          name: string
          series?: string | null
          sku?: string | null
          specifications?: Json
          default_warranty_months?: number
          maintenance_instructions?: string | null
          image_url?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          brand?: string
          name?: string
          series?: string | null
          sku?: string | null
          specifications?: Json
          default_warranty_months?: number
          maintenance_instructions?: string | null
          image_url?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      installers: {
        Row: {
          id: string
          name: string
          phone: string | null
          role: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          role?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      project_items: {
        Row: {
          id: string
          project_id: string
          area_id: string
          product_id: string
          quantity: number
          unit: string
          installation_date: string | null
          installer_id: string | null
          batch_number: string | null
          custom_specifications: Json
          custom_maintenance: string | null
          customer_notes: string | null
          internal_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          area_id: string
          product_id: string
          quantity: number
          unit: string
          installation_date?: string | null
          installer_id?: string | null
          batch_number?: string | null
          custom_specifications?: Json
          custom_maintenance?: string | null
          customer_notes?: string | null
          internal_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          area_id?: string
          product_id?: string
          quantity?: number
          unit?: string
          installation_date?: string | null
          installer_id?: string | null
          batch_number?: string | null
          custom_specifications?: Json
          custom_maintenance?: string | null
          customer_notes?: string | null
          internal_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      warranties: {
        Row: {
          id: string
          project_item_id: string
          is_enabled: boolean
          start_date: string
          duration_months: number
          expiration_date: string
          terms: string | null
          status: 'active' | 'expiring_soon' | 'expired' | 'no_warranty'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_item_id: string
          is_enabled?: boolean
          start_date: string
          duration_months: number
          expiration_date: string
          terms?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_item_id?: string
          is_enabled?: boolean
          start_date?: string
          duration_months?: number
          expiration_date?: string
          terms?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_photos: {
        Row: {
          id: string
          project_id: string
          area_id: string | null
          project_item_id: string | null
          file_path: string
          file_url: string
          photo_type: 'before' | 'during' | 'after' | null
          is_customer_visible: boolean
          caption: string | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          area_id?: string | null
          project_item_id?: string | null
          file_path: string
          file_url: string
          photo_type?: 'before' | 'during' | 'after' | null
          is_customer_visible?: boolean
          caption?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          area_id?: string | null
          project_item_id?: string | null
          file_path?: string
          file_url?: string
          photo_type?: 'before' | 'during' | 'after' | null
          is_customer_visible?: boolean
          caption?: string | null
          uploaded_by?: string | null
          created_at?: string
        }
      }
      service_records: {
        Row: {
          id: string
          project_id: string
          area_id: string | null
          project_item_id: string | null
          service_date: string
          service_type: string
          technician_id: string | null
          status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          customer_notes: string | null
          internal_notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          area_id?: string | null
          project_item_id?: string | null
          service_date: string
          service_type: string
          technician_id?: string | null
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          customer_notes?: string | null
          internal_notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          area_id?: string | null
          project_item_id?: string | null
          service_date?: string
          service_type?: string
          technician_id?: string | null
          status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          customer_notes?: string | null
          internal_notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          key: string
          value: string
          description: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          description?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          description?: string | null
          updated_at?: string
        }
      }
    }
    // This schema uses TEXT columns with CHECK constraints rather than
    // native Postgres enums, so there's nothing to list here — kept for
    // parity with the shape `supabase gen types` would produce.
    Enums: Record<string, never>
  }
}
