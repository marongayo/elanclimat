import { getProducts } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopClient from './ShopClient';

export const dynamic = 'force-dynamic';

export default function ShopPage() {
  const products = getProducts();
  return (
    <>
      <Navbar />
      <ShopClient products={products} />
      <Footer />
    </>
  );
}
