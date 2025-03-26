'use client'

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainNav() {
    const router = useRouter()
    
    // 로그아웃
    const logout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if(!error){
            router.push('/');
        }
    }

    return (
        <nav className="min-w-xs h-full flex flex-col">
            <Link href={'/main'} className="text-center">Managing</Link>
            <Link href={'/main'} className="text-center">대시보드</Link>
            <Link href={'/calendar'} className="text-center">달력</Link>
            <button type="button" className="cursor-pointer" onClick={logout}>로그아웃</button>
        </nav>
    )
}