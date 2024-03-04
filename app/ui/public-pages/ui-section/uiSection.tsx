import { ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/app/lib/definitions";

interface UISectionProps {
  baseSection: Section;
  children?: ReactNode;
}
const UISection: React.FC<UISectionProps> = ({ baseSection, children }) => {
  const {
    title,
    description,
    image,
    cta,
    alignment = "center",
    order = "",
    backgroundColor = "bg-blue-400",
    textColor = "text-white",
  } = baseSection;
  return (
    <>
      <section
        className={`${backgroundColor} flex flex-col gap-4 ${image ? (order === "reverse" ? "md:flex-row-reverse" : "md:flex-row") : ""}`}
      >
        <div
          className={`flex flex-col ${alignment === "center" ? "items-center justify-center" : "items-start justify-start"} gap-6 rounded-lg px-6 py-10 ${image ? "md:w-4/5" : ""} md:px-10`}
        >
          <div className={`text-xl ${textColor} md:text-3xl md:leading-normal`}>
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <p className={`${textColor} my-4 md:leading-normal`}>{description}</p>
          {cta && (
            <Link
              href={cta.url}
              className={`flex items-center gap-5 ${alignment === "center" ? "" : "self-start"} rounded-lg ${cta.backgroundColor ?? "bg-white"}  px-6 py-3 text-sm font-medium ${cta.textColor ?? "text-blue-400"} transition-colors ${cta.backgroundColorOnHover ?? "hover:bg-gray-300"} md:text-base`}
            >
              <span>{cta.label}</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          )}
        </div>
        {image && (
          <div className="flex items-center justify-center p-6 md:px-28 md:py-12">
            {image.desktop && (
              <Image
                src={image.desktop}
                width={600}
                height={460}
                className="hidden md:block"
                alt={image.alt}
              ></Image>
            )}
            {image.mobile && (
              <Image
                src={image.mobile}
                width={460}
                height={320}
                className="block md:hidden"
                alt={image.alt}
              />
            )}
          </div>
        )}
        {children}
      </section>
    </>
  );
};

export default UISection;
