'use client'

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

const FormFoodSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/food/search?nome=${encodeURIComponent(searchTerm)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Erro ao buscar alimentos.");

            // Se a API retorna apenas 1 item, transforme em array
            setResults(Array.isArray(data) ? data : [data]);
        } catch (err) {
            setError("Erro ao buscar alimentos. Tente novamente.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto"
        >
            {/* Campo de busca */}
            <div className="relative">
                <motion.input
                    type="text"
                    placeholder="Digite o nome do alimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <motion.button
                    onClick={handleSearch}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {loading ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                </motion.button>
            </div>

            {/* Mensagem de erro */}
            {error && (
                <motion.p
                    className="text-red-500 mt-2 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.p>
            )}

            {/* Resultados */}
            <div className="mt-6 space-y-4">
                <AnimatePresence>
                    {results.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="border rounded-xl p-4 shadow-md bg-white mx-4"
                        >
                            <h3 className="text-lg font-semibold">{item.name}</h3>

                            {item.serving_sizes?.[0] && (
                                <div className="mt-2 text-sm text-gray-700">
                                    <p><strong>Porção:</strong> {item.serving_sizes[0].metric_serving_amount}{item.serving_sizes[0].metric_serving_unit}</p>
                                    <p><strong>Calorias:</strong> {item.serving_sizes[0].calories} kcal</p>
                                    <p><strong>Carboidratos:</strong> {item.serving_sizes[0].carbohydrate} g</p>
                                    <p><strong>Proteínas:</strong> {item.serving_sizes[0].protein} g</p>
                                    <p><strong>Gorduras:</strong> {item.serving_sizes[0].fat} g</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FormFoodSearch;
