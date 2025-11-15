import { useState, useEffect } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); // for update mode

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get("https://ecommerce-backend-m2tv.onrender.com/api/categories", {
        withCredentials: "true",
      })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Add new subcategory input field
  const addSubcategoryField = () => {
    setSubcategories([...subcategories, ""]);
  };

  // Update subcategory input value
  const updateSubcategory = (index, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index] = value;
    setSubcategories(updatedSubcategories);
  };

  // Add new size input field
  const addSizeField = () => {
    setSizes([...sizes, ""]);
  };

  // Update size input value
  const updateSize = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = value;
    setSizes(updatedSizes);
  };

  // Handle add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      subcategories: subcategories.filter((s) => s.trim() !== ""),
      sizes: sizes.filter((s) => s.trim() !== ""),
    };

    try {
      if (editingCategory) {
        // update existing category
        const response = await axios.put(
          `https://ecommerce-backend-m2tv.onrender.com/api/categories/${editingCategory._id}`,
          data,
          { withCredentials: true }
        );
        alert("Category updated successfully!");
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === editingCategory._id ? response.data : cat
          )
        );
      } else {
        // add new category
        const response = await axios.post(
          "https://ecommerce-backend-m2tv.onrender.com/api/categories/add",
          data,
          { withCredentials: true }
        );
        alert(response.data.message);
        setCategories([...categories, response.data.category]);
      }
      // reset form
      setName("");
      setSubcategories([""]);
      setSizes([""]);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error adding/updating category:", error);
      alert(error.response?.data?.message || "Error saving category");
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(
        `https://ecommerce-backend-m2tv.onrender.com/api/categories/${id}`,
        {
          withCredentials: true,
        }
      );
      setCategories(categories.filter((cat) => cat._id !== id));
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(error.response?.data?.message || "Error deleting category");
    }
  };

  // Handle edit (populate form)
  const handleEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setSubcategories(category.subcategories || [""]);
    setSizes(category.sizes || [""]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {editingCategory ? "Update Category" : "Add Category"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name Input */}
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <h4 className="text-lg font-semibold text-gray-600">Subcategories</h4>
        {subcategories.map((sub, i) => (
          <input
            key={i}
            type="text"
            placeholder="Subcategory"
            value={sub}
            onChange={(e) => updateSubcategory(i, e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}
        <button
          type="button"
          onClick={addSubcategoryField}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          + Add Subcategory
        </button>

        <h4 className="text-lg font-semibold text-gray-600 mt-4">Sizes</h4>
        {sizes.map((size, i) => (
          <input
            key={i}
            type="text"
            placeholder="Size (e.g. S, M, L or 128GB, 256GB)"
            value={size}
            onChange={(e) => updateSize(i, e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        ))}
        <button
          type="button"
          onClick={addSizeField}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
        >
          + Add Size
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Existing Categories */}
      <h3 className="text-lg font-semibold text-gray-700 mt-6">
        Existing Categories
      </h3>
      <ul className="mt-2 space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="p-3 border rounded-md bg-gray-100 text-gray-700 flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{cat.name}</span> -{" "}
              <span>Subcategories: {cat.subcategories.join(", ")}</span> -{" "}
              <span>Sizes: {cat.sizes?.join(", ") || "N/A"}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AddCategory;
