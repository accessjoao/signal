import type { Product } from "@/types/product";
import Image from "next/image";

type ProductDetailsProps = {
    product: Product;
    isAuthenticated: boolean;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export default function ProductDetails({
    product,
    isAuthenticated,
}: ProductDetailsProps) {
    const price = priceFormatter.format(product.displayPrice / 100);

    return (
        <div className="flex flex-col gap-8">
            {/* Product image */}
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#EEEFE8]">
                {product.image ? (
                    <div className="relative h-full w-full">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-center">
                        <span className="text-4xl font-black tracking-[-0.08em] text-[#171717]">
                            SIGNAL<span className="text-[#8EA92C]">.</span>
                        </span>

                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                            Product image coming soon
                        </span>
                    </div>
                )}
            </div>

            {/* Product information */}
            <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {product.category}
                </p>

                <h1 className="text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                    {product.name}
                </h1>

                <p className="mt-4 text-base leading-7 text-neutral-600">
                    {product.description}
                </p>
            </div>

            {/* Technical specifications */}
            <section aria-labelledby="product-specifications">
                <div className="mb-5 flex items-center justify-between">
                    <h2
                        id="product-specifications"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Technical specifications
                    </h2>

                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                        Product details
                    </span>
                </div>

                <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {product.specifications.map((specification) => (
                        <div
                            key={specification.label}
                            className="flex items-start justify-between gap-6 py-4 text-sm"
                        >
                            <dt className="text-neutral-500">
                                {specification.label}
                            </dt>

                            <dd className="text-right font-semibold">
                                {specification.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            {/* Pricing */}
            <div className="rounded-2xl bg-[#171717] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
                    {isAuthenticated ? "Your partner price" : "Starting at"}
                </p>

                <p className="mt-2 text-4xl font-semibold tracking-tight">
                    {price}
                </p>

                <p className="mt-3 text-xs leading-5 text-neutral-400">
                    {isAuthenticated
                        ? "Partner pricing is available with your active session."
                        : "Sign in to access additional products and partner pricing."}
                </p>
            </div>
        </div>
    );
}
