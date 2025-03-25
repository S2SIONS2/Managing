'use client'

import LoginNav from "@/components/loginNav";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const [errorMsg, setErrorMsg] = useState('');
    const [errorStatus, setErrorStatus] = useState(0);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false); // 회원가입 버튼 중복 방지

    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg('');
        setErrorStatus(0);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const checkPw = formData.get('checkPw') as string;

        if (password !== checkPw) {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
            setIsLoading(false);
            return;
        }

        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (error?.message.includes('User already registered')) {
            setErrorStatus(421); // 중복 이메일
            return;
        } else if (error?.message.includes('Password should be at least 6 characters')) {
            setErrorStatus(422); // 비밀번호 약함
            return;
        } else if (error?.status === 400) {
            setErrorStatus(400);
        } else if (!error) {
            alert('회원가입이 완료되었습니다.');
            router.push('/login');
        }

        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <LoginNav />
            <main className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>
                <p className="text-center text-sm mb-6">
                    <Link href="/login" className="text-blue-600 hover:underline">
                        이미 계정이 있으신가요? 로그인 하러 가기 →
                    </Link>
                </p>

                <form onSubmit={handleSignup} className="space-y-5">
                    {/* 이름 */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">이름</label>
                        <input type="text" name="name" required placeholder="이름을 입력하세요"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">이메일</label>
                        <input type="email" name="email" required placeholder="email@example.com"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errorStatus === 400 && (
                            <p className="text-sm text-red-500 mt-1">이메일 형식을 확인해주세요.</p>
                        )}
                        {errorStatus === 421 && (
                            <p className="text-sm text-red-500 mt-1">이미 존재하는 이메일입니다.</p>
                        )}
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">비밀번호</label>
                        <input type="password" name="password" required placeholder="비밀번호"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errorStatus === 422 && (
                            <p className="text-sm text-red-500 mt-1">비밀번호는 6자리 이상 입력해주세요.</p>
                        )}
                    </div>

                    {/* 비밀번호 확인 */}
                    <div>
                        <label htmlFor="checkPw" className="block text-sm font-medium mb-1">비밀번호 확인</label>
                        <input type="password" name="checkPw" required placeholder="비밀번호 확인"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errorMsg && (
                            <p className="text-sm text-red-500 mt-1">{errorMsg}</p>
                        )}
                    </div>

                    <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md transition ${
                            isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        >
                        {isLoading ? '가입 중...' : '회원가입'}
                    </button>

                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button type="button"
                        className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                        Gmail로 로그인
                    </button>
                </div>
            </main>
        </div>
    );
}
