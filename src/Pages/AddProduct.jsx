import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [showOnHome, setShowOnHome] = useState(false);
  const [loading, setLoading] = useState(false); // spinner for upload

  // 🔹 Handle Image Selection + Preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // 🔹 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const productData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      moq: Number(form.moq.value),
      demoVideo: form.demoVideo.value || "",
      paymentOption: form.paymentOption.value,
      showOnHome,
    };

    try {
      if (images.length === 0) {
        Swal.fire("Error", "Please select at least one image", "error");
        return;
      }

      setLoading(true);

      // 🔹 ImgBB Upload
      const imageAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imageUrls = [];

      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch(imageAPIURL, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          imageUrls.push(data.data.display_url);
        } else {
          throw new Error("Image upload failed");
        }
      }

      // 🔹 Final Product Object
      const finalProduct = {
        ...productData,
        images: imageUrls,
        createdAt: new Date(),
      };

      await axiosSecure.post("/products", finalProduct);

      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "Product successfully created",
        timer: 1500,
        showConfirmButton: false,
      });

      form.reset();
      setImages([]);
      setPreviewImages([]);
      setShowOnHome(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          className="input input-bordered w-full"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        {/* Category */}
        <select
          name="category"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Category</option>
          <option>Shirt</option>
          <option>Pant</option>
          <option>Jacket</option>
          <option>Accessories</option>
        </select>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Available Quantity"
            className="input input-bordered"
            required
          />
          <input
            type="number"
            name="moq"
            placeholder="MOQ"
            className="input input-bordered"
            required
          />
        </div>

        {/* Image Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full"
          required
        />

        {/* Image Preview */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview"
                className="h-24 w-full object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* Demo Video */}
        <input
          type="url"
          name="demoVideo"
          placeholder="Demo Video Link (optional)"
          className="input input-bordered w-full"
        />

        {/* Payment Option */}
        <select
          name="paymentOption"
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Payment Option</option>
          <option value="cod">Cash on Delivery</option>
          <option value="payfirst">Pay First</option>
        </select>

        {/* Show on Home */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={showOnHome}
            onChange={(e) => setShowOnHome(e.target.checked)}
          />
          Show on Home Page
        </label>

        {/* Submit */}
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
