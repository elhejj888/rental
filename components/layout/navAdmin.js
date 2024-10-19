import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useSession, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';

const NavAdmin = () => {
    const { data: session, status } = useSession();
    const isMobile = useMediaQuery('(max-width:600px)'); // Adjust the breakpoint as needed
    const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu

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
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Open the dropdown menu
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the dropdown menu
    };

    return (
        <div className='flex bg-orange-600 shadow-lg py-2 space-x-4'>
            {/* Conditional rendering of the title */}
            {!isMobile && (
                <div className='flex-grow w-1/3'>
                    <div className="text-2xl font-bold text-white pl-2 pt-1">
                        <Link href="/">Moussaid <span className='text-sm '>Cars Rental</span></Link>
                    </div>
                </div>
            )}

            {isMobile ? (
                <div className='flex items-center justify-between w-full text-white font-medium'>
                    <Button onClick={handleMenuClick} color='inherit'>Menu</Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href='/Reservations'>Reservations</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href='/Cars'>Cars</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href='/Users'>Users</Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link href='/Message'>Messages</Link>
                        </MenuItem>
                    </Menu>
                </div>
            ) : (
                <div className='flex text-white font-bold m-auto w-1/3'>
                    <Link href='/Reservations'> <Button color='inherit'>Reservations</Button></Link>
                    <Link href='/Cars'> <Button color='inherit'>Cars</Button></Link>
                    <Link href='/Users'> <Button color='inherit'>Users</Button></Link>
                    <Link href='/Message'> <Button color='inherit'>Messages</Button></Link>
                </div>
            )}

            <div className='flex w-1/3 items-center justify-end space-x-2'>
                <Avatar alt='Remy Sharp' src='/images/avatar2.png' className='shadow-lg' />
                {!isMobile && (
                <div className='text-white font-bold m-auto'>
                    <h1 className='text-md'>{session?.user.firstName} {session?.user.lastName}</h1>
                    <h2 className='text-sm font-base'>{session?.user.username}</h2>
                </div>
                                )}
                <Button className="text-sm" color='inherit' onClick={handleLogout}>
                    <img src='/images/image.png' className='w-6' alt='logout' />
                </Button>
            </div>
        </div>
    );
};

export default NavAdmin;
