const img1 = "https://ik.imagekit.io/spark1129/sip/other/l2.jpg".split("/sip");
const img2 = "https://ik.imagekit.io/spark1129/sip/other/nlg4.jpg".split(
  "/sip"
);
const img3 = "https://ik.imagekit.io/spark1129/sip/other/nlg6.jpg".split(
  "/sip"
);

function imgTransform(arr, size) {
  return arr[0] + `/sip/tr:w-${size}` + arr[1];
}

export const bannerImages = [
  {
    id: "1",
    heading: { text: "Newly released pants", color: "light" },
    paragraph: {
      text: "Wear clean and trendy pants to look stylish",
      color: "light",
    },
    link: {
      has: true,
      label: "Shop now",
      href: "/product/672476cb493956dfc9bdf2aa",
      color: "light",
    },
    image: {
      src: imgTransform(img1, 600),
      srcSet: `${imgTransform(img1, 600)} 600w, ${imgTransform(
        img1,
        1300
      )} 1300w, ${imgTransform(img1, 1920)} 1920w, ${imgTransform(
        img1,
        3200
      )} 3200w`,
      sizes:
        "(max-width: 600) 600px, (max-width: 1300) 1300px, (max-width: 1920) 1920px, 3200px",
      objectFit: "cover",
      alt: "shirt",
    },
  },
  {
    id: "2",
    heading: { text: "SALE UP TO 30%", color: "light" },
    paragraph: {
      text: "Become a member to receive better benefits",
      color: "light",
    },
    link: {
      has: false,
    },
    image: {
      src: imgTransform(img2, 600),
      srcSet: `${imgTransform(img2, 600)} 600w, ${imgTransform(
        img2,
        1300
      )} 1300w, ${imgTransform(img2, 1920)} 1920w, ${imgTransform(
        img2,
        3200
      )} 3200w`,
      sizes:
        "(max-width: 600) 600px, (max-width: 1300) 1300px, (max-width: 1920) 1920px, 3200px",
      objectFit: "cover",
      alt: "winter jacket",
    },
  },
  {
    id: "3",
    heading: { text: "Recyclling Program in STORE", color: "light" },
    paragraph: {
      text: "We accept clothes for recycling and offer a 10% discount on your purchase",
      color: "light",
    },
    link: {
      has: false,
    },
    image: {
      src: imgTransform(img3, 600),
      srcSet: `${imgTransform(img3, 600)} 600w, ${imgTransform(
        img3,
        1300
      )} 1300w, ${imgTransform(img3, 1920)} 1920w, ${imgTransform(
        img3,
        3200
      )} 3200w`,
      sizes:
        "(max-width: 600) 600px, (max-width: 1300) 1300px, (max-width: 1920) 1920px, 3200px",
      objectFit: "cover",
      alt: "clothing store",
    },
  },
];