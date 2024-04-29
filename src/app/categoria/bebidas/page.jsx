import prisma from "@/libs/prisma.js";
import { CardProduct } from "@/components/CardProduct";

const getProducts = async () => {
    const products = await prisma.product.findMany()
    return products;
};

const bebidas = async () => {
    const products = await getProducts();

    const filteredProducts = products.filter(p => p.category === 'Bebidas');

    return (
        <div className="flex justify-center items-center pt-8">
            <section className="grid grid-cols-5 gap-10 pb-8">
                {
                    filteredProducts.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))
                }
            </section>
        </div>
    )
};

export default bebidas;