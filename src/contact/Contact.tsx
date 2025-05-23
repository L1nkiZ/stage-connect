import React, { useState } from 'react'
import Layout from '../components/Layout'
import Mail from '/pictures/mail.svg'

const Contact: React.FC = () => {
  const [email, setEmail] = useState('')
  const [messageType, setMessageType] = useState('support')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(false)

    // Crée un lien mailto avec les données du formulaire
    const mailtoLink = `mailto:connect.stage67@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Message de: ${email}\nType: ${messageType}\n\n${message}`
    )}`

    // Ouvre le client mail de l'utilisateur avec le lien mailto
    window.location.href = mailtoLink

    // Si l'envoi a "fonctionné" (nous pouvons pas vraiment vérifier si l'email a été envoyé via mailto)
    setSuccess(true)
    setEmail('')
    setMessageType('support')
    setSubject('')
    setMessage('')
    setErrorMessage(null)

    setIsSubmitting(false)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black p-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:justify-between">
        {/* Bloc gauche : Titre + logo */}
        <div className="flex flex-col justify-center items-start">
          <div className="flex flex-col lg:flex-col items-start w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 w-full">
              <img
                src={Mail}
                alt="mail"
                className="mb-4 lg:mb-0"
                width="120"
                height="120"
              />
              <span className="lg:text-7xl text-4xl uppercase font-medium text-left">
                Contactez-nous
              </span>
            </div>
            <div className="border-b border-gray-500 mt-4 lg:mt-8 w-full"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-xl font-apotek-medium">
                    Votre e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-gray-900"
                    placeholder="votre@email.fr"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block mb-2 text-xl font-medium font-apotek-medium"
                  >
                    Type de message
                  </label>
                  <select
                    id="type"
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-gray-900"
                    required
                  >
                    <option value="support">Support technique</option>
                    <option value="experience">
                      Proposer une nouvelle expérience
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-xl font-medium font-apotek-medium"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                    placeholder="Votre sujet ici"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-xl font-medium font-apotek-medium"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                    placeholder="Laissez votre message..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="font-nickel text-black bg-white text-lg py-4 lg:px-24 px-8 rounded-full cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
                {errorMessage && (
                  <div className="text-red-500 font-bold">
                    Une erreur est survenue : {errorMessage}
                  </div>
                )}
                {success && (
                  <div className="text-green-500 font-bold">
                    Message envoyé avec succès !
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
