import { create } from 'zustand';

const useTextColorStore = create((set) => ({
    tailwind_text_colors : [
        { type: "dark", color: "text-gray-500", bg: "bg-gray-500" },
        { type: "dark", color: "text-gray-600", bg: "bg-gray-600" },
        { type: "dark", color: "text-gray-700", bg: "bg-gray-700" },
        { type: "dark", color: "text-gray-800", bg: "bg-gray-800" },
        { type: "dark", color: "text-gray-900", bg: "bg-gray-900" },
        { type: "light", color: "text-slate-200", bg: "bg-slate-200" },
        { type: "light", color: "text-slate-300", bg: "bg-slate-300" },
        { type: "dark", color: "text-slate-400", bg: "bg-slate-400" },
        { type: "light", color: "text-zinc-200", bg: "bg-zinc-200" },
        { type: "light", color: "text-zinc-300", bg: "bg-zinc-300" },
        { type: "dark", color: "text-zinc-400", bg: "bg-zinc-400" },
        { type: "light", color: "text-neutral-200", bg: "bg-neutral-200" },
        { type: "light", color: "text-neutral-300", bg: "bg-neutral-300" },
        { type: "dark", color: "text-neutral-400", bg: "bg-neutral-400" },
        { type: "light", color: "text-stone-200", bg: "bg-stone-200" },
        { type: "light", color: "text-stone-300", bg: "bg-stone-300" },
        { type: "light", color: "text-emerald-200", bg: "bg-emerald-200" },
        { type: "light", color: "text-emerald-300", bg: "bg-emerald-300" },
        { type: "dark", color: "text-emerald-400", bg: "bg-emerald-400" },
        { type: "light", color: "text-teal-200", bg: "bg-teal-200" },
        { type: "light", color: "text-teal-300", bg: "bg-teal-300" },
        { type: "dark", color: "text-teal-400", bg: "bg-teal-400" },
        { type: "light", color: "text-cyan-200", bg: "bg-cyan-200" },
        { type: "light", color: "text-cyan-300", bg: "bg-cyan-300" },
        { type: "dark", color: "text-red-200", bg: "bg-red-200" },
        { type: "dark", color: "text-red-300", bg: "bg-red-300" },
        { type: "dark", color: "text-red-400", bg: "bg-red-400" },
        { type: "dark", color: "text-red-500", bg: "bg-red-500" },
        { type: "dark", color: "text-red-600", bg: "bg-red-600" },
        { type: "dark", color: "text-red-700", bg: "bg-red-700" },
        { type: "dark", color: "text-red-800", bg: "bg-red-800" },
        { type: "dark", color: "text-red-900", bg: "bg-red-900" },
        { type: "dark", color: "text-blue-200", bg: "bg-blue-200" },
        { type: "dark", color: "text-blue-300", bg: "bg-blue-300" },
        { type: "dark", color: "text-blue-400", bg: "bg-blue-400" },
        { type: "dark", color: "text-blue-500", bg: "bg-blue-500" },
        { type: "dark", color: "text-blue-600", bg: "bg-blue-600" },
        { type: "dark", color: "text-blue-700", bg: "bg-blue-700" },
        { type: "dark", color: "text-blue-800", bg: "bg-blue-800" },
        { type: "dark", color: "text-blue-900", bg: "bg-blue-900" },
        { type: "dark", color: "text-yellow-200", bg: "bg-yellow-200" },
        { type: "dark", color: "text-yellow-300", bg: "bg-yellow-300" },
        { type: "dark", color: "text-yellow-400", bg: "bg-yellow-400" },
        { type: "dark", color: "text-yellow-500", bg: "bg-yellow-500" },
        { type: "dark", color: "text-yellow-600", bg: "bg-yellow-600" },
        { type: "dark", color: "text-yellow-700", bg: "bg-yellow-700" },
        { type: "dark", color: "text-yellow-800", bg: "bg-yellow-800" },
        { type: "dark", color: "text-yellow-900", bg: "bg-yellow-900" },
        { type: "dark", color: "text-purple-200", bg: "bg-purple-200" },
        { type: "dark", color: "text-purple-300", bg: "bg-purple-300" },
        { type: "dark", color: "text-purple-400", bg: "bg-purple-400" },
        { type: "dark", color: "text-purple-500", bg: "bg-purple-500" },
        { type: "dark", color: "text-purple-600", bg: "bg-purple-600" },
        { type: "dark", color: "text-purple-700", bg: "bg-purple-700" },
        { type: "dark", color: "text-purple-800", bg: "bg-purple-800" },
        { type: "dark", color: "text-purple-900", bg: "bg-purple-900" },
        // Add missing bg attributes here if needed
      ]
}));

export default useTextColorStore;
