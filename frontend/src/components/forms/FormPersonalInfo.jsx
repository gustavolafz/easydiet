"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const FormPersonalInfo = ({ baseData }) => {
  const [personalData, setPersonalData] = useState({
    birth_date: "",
    weight: "",
    height: "",
    gender: "",
    activity_level: "",
    goal: "",
    dietary_preference: "",
    dietary_restriction: [""],
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...baseData, ...personalData };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao registrar");

      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: baseData.email,
          password: baseData.password,
        }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok)
        throw new Error(loginData.message || "Erro ao fazer login");

      alert("Cadastro realizado com sucesso!");
      router.push("/app/profile");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRestrictionChange = (index, value) => {
    const updated = [...personalData.dietary_restriction];
    updated[index] = value;
    setPersonalData({ ...personalData, dietary_restriction: updated });
  };

  const addRestriction = () => {
    setPersonalData({
      ...personalData,
      dietary_restriction: [...personalData.dietary_restriction, ""],
    });
  };

  const removeRestriction = (index) => {
    const updated = personalData.dietary_restriction.filter(
      (_, i) => i !== index
    );
    setPersonalData({ ...personalData, dietary_restriction: updated });
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
        <p className="text-xs text-gray-400 mb-4">
          * Complete os dados abaixo para concluir seu cadastro.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Data de Nascimento"
            name="birth_date"
            type="date"
            value={personalData.birth_date}
            onChange={handleChange}
          />
          <Input
            label="Peso (kg)"
            name="weight"
            type="number"
            value={personalData.weight}
            onChange={handleChange}
          />
          <Input
            label="Altura (cm)"
            name="height"
            type="number"
            value={personalData.height}
            onChange={handleChange}
          />
          <Select
            label="Gênero"
            name="gender"
            value={personalData.gender}
            onChange={handleChange}
            options={[
              { value: "", label: "Selecione" },
              { value: "male", label: "Masculino" },
              { value: "female", label: "Feminino" },
              { value: "other", label: "Outro" },
            ]}
          />
          <Select
            label="Nível de Atividade Física"
            name="activity_level"
            value={personalData.activity_level}
            onChange={handleChange}
            options={[
              { value: "", label: "Selecione" },
              { value: "low", label: "Baixo" },
              { value: "moderate", label: "Moderado" },
              { value: "high", label: "Alto" },
            ]}
          />
          <Select
            label="Objetivo"
            name="goal"
            value={personalData.goal}
            onChange={handleChange}
            options={[
              { value: "", label: "Selecione" },
              { value: "weight_loss", label: "Perda de peso" },
              { value: "muscle_gain", label: "Ganho de massa" },
              { value: "maintenance", label: "Manutenção" },
              { value: "improve_health", label: "Melhorar saúde" },
            ]}
          />
          <Select
            label="Preferência Alimentar"
            name="dietary_preference"
            value={personalData.dietary_preference}
            onChange={handleChange}
            options={[
              { value: "", label: "Selecione" },
              { value: "vegetarian", label: "Vegetariana" },
              { value: "vegan", label: "Vegana" },
              { value: "omnivore", label: "Onívora" },
              { value: "low_carb", label: "Low Carb" },
              { value: "mediterranean", label: "Mediterrânea" },
              { value: "other", label: "Outro" },
            ]}
          />
          <div>
            <label className="block text-base font-medium text-gray-700">
              Restrições Alimentares:
            </label>
            {personalData.dietary_restriction.map((restriction, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={restriction}
                  onChange={(e) =>
                    handleRestrictionChange(index, e.target.value)
                  }
                  className="input-style flex-1"
                  placeholder="Ex: lactose, glúten..."
                  required
                />
                <button
                  type="button"
                  onClick={() => removeRestriction(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRestriction}
              className="text-green-600 hover:text-green-800 text-sm mt-1"
            >
              + Adicionar outra restrição
            </button>
          </div>

          <motion.button type="submit" className="btn-green">
            Finalizar Cadastro
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-base font-medium text-gray-700">
      {label}:
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="input-style"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label htmlFor={name} className="block text-base font-medium text-gray-700">
      {label}:
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="input-style"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormPersonalInfo;
