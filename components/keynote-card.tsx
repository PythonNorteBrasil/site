"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

interface KeynoteSocials {
  instagram?: string;
  linkedin?: string;
}

interface KeynoteCardProps {
  name: string;
  role: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  socials: KeynoteSocials;
}

export function KeynoteCard({
  name,
  role,
  tag,
  title,
  description,
  image,
  socials,
}: KeynoteCardProps) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-[#EAEAEA]
        bg-white
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        flex
        flex-col
        overflow-hidden
        min-h-[380px]
        sm:min-h-[450px]
      "
    >
      {/* FOTO */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="
            object-cover
            object-top
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* CONTEÚDO */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-sm sm:text-base font-bold text-[#004B23] leading-tight line-clamp-2">
          {name}
        </h3>

        <p className="mt-1 text-[10px] sm:text-[12px] text-gray-500 line-clamp-1">
          {role}
        </p>

        <p
          className="
            mt-3
            sm:mt-4
            text-[12px] sm:text-xs
            text-gray-600
            leading-relaxed
            line-clamp-4 sm:line-clamp-5
          "
        >
          {description}
        </p>

        {/* REDES */}
        <div
          className="
            mt-auto
            pt-3
            border-t
            border-gray-100
            flex
            justify-center
            gap-2
          "
        >
          {socials.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="
                w-7 h-7 sm:w-8 sm:h-8
                rounded-full
                border
                border-gray-200
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-[#FF6B00]
                hover:text-white
                hover:border-[#FF6B00]
                transition-all
              "
            >
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}

          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="
                w-7 h-7 sm:w-8 sm:h-8
                rounded-full
                border
                border-gray-200
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-[#004B23]
                hover:text-white
                hover:border-[#004B23]
                transition-all
              "
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
