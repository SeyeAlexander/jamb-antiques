import Image from "next/image";
import Link from "next/link";
import searchIcon from "@/assets/search.svg";
import mailIcon from "@/assets/mail.svg";
import menuIcon from "@/assets/menu.svg";
import logoSvg from "@/assets/logo.svg";

export function Navbar() {
  return (
    <header className='jamb-glass-header fixed inset-x-0 top-0 z-50 w-full'>
      <div className='jamb-shell'>
        <div className='flex h-24 items-center justify-between'>
          <Link href='/' className='flex items-center'>
            <Image src={logoSvg} alt='Jamb.' className='h-8 w-auto' priority />
          </Link>
          <div className='flex items-center gap-6 text-jamb-ink-muted'>
            <button className='transition-opacity hover:opacity-60'>
              <Image src={searchIcon} alt='Search' className='w-5 h-5' />
            </button>
            <button className='transition-opacity hover:opacity-60'>
              <Image src={mailIcon} alt='Mail' className='w-5 h-5' />
            </button>
            <button className='transition-opacity hover:opacity-60'>
              <Image src={menuIcon} alt='Menu' className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
