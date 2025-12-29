"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import styles from "@/styles/Blog.module.css";
import { Container } from "react-bootstrap";
import FinalNav from "@/components/FinalNav";

export default function BlogPage() {
  const router = useRouter();
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blogData = [
    {
      title: "Carnation (康乃馨 Kāng nǎi xīn)",
      img: "/images/blog-11.jpeg",
      desc: "Carnations symbolize love, admiration, and pure affection. Their ruffled petals and delicate fragrance make them one of the most timeless flowers used in elegant bouquets and celebrations.",
    },
    {
      title: "Gerbera Daisies (非洲菊 Fēizhōu jú)",
      img: "/images/blog-13.jpg",
      desc: "Gerberas are cheerful, bold blossoms known for their bright colors and joyful charm. They instantly add positivity and freshness to any bouquet with their large daisy-like petals.",
    },
    {
      title: "Hydrangea (绣球花 Xiù qiú huā)",
      img: "/images/blog-12.jpg",
      desc: "Hydrangeas are lush, full flowers that symbolize heartfelt emotions.Their soft, cloud-like clusters create a luxurious and romantic touch in premium bouquets.",
    },
    {
      title: "Lily (百合花 Bǎi hé huā)",
      img: "/images/blog-17.jpeg",
      desc: "Lilies are elegant, fragrant flowers that represent purity and renewal.Their graceful petals bring a touch of sophistication and beauty to every arrangement.",
    },
    {
      title: "Phalaenopsis Orchids (蝴蝶兰 Húdiélán)",
      img: "/images/blog-29.jpg",
      desc: "Known as “moth orchids,” these elegant blooms bring a sense of luxury and harmony. Their curved petals resemble fluttering butterflies, symbolizing beauty and long-lasting love.",
    },
    {
      title: "Peonies (蝴蝶兰 Húdiélán)",
      img: "/images/blog-22.jpg",
      desc: "Peonies are lush, romantic blooms known for their full, soft petals and elegant fragrance. They symbolize prosperity and deep love, making bouquets appear rich, dreamy, and premium.",
    },
    {
      title: "Ranunculus (花毛茛 Huā máogèn)",
      img: "/images/blog-21.jpg",
      desc: "Ranunculus flowers look like soft, layered paper petals. Their delicate, artistic appearance adds a refined and stylish look to bouquets, often used for high-end arrangements.",
    },
    {
      title: "Roses (玫瑰 Méiguī)",
      img: "/images/blog-16.jpeg",
      desc: "Roses are timeless symbols of love and emotion. Their rich colours, velvety petals, and classic fragrance make them perfect for every celebration, from romance to friendship.",
    },
    {
      title: "Sunflower (向日葵 Xiàng rì kuí)",
      img: "/images/blog-15.jpeg",
      desc: "Sunflowers are bright, cheerful flowers that symbolize positivity and renewal. Their bold yellow petals stand for warmth, strength, and happiness, making them a crowd-favourite.",
    },
    {
      title: "Tulip (郁金香 Yùjīnxiāng)",
      img: "/images/blog-14.jpeg",
      desc: "Tulips are elegant, modern flowers with smooth petals and clean lines. Their simplicity adds sophistication and a fresh look to bouquets, especially in pastel colours.",
    },
    {
      title: "Alstroemeria (六出花 Liù chū huā)",
      img: "/images/blog-19.jpg",
      desc: "Alstroemeria, also known as the Peruvian Lily, features soft trumpetshaped petals with natural streaks. It adds elegance, colour, and fullness to bouquets, making arrangements look rich and lively.",
    },
    {
      title: "Baby’s Breath (满天星 Mǎn tiān xīng)",
      img: "/images/blog-6.jpeg",
      desc: "Baby’s Breath is known for its tiny cloud-like clusters of white blooms.It adds softness, volume, and purity to floral arrangements and is one of the most classic fillers worldwide.",
    },
    {
      title: "Caspia (霞草 Xiá cǎo)",
      img: "/images/blog-33.jpg",
      desc: "Caspia has feathery stems with tiny flower clusters in purple, white, or pink. It brings a wild, textured, and airy style to bouquets, making them look more dimensional and elegant.",
    },
    {
      title: "Delphinium (飞燕草 Fēiyàn cǎo)",
      img: "/images/blog-10.jpg",
      desc: "Delphiniums are tall, elegant spikes of clustered blooms that bring height, richness, and a soft romantic touch to bouquets. Their unique shape and vibrant blues, purples, and whites add sophistication to floral designs.",
    },

    {
      title: "Freesia (小苍兰 Xiǎo cānglán)",
      img: "/images/blog-9.jpg",
      desc: "Freesias are fragrant blooms with trumpet-shaped petals that add freshness and a sweet aroma to bouquets. Their vivid colours and natural elegance make them perfect for lively and joyful arrangements.",
    },

    {
      title: "Spray Rose 喷雾玫瑰 (Pēnwù méi guī)",
      img: "/images/blog-7.jpg",
      desc: "Tiny blooms that cluster bright, Soft as whispers, pure delight.Spray roses dance in gentle grace, Bringing charm to every space.",
    },
    {
      title: "Foliage Leaves树叶 (Shù yè)",
      img: "/images/blog-2.jpeg",
      desc: "Greens that whisper nature’s tone, Quiet beauty all their own. They frame the flowers, soft and still, Giving every bouquet shape and will.",
    },
    {
      title: "Dusty Miller 银叶菊 (Yín yè jú)",
      img: "/images/blog-3.jpeg",
      desc: "Silver leaves like winter’s glow, Soft and velvety as falling snow. Dusty Miller stands serene, A timeless touch of silver-green.",
    },
    {
      title: "Eucalyptus 桉树 (Ān shù)",
      img: "/images/blog-4.jpeg",
      desc: "Fragrant leaves with calming air, A touch of blue-green everywhere.Eucalyptus whispers fresh and free, A soothing gift from nature’s tree.",
    },
    {
      title: "Green Ball (绿绒球 Lǜ róng qiú)",
      img: "/images/greenball.jpg",
      desc: "Green Ball is a unique, fuzzy, moss-like bloom that adds bold texture and a modern touch to bouquets. Its vibrant green color brings freshness and volume, making any arrangement look stylish and lively.",
    },
    {
      title: " Panicum (柳枝草 Liǔ zhī cǎo)",
      img: "/images/blog-32.jpg",
      desc: "Panicum features airy, delicate seed heads that gently sway and add movement to bouquets. It brings a soft, garden-like, natural feel and perfectly complements bright and pastel arrangements.",
    },

    {
      title: "Ammi Majus(白花蛇舌草 Báihuāshéshé cǎo)",
      img: "/images/blog-34.jpg",
      desc: "Ammi Majus, often called Queen Anne’s Lace, has delicate lace-like white clusters that bring softness and a natural garden feel to any bouquet. It is widely used in romantic and airy floral designs.",
    },
    {
      title: "Eustoma / Lisianthus (桔梗花 Júgěng huā)",
      img: "/images/blog-30.jpg",
      desc: "Eustoma, also called Lisianthus, features rose-like petals with a soft, romantic appeal. Its silky texture and pastel tones bring elegance, charm, and a premium look to any arrangement.",
    },
    {
      title: "Matthiola / Stock Flower (紫罗兰 Zǐluólán)",
      img: "/images/blog-8.jpg",
      desc: "Matthiola, commonly known as Stock, is loved for its strong fragrance and dense clusters of ruffled blooms. It gives bouquets a luxurious, full appearance with a fresh, romantic charm.",
    },
    {
      title: "FILLER FLOWERS 补花 (Bǔ huā)",
      img: "/images/blog-18.jpg",
      desc: "Filler flowers are delicate, small-bloom varieties used to add volume, softness, texture,and balance to floral arrangements. They enhance the beauty of main flowers, bring visual depth, and create a natural, airy, and elegant look in bouquets.",
    },
    {
      title: "Jasmine ( 茉莉花 Mòlì huā)",
      img: "/images/jasmine.jpg",
      desc: "Jasmine flowers are small, delicate, and highly fragrant blooms commonly used in bouquets, garlands, hair adornments, and decorative floral arrangements. They enhance floral designs by adding softness, natural beauty, and a refreshing aroma. Jasmine also brings a serene elegance while carrying deep cultural and emotional significance.",
    },
  ];

  return (
    <>
      <ScrollToTop />
      <FinalNav />
      <section>
        <div className={styles.hero}>
          <Container>
            <div className={styles.contents}>
              <h1>Make Your Home as Comfortable as Possible</h1>
              <p>
                Make your home as comfortable as possible with the natural charm
                of fresh flowers.
                <br />
                Add comfort and elegance to your home with beautifully crafted
                fresh flower bouquets
              </p>
            </div>
          </Container>
        </div>
      </section>
      <div className={styles.blogwrapper}>
        <div className={styles.blogcontainer}>
          {blogData.map((item, index) => (
            <div
              className={styles.blogcard}
              key={index}
              onClick={() => router.push(`/blog/${index}`)}
            >
              <h2 className={styles.blogtitle}>{item.title}</h2>

              <img src={item.img} alt="" className={styles.blogimg} />

              <p className={styles.blogdesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
