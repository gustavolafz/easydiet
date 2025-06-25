"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import FormPersonalInfo from "./FormPersonalInfo";

const FormLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }

      setUserData({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });
      setShowPersonalInfoForm(true);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro no login");

      alert("Login realizado com sucesso!");
      window.location.href = "/app/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };

  if (showPersonalInfoForm && userData) {
    return <FormPersonalInfo baseData={userData} />;
  }

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
        <motion.h2 className="text-3xl font-bold text-center mb-6 text-green-600">
          {isRegister ? "Register" : "Login"}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <>
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </>
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {isRegister && (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}
          <motion.button type="submit" className="btn-green">
            {isRegister ? "Avançar" : "Login"}
          </motion.button>
        </form>

        <motion.button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 w-full text-blue-600 hover:text-blue-800 text-base font-medium"
        >
          {isRegister
            ? "Já tem conta? Faça login"
            : "Não tem conta? Cadastre-se"}
        </motion.button>
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

export default FormLogin;
