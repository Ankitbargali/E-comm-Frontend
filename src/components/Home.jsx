import React, { useEffect, useRef, useState } from "react";
import HeroBanner from "./HeroBanner";
import Categorieslist from "./Categorieslist";
import Adbanner1 from "./Adbanner1";
import NewCollection from "./NewCollection";
import BestSeller from "./BestSeller";
import AdBanner2 from "./AdBanner2";
import BrowseInFashion from "./BrowseInFashion";
import ShopByBrand from "./ShopByBrand";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Categorieslist/>
      <Adbanner1/>
      <NewCollection/>
      <BestSeller/>
      <AdBanner2/>
      <BrowseInFashion/>
      <ShopByBrand/>
    </>
  );
};
export default Home;
