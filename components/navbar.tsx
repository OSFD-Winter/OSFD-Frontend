// @ts-nocheck
import Image from 'next/image'
import { React } from "react";
import logo from '../public/osfd-big-logo.png'
import { useRouter } from 'next/router';
import Link from 'next/link'
import 'tailwindcss/tailwind.css';

const Navbar = () => {
    const router = useRouter();
    
    const checkfordoc = () => {
        const ref1 = document.getElementById("top")
        const ref2 = document.getElementById("feedback")
        return [ref1, ref2]
    }


    const smoothScroll = () => {
        if (window.location.pathname !== "/") {
            router.push("/")
        }
        try {
            checkfordoc()[0].scrollIntoView({ behavior: 'smooth' });
            }  catch { console.log('IGNORE')}
    };
    const smoothScroll2 = () => {
        if (window.location.pathname !== "/") {
            router.push("/")
        }
        try {
        checkfordoc()[1].scrollIntoView({ behavior: 'smooth' });
        }  catch { 
            setTimeout(() => {
                checkfordoc()[1].scrollIntoView({ behavior: 'smooth' });
            }, "1")
        }
    };
    return(
        <div style={{backgroundImage: 'linear-gradient(to right, #040619, #255aec)'}} className="sticky top-0 z-10 p-5 shadow">
            <div className="flex gap-9 font-medium text-white bg-headerbg">
                <div className='flex justify-start'>
                    <Image onClick={smoothScroll} src={logo} width={140} height={70} />
                </div>
            <ul style={{fontFamily: "Poppins", src: "url(./fonts/Poppins-Bold.ttf)"}} className="flex items-center w-full justify-evenly">
            <Link href="/"><p className='hover:text-[#d3d3d3] hover:opacity-75'>SERVICES</p></Link>
            <Link href="/terms"><p className='hover:text-[#d3d3d3] hover:opacity-75'>ABOUT</p></Link>
            <p onClick={smoothScroll2} className='hover:text-[#d3d3d3] hover:opacity-75'>CONTACT</p>
            <Link href="/internsDAO"><p className='hover:text-[#d3d3d3] hover:opacity-75'>Interns DAO</p></Link>
            <Link href="/teamnouns"><p className='hover:text-[#d3d3d3] hover:opacity-75'>Team Nouns DAO</p></Link>
            </ul>
            </div>
        </div>
    )
}

export default Navbar;
