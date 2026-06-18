import { createClient } from '@supabase/supabase-js';

// Access Supabase credentials from Vite environment variables
let sanitizedUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
if (sanitizedUrl.endsWith('/rest/v1/')) {
  sanitizedUrl = sanitizedUrl.replace('/rest/v1/', '');
} else if (sanitizedUrl.endsWith('/rest/v1')) {
  sanitizedUrl = sanitizedUrl.replace('/rest/v1', '');
}
const supabaseUrl = sanitizedUrl;
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_supabase_project_url'));

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Hearing {
  date: string;
  nextHearingDate?: string;
  proceedings: string;
  orderSheetUrl?: string;
  caseTitle?: string;
  caseNo?: string;
  purpose?: string;
  judgeName?: string;
  courtName?: string;
  caseId?: string;
}

export interface CaseData {
  id?: string;
  caseTitle: string;
  caseNo: string;
  srNo: string;
  judgeName: string;
  courtName: string;
  counselName: string;
  lastHearingDate: string;
  nextHearingDate: string;
  clientId: string;
  clientPassword?: string;
  proceedings: string;
  orderSheetUrl?: string;
  hearings: Hearing[];
  status?: string;
}

// ----------------------------------------------------
// SQL QUERY FOR CREATING TABLES IN SUPABASE:
// ----------------------------------------------------
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor to set up the perfect tables:

create table if not exists cases (
  id text primary key,
  "caseTitle" text not null,
  "caseNo" text not null,
  "srNo" text not null,
  "judgeName" text not null,
  "courtName" text not null,
  "counselName" text not null,
  "lastHearingDate" text not null,
  "nextHearingDate" text not null,
  "clientId" text not null,
  "clientPassword" text,
  proceedings text not null,
  "orderSheetUrl" text,
  hearings jsonb default '[]'::jsonb,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table cases enable row level security;

-- Create policies to allow public access (or customized read/write)
create policy "Allow all read access" on cases for select using (true);
create policy "Allow all write access" on cases for insert with check (true);
create policy "Allow all update access" on cases for update using (true);
create policy "Allow all delete access" on cases for delete using (true);
`;

/**
 * Fetch all cases from Supabase
 */
export async function fetchSupabaseCases(): Promise<CaseData[]> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error loading cases from Supabase:", error);
    throw error;
  }

  return (data || []) as CaseData[];
}

/**
 * Save / Insert a new case in Supabase
 */
export async function createSupabaseCase(newCase: CaseData): Promise<CaseData> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  // Generate unique ID if not present
  const docId = newCase.id || 'case_' + Math.random().toString(36).substring(2, 9);
  const dataToInsert = {
    ...newCase,
    id: docId,
  };

  const { data, error } = await supabase
    .from('cases')
    .insert([dataToInsert])
    .select();

  if (error) {
    console.error("Error creating case in Supabase:", error);
    throw error;
  }

  return data[0] as CaseData;
}

/**
 * Update an existing case in Supabase
 */
export async function updateSupabaseCase(caseId: string, updatedFields: Partial<CaseData>): Promise<void> {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase
    .from('cases')
    .update(updatedFields)
    .eq('id', caseId);

  if (error) {
    console.error("Error updating case in Supabase:", error);
    throw error;
  }
}

/**
 * Seed database with default data if empty
 */
export async function seedSupabaseIfEmpty(defaultCases: CaseData[]): Promise<CaseData[]> {
  if (!supabase) return defaultCases;

  try {
    const existing = await fetchSupabaseCases();
    if (existing.length === 0) {
      console.log("Supabase 'cases' table is empty. Initializing with default seed records...");
      const promises = defaultCases.map(c => {
        const payload = { ...c };
        if (!payload.id) {
          payload.id = 'case_' + Math.random().toString(36).substring(2, 9);
        }
        return supabase!.from('cases').insert([payload]);
      });
      await Promise.all(promises);
      return await fetchSupabaseCases();
    }
    return existing;
  } catch (err) {
    console.warn("Supabase empty check or seeding skipped (verify table schema matches SETUP_SQL):", err);
    return defaultCases;
  }
}
