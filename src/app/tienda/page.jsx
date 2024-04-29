import { getProducts } from "@/service/productService";
import { CardProduct } from "@/components/CardProduct";

const tienda = async () => {
    const products = await getProducts()

    return (
        <div className="flex justify-center items-center pt-8">
            <section className="grid grid-cols-5 gap-10 pb-8">
                {
                    products.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))
                }
            </section>
        </div>
    )
};

export default tienda;