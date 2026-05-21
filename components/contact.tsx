"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, MessageCircle, Instagram, Mail, Twitter } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic
    alert("Mensagem enviada com sucesso!");
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section
      id="contato"
      className="relative py-20 md:py-32 bg-slate-50 text-brand-text overflow-hidden"
      aria-label="Contato"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-5 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-oferta text-brand-green">
              Fale Conosco
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
            <p className="text-base md:text-lg max-w-xl mx-auto text-foreground/80 font-medium pt-2">
              Dúvidas, sugestões ou propostas de parceria? Mande sua mensagem ou fale em nossos canais.
            </p>
          </div>

          {/* Contact channels cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-3xl border border-black/5 bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground font-oferta mb-1">Telegram</h3>
              <a
                href="https://t.me/pythonnorte"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-green hover:underline"
              >
                t.me/pythonnorte
              </a>
            </Card>

            <Card className="rounded-3xl border border-black/5 bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-brand-green/10 border border-brand-green/20 text-brand-green flex items-center justify-center mb-4">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground font-oferta mb-1">Instagram</h3>
              <a
                href="https://instagram.com/pythonnorte"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-green hover:underline"
              >
                @pythonnorte
              </a>
            </Card>

            <Card className="rounded-3xl border border-black/5 bg-white p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow-dark flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-foreground font-oferta mb-1">E-mail</h3>
              <a
                href="mailto:contato@pythonnorte.org"
                className="text-xs font-bold text-brand-green hover:underline"
              >
                contato@pythonnorte.org
              </a>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="rounded-3xl border border-black/5 bg-white p-8 md:p-10 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-oferta mb-6 text-center md:text-left">
              Envie uma Mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-bold text-xs md:text-sm text-foreground/80">Nome completo</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl border-black/10 py-5 focus-visible:ring-brand-orange"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-xs md:text-sm text-foreground/80">E-mail corporativo ou pessoal</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-xl border-black/10 py-5 focus-visible:ring-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-bold text-xs md:text-sm text-foreground/80">Empresa / Instituição</Label>
                  <Input
                    id="company"
                    placeholder="Nome da empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="rounded-xl border-black/10 py-5 focus-visible:ring-brand-orange"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-bold text-xs md:text-sm text-foreground/80">Assunto principal</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger id="subject" className="rounded-xl border-black/10 py-5 focus-visible:ring-brand-orange text-foreground/75">
                      <SelectValue placeholder="Selecione um assunto" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="sponsorship">Quero ser Patrocinador</SelectItem>
                      <SelectItem value="volunteer">Quero ser Voluntário</SelectItem>
                      <SelectItem value="press">Imprensa & Comunicação</SelectItem>
                      <SelectItem value="other">Outros assuntos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-bold text-xs md:text-sm text-foreground/80">Mensagem detalhada</Label>
                <Textarea
                  id="message"
                  placeholder="Escreva sua mensagem aqui..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="rounded-xl border-black/10 min-h-[140px] focus-visible:ring-brand-orange"
                />
              </div>

              <Button
                type="submit"
                variant="norte"
                size="lg"
                className="w-full py-6 rounded-2xl font-bold shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </Card>

        </div>
      </div>
    </section>
  );
}
