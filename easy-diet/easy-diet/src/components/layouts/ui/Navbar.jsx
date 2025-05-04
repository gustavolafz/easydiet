'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    DashboardIcon,
    CalendarIcon,
    PersonIcon,
    HamburgerMenuIcon,
    HeartIcon,
    DotsHorizontalIcon,  // Importando o ícone de "três pontinhos" horizontal
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const [selected, setSelected] = useState(pathname);

    const handleSelect = (option) => {
        setSelected(option);
    };

    const getIconStyle = (option) =>
        `rounded-full p-2 transition duration-300 ${
            selected === option
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:text-green-200'
        }`;

    const iconVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.2 },
        selected: { scale: 1.4 },
    };

    return (
        <nav className="flex flex-row justify-center items-center bg-green-600 p-2 fixed bottom-0 w-full h-16">
            <ul className="flex justify-around w-full">
                {[ 
                    { id: '/dashboard', Icon: DashboardIcon, title: 'Dashboard' },
                    { id: '/daily', Icon: HamburgerMenuIcon, title: 'Daily' },
                    { id: '/easydiet', Icon: HeartIcon, title: 'EasyDiet' },
                    { id: '/calendar', Icon: CalendarIcon, title: 'Calendar' },
                    { id: '/more', Icon: DotsHorizontalIcon, title: 'More' },  // Usando DotsHorizontalIcon
                ].map(({ id, Icon, title }) => (
                    <motion.li
                        key={id}
                        className={getIconStyle(id)}
                        onClick={() => handleSelect(id)}
                        variants={iconVariants}
                        initial="initial"
                        animate={selected === id ? 'selected' : 'initial'}
                        whileHover="hover"
                    >
                        <Link href={id}>
                            <Icon className="text-4xl" title={title} />
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
