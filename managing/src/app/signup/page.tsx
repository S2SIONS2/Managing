'use client'

import LoginNav from "@/components/loginNav";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const [errorMsg, setErrorMsg] = useState(''); // 비밀번호 체크 메세지
    const [errorStatus, setErrorStatus] = useState(0); // 회원가입 오류 코드
    const router = useRouter();

    // 회원가입
    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg(''); // 초기화
        setErrorStatus(0)

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const checkPw = formData.get('checkPw') as string;

        if (password !== checkPw) {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
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
            setErrorStatus(422-1)
            return;
        }else if (error?.message.includes('Password should be at least 6 characters.')) {
            setErrorStatus(422-2)
            return;
        }else if(error?.status === 400) {
            setErrorStatus(400)
        }else if(!error){
            setErrorMsg('')
            setErrorStatus(0)
            alert('회원가입이 완료되었습니다.')
            router.push('/login');
        }

    }

    return (
        <div>
            <LoginNav />
            <main>
                <h2>회원가입</h2>
                <Link href={'/login'}>계정이 있으신가요? 로그인 하러 가기</Link>

                <form onSubmit={handleSignup}>
                    <div>
                        <p>이름</p>
                        <input type="text" name="name" className="border-1 border-solid border-line-400 rounded-sm"  required placeholder="name" />
                    </div>
                    <div>
                        <p>이메일</p>
                        <input type="email" name="email" className="border-1 border-solid border-line-400 rounded-sm"  required placeholder="email" />                        
                        {
                            errorStatus === 400 ? (
                                <p className="text-red-500">아이디는 id@email.com 형식으로 해주세요.</p>
                            ) : (
                                <p></p>
                            )
                        }
                        {
                            errorStatus === 422-1 ? (
                                <p className="text-red-500">이미 존재하는 이메일입니다.</p>
                            ) : (
                                <p></p>
                            )
                        }
                    </div>
                    <div>
                        <p>비밀번호</p>
                        <input type="password" name="password" className="border-1 border-solid border-line-400 rounded-sm"  required placeholder="password" />
                        {
                            errorStatus === 422-2 ? (
                                <p className="text-red-500">비밀번호는 6자리 이상 입력해주세요.</p>
                            ) : (
                                <p></p>
                            )
                        }
                    </div>
                    <div>
                        <p>비밀번호 확인</p>
                        <input type="password" name="checkPw" className="border-1 border-solid border-line-400 rounded-sm"  required placeholder="confirm password" />
                        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    </div>
                    <div>
                        <button type="submit">회원가입</button>
                    </div>
                </form>

                <button type="submit">Gmail로 로그인</button>
            </main>
        </div>
    );
}
