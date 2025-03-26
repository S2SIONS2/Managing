import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function MainPage() {
  const supabase = await createClient();

  // 로그인 안됐을 때 로그인 페이지로 이동
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  console.log(data)

  return <p>Hello {data.user.email}</p>
}