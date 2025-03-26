'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import LoginNav from "@/components/loginNav";
import Link from "next/link";

export default function Page() {
    const [email, setEmail] = useState('solee9802@gmail.com'); // 아이디
    const [password, setPassword] = useState('123456'); // 비밀번호
    const [errorMsg, setErrorMsg] = useState(''); // 에러 메시지
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false) // 로그인 버튼 중복 방지

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true)

        if (!email || !password) {
            setErrorMsg("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMsg("아이디나 비밀번호가 틀렸습니다.");
        } else {
            router.push('/main');
            setIsLoading(false)
        }

    };

    return (
        <div>
            <LoginNav />
            <main className="max-w-md mx-auto mt-10 p-4 shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label>이메일</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-sm">{errorMsg}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer ${
                                isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            로그인
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm">
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        계정이 없으신가요? 회원가입 하러 가기 →
                    </Link>
                </p>
            </main>
        </div>
    );
}
