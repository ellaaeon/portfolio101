"use client";

import { motion } from "framer-motion";
import { useEasterEggs } from "@/context/EasterEggContext";
import { AnimatePresence } from "framer-motion";

export default function AchievementToast() {
  const { toast, dismissToast } = useEasterEggs();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 rounded-2xl glass px-5 py-3 shadow-2xl"
          onClick={dismissToast}
        >
          <span className="text-2xl">{toast.icon}</span>
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Achievement Unlocked
            </p>
            <p className="font-semibold">{toast.title}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
