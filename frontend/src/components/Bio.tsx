import { motion } from "framer-motion"

export const Bio = () => {
    return (
        <div className="h-full w-full bg-gradient-to-br from-[#1c1814] via-[#2f2b28] to-[#1c1814] flex items-center justify-center px-8">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="max-w-lg"
            >
                <div className="mb-8 text-center lg:text-left">
                    <div className="inline-flex rounded-full border border-[#d7cab2]/40 bg-[#efede7]/10 px-4 py-2 mb-6">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#d7cab2]">BlogBook Stories</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    <div>
                        <p className="font-[Cormorant_Garamond] text-2xl italic leading-relaxed text-[#efede7]">
                            "BlogBook transformed how I share my thoughts. The elegant interface lets my words shine without distractions."
                        </p>
                    </div>

                    <div className="pt-4 border-t border-[#d7cab2]/20">
                        <h4 className="font-[Cinzel] text-lg font-semibold uppercase tracking-tight text-[#efede7]">
                            Sarah Chen
                        </h4>
                        <p className="mt-1 text-sm text-[#b5a391]">Writer & Content Creator</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="rounded-2xl bg-[#efede7]/5 border border-[#d7cab2]/20 p-4 text-center">
                            <p className="font-[Cinzel] text-xl font-semibold text-[#efede7]">12K+</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#b5a391]">Readers</p>
                        </div>
                        <div className="rounded-2xl bg-[#efede7]/5 border border-[#d7cab2]/20 p-4 text-center">
                            <p className="font-[Cinzel] text-xl font-semibold text-[#efede7]">48</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#b5a391]">Blogs</p>
                        </div>
                        <div className="rounded-2xl bg-[#efede7]/5 border border-[#d7cab2]/20 p-4 text-center">
                            <p className="font-[Cinzel] text-xl font-semibold text-[#efede7]">6M</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#b5a391]">Words</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}