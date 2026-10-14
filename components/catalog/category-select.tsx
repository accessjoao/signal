"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type CategorySelectProps = {
    categories: string[];
    selectedCategory: string;
};

export default function CategorySelect({
    categories,
    selectedCategory,
}: CategorySelectProps) {
    return (
        <Select.Root
            name="category"
            defaultValue={selectedCategory || "all"}
        >
            <Select.Trigger
                id="catalog-category"
                aria-label="Category"
                className="flex min-h-13 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#292D30] px-4 py-3 text-left text-sm text-white outline-none transition hover:border-white/30 focus-visible:border-[#D9F36A] focus-visible:ring-2 focus-visible:ring-[#D9F36A]/20"
            >
                <Select.Value placeholder="All categories" />

                <Select.Icon>
                    <ChevronDown
                        size={17}
                        className="text-[#D9F36A]"
                    />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={8}
                    collisionPadding={12}
                    className="signal-select-content z-[100] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-white/15 bg-[#383D40] p-1.5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                >
                    <Select.Viewport>
                        <SelectItem value="all">
                            All categories
                        </SelectItem>

                        {categories.map((category) => (
                            <SelectItem
                                key={category}
                                value={category}
                            >
                                {category}
                            </SelectItem>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

function SelectItem({
    value,
    children,
}: {
    value: string;
    children: React.ReactNode;
}) {
    return (
        <Select.Item
            value={value}
            className="relative flex cursor-pointer select-none items-center rounded-lg py-3 pl-4 pr-10 text-sm text-[#E5E7E8] outline-none transition-colors data-[highlighted]:bg-white/10 data-[highlighted]:text-[#D9F36A] data-[state=checked]:bg-[#D9F36A]/10 data-[state=checked]:text-[#D9F36A]"
        >
            <Select.ItemText>{children}</Select.ItemText>

            <Select.ItemIndicator className="absolute right-3 text-[#D9F36A]">
                <Check size={16} />
            </Select.ItemIndicator>
        </Select.Item>
    );
}
