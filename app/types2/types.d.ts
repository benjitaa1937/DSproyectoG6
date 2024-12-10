
export type Traducciones = {
    title: string;
    nav: {
      home: string;
      login: string;
      signup: string;
    };
    products_available: string;
    footer_text: string;
    product_names: Record<string, string>;
    product_descriptions: Record<string, string>;
    alert_title: string;
    alert_text: string;
    add_to_cart: string;
  };
  
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  }
  