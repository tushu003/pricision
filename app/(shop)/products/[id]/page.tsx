import { ProductDetails } from "@/components/product/ProductDetails";
import { getMockProductById } from "@/lib/mock-products";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getMockProductById(id);
  if (!product) notFound();

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
