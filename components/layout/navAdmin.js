import React , {useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import { useSession, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';

import Link from 'next/link'
const NavAdmin = () => {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") {
            redirect('/signin');
        }
    }, [status]);

    if (status === "loading") {
        return <div>Loading...</div>;
      }
    
    const handleLogout = () => {
        signOut({ callbackUrl: '/signin' }); // Redirect to homepage after logout
    }
    return (
        <div className='flex bg-orange-600 shadow-lg py-2 space-x-4'>
            <div className='flex-grow w-1/3'>
            <div className="text-2xl font-bold text-white pl-2 pt-1">
            <a href="/">Moussaid <span className='text-sm '>Cars Rental</span></a>
          </div>
                </div>

                <div className='flex text-white font-bold m-auto w-1/3'>
                    <Link href='/admin'> <Button color='inherit'>Home</Button></Link>
                    <Link href='/Reservations'> <Button color='inherit'>Reservations</Button></Link>
                    <Link href='/Cars'> <Button color='inherit'>Cars</Button></Link>
                    <Link href='/Users'> <Button color='inherit'>Users</Button></Link>
                </div>

                <div className='flex w-1/3 items-center justify-end space-x-2'>
                    <Avatar alt='Remy Sharp' src='/images/avatar2.png' className='shadow-lg' />
                    <div className=' text-white font-bold m-auto'>
                        <h1 className='text-md'>{session?.user.firstName} {session?.user.lastName}</h1>
                        <h2 className='text-sm font-base'>{session?.user.username}</h2>
                        
                    </div>
                    <Button className="text-sm" color='inherit' onClick={handleLogout}>
                        <img src='/images/image.png' className='w-6' alt='logout' />
                    </Button>
                </div>
                

        </div>
    );
};

export default NavAdmin;
