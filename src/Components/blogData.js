// blogData.js



const blogPosts = [
    {
        id: 1,
        name: "empowering-businesses-through-it-services",
        title: "PIXELMINDSOLUTIONS: Empowering Businesses Through Innovative IT Services",
        date: "2025-07-01",
        author: "Admin"
    },
    {
        id: 2,
        name: "professional-it-consulting-and-app-development",
        title: "PIXELMINDSOLUTIONS: Driving Innovation Through Smart IT Services",
        date: "2025-07-02",
        author: "Admin"
    },
    {
        id: 3,
        name: "application-maintainence-and-digital-growth-strategy",
        title: "How PIXELMINDSOLUTIONS is Shaping the Future of Digital Transformation",
        date: "2025-07-03",
        author: "Admin"
    }
];

export function getAllBlogPosts() {
    return blogPosts;
}

export function getBlogPostByname(name) {
    return blogPosts.find((post) => post.name === name);
}

// getDateParts.js
export function getDateParts(dateStr) {
  const dateObj = new Date(dateStr);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = dateObj.toLocaleString('default', { month: 'short' });
  return { day, month };
}
