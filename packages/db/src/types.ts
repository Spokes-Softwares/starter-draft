export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      asset_types: {
        Row: {
          asset_type: string
          created_at: string
          id: string
          tenant_id: string
        }
        Insert: {
          asset_type: string
          created_at?: string
          id?: string
          tenant_id: string
        }
        Update: {
          asset_type?: string
          created_at?: string
          id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_service_counts"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "asset_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_types"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "asset_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_type: string
          created_at: string
          hub_id: string
          id: string
          reference_tag: string
          service_status: string
        }
        Insert: {
          asset_type: string
          created_at?: string
          hub_id: string
          id?: string
          reference_tag: string
          service_status: string
        }
        Update: {
          asset_type?: string
          created_at?: string
          hub_id?: string
          id?: string
          reference_tag?: string
          service_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "assets_asset_type_fkey"
            columns: ["asset_type"]
            isOneToOne: false
            referencedRelation: "asset_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "tenant_hubs"
            referencedColumns: ["id"]
          },
        ]
      }
      hub_users: {
        Row: {
          created_at: string
          hub_id: string
          id: string
          user_id: string
          user_role: string
        }
        Insert: {
          created_at?: string
          hub_id: string
          id?: string
          user_id: string
          user_role: string
        }
        Update: {
          created_at?: string
          hub_id?: string
          id?: string
          user_id?: string
          user_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "hub_users_hub_id_fkey"
            columns: ["hub_id"]
            isOneToOne: false
            referencedRelation: "tenant_hubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hub_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_records: {
        Row: {
          asset_id: string
          created_at: string
          created_by: string
          id: string
          metadata: Json | null
          parts: string[] | null
          service_type: string
        }
        Insert: {
          asset_id: string
          created_at?: string
          created_by: string
          id?: string
          metadata?: Json | null
          parts?: string[] | null
          service_type: string
        }
        Update: {
          asset_id?: string
          created_at?: string
          created_by?: string
          id?: string
          metadata?: Json | null
          parts?: string[] | null
          service_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_records_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "hub_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_records_service_type_fkey"
            columns: ["service_type"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      parts: {
        Row: {
          id: string
          name: string
          price: number | null
          stock_count: number | null
          tenant_id: string
          unique_key: string | null
        }
        Insert: {
          id?: string
          name: string
          price?: number | null
          stock_count?: number | null
          tenant_id: string
          unique_key?: string | null
        }
        Update: {
          id?: string
          name?: string
          price?: number | null
          stock_count?: number | null
          tenant_id?: string
          unique_key?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_service_counts"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "parts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_types"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "parts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string
          id: string
          is_operator: boolean
          last_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name: string
          id: string
          is_operator?: boolean
          last_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string
          id?: string
          is_operator?: boolean
          last_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_types: {
        Row: {
          created_at: string
          id: string
          tenant_id: string
          type_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id: string
          type_name: string
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string
          type_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_service_counts"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "service_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_types"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "service_types_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_hubs: {
        Row: {
          created_at: string
          display_name: string
          id: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_hubs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_service_counts"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "tenant_hubs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_types"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "tenant_hubs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_users: {
        Row: {
          created_at: string
          id: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_service_counts"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_asset_types"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          company_name: string
          created_at: string
          display_name: string | null
          id: string
        }
        Insert: {
          company_name: string
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      tenant_asset_service_counts: {
        Row: {
          asset_count: number | null
          company_name: string | null
          display_name: string | null
          service_status: string | null
          tenant_id: string | null
        }
        Relationships: []
      }
      tenant_asset_types: {
        Row: {
          asset_count: number | null
          asset_type: string | null
          company_name: string | null
          display_name: string | null
          tenant_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      is_hub_admin: { Args: { p_hub_id: string }; Returns: boolean }
      is_hub_tenant: { Args: { p_hub_id: string }; Returns: boolean }
      is_hub_user: { Args: { p_hub_id: string }; Returns: boolean }
      is_operator: { Args: never; Returns: boolean }
      is_tenant: { Args: { p_tenant_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

