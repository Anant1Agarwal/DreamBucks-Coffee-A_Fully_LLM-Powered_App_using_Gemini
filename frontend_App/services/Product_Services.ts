import { fireBaseDB } from '../Config_for_FireBase/Firebase_Config';
import { Product } from '../Object_Types/types';
import { ref, get } from 'firebase/database';

const productsRef = ref(fireBaseDB, 'products');

const fetchProducts = async (): Promise<Product[]> => {
    
  const snapshot = await get(productsRef);
  const data = snapshot.val();
  
  const products: Product[] = [];

  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        products.push({ ...data[key] });
      }
    }
  }
  
  return products;
};

export { fetchProducts };