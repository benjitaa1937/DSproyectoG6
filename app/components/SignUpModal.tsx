// app/components/SignupModal.tsx
'use client'
import { useState } from 'react'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email.",
      })
    } else {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Form submitted successfully.",
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-6 rounded-lg">
        <span 
          className="close absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}