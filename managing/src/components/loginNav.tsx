import Link from "next/link";

export default function LoginNav() {
    return (
        <nav className="w-[100%] h-[50px] flex items-center justify-between pl-[10px] pr-[10px] bg-white">
            <Link href={'/'}>Managing</Link>
            <div className="flex">
                <Link href={'/login'} className="mr-[10px]">Login</Link>
                <Link href={'/signup'}>Sign Up</Link>
            </div>
        </nav>
    )
}