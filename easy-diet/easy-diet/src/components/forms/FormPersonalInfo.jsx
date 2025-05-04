'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const FormPersonalInfo = ({ baseData }) => {
  const [personalData, setPersonalData] = useState({
    birth_date: '',
    weight: '',
    height: '',
    gender: '',
    activity_level: '',
    goal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...baseData,
      ...personalData,
    };

    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

    try {
      const response = await fetch(`${SERVER_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erro ao registrar');

      alert('Cadastro realizado com sucesso!');

      // Após o cadastro, fazer login automaticamente
      const loginResponse = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: baseData.email,
          password: baseData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) throw new Error(loginData.message || 'Erro ao fazer login');

      // Salva o token nos cookies
      Cookies.set('access_token', loginData.access_token, { expires: 7, secure: true });

      // Redireciona para a página do dashboard ou onde desejar
      window.location.href = '/dashboard'; // Altere conforme necessário
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center font-inter w-90"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Informações Adicionais
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          * Complete os dados abaixo para concluir seu cadastro.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Data de Nascimento" name="birth_date" type="date" value={personalData.birth_date} onChange={handleChange} />
          <Input label="Peso (kg)" name="weight" type="number" value={personalData.weight} onChange={handleChange} />
          <Input label="Altura (cm)" name="height" type="number" value={personalData.height} onChange={handleChange} />
          <Select label="Gênero" name="gender" value={personalData.gender} onChange={handleChange} options={[
            { value: '', label: 'Selecione' },
            { value: 'male', label: 'Masculino' },
            { value: 'female', label: 'Feminino' },
            { value: 'other', label: 'Outro' },
          ]} />
          <Select label="Atividade Física" name="activity_level" value={personalData.activity_level} onChange={handleChange} options={[
            { value: '', label: 'Selecione' },
            { value: 'low', label: 'Baixo' },
            { value: 'moderate', label: 'Moderado' },
            { value: 'high', label: 'Alto' },
          ]} />
          <Input label="Objetivo" name="goal" value={personalData.goal} onChange={handleChange} />
          <motion.button type="submit" className="btn-green">
            Finalizar Cadastro
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Input = ({ label, name, type = 'text', value, onChange }) => (
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
