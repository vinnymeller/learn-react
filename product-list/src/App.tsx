import React, { useState, useEffect } from 'react';

//const PRODUCTS = [
//  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
//  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
//  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
//  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
//  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
//  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
//];

interface ProductProps {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface FilterableProductTableProps {
  products: ProductProps[];
  isLoading: boolean;
}

const FilterableProductTable: React.FC<FilterableProductTableProps> = ({ products, isLoading }) => {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
        isLoading={isLoading} />
    </div>
  );
}

interface ProductCategoryRowProps {
  category: string;
}
const ProductCategoryRow: React.FC<ProductCategoryRowProps> = ({ category }) => {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  );
}

const ProductRow: React.FC<{ product: ProductProps }> = ({ product }) => {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

interface ProductTableProps {
  products: ProductProps[];
  filterText: string;
  inStockOnly: boolean;
  isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, filterText, inStockOnly, isLoading }) => {
  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  const rows: React.ReactNode[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface SearchBarProps {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (text: string) => void;
  onInStockOnlyChange: (checked: boolean) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) => {
  return (
    <form>
      <input
        type="text"
        value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}


export default function App() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          category: item.category,
          price: `$${item.price}`,
          stocked: item.rating.count > 100, //just to have some value, this api doesn't actually give this info
          name: item.title,
        }));
        setProducts(formattedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return <FilterableProductTable products={products} isLoading={isLoading} />;
}
