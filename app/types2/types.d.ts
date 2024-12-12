
export type Traducciones = {
    title: string;
    nav: {
      home: string;
      login: string;
      signup: string;
      cart: string;
    };
    cart: {
      title: string;
      cantidad: string;
      precio: string;
      empty: string;
      eliminar: string;
    };
    signup: {
      username: string;
      email: string;
      password: string;
      register: string;
      crear: string;
      errorpass: string;
      confirmpass: string;
    };
    login: {
      email: string;
      password: string;
      title: string;
      boton: string;
      registrar: string;
    };

    products_available: string;
    footer_text: string;
    product_names: Record<string, string>;
    product_descriptions: Record<string, string>;
    alert_title: string;
    alert_text: string;
    alert2_title: string;
    alert2_text: string;
    add_to_cart: string;
  };
  
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  }
  