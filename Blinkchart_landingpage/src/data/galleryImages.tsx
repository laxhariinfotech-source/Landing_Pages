export type GalleryImage = {
  id: number;
  src: string;
  title: string;
  category: string;
  size: "small" | "large" | "wide" | "tall";
};

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/chart1.png",
    title: "Column Chart",
    category: "Comparison",
    size: "large",
  },
  {
    id: 2,
    src: "/images/chart2.png",
    title: "Line Chart",
    category: "Trend",
    size: "small",
  },
  {
    id: 3,
    src: "/images/chart3.png",
    title: "Area Chart",
    category: "Trend",
    size: "wide",
  },
  {
    id: 4,
    src: "/images/chart4.png",
    title: "Scatter Plot",
    category: "Relationship",
    size: "small",
  },
  {
    id: 5,
    src: "/images/chart5.png",
    title: "Waterfall Chart",
    category: "Composition",
    size: "large",
  },
  {
    id: 6,
    src: "/images/chart6.png",
    title: "Pie Chart",
    category: "Composition",
    size: "small",
  },
  {
    id: 7,
    src: "/images/chart7.png",
    title: "Histogram",
    category: "Distribution",
    size: "tall",
  },
  {
    id: 8,
    src: "/images/chart8.png",
    title: "Bar Chart",
    category: "Comparison",
    size: "small",
  },
  {
    id: 9,
    src: "/images/chart9.png",
    title: "Heatmap",
    category: "Distribution",
    size: "wide",
  },
  {
    id: 10,
    src: "/images/chart10.png",
    title: "Treemap",
    category: "Composition",
    size: "wide",
  },
  {
    id: 11,
    src: "/images/chart11.png",
    title: "Bubble Chart",
    category: "Relationship",
    size: "tall",
  },
  {
    id: 12,
    src: "/images/chart12.png",
    title: "Stacked Bar",
    category: "Comparison",
    size: "small",
  },
  {
    id: 13,
    src: "/images/chart13.png",
    title: "Donut Chart",
    category: "Composition",
    size: "small",
  },
  {
    id: 14,
    src: "/images/chart14.png",
    title: "Line + Area",
    category: "Trend",
    size: "wide",
  },
  {
    id: 15,
    src: "/images/chart15.png",
    title: "Radar Chart",
    category: "Comparison",
    size: "small",
  },
  {
  id: 16,
    src: "/images/chart16.png",
    title: "Bar Chart",
    category: "Comparison",
    size: "wide",
  }
];
