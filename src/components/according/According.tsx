"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionWithCheck() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ফর্মের সব ফিল্ড পূরণ হয়েছে কিনা চেক
  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "";

  // ইনপুট পরিবর্তনের হ্যান্ডলার
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // সাবমিট হ্যান্ডলার
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isFormComplete) {
      alert("Please fill all fields before submitting.");
      return;
    }

    alert("Form submitted successfully!");
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="inline-flex items-center gap-1">
            {isSubmitted && isFormComplete ? (
              <span className="text-green-500 font-bold text-xl select-none">
                ✔️ compete
              </span>
            ) : (
              "Fill your details"
            )}
          </AccordionTrigger>

          <AccordionContent>
            {!isSubmitted ? (
              <form
                className="flex flex-col gap-4 mt-2"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="border rounded px-3 py-2"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="border rounded px-3 py-2"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="mb-1 font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="border rounded px-3 py-2"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              null
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
