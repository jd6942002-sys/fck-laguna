/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient, User } from "@supabase/supabase-js";
import supabaseConfig from "../../supabase-config.json";

// Check if actual configuration has been entered (not empty placeholders)
export const isSupabaseConfigured =
  !!supabaseConfig &&
  !!supabaseConfig.supabaseUrl &&
  !!supabaseConfig.supabaseAnonKey &&
  supabaseConfig.supabaseUrl.trim() !== "" &&
  supabaseConfig.supabaseUrl.includes("supabase.co");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseAnonKey, {
      auth: {
        // Keep the logged-in session alive across page refreshes via
        // the JWT stored in localStorage by the Supabase client.
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          // Publishable metadata so the dashboard can identify the app.
          "X-Client-Info": "sparkle-web",
        },
      },
    })
  : null;

if (isSupabaseConfigured) {
  console.log(
    "Supabase initialized successfully with credentials for project:",
    supabaseConfig.projectRef || supabaseConfig.supabaseUrl
  );
} else {
  console.warn(
    "Client is running in sandbox mock session. To enable live sync, set SUPABASE_URL / SUPABASE_ANON_KEY in supabase-config.json."
  );
}

// Return the currently authenticated Supabase user (if any).
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

// Standardized Supabase Error Logger
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface SupabaseErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleSupabaseError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: SupabaseErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
    },
    operationType,
    path,
  };
  console.error("Supabase Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
