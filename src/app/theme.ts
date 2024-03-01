const theme = {
  list: {
    styles: {
      base: {
        list: {
          minWidth: "min-w-auto",
          p: "py-0",
          fontSize: "text-sm",
        },
        item: {
          initial: {
            color:
              "text-gray-600 hover:text-black focus:text-black active:text-black",
            weight: "font-medium",
          },
          selected: {
            bg: "bg-blue-gray-50",
            color: "text-black",
            fontWeight: "font-semibold",
          },
        },
      },
    },
  },
  accordion: {
    styles: {
      base: {
        header: {
          initial: {
            color: "text-gray-600",
            fontSize: "fontSize",
            fontWeight: "font-medium",
          },
        },
      },
    },
  },
};

export default theme;
