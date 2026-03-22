"use client";

import { Gem, Shield, RefreshCw, Headphones } from "lucide-react";

const points = [
  {
    icon: Gem,
    title: "Precision Fit, Premium Feel",
  },
  {
    icon: Shield,
    title: "Engineered For Real Drops",
  },
  {
    icon: RefreshCw,
    title: "Materials That Last",
  },
  {
    icon: Headphones,
    title: "Easy Return, Reliable Support",
  },
];

export default function Strip() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {points.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-slate-800 text-slate-800 mb-3 sm:mb-4">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <p className="text-slate-800 font-medium text-xs sm:text-sm md:text-base">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
