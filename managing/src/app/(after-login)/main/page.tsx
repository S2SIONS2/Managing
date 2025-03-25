import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function MainPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}