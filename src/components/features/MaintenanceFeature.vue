<template>
  <section id="maintenance" class="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.35),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.22),_transparent_30%)] pointer-events-none"></div>
        <div class="relative grid gap-10 lg:grid-cols-[1fr_1.2fr] items-center p-10 sm:p-14">
          <div class="flex flex-col items-center justify-center gap-6 text-center lg:items-start lg:text-left">
            <div class="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/15 text-indigo-200 shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
              <span class="text-3xl">🔧</span>
            </div>
            <div>
              <p class="text-sm uppercase tracking-[0.28em] text-indigo-300 mb-3">Maintenance Mode</p>
              <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Sistem Sedang Maintenance</h2>
            </div>
            <p class="max-w-xl text-base text-slate-200 leading-8">
              Mohon maaf atas ketidaknyamanan ini. Kami sedang melakukan pembaruan dan peningkatan agar layanan kembali lebih cepat, aman, dan responsif.
            </p>
          </div>

          <div class="space-y-6">
            <div class="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/25">
              <h3 class="text-xl font-semibold text-white mb-4">Apa yang sedang terjadi?</h3>
              <p class="text-slate-300 leading-7">
                Tim kami sedang bekerja untuk menyempurnakan sistem. Silakan kembali beberapa saat lagi atau cek pembaruan terakhir lewat GitHub.
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="rounded-3xl border border-indigo-500/10 bg-white/5 p-6 text-center">
                <p class="text-3xl font-bold text-white">⌛</p>
                <p class="mt-3 text-sm text-slate-300">Perbaikan system</p>
              </div>
              <div class="rounded-3xl border border-cyan-400/10 bg-white/5 p-6 text-center">
                <p class="text-3xl font-bold text-white">🚀</p>
                <p class="mt-3 text-sm text-slate-300">Kembali segera</p>
              </div>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
              <a href="#home" class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:bg-indigo-700">Kembali ke Beranda</a>
              <a href="https://github.com/Firlans" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-white/10">Lihat Pembaruan GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
