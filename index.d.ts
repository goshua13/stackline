declare interface Sale {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}

declare interface ProductData {
    id: string;
    title: string;
    image: string;
    subtitle: string;
    brand: string;
    retailer: string;
    tags: string[];
    sales: Sale[];
}
