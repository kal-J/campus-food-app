const MENU = {
    BREAKFAST: [
      {
        itemId: 1,
        name: "Coffee",
        image: require("../assets/vendorImages/coffee-tea.png"),
        price: 2000,
        description: "real Fine coffee",
        options: [
          {
            id: 1,
            name: "Fried Irish",
            price: 1000,
          },
          {
            id: 2,
            name: "chappati",
            price: 1000,
          },
          {
            id: 3,
            name: "bread",
            price: 1000,
          },
        ],
      },
  
      {
        itemId: 2,
        name: "Tea",
        image: require("../assets/vendorImages/coffee-tea.png"),
        price: 2000,
        description: "Fine tea",
        options: [
          {
            id: 1,
            name: "Fried Irish",
            price: 1000,
          },
          {
            id: 2,
            name: "chappati",
            price: 1000,
          },
          {
            id: 3,
            name: "bread",
            price: 1000,
          },
        ],
      },
    ],
    LUNCH: [
      {
        itemId: 1,
        name: "Pilau",
        image: require("../assets/vendorImages/pizza_joint.jpg"),
        price: 20000,
        description: "chicken pilau",
        options: [
          {
            id: 1,
            name: "Fried Irish",
            price: 1000,
          },
          {
            id: 2,
            name: "Gnut paste",
            price: 1000,
          },
          {
            id: 3,
            name: "beans",
            price: 1000,
          },
        ],
      },
    ],
    SUPPER: [
      {
        itemId: 1,
        name: "Matooke plus rice",
        image: require("../assets/vendorImages/pizza_joint.jpg"),
        price: 20000,
        description: "matooke ...",
        options: [
          {
            id: 1,
            name: "chicken",
            price: 3000,
          },
          {
            id: 2,
            name: "gnut paste",
            price: 1500,
          },
          {
            id: 3,
            name: "beef",
            price: 2000,
          },
        ],
      },
    ],
  };

  export { MENU };