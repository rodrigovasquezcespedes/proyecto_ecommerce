-- Eliminar tablas existentes si es necesario
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS product_specifications;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Crear tabla de usuarios con el campo 'role' como boolean
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role BOOLEAN DEFAULT FALSE, -- Cambiar el campo role a booleano
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de categorías
CREATE TABLE categories (
    id_category SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Crear tabla de productos con el campo brand añadido
CREATE TABLE products (
    id_product SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INT NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    brand VARCHAR(100),  -- Añadir campo de marca
    id_category INT REFERENCES categories(id_category)
);

-- Crear tabla de especificaciones del producto
CREATE TABLE product_specifications (
    id_specification SERIAL PRIMARY KEY,
    id_product INT REFERENCES products(id_product),
    spec_name VARCHAR(100) NOT NULL,
    spec_value VARCHAR(255) NOT NULL
);

-- Crear tabla de favoritos
CREATE TABLE favorites (
    id_favorite SERIAL PRIMARY KEY,
    id_user INT REFERENCES users(id_user),
    id_product INT REFERENCES products(id_product),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla del carrito de compras
CREATE TABLE cart (
    id_cart SERIAL PRIMARY KEY,
    id_user INT REFERENCES users(id_user),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de artículos del carrito
CREATE TABLE cart_items (
    id_cart_item SERIAL PRIMARY KEY,
    id_cart INT REFERENCES cart(id_cart),
    id_product INT REFERENCES products(id_product),
    quantity INT NOT NULL
);

-- Crear tabla de órdenes
CREATE TABLE orders (
    id_order SERIAL PRIMARY KEY,
    id_user INT REFERENCES users(id_user),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount INT NOT NULL,
    status BOOLEAN DEFAULT FALSE
);

-- Crear tabla de artículos de la orden
CREATE TABLE order_items (
    id_order_item SERIAL PRIMARY KEY,
    id_order INT REFERENCES orders(id_order),
    id_product INT REFERENCES products(id_product),
    quantity INT NOT NULL,
    price INT NOT NULL
);

-- Crear tabla de direcciones
CREATE TABLE addresses (
    id_address SERIAL PRIMARY KEY,
    id_user INT REFERENCES users(id_user),
    address_line VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL
);

-- Crear tabla de pagos
CREATE TABLE payments (
    id_payment SERIAL PRIMARY KEY,
    id_order INT REFERENCES orders(id_order),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount INT NOT NULL,
    payment_method VARCHAR(50),
    status BOOLEAN DEFAULT TRUE
);
