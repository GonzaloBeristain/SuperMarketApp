import { FormAddProduct } from "@/components/FormAddProduct";
import Link from "next/link";

const add = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)]">
            <div>
                <FormAddProduct />
            </div>
            <div>
                <Link className="font-bold text-lg text-slate-500 bg-slate-200 rounded p-1 hover:bg-slate-400 shadow transition-colors duration-300" href="/admin">Volver</Link>
            </div>
        </div>
    )
};

export default add;