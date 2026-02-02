const CustomerFeedback = () => {
  const reviews = [
    {
      name: "John Doe",
      feedback: "Amazing quality garments and very fast delivery. Highly recommended!",
    },
    {
      name: "Sarah Smith",
      feedback: "Professional service and excellent communication throughout the order process.",
    },
    {
      name: "Rahim Uddin",
      feedback: "Best B2B garment sourcing platform in Bangladesh. Quality is always consistent.",
    },
    {
      name: "Michael Lee",
      feedback: "Great pricing, reliable production, and on-time shipment every time.",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl text-cyan-400 font-bold text-center mb-10">
        Customer Feedback
      </h2>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((r, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <p className="text-gray-600 italic mb-4">
              "{r.feedback}"
            </p>
            <h4 className="font-semibold text-blue-400 text-lg">{r.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;
