/*
  # Create products table

  1. New Tables
    - `productos`
      - `id` (uuid, primary key)
      - `nombre` (text, not null)
      - `descripcion` (text)
      - `descripcion_html` (text)
      - `imagen_url` (text)
      - `precio_normal` (numeric, not null)
      - `promocion` (numeric)
      - `stock` (integer, not null)
      - `categoria` (text, not null)
      - `piramide_olfativa` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `productos` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS productos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  descripcion_html text,
  imagen_url text,
  precio_normal numeric NOT NULL,
  promocion numeric,
  stock integer NOT NULL DEFAULT 0,
  categoria text NOT NULL,
  piramide_olfativa jsonb DEFAULT '{"salida": [], "corazon": [], "fondo": []}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON productos
  FOR SELECT
  TO public
  USING (true);

-- Create sample product
INSERT INTO productos (
  nombre,
  descripcion,
  precio_normal,
  promocion,
  stock,
  categoria,
  piramide_olfativa
) VALUES (
  'Club de Nuit Oud',
  'Club de Nuit Oud de Armaf es una fragancia de la familia olfativa para Hombres y Mujeres. Esta fragrancia es nueva. Club de Nuit Oud se lanzó en 2023. La Nariz detrás de esta fragrancia es Christian Provenzano.',
  2499,
  1999,
  10,
  'UNISEX',
  '{
    "salida": ["durazno", "pera", "maracuyá", "piña", "ciruela", "bergamota"],
    "corazon": ["jazmín", "madera de cachemira", "fresia", "hojas de violeta"],
    "fondo": ["almizcle", "Oud camboyano", "vainilla", "ámbar cristalino"]
  }'::jsonb
);