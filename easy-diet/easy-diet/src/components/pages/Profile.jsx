"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Cross2Icon,
  Pencil2Icon,
  CheckIcon,
  CaretDownIcon,
} from "@radix-ui/react-icons";

export default function Profile({ user }) {
  const [modo, setModo] = useState("visualizar"); // visualizar, editar
  const [activeTab, setActiveTab] = useState("perfil");

  const [usuario, setUsuario] = useState(user);

  const [formData, setFormData] = useState({ ...usuario });

  useEffect(() => {
    console.log("user:", formData);
  }, [formData]);

  const generoFormatado = {
    male: "Masculino",
    female: "Feminino",
    other: "Outro",
  };

  const atividadeFormatada = {
    sedentary: "Sedentário",
    light: "Leve",
    moderate: "Moderado",
    active: "Ativo",
    very_active: "Muito Ativo",
  };

  const handleSalvar = async () => {
    // Aqui seria feita a chamada à API para salvar os dados
    try {
      const response = await fetch(
        `/api/user/update?user_id=${encodeURIComponent(user._id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setUsuario(formData);
        setModo("visualizar");
      } else {
        throw new Error("Falha ao salvar");
      }
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      // Mostrar mensagem de erro
    }
  };

  const handleCancelar = () => {
    setFormData({ ...usuario });
    setModo("visualizar");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const alternarRestricao = (restricao) => {
    setFormData((prev) => {
      const novasRestricoes = [...prev.restricoes];

      if (novasRestricoes.includes(restricao)) {
        return {
          ...prev,
          restricoes: novasRestricoes.filter((r) => r !== restricao),
        };
      } else {
        return {
          ...prev,
          restricoes: [...novasRestricoes, restricao],
        };
      }
    });
  };

  function calcularIdade(dataNascStr) {
    const hoje = new Date();
    const nascimento = new Date(dataNascStr);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  return (
    <div className="pt-20 pb-20 px-4">
      {/* Cabeçalho do perfil */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        {modo === "visualizar" ? (
          <button
            onClick={() => setModo("editar")}
            className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
          >
            <Pencil2Icon className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancelar}
              className="bg-gray-200 text-gray-700 p-2 rounded-full flex items-center justify-center"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={handleSalvar}
              className="bg-green-500 text-white p-2 rounded-full flex items-center justify-center"
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Foto e informações básicas */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-4 mb-5 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {usuario.fotoPerfil ? (
              <img
                src={usuario.fotoPerfil}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">👤</span>
            )}
          </div>
          {modo === "editar" && (
            <button className="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full">
              <Pencil2Icon className="w-4 h-4" />
            </button>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {modo === "editar" ? (
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 text-center"
            />
          ) : (
            usuario.first_name
          )}
        </h2>

        <p className="text-gray-500 text-sm mb-3">
          {modo === "editar" ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 text-center"
            />
          ) : (
            usuario.email
          )}
        </p>
      </motion.div>

      {/* Abas */}
      <div className="flex border-b mb-5">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "perfil"
              ? "text-green-600 border-b-2 border-green-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("perfil")}
        >
          Dados Pessoais
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "preferencias"
              ? "text-green-600 border-b-2 border-green-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("preferencias")}
        >
          Preferências
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "objetivos"
              ? "text-green-600 border-b-2 border-green-500 font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("objetivos")}
        >
          Objetivos
        </button>
      </div>

      {/* Conteúdo da aba Dados Pessoais */}
      {activeTab === "perfil" && (
        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Idade
              </label>
              <p className="text-gray-900">
                {usuario.birth_date
                  ? calcularIdade(usuario.birth_date) + " anos"
                  : "—"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              {modo === "editar" ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 w-full appearance-none"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                </select>
              ) : (
                <p className="text-gray-900">
                  {generoFormatado[usuario.gender] || "—"}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Peso (kg)
                </label>
                {modo === "editar" ? (
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.weight} kg</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Altura (cm)
                </label>
                {modo === "editar" ? (
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                ) : (
                  <p className="text-gray-900">{usuario.height} cm</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nível de Atividade
              </label>
              {modo === "editar" ? (
                <div className="relative">
                  <select
                    name="activity_level"
                    value={formData.activity_level}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full appearance-none"
                  >
                    <option value="sedentary">Sedentário</option>
                    <option value="light">Leve</option>
                    <option value="moderate">Moderado</option>
                    <option value="active">Ativo</option>
                    <option value="very_active">Muito Ativo</option>
                  </select>
                  <CaretDownIcon className="absolute right-3 top-3 text-gray-500" />
                </div>
              ) : (
                <p className="text-gray-900">
                  {atividadeFormatada[usuario.activity_level] || "—"}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Conteúdo da aba Preferências */}
      {activeTab === "preferencias" && (
        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferência Alimentar
              </label>
              {modo === "editar" ? (
                <div className="relative">
                  <select
                    name="dietary_preference"
                    value={formData.dietary_preference}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full appearance-none"
                  >
                    <option value="Equilibrada">Equilibrada</option>
                    <option value="Vegetariana">Vegetariana</option>
                    <option value="Vegana">Vegana</option>
                    <option value="Cetogênica">Cetogênica</option>
                    <option value="Low Carb">Low Carb</option>
                    <option value="Mediterrânea">Mediterrânea</option>
                  </select>
                  <CaretDownIcon className="absolute right-3 top-3 text-gray-500" />
                </div>
              ) : (
                <p className="text-gray-900">{usuario.dietary_preference}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restrições Alimentares
              </label>
              {modo === "editar" ? (
                <div className="space-y-2">
                  {[
                    "Glúten",
                    "Lactose",
                    "Frutos do Mar",
                    "Amendoim",
                    "Soja",
                    "Ovos",
                  ].map((restricao) => (
                    <div key={restricao} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`restricao-${restricao}`}
                        checked={formData.dietary_restriction.includes(
                          restricao
                        )}
                        onChange={() => alternarRestricao(restricao)}
                        className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      />
                      <label
                        htmlFor={`restricao-${restricao}`}
                        className="ml-2 text-gray-700"
                      >
                        {restricao}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {usuario.dietary_restriction.length > 0 ? (
                    usuario.dietary_restriction.map((restricao) => (
                      <span
                        key={restricao}
                        className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                      >
                        {restricao}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Nenhuma restrição cadastrada
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Conteúdo da aba Objetivos */}
      {activeTab === "objetivos" && (
        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objetivo Principal
              </label>
              {modo === "editar" ? (
                <div className="relative">
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full appearance-none"
                  >
                    <option value="Perda de peso">Perda de peso</option>
                    <option value="Ganho de massa muscular">
                      Ganho de massa muscular
                    </option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Saúde geral">Saúde geral</option>
                    <option value="Desempenho esportivo">
                      Desempenho esportivo
                    </option>
                  </select>
                  <CaretDownIcon className="absolute right-3 top-3 text-gray-500" />
                </div>
              ) : (
                <p className="text-gray-900">{usuario.goal}</p>
              )}
            </div>

            <div className="py-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metas Diárias
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Calorias</span>
                  <span className="font-medium">1800 kcal</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Proteínas</span>
                  <span className="font-medium">90g (20%)</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Carboidratos</span>
                  <span className="font-medium">225g (50%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gorduras</span>
                  <span className="font-medium">60g (30%)</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                *Valores calculados com base nos seus dados e objetivo
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
