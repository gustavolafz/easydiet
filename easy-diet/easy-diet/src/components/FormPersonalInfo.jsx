"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const FormPersonalInfo = ({ onSubmit }) => {
    const [personalData, setPersonalData] = useState({
        weight: "",
        height: "",
        activityLevel: "",
        goal: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalData({ ...personalData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Personal Info Submitted:", personalData);
        onSubmit(personalData); // Callback to handle the submitted data
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center font-inter w-90"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
                    Informações Adicionais
                </h2>
                <p className="text-xs text-gray-400">
                    * Quase lá, precisamos de mais algumas informações para concluir o seu
                    cadastro.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div>
                        <label
                            htmlFor="weight"
                            className="block text-base font-medium text-gray-700"
                        >
                            Peso (kg):
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={personalData.weight}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="height"
                            className="block text-base font-medium text-gray-700"
                        >
                            Altura (cm):
                        </label>
                        <input
                            type="number"
                            id="height"
                            name="height"
                            value={personalData.height}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="activityLevel"
                            className="block text-base font-medium text-gray-700"
                        >
                            Nível de Atividade Física:
                        </label>
                        <select
                            id="activityLevel"
                            name="activityLevel"
                            value={personalData.activityLevel}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                        >
                            <option value="">Selecione</option>
                            <option value="low">Baixo</option>
                            <option value="moderate">Moderado</option>
                            <option value="high">Alto</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="goal"
                            className="block text-base font-medium text-gray-700"
                        >
                            Objetivo:
                        </label>
                        <input
                            type="text"
                            id="goal"
                            name="goal"
                            value={personalData.goal}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Enviar
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default FormPersonalInfo;
