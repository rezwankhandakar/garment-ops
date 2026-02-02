// const HowItWorks = () => {
//   const steps = [
//     { step: "01", title: "Choose Product", desc: "Browse & select garments easily" },
//     { step: "02", title: "Place Order", desc: "Confirm quantity & payment option" },
//     { step: "03", title: "Production", desc: "We manufacture with quality control" },
//     { step: "04", title: "Delivery", desc: "Fast & safe delivery worldwide" },
//   ];

//   return (
//     <section className="py-16 bg-white">
//       <h2 className="text-3xl font-bold text-cyan-500 text-center mb-12">How It Works</h2>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
//         {steps.map(s => (
//           <div key={s.step} className="text-center p-6 border rounded-xl hover:shadow">
//             <div className="text-4xl font-bold text-blue-600">{s.step}</div>
//             <h3 className="text-xl text-emerald-400 font-semibold mt-3">{s.title}</h3>
//             <p className="text-gray-600 mt-2">{s.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;


const HowItWorks = () => {
  const steps = [
    { step: "01", title: "Choose Product", desc: "Browse & select garments easily" },
    { step: "02", title: "Place Order", desc: "Confirm quantity & payment option" },
    { step: "03", title: "Production", desc: "We manufacture with quality control" },
    { step: "04", title: "Delivery", desc: "Fast & safe delivery worldwide" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <h2 className="text-4xl font-extrabold text-center mb-14">
        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
          How It Works
        </span>
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {steps.map((s) => (
          <div
            key={s.step}
            className="group relative bg-white p-8 rounded-2xl border border-gray-100 
                       hover:border-cyan-300 hover:shadow-xl hover:-translate-y-2
                       transition-all duration-300"
          >
            {/* Step Badge */}
            <div className="w-16 h-16 mx-auto rounded-full 
                            bg-gradient-to-br from-cyan-500 to-blue-600
                            text-white flex items-center justify-center
                            text-xl font-bold shadow-lg
                            group-hover:scale-110 transition">
              {s.step}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mt-6 text-gray-800 group-hover:text-cyan-600 transition">
              {s.title}
            </h3>

            {/* Divider */}
            <div className="w-10 h-1 bg-cyan-500 mx-auto mt-3 rounded-full opacity-70"></div>

            {/* Description */}
            <p className="text-gray-600 mt-4 leading-relaxed">
              {s.desc}
            </p>

            {/* Glow Hover Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 
                            group-hover:opacity-100 transition 
                            bg-gradient-to-r from-cyan-400/10 to-blue-500/10"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
