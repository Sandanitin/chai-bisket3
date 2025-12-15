// export type MenuCategory =
//   | 'Appetizers'
//   | 'Burgers'
//   | 'Rolls'
//   | 'Frankies'
//   | 'Biryani'
//   | 'Curries'
//   | 'Snacks'
//   | 'Mandi'
//   | 'Indo-Chinese'
//   | 'Breakfast'
//   | 'Desserts'
//   | 'Shakes'
//   | 'Drinks';

// export type MenuItem = {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   category: MenuCategory;
// };

// export const menuItems: MenuItem[] = [
//   // Appetizers
//   {
//     id: 1,
//     name: 'Paneer Tikka',
//     price: 8.99,
//     description: 'Marinated cottage cheese grilled to perfection.',
//     image: '/images/appetizer1.png',
//     category: 'Appetizers',
//   },
//   {
//     id: 2,
//     name: 'Chicken 65',
//     price: 9.99,
//     description: 'Spicy deep-fried chicken bites.',
//     image: '/images/Chicken 65.jpg',
//     category: 'Appetizers',
//   },
  
//   // Burgers
//   {
//     id: 3,
//     name: 'Veggie Burger',
//     price: 7.99,
//     description: 'Grilled vegetable patty with fresh lettuce and sauce.',
//     image: '/images/burger.png',
//     category: 'Burgers',
//   },
//   {
//     id: 4,
//     name: 'Chicken Burger',
//     price: 9.49,
//     description: 'Juicy chicken patty with cheese and veggies.',
//     image: '/images/chikenburger.png',
//     category: 'Burgers',
//   },
  
//   // Rolls
//   {
//     id: 5,
//     name: 'Chicken Roll',
//     price: 8.49,
//     description: 'Tender chicken wrapped in paratha with mint chutney.',
//     image: '/images/chikenroll.png',
//     category: 'Rolls',
//   },
//   {
//     id: 6,
//     name: 'Paneer Roll',
//     price: 7.99,
//     description: 'Grilled paneer with fresh vegetables in paratha.',
//     image: '/images/paneerroll.png',
//     category: 'Rolls',
//   },
  
//   // Frankies
//   {
//     id: 7,
//     name: 'Mumbai Frankie',
//     price: 6.99,
//     description: 'Spiced potato filling in thin flatbread.',
//     image: '/images/mumbaifrankie.png',
//     category: 'Frankies',
//   },
  
  
//   // Biryani
//   {
//     id: 9,
//     name: 'Hyderabadi Biryani',
//     price: 12.99,
//     description: 'Fragrant rice layered with tender meat.',
//     image: '/images/Hyderabadi Biryani.jpg',
//     category: 'Biryani',
//   },
//   {
//     id: 10,
//     name: 'Veg Biryani',
//     price: 10.99,
//     description: 'Flavorful rice with mixed vegetables.',
//     image: '/images/vegbiryani.png',
//     category: 'Biryani',
//   },
  
//   // Curries
//   {
//     id: 11,
//     name: 'Butter Chicken',
//     price: 11.99,
//     description: 'Creamy tomato-based curry with tender chicken.',
//     image: '/images/curry.png',
//     category: 'Curries',
//   },
//   {
//     id: 12,
//     name: 'Paneer Butter Masala',
//     price: 10.99,
//     description: 'Rich and creamy curry with paneer.',
//     image: '/images/paneercurry.png',
//     category: 'Curries',
//   },
  
//   // Snacks
//   {
//     id: 13,
//     name: 'Samosa',
//     price: 3.99,
//     description: 'Crispy pastry filled with spiced potatoes.',
//     image: '/images/samosa.png',
//     category: 'Snacks',
//   },
//   {
//     id: 14,
//     name: 'Pakora',
//     price: 4.99,
//     description: 'Deep-fried vegetable fritters.',
//     image: '/images/appetizer1.png',
//     category: 'Snacks',
//   },
  
//   // Mandi
//   {
//     id: 15,
//     name: 'Chicken Mandi',
//     price: 14.99,
//     description: 'Tender chicken served with fragrant rice.',
//     image: '/images/mandi.png',
//     category: 'Mandi',
//   },
//   {
//     id: 16,
//     name: 'veg Mandi',
//     price: 16.99,
//     description: 'Slow-cooked mutton with aromatic rice.',
//     image: '/images/vegmandi.png',
//     category: 'Mandi',
//   },
  
//   // Indo-Chinese
//   {
//     id: 17,
//     name: 'Noodles',
//     price: 8.99,
//     description: 'Cauliflower in tangy Indo-Chinese sauce.',
//     image: '/images/chineese.png',
//     category: 'Indo-Chinese',
//   },
  
  
//   // Breakfast
//   {
//     id: 19,
//     name: 'Idli',
//     price: 7.99,
//     description: 'Crispy crepe with spiced potato filling.',
//     image: '/images/idli.jpg',
//     category: 'Breakfast',
//   },
  
  
//   // Desserts
//   {
//     id: 21,
//     name: 'Cool Cake',
//     price: 4.99,
//     description: 'Soft milk solids in sugar syrup.',
//     image: '/images/desets.png',
//     category: 'Desserts',
//   },
  
  
//   // Shakes
//   {
//     id: 23,
//     name: 'Fruit Shakes',
//     price: 4.49,
//     description: 'Fresh Fruit Shakes blended with milk.',
//     image: '/images/shakes.png',
//     category: 'Shakes',
//   },
  
  
//   // Drinks
//   {
//     id: 25,
//     name: 'Cool Drinks',
//     price: 2.99,
//     description: 'Spiced tea brewed with aromatic herbs.',
//     image: '/images/drinks.png',
//     category: 'Drinks',
//   },
  
// ];
export type MenuCategory =
  | 'Appetizers'
  | 'Burgers'
  | 'Rolls'
  | 'Frankies'
  | 'Biryani'
  | 'Curries'
  | 'Snacks'
  | 'Mandi'
  | 'Indo-Chinese'
  | 'Breakfast'
  | 'Desserts'
  | 'Shakes'
  | 'Drinks';

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // <--- Added optional field for the previous higher price
  description: string;
  image: string;
  category: MenuCategory;
  special?: boolean;
};

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 1,
    name: 'Paneer Tikka',
    price: 8.99,
    description: 'Marinated cottage cheese grilled to perfection.',
    image: '/images/appetizer1.png',
    category: 'Appetizers',
    special: true,
  },
  {
    id: 2,
    name: 'Chicken 65',
    price: 9.99,
    originalPrice: 12.99, // <--- ON SALE (Was 12.99, now 9.99)
    description: 'Spicy deep-fried chicken bites.',
    image: '/images/Chicken 65.jpg',
    category: 'Appetizers',
    special: true,
  },
  
  // Burgers
  {
    id: 3,
    name: 'Veggie Burger',
    price: 7.99,
    description: 'Grilled vegetable patty with fresh lettuce and sauce.',
    image: '/images/burger.png',
    category: 'Burgers',
    special: true,
  },
  {
    id: 4,
    name: 'Chicken Burger',
    price: 9.49,
    originalPrice: 11.49, // <--- ON SALE
    description: 'Juicy chicken patty with cheese and veggies.',
    image: '/images/chikenburger.png',
    category: 'Burgers',
  },
  
  // Rolls
  {
    id: 5,
    name: 'Chicken Roll',
    price: 8.49,
    description: 'Tender chicken wrapped in paratha with mint chutney.',
    image: '/images/chikenroll.png',
    category: 'Rolls',
  },
  {
    id: 6,
    name: 'Paneer Roll',
    price: 7.99,
    originalPrice: 8.99, // <--- ON SALE
    description: 'Grilled paneer with fresh vegetables in paratha.',
    image: '/images/paneerroll.png',
    category: 'Rolls',
  },
  
  // Frankies
  {
    id: 7,
    name: 'Mumbai Frankie',
    price: 6.99,
    description: 'Spiced potato filling in thin flatbread.',
    image: '/images/mumbaifrankie.png',
    category: 'Frankies',
  },
  
  // Biryani
  {
    id: 9,
    name: 'Hyderabadi Biryani',
    price: 12.99,
    originalPrice: 15.99, // <--- ON SALE (Big discount)
    description: 'Fragrant rice layered with tender meat.',
    image: '/images/Hyderabadi Biryani.jpg',
    category: 'Biryani',
  },
  {
    id: 10,
    name: 'Veg Biryani',
    price: 10.99,
    description: 'Flavorful rice with mixed vegetables.',
    image: '/images/Hyderabadi Biryani.jpg',
    category: 'Biryani',
  },
  
  // Curries
  {
    id: 11,
    name: 'Butter Chicken',
    price: 11.99,
    description: 'Creamy tomato-based curry with tender chicken.',
    image: '/images/curry.png',
    category: 'Curries',
  },
  {
    id: 12,
    name: 'Paneer Butter Masala',
    price: 10.99,
    originalPrice: 12.99, // <--- ON SALE
    description: 'Rich and creamy curry with paneer.',
    image: '/images/paneercurry.png',
    category: 'Curries',
  },
  
  // Snacks
  {
    id: 13,
    name: 'Samosa',
    price: 3.99,
    description: 'Crispy pastry filled with spiced potatoes.',
    image: '/images/samosa.png',
    category: 'Snacks',
  },
  {
    id: 14,
    name: 'Pakora',
    price: 4.99,
    description: 'Deep-fried vegetable fritters.',
    image: '/images/appetizer1.png',
    category: 'Snacks',
  },
  
  // Mandi
  {
    id: 15,
    name: 'Chicken Mandi',
    price: 14.99,
    originalPrice: 18.99, // <--- ON SALE
    description: 'Tender chicken served with fragrant rice.',
    image: '/images/mandi.png',
    category: 'Mandi',
  },
  {
    id: 16,
    name: 'veg Mandi',
    price: 16.99,
    description: 'Slow-cooked mutton with aromatic rice.',
    image: '/images/vegmandi.png',
    category: 'Mandi',
  },
  
  // Indo-Chinese
  {
    id: 17,
    name: 'Noodles',
    price: 8.99,
    originalPrice: 10.99, // <--- ON SALE
    description: 'Cauliflower in tangy Indo-Chinese sauce.',
    image: '/images/chineese.png',
    category: 'Indo-Chinese',
  },
  
  // Breakfast
  {
    id: 19,
    name: 'Idli',
    price: 7.99,
    description: 'Crispy crepe with spiced potato filling.',
    image: '/images/idli.jpg',
    category: 'Breakfast',
  },
  
  // Desserts
  {
    id: 21,
    name: 'Cool Cake',
    price: 4.99,
    originalPrice: 5.99, // <--- ON SALE
    description: 'Soft milk solids in sugar syrup.',
    image: '/images/desets.png',
    category: 'Desserts',
  },
  
  // Shakes
  {
    id: 23,
    name: 'Fruit Shakes',
    price: 4.49,
    description: 'Fresh Fruit Shakes blended with milk.',
    image: '/images/shakes.png',
    category: 'Shakes',
  },
  
  // Drinks
  {
    id: 25,
    name: 'Cool Drinks',
    price: 2.99,
    description: 'Spiced tea brewed with aromatic herbs.',
    image: '/images/drinks.png',
    category: 'Drinks',
  },
];
