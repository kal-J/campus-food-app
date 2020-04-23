const VENDORS = [
  {
    id: 1,
    name: "Lutrade Foods",
    rating: 4,
    image: require("../assets/vendorImages/local-dish.jpg"),
    delivers_to: [
      {
        campus: "Lira University",
        fee: 2000,
      },
      {
        campus: "UTC Lira",
        fee: 2000,
      },
    ],
  },
  {
    id: 2,
    name: "Abbey's Joint",
    rating: 2,
    image: require("../assets/vendorImages/pizza_joint.jpg"),
    delivers_to: [
      {
        campus: "Lira University",
        fee: 2000,
      },
      {
        campus: "UTC Lira",
        fee: 2000,
      },
    ],
  },
  {
    id: 3,
    name: "kal Foods",
    rating: 4,
    image: require("../assets/vendorImages/local-dish.jpg"),
    delivers_to: [
      {
        campus: "Lira University",
        fee: 2000,
      },
      
    ],
  },
];

export { VENDORS };
