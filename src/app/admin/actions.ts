// Admin server actions — require a server runtime (Vercel/Node).
// Stubbed for static export compatibility; restore "use server" on Vercel.
import type { ProductInput } from "@/lib/admin-types";

export async function saveProduct(_input: ProductInput): Promise<void> {}
export async function deleteProduct(_id: string, _slug: string): Promise<void> {}
export async function setPublished(_id: string, _published: boolean, _slug: string): Promise<void> {}
export async function signOut(): Promise<void> {}
