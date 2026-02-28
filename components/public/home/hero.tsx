import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-150 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/school_banner.jpeg")',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-4">
        <div className="size-36 flex items-center justify-center bg-white border-gray-500 border-4 mx-auto rounded-full p-5">
          <Image
            src="/institutional_logo.png"
            width={100}
            height={100}
            alt="Logo Insitucional Unidad Educativa Pedro Luis Cedeño"
            className="w-auto h-auto"
          />
        </div>
        <h1>
          <span className="text-3xl md:text-4xl font-bold text-white">
            Unidad Educativa
          </span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance text-white">
            Pedro Luis Cedeño
          </span>
        </h1>
      </div>
    </section>
  );
}
