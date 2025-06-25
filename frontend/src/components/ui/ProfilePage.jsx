'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function ProfilePage({ userInfo }) {
  const [recipes, setRecipes] = useState([]);
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [recipeRes, dietRes] = await Promise.all([
        fetch(`/api/user/recipe?user_id=${userInfo._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`/api/user/diet?user_id=${userInfo._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      const recipeData = await recipeRes.json();
      const dietData = await dietRes.json();

      if (!recipeRes.ok || !dietRes.ok) {
        throw new Error(recipeData.message || dietData.message || "Erro ao buscar dados do usuário.");
      }

      setRecipes(Array.isArray(recipeData) ? recipeData : [recipeData]);
      setDiets(Array.isArray(dietData) ? dietData : [dietData]);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg animate-pulse">Carregando perfil...</p>
      </div>
    );
  }

  const { first_name, last_name, email, activity_level, birth_date, goal, gender, height, weight } = userInfo;
  const fullName = `${first_name} ${last_name}`;
  const age = new Date().getFullYear() - new Date(birth_date).getFullYear();
  const activeDiet = diets[diets.length - 1];

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-blue-100 py-10 px-4 my-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Info Pessoal */}
        <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-2">Perfil</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Nome:</strong> {fullName}</p>
            <p><strong>Idade:</strong> {age} anos</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Sexo:</strong> {gender}</p>
            <p><strong>Altura:</strong> {height} m</p>
            <p><strong>Peso:</strong> {weight} kg</p>
            <p><strong>Objetivo:</strong> {goal}</p>
            <p><strong>Atividade Física:</strong> {activity_level}</p>
          </div>
        </section>

        {/* Dieta Ativa */}
        {activeDiet && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-2">Dieta Ativa</h2>
            <p><strong>Título:</strong> {activeDiet.title}</p>
            <p><strong>Descrição:</strong> {activeDiet.description}</p>
            <p><strong>Data:</strong> {format(new Date(activeDiet.created_at), 'dd/MM/yyyy')}</p>
            <div>
              <p><strong>Refeições:</strong></p>
              <ul className="list-disc list-inside ml-4">
                {activeDiet.meals.map((meal, i) => (
                  <li key={i}>
                    {meal.time} — <strong>{meal.name}</strong> ({meal.recipes.length} receita{meal.recipes.length > 1 ? 's' : ''})
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* Histórico de Dietas */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-2">Histórico de Dietas</h2>
          {diets.length === 0 ? (
            <p className="text-gray-600">Nenhuma dieta encontrada.</p>
          ) : (
            <ul className="space-y-2">
              {diets.map((diet) => (
                <li key={diet._id} className="border border-gray-300 p-3 rounded-lg bg-gray-50">
                  <p><strong>{diet.title}</strong> — {format(new Date(diet.created_at), 'dd/MM/yyyy')}</p>
                  <p className="text-sm text-gray-600">{diet.description}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.section>

        {/* Receitas Criadas */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-2">Receitas Criadas</h2>
          {recipes.length === 0 ? (
            <p className="text-gray-600">Nenhuma receita criada ainda.</p>
          ) : (
            <ul className="space-y-2">
              {recipes.map((recipe) => (
                <li key={recipe.id} className="border border-gray-300 p-3 rounded-lg bg-gray-50">
                  <p><strong>{recipe.title}</strong> — {format(new Date(recipe.created_at), 'dd/MM/yyyy')}</p>
                  <p className="text-sm text-gray-600">{recipe.description}</p>
                  <p className="text-xs text-gray-500">
                    {recipe.ingredients.length} ingrediente{recipe.ingredients.length > 1 ? 's' : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </motion.section>
      </motion.div>
    </div>
  );
}
