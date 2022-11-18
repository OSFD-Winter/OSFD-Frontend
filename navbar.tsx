//@ts-nocheck
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

function Navbar() {
    const router = useRouter()
    return (
        <nav className='navbar'>
            <img src='./osfd-small-logo.png' className='logoimg'></img>
            <ul className='navbarlinks'>
                <button onClick={() => router.push('/')}>HOME</button>
                <button onClick={() => router.push('/')}>SERVICES</button> {/* replace once added */}
                <button onClick={() => router.push('/terms')}>ABOUT</button>
                <a className='a' href='#feedback'>CONTACT</a>
            </ul>
        </nav>
         
    )
}

export default Navbar;