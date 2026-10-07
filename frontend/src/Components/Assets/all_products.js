import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

let all_product = [
  { id: 1, name: "Dark Blue Mens Oversized Fur Jacket", category: "Men", image: p1_img, new_price: 2499, old_price: 3499 },
  { id: 2, name: "Brown Mens Leather Jacket", category: "Men", image: p2_img, new_price: 2999, old_price: 3999 },
  { id: 3, name: "Blue Coloured Stylish Denim Shirt", category: "Men", image: p3_img, new_price: 1299, old_price: 1899 },
  { id: 4, name: "Olive Coloured Mens Plain Shirt", category: "Men", image: p4_img, new_price: 999, old_price: 1499 },
  { id: 5, name: "Mens White Polos", category: "Men", image: p5_img, new_price: 899, old_price: 1299 },
  { id: 6, name: "Mens Brown Varsity Jacket", category: "Men", image: p6_img, new_price: 3499, old_price: 4499 },
  { id: 7, name: "Mens Oversized Grey Coloured T-Shirt", category: "Men", image: p7_img, new_price: 799, old_price: 1199 },
  { id: 8, name: "Grey Coloured Mens Puffer Jacket", category: "Men", image: p8_img, new_price: 2799, old_price: 3799 },
  { id: 9, name: "Grey Coloured Mens Gymwear", category: "Men", image: p9_img, new_price: 1199, old_price: 1699 },
  { id: 10, name: "Floral Blue Beach Look Shirt", category: "Men", image: p10_img, new_price: 1499, old_price: 2199 },
  { id: 11, name: "Mens Korean Pleated Creame Pants", category: "Men", image: p11_img, new_price: 1899, old_price: 2599 },
  { id: 12, name: "Mens Denim Blue Baggy Pants", category: "Men", image: p12_img, new_price: 1799, old_price: 2399 },
  { id: 13, name: "Brown Coloured Womens Cute Dress", category: "Women", image: p13_img, new_price: 2199, old_price: 3199 },
  { id: 14, name: "Womens Vintage Maroon Dress", category: "Women", image: p14_img, new_price: 1999, old_price: 2899 },
  { id: 15, name: "Womens Oversized Creme Flannel Shirt", category: "Women", image: p15_img, new_price: 1299, old_price: 1799 },
  { id: 16, name: "Bottle Green Womens Top", category: "Women", image: p16_img, new_price: 999, old_price: 1499 },
  { id: 17, name: "Womens Denim Short Dress", category: "Women", image: p17_img, new_price: 1699, old_price: 2299 },
  { id: 18, name: "Womens Floral Print Summer Dress", category: "Women", image: p18_img, new_price: 1899, old_price: 2499 },
  { id: 19, name: "Womens White Casual Crop Top", category: "Women", image: p19_img, new_price: 799, old_price: 1199 },
  { id: 20, name: "Womens Classic Black Blazer", category: "Women", image: p20_img, new_price: 2999, old_price: 3999 },
  { id: 21, name: "Womens Pink Pleated Skirt", category: "Women", image: p21_img, new_price: 1299, old_price: 1799 },
  { id: 22, name: "Black Bodycon Short Dress", category: "Women", image: p22_img, new_price: 1999, old_price: 2799 },
  { id: 23, name: "Purple Coloured Womens Joggers for Gym", category: "Women", image: p23_img, new_price: 999, old_price: 1499 },
  { id: 24, name: "Stylish Houndstooth Bodycon Dress", category: "Women", image: p24_img, new_price: 2499, old_price: 3299 },
  { id: 25, name: "Boys Grey Coloured Check Coat Pants", category: "Kid", image: p25_img, new_price: 1499, old_price: 1999 },
  { id: 26, name: "Girls Black Varsity Jacket", category: "Kid", image: p26_img, new_price: 1599, old_price: 2199 },
  { id: 27, name: "Boys Grey Stylish Bomber Jacket", category: "Kid", image: p27_img, new_price: 1299, old_price: 1799 },
  { id: 28, name: "Boys Green Fur Jacket", category: "Kid", image: p28_img, new_price: 1399, old_price: 1899 },
  { id: 29, name: "Boys Blue Coloured Check Shirt", category: "Kid", image: p29_img, new_price: 699, old_price: 999 },
  { id: 30, name: "Cute Maroon Short Dress for Girls", category: "Kid", image: p30_img, new_price: 1699, old_price: 2299 },
  { id: 31, name: "Girls Brown Sweater", category: "Kid", image: p31_img, new_price: 999, old_price: 1399 },
  { id: 32, name: "Stylish Star Themed Dress For Girls", category: "Kid", image: p32_img, new_price: 1899, old_price: 2499 },
  { id: 33, name: "Black Varsity Jacket for Boys", category: "Kid", image: p33_img, new_price: 1399, old_price: 1799 },
  { id: 34, name: "Boys Blue Stylish Denim Shirt", category: "Kid", image: p34_img, new_price: 799, old_price: 1199 },
  { id: 35, name: "Floral Print Blue Dress For Girls", category: "Kid", image: p35_img, new_price: 1799, old_price: 2399 },
  { id: 36, name: "Cute Pink Gown for Girls", category: "Kid", image: p36_img, new_price: 1999, old_price: 2699 },
];

export default all_product;