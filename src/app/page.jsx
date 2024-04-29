import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-7.2rem)] bg-red-600">
      <section>
        <Image className="w-full h-1/3" src="/img/home.jpg" alt="Logo" height={2000} width={2000} />
      </section>
      <section className="absolute top-3/4 w-full flex justify-center items-center">
        <div className=" grid gap-8 p-2 grid-cols-4">

          <div className="bg-white w-80 h-40 shadow-black shadow rounded">
            <span className="flex justify-center items-center pt-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
              </svg>
            </span>
            <p className="text-2xl text-center font-bold pt-2">Precios bajos</p>
            <p className="text-center font-light">Ahorra al máximo</p>
          </div>

          <div className="bg-white w-80 h-40 shadow-black shadow rounded">
            <span className="flex justify-center items-center pt-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>
            <p className="text-2xl text-center font-bold pt-2">Descuentos Exclusivos</p>
            <p className="text-center font-light">En varios productos</p>
          </div>

          <div className="bg-white w-80 h-40 shadow-black shadow rounded">
            <span className="flex justify-center items-center pt-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </span>
            <p className="text-2xl text-center font-bold pt-2">Delivery</p>
            <p className="text-center font-light">Entrega al instante</p>
          </div>

          <div className="bg-white w-80 h-40 shadow-black shadow rounded">
            <span className="flex justify-center items-center pt-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </span>
            <p className="text-2xl text-center font-bold pt-2">Compras Online</p>
            <p className="text-center font-light">Directo en nuestra plataforma</p>
          </div>

        </div>
      </section>
    </div>
  );
};