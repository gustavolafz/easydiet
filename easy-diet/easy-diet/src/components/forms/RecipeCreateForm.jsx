"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Trash2 } from "lucide-react";

const RecipeCreateForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("g");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchFood = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch(
        `/api/food/search?nome=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError("Erro ao buscar alimento.");
    }
  };

  const addIngredient = () => {
    if (!selectedFood || !quantity || !unit) return;
  
    const nutrients = {
      calories: selectedFood.serving_sizes[0]?.calories || 0,
      protein: selectedFood.serving_sizes[0]?.protein || 0,
      carbohydrate: selectedFood.serving_sizes[0]?.carbohydrate || 0,
      fat: selectedFood.serving_sizes[0]?.fat || 0,
    };
  
    setIngredients((prev) => [
      ...prev,
      {
        food_id: selectedFood._id,
        name: selectedFood.name,
        quantity: Number(quantity),
        unit,
        nutrients,
      },
    ]);
  
    // Resetar os campos
    setSelectedFood(null);
    setSearchTerm("");
    setQuantity("");
    setUnit("g");
    setSearchResults([]);
  };
  

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateRecipe = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/recipes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          title,
          description,
          public: isPublic,
          ingredients: ingredients.map(({ food_id, quantity, unit }) => ({
            food_id,
            quantity,
            unit,
          })),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Erro ao criar receita.");
      }

      setSuccess(true);
      setTitle("");
      setDescription("");
      setIngredients([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Ingredients updated:", ingredients);
  }, [ingredients]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Criar Receita</h2>

      <input
        type="text"
        placeholder="Título da receita"
        className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descrição da receita"
        className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        Tornar receita pública
      </label>

      <div className="border-t pt-4 space-y-3">
        <h3 className="font-semibold text-gray-700">Ingredientes</h3>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleSearchFood}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-xl transition"
          >
            <Search size={16} />
          </button>
        </div>

        {searchResults.length > 0 && (
          <ul className="border rounded-xl p-2 max-h-32 overflow-y-auto bg-gray-50 shadow-inner">
            {searchResults.map((food) => (
              <li
                key={food._id}
                className="cursor-pointer hover:bg-green-100 p-1 rounded transition"
                onClick={() => setSelectedFood(food)}
              >
                {food.name}
              </li>
            ))}
          </ul>
        )}

        {selectedFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2 mt-4 border border-gray-200 p-3 rounded-lg bg-white shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {selectedFood.name}
              </span>
              <input
                type="number"
                placeholder="Qtd"
                className="w-20 border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <select
                className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="un">un</option>
              </select>
              <button
                onClick={addIngredient}
                className="text-green-600 hover:text-green-800 transition"
                title="Adicionar ingrediente"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Informação nutricional calculada */}
            {selectedFood.serving_sizes[0] && (
              <div className="text-sm text-gray-600 mt-1 pl-1">
                <p>
                  <span className="font-medium">Calorias:</span>{" "}
                  {(
                    ((selectedFood.serving_sizes[0].calories || 0) * quantity) /
                    100
                  ).toFixed(1)}{" "}
                  kcal
                </p>
                <p>
                  <span className="font-medium">Proteínas:</span>{" "}
                  {(
                    ((selectedFood.serving_sizes[0].protein || 0) * quantity) /
                    100
                  ).toFixed(1)}{" "}
                  g
                </p>
                <p>
                  <span className="font-medium">Carboidratos:</span>{" "}
                  {(
                    ((selectedFood.serving_sizes[0].carbohydrate || 0) *
                      quantity) /
                    100
                  ).toFixed(1)}{" "}
                  g
                </p>
                <p>
                  <span className="font-medium">Gorduras:</span>{" "}
                  {(
                    ((selectedFood.serving_sizes[0].fat || 0) * quantity) /
                    100
                  ).toFixed(1)}{" "}
                  g
                </p>
              </div>
            )}
          </motion.div>
        )}

        {ingredients.length > 0 && (
          <ul className="mt-4 space-y-2">
            {ingredients.map((item, index) => {
              const calories = (
                ((item?.nutrients.calories || 0) * item.quantity) / 100
              ).toFixed(1);
              const protein = (
                ((item?.nutrients.protein || 0) * item.quantity) / 100
              ).toFixed(1);
              const carbs = (
                ((item?.nutrients.carbohydrate || 0) * item.quantity) / 100
              ).toFixed(1);
              const fat = (((item?.nutrients.fat || 0) * item.quantity) / 100).toFixed(
                1
              );

              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-1 text-sm border border-gray-200 bg-gray-50 rounded-xl p-3 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {item.name} — {item.quantity}
                      {item.unit}
                    </span>
                    <button
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-gray-600 grid grid-cols-2 gap-x-4 gap-y-1 pl-1">
                    <p>
                      Calorias:{" "}
                      <span className="font-medium">{calories} kcal</span>
                    </p>
                    <p>
                      Proteínas:{" "}
                      <span className="font-medium">{protein} g</span>
                    </p>
                    <p>
                      Carboidratos:{" "}
                      <span className="font-medium">{carbs} g</span>
                    </p>
                    <p>
                      Gorduras: <span className="font-medium">{fat} g</span>
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">Receita criada com sucesso!</p>}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={loading || ingredients.length === 0 || !title}
        onClick={handleCreateRecipe}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
      >
        {loading ? "Criando..." : "Criar Receita"}
      </motion.button>
    </motion.div>
  );
};

export default RecipeCreateForm;
