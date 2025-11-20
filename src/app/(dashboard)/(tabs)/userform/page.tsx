"use client";

import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  description: string;
};

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // এখানে আপনি API কল করতে পারেন বা অন্য কাজ করতে পারেন
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Password</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          {...register("description")}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={4}
          placeholder="Write something about yourself"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
