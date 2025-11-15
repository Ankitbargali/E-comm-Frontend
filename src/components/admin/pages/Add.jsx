import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const MAX_IMAGES = 5;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    subcategory: "",
    images: Array(MAX_IMAGES).fill(null),
    preview: Array(MAX_IMAGES).fill(null),
    specifications: [],
    variants: [],
  });

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-m2tv.onrender.com/api/categories", {
        withCredentials: "true",
      })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle Category Change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });

    const categoryData = categories.find((cat) => cat._id === selectedCategory);

    if (categoryData) {
      setSubcategories(categoryData.subcategories || []);
      setSizeOptions(categoryData.sizes || []);
    } else {
      setSubcategories([]);
      setSizeOptions([]);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);

    // If no files selected, return
    if (!files.length) return;

    // CASE 1: Update specific image index
    if (typeof index === "number") {
      const updatedImages = [...formData.images];
      const updatedPreview = [...formData.preview];

      updatedImages[index] = files[0]; // replace the existing image
      updatedPreview[index] = URL.createObjectURL(files[0]);

      setFormData({
        ...formData,
        images: updatedImages,
        preview: updatedPreview,
      });

      return;
    }

    // CASE 2: Add new images (if no index provided)

    const newImages = files.map((file) => file);
    const newPreview = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
      preview: [...prev.preview, ...newPreview],
    }));
  };

  // Handle Adding Product Specifications
  const handleAddSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "" }],
    });
  };

  // Handle Specification Change
  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index][field] = value;
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  // Handle Adding Product Variants
  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { size: "", oldPrice: "", newPrice: "", stock: "" },
      ],
    });
  };

  // Handle Variant Change
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subcategory", formData.subcategory);

    // Convert specifications and variants to JSON string
    formDataToSend.append(
      "specifications",
      JSON.stringify(formData.specifications)
    );
    formDataToSend.append("variants", JSON.stringify(formData.variants));

    // Append images
    formData.images.forEach((file) => {
      if (file) formDataToSend.append("images", file);
    });

    try {
      const response = await axios.post(
        "https://ecommerce-backend-m2tv.onrender.com/api/products/add",
        formDataToSend, // Sending the product data
        {
          withCredentials: "true",
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
      console.log("Product added successfully:", response.data.product);

      // Reset the form
      setFormData({
        name: "",
        description: "",
        category: "",
        // mainCategory: "",
        subCategory: "",
        brand: "",
        specifications: [],
        variants: [],
        images: Array(MAX_IMAGES).fill(null),
        preview: Array(MAX_IMAGES).fill(null),
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      {/* Image Upload Section */}
      <div className="imageSection text-black font-semibold text-lg">
        Upload Image
        <div className="flex gap-2 mt-3">
          {formData.preview.map((_, index) => (
            <div
              className="h-24 w-24 bg-slate-500 flex flex-col items-center justify-center relative text-neutral-800"
              key={index}
            >
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                className="h-full w-full opacity-0 absolute"
              />
              {formData.preview[index] ? (
                <img
                  src={formData.preview[index]}
                  alt=""
                  className="h-full w-full"
                />
              ) : (
                <div>
                  <i className="ri-upload-cloud-2-line text-4xl font-thin"></i>
                  <p className="font-light text-sm">Upload</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mt-5">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        ></textarea>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        {/* Category & Subcategory */}
        <div className="flex gap-2 mb-2 items-center">
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="border p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate("/admin/addCategory")}
            className="bg-green-500 text-white p-2"
          >
            + Add Category
          </button>
        </div>

        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        {/* Product Specifications */}
        <h3 className="font-bold mt-4">Product Specifications</h3>
        {formData.specifications.map((spec, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Key"
              value={spec.key}
              onChange={(e) =>
                handleSpecificationChange(index, "key", e.target.value)
              }
              className="border p-2 w-1/2"
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) =>
                handleSpecificationChange(index, "value", e.target.value)
              }
              className="border p-2 w-1/2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSpecification}
          className="bg-blue-500 text-white p-2"
        >
          + Add Specification
        </button>

        {/* Variants */}
        <h3 className="font-bold mt-4">Variants</h3>
        {formData.variants.map((variant, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
              className="border p-2 w-1/4"
            >
              <option value="">Select Size</option>
              {sizeOptions.map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Old Price"
              value={variant.oldPrice}
              onChange={(e) =>
                handleVariantChange(index, "oldPrice", e.target.value)
              }
              className="border p-2 w-1/4"
            />
            <input
              type="number"
              placeholder="New Price"
              value={variant.newPrice}
              onChange={(e) =>
                handleVariantChange(index, "newPrice", e.target.value)
              }
              className="border p-2 w-1/4"
            />
            <input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
              className="border p-2 w-1/4"
            />
          </div>
        ))}
        {/* Add Variant Button */}
        <button
          type="button"
          onClick={handleAddVariant}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          + Add Variant
        </button>

        <button
          type="submit"
          className="bg-purple-500 text-white p-2 mt-4 block w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
