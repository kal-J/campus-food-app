const thousands_separator = (price) => {
    let num_parts = price.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  export {thousands_separator};