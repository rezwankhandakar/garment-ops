import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const id = product._id;
          const inStock = product.quantity > 0;

          return (
            <div
              key={id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition"
            >
              <img
                src={product.images?.[0] || "/no-image.png"}
                alt={product.title}
                className="h-64 w-full object-cover rounded-t-2xl"
              />

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">{product.title}</h3>
                <p className="text-sm text-gray-500">
                  Quantity: {product.quantity}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {inStock ? "In Stock" : "Stock Out"}
                  </span>
                </div>

                <Link to={`/products/${id}`}>
                  <button className="w-full mt-3 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
