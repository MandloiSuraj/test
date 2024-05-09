/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "heading": "36px",
        "lable":"17px",
        "Input":"15px",
        "btnTxt":"16px",

      },
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
      fontStyle: false,
      fontWeight: {
        fw: "600",
      },
      fontFamily: {
        Nova: ["Proxima Nova"],
      },
      colors: {
        "bold-blue": "#134094",
        "main-grey": "#809FB8",
        "border-color":"#F1F4F9",
        "label":"#050708",
        "inputcolor":"#809FB8"
        
      },
      lineHeight: {
        21: "21px",
        
      },
      
      width: {
       
        "logo-w":"135.85px"
        
      },
      height: {
        52:"52px",
        "logo-h":"46px"
        
      },
      padding: {
        
      },
      spacing: {
       
      },
      
      borderRadius: {
        2.5: "0.625rem",
        17.5: "4.375rem",
        4.8: "1.213875rem",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        custom1: "",
      },
    },
  },
  plugins: [],
};

