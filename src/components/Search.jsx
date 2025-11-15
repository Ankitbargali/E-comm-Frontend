import { React, useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const Search = () => {
  const { product, fetchUser, category } = useContext(DataContext);

  const [filtered, setFiltered] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [subcategoryFilter, setSubcategoryFilter] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(10000);

  const queryParam = useQuery();
  const query = queryParam.get("query")?.trim().toLowerCase() || "";
  const categoryParam = queryParam.get("category")?.trim().toLowerCase() || "";
  const matchedProducts = Array.isArray(product)
    ? product.filter((p) => {
        const productCategory = category?.find((cat) => cat._id === p.category);

        //  Direct category match (when coming from CategoriesList)
        const directCategoryMatch =
          categoryParam &&
          productCategory?.name?.toLowerCase() === categoryParam;

        // Search query match (when searching manually)
        const nameMatch = query && p.name?.toLowerCase().includes(query);
        const categoryMatch =
          query && productCategory?.name?.toLowerCase().includes(query);
        const subcategoryMatch =
          query &&
          productCategory?.subcategories?.some((sub) =>
            sub.toLowerCase().includes(query)
          );

        //  Return true only for valid matches
        return (
          directCategoryMatch || nameMatch || categoryMatch || subcategoryMatch
        );
      })
    : [];

  const matchedCategoryId = matchedProducts[0]?.category;

  const matchedCategory = Array.isArray(category)
    ? category.find(
        (cat) =>
          cat._id === matchedCategoryId ||
          cat._id?.toString() === matchedCategoryId
      )
    : null;

  const categoryBrands = [
    ...new Set(
      matchedProducts
        .filter((p) => p.category === matchedCategoryId)
        .map((p) => p.brand)
    ),
  ];

  const categorySizes = matchedCategory?.sizes || [];
  const categorySubcategories = matchedCategory?.subcategories || [];

  useEffect(() => {
    if (!Array.isArray(matchedProducts)) return;

    let results = matchedProducts;

    if (brandFilter.length) {
      results = results.filter((p) => brandFilter.includes(p.brand));
    }

    if (sizeFilter.length) {
      results = results.filter((p) =>
        p.variants?.some((v) => sizeFilter.includes(v.size))
      );
    }

    if (subcategoryFilter.length) {
      results = results.filter((p) =>
        subcategoryFilter.includes(p.subCategory)
      );
    }

    if (matchedProducts.length) {
      const prices = matchedProducts.flatMap(
        (p) => p.variants?.map((v) => v.newPrice) || []
      );
      const max = Math.max(...prices, 0);

      //  Only update if max price changes
      if (max !== maxPrice) {
        setMaxPrice(max);
        setSelectedMaxPrice(max);
      }
    }
    if (selectedMaxPrice) {
      results = results.filter((p) =>
        p.variants?.some((v) => v.newPrice <= selectedMaxPrice)
      );
    }

    setFiltered(results);
  }, [
    brandFilter,
    sizeFilter,
    subcategoryFilter,
    product,
    query,
    matchedProducts,
    selectedMaxPrice,
  ]);

  const toggleFilter = (value, setter, current) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const cartSubmit = async (
    productId,
    size,
    newPrice,
    oldPrice,
    quantity = 1
  ) => {
    try {
      const response = await fetch(
        "https://ecommerce-backend-m2tv.onrender.com/api/cart/add",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            variant: {
              size,
              newPrice: Number(newPrice),
              oldPrice: Number(oldPrice),
            },
            quantity: Number(quantity),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating cart:", data.error || "Unknown error");
        return;
      }

      fetchUser();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <>
      <div className="h-16" />
      <div className="px-6 py-10">
        <h1 className="text-3xl font-semibold text-center">
          {categoryParam ? `${categoryParam} Collection` : "Search Results"}
        </h1>
        <p className="mb-6 text-center">{filtered.length} Items Found</p>

        <div className="flex gap-6">
          {/* Filter Section */}
          <div className="w-[20vw] h-fit bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-medium mb-4">Filters</h3>

            {/* Subcategory Filter */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Brand</p>
              {categorySubcategories.length === 0 ? (
                <p className="text-sm text-gray-500">No Brand found</p>
              ) : (
                categorySubcategories.map((sub) => (
                  <label key={sub} className="block">
                    <input
                      type="checkbox"
                      checked={subcategoryFilter.includes(sub)}
                      onChange={() =>
                        toggleFilter(
                          sub,
                          setSubcategoryFilter,
                          subcategoryFilter
                        )
                      }
                    />{" "}
                    {sub}
                  </label>
                ))
              )}
            </div>

            {/* Size Filter */}
            <div>
              <p className="font-semibold mb-2">Size</p>
              {categorySizes.length === 0 ? (
                <p className="text-sm text-gray-500">No sizes found</p>
              ) : (
                categorySizes.map((size) => (
                  <label key={size} className="block">
                    <input
                      type="checkbox"
                      checked={sizeFilter.includes(size)}
                      onChange={() =>
                        toggleFilter(size, setSizeFilter, sizeFilter)
                      }
                    />{" "}
                    {size}
                  </label>
                ))
              )}
            </div>
            {/* Price Filter */}
            <div className="mb-4">
              <p className="font-semibold mb-2">
                Max Price: ₹{selectedMaxPrice}
              </p>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <p>No Product Found</p>
            ) : (
              filtered.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-sm p-4 flex flex-col items-center text-center"
                >
                  <Link to={`/product/${product._id}`} className="mb-4 block">
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                      className="w-40 h-40 object-cover"
                    />
                  </Link>

                  <Link
                    to={`/product/${product._id}`}
                    className="hover:underline"
                  >
                    <h2 className="text-lg font-medium mb-1">
                      {product.name.length > 31
                        ? product.name.slice(0, 31) + "..."
                        : product.name}
                    </h2>
                  </Link>

                  {product.variants[0]?.size && (
                    <p className="text-sm text-gray-600 mb-1">
                      Size: {product.variants[0].size}
                    </p>
                  )}
                  <p className="text-md font-semibold mb-4">
                    ₹{product.variants[0]?.newPrice || product.price}
                  </p>
                  <button
                    onClick={() =>
                      cartSubmit(
                        product._id,
                        product.variants[0].size,
                        product.variants[0].newPrice,
                        product.variants[0].oldPrice,
                        1
                      )
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded mb-2 hover:bg-red-700"
                  >
                    ADD TO CART
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
