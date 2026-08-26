// src/components/WelcomeScreen.tsx

import { useState, useEffect } from "react";

// Ikon Lucide untuk full screen
const MaximizeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const MinimizeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
);

type WelcomeScreenProps = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Effect untuk mendeteksi perubahan fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // Set initial state
    setIsFullscreen(!!document.fullscreenElement);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  const requestFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      requestFullScreen();
    } else {
      exitFullScreen();
    }
  };

  const handleStart = () => {
    if (selectedGender) {
      localStorage.setItem("gender", selectedGender);

      // Cek jika belum full screen, maka masuk ke full screen
      if (!document.fullscreenElement) {
        requestFullScreen();
      }

      onStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header dengan animasi */}
        <div className="text-center mt-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            KUIS MODUL 1 - PRINSIP UMUM PELAKSANAAN BELANJA NEGARA
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-2xl font-bold text-gray-700 font-medium">
            Jawab Soal, Lempar Balon, Kalahkan Lawan!
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/60">
          {/* Game Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-green-50 to-white border border-green-100">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-green-700 mb-2">Jawab Benar</h3>
              <p className="text-sm text-green-600">
                Dapatkan damage maksimal dengan jawaban tepat
              </p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-blue-700 mb-2">
                Cepat & Akurat
              </h3>
              <p className="text-sm text-blue-600">
                Semakin cepat jawab, semakin besar damage
              </p>
            </div>

            <div className="text-center p-4 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100">
              <div className="text-2xl mb-2">💧</div>
              <h3 className="font-semibold text-purple-700 mb-2">Balon Air</h3>
              <p className="text-sm text-purple-600">
                Lempar balon air untuk kalahkan lawan
              </p>
            </div>
          </div>

          {/* Gender Selection */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-8 text-gray-800">
              Pilih Karakter Anda
            </h3>

            <div className="flex flex-col md:flex-row justify-center gap-8">
              {/* Male Character */}
              <div
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  selectedGender === "man"
                    ? "transform scale-105"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedGender("man")}
              >
                <div
                  className={`w-48 h-48 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                    selectedGender === "man"
                      ? "border-blue-500 shadow-2xl shadow-blue-200"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  <img
                    src="./images/man-1.webp"
                    alt="Karakter Laki-laki"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      // Fallback jika gambar tidak ada
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3ELaki-laki%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div
                  className={`mt-4 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedGender === "man"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-blue-100"
                  }`}
                >
                  Laki-laki
                </div>
              </div>

              {/* Female Character */}
              <div
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  selectedGender === "woman"
                    ? "transform scale-105"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedGender("woman")}
              >
                <div
                  className={`w-48 h-48 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                    selectedGender === "woman"
                      ? "border-pink-500 shadow-2xl shadow-pink-200"
                      : "border-gray-200 hover:border-pink-300 hover:shadow-lg"
                  }`}
                >
                  <img
                    src="./images/woman-1.webp"
                    alt="Karakter Perempuan"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      // Fallback jika gambar tidak ada
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23fce7f3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23ec4899'%3EPerempuan%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div
                  className={`mt-4 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedGender === "woman"
                      ? "bg-pink-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-pink-100"
                  }`}
                >
                  Perempuan
                </div>
              </div>
            </div>
          </div>

          {/* Start dan Full Screen Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={!selectedGender}
              className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform flex items-center gap-2 ${
                selectedGender
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white cursor-pointer hover:scale-105 hover:shadow-2xl shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <span>🚀</span>
              {selectedGender
                ? "Mulai Permainan!"
                : "Pilih Karakter Terlebih Dahulu"}
            </button>

            {/* Full Screen Toggle Button */}
            <button
              onClick={toggleFullScreen}
              className={`px-6 py-4 cursor-pointer rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 ${
                isFullscreen
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105"
                  : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:scale-105"
              }`}
              title={isFullscreen ? "Keluar Full Screen" : "Masuk Full Screen"}
            >
              {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
              <span className="hidden sm:inline">
                {isFullscreen ? "Keluar Full Screen" : "Full Screen"}
              </span>
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 inline-block">
              <p className="text-yellow-800 text-sm font-medium">
                💡 <strong>Tips:</strong> Gunakan mode Full Screen untuk
                pengalaman bermain yang lebih imersif!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>
            Jawab dengan cepat dan tepat untuk memenangkan pertarungan balon
            air!
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Game edukasi ini dibuat dengan React JS • Kontak:{" "}
            <a
              href="https://wa.me/082178563110"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              Muhammad Al Hafidhi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
