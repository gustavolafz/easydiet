'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormPersonalInfo from "./FormPersonalInfo";

const FormLogin = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(isRegister ? "Registering" : "Logging in", formData);

        if (isRegister) {
            setShowPersonalInfoForm(true);
        }
    };

    if (showPersonalInfoForm) {
        return <FormPersonalInfo />;
    }

    return (
        <motion.div
            className="flex flex-col items-center justify-center font-inter w-90"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-6 text-green-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {isRegister ? "Register" : "Login"}
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-base font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-base font-medium text-gray-700"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                        />
                    </div>
                    {isRegister && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-base font-medium text-gray-700"
                            >
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                            />
                        </div>
                    )}
                    <motion.button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isRegister ? "Register" : "Login"}
                    </motion.button>
                </form>
                <motion.button
                    onClick={() => setIsRegister(!isRegister)}
                    className="mt-4 w-full text-blue-600 hover:text-blue-800 text-base font-medium"
                    whileHover={{ scale: 1.05 }}
                >
                    {isRegister ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default FormLogin;