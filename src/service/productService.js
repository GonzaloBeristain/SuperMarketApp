import prisma from '@/libs/prisma';

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};