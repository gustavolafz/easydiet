'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    PersonIcon,
    GearIcon,
    QuestionMarkCircledIcon,
    ChatBubbleIcon,
    InfoCircledIcon,
} from '@radix-ui/react-icons';

export default function ProfileMenu() {
    return (
        <motion.section
            className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Avatar */}
            <motion.div
                className="mb-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-40 h-40 rounded-full bg-green-500 flex items-center justify-center shadow-xl">
                    <PersonIcon className="w-24 h-24 text-white" />
                </div>
            </motion.div>

            {/* Botões */}
            <div className="flex flex-col items-center w-full max-w-sm space-y-5">
                {[
                    { href: '/account-settings', label: 'Configurações', icon: <GearIcon className="w-5 h-5 mr-2" /> },
                    { href: '/help', label: 'Ajuda', icon: <QuestionMarkCircledIcon className="w-5 h-5 mr-2" /> },
                    { href: '/feedback', label: 'Feedbacks', icon: <ChatBubbleIcon className="w-5 h-5 mr-2" /> },
                    { href: '/about-us', label: 'Quem Somos', icon: <InfoCircledIcon className="w-5 h-5 mr-2" /> },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="w-full"
                    >
                        <Link
                            href={item.href}
                            className="flex items-center justify-center w-full text-white text-lg font-medium bg-gradient-to-r from-green-500 to-blue-500 py-3 rounded-xl shadow-md hover:brightness-110 transition"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
