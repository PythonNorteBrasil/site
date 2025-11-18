"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, MessageCircle, Instagram, Mail } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <section id="contato" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Entre em Contato</h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Vamos conversar sobre como sua empresa pode fazer parte dessa história
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Cards */}
            <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow bg-card border-2">
              <div className="p-3 rounded-full bg-primary/10">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Telegram</h3>
                <a
                  href="https://t.me/pythonnorte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @pythonnorte
                </a>
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow bg-card border-2">
              <div className="p-3 rounded-full bg-accent/10">
                <Instagram className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Redes Sociais</h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/pythonnorte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Instagram
                  </a>
                  <span>•</span>
                  <a
                    href="https://x.com/pythonnorte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    X
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow bg-card border-2 md:col-span-2">
              <div className="p-3 rounded-full bg-secondary/10">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">E-mail</h3>
                <a href="mailto:contato@pythonnorte.org" className="text-primary hover:underline">
                  contato@pythonnorte.org
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 md:p-10 bg-card border-2">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sponsorship">Patrocínio</SelectItem>
                      <SelectItem value="volunteer">Voluntariado</SelectItem>
                      <SelectItem value="press">Imprensa</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Conte-nos mais sobre como podemos ajudar..."
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Send className="w-5 h-5 mr-2" />
                Enviar mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
