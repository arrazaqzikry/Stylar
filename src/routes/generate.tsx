import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StylarNav } from "@/components/StylarNav";
import {
  fetchGenOutfit,
  GEN_PRICE_RANGES,
  GEN_STYLES,
  GEN_STYLE_LEVELS,
  type GenClimate,
  type GenOutfit,
  type GenPriceRange,
  type GenStyle,
  type GenStyleLevel,
} from "@/lib/stylar";
import top1 from "@/FashionAsset/top/top-1.jpg";
import top2 from "@/FashionAsset/top/top-2.avif";
import top3 from "@/FashionAsset/top/top-3.jpg";
import shoes1 from "@/FashionAsset/shoes/shoes-1.avif";
import shoes2 from "@/FashionAsset/shoes/shoes-2.jpg";
import shoes3 from "@/FashionAsset/shoes/shoes-3.jpg";
import shoes4 from "@/FashionAsset/shoes/shoes-4.webp";
import shoes5 from "@/FashionAsset/shoes/shoes-5.jpg";
import trousers1 from "@/FashionAsset/trousers/trousers-1.jpg";
import trousers2 from "@/FashionAsset/trousers/trousers-2.webp";
import trousers3 from "@/FashionAsset/trousers/trousers-3.webp";
import trousers4 from "@/FashionAsset/trousers/trousers-4.avif";
import acc1 from "@/FashionAsset/accessory/acc-1.jpg";
import acc2 from "@/FashionAsset/accessory/acc-2.jpg";
import acc3 from "@/FashionAsset/accessory/acc-3.jpg";
import acc4 from "@/FashionAsset/accessory/acc-4.jpg";
import acc5 from "@/FashionAsset/accessory/acc-5.jpg";
import elProfMinBudShirt from "../../Element/professional-minimal-budget/element-2.1.jpg";
import elProfMinBudTrousers from "../../Element/professional-minimal-budget/element-2.2.jpg";
import elProfMinBudBag from "../../Element/professional-minimal-budget/element-2.3.jpg";
import elProfMinBudHeels from "../../Element/professional-minimal-budget/element-2.4.jpg";
import elProfMinLuxTop from "../../Element/professional-minimal-luxury/element-2.1.1.1.1.jpg";
import elProfMinLuxTrousers from "../../Element/professional-minimal-luxury/element-2.1.3.2.jpg";
import elProfMinLuxShoes from "../../Element/professional-minimal-luxury/element-2.1.3.3.jpg";
import elProfMinMidTop from "../../Element/Professional-minimal-midrange/element-2.1.2.1.jpg";
import elProfMinMidShoes from "../../Element/Professional-minimal-midrange/element-2.1.2.3.jpg";
import elProfMinMidEarrings from "../../Element/Professional-minimal-midrange/element-2.1.2.4.jpg";
import elProfBalBudTop from "../../Element/professional-balanced-budget/element-2.2.1.1.jpg";
import elProfBalBudTrousers from "../../Element/professional-balanced-budget/element-2.2.1.2.jpg";
import elProfBalBudShoes from "../../Element/professional-balanced-budget/element-2.2.1.3.jpg";
import elProfBalBudBelt from "../../Element/professional-balanced-budget/element-2.2.1.4.jpg";
import elProfBalMidBlazer from "../../Element/professional-balanced-midrange/element-2.2.2.1.jpg";
import elProfBalMidInner from "../../Element/professional-balanced-midrange/element-2.2.2.2.jpg";
import elProfBalMidShoes from "../../Element/professional-balanced-midrange/element-2.2.2.3.jpg";
import elProfBalMidEarrings from "../../Element/professional-balanced-midrange/element-2.2.2.4.jpg";
import elProfBalLuxTop from "../../Element/professional-balanced-luxury/element-2.2.3.1.jpg";
import elProfBalLuxTrousers from "../../Element/professional-balanced-luxury/element-2.2.3.2.jpg";
import elProfBalLuxShoes from "../../Element/professional-balanced-luxury/element-2.2.3.3.jpg";
import elProfBalLuxBelt from "../../Element/professional-balanced-luxury/element-2.2.3.4.jpg";
import elProfMegaBudTop from "../../Element/professional-mega-budget/element-2.3.1.1.jpg";
import elProfMegaBudTrousers from "../../Element/professional-mega-budget/element-2.3.1.2.jpg";
import elProfMegaBudShoes from "../../Element/professional-mega-budget/element-2.3.1.3.jpg";
import elProfMegaBudBag from "../../Element/professional-mega-budget/element-2.3.1.4.jpg";
import elProfMegaMidTop from "../../Element/professional-mega-midrange/element-2.3.2.1.jpg";
import elProfMegaMidTrousers from "../../Element/professional-mega-midrange/element-2.3.2.2.jpg";
import elProfMegaMidShoes from "../../Element/professional-mega-midrange/element-2.3.2.3.jpg";
import elProfMegaMidBag from "../../Element/professional-mega-midrange/element-2.3.2.4.jpg";
import elProfMegaLuxTop from "../../Element/professional-mega-luxury/element-2.3.3.1.jpg";
import elProfMegaLuxTrousers from "../../Element/professional-mega-luxury/element-2.3.3.2.jpg";
import elProfMegaLuxShoes from "../../Element/professional-mega-luxury/element-2.3.3.3.jpg";
import elProfMegaLuxBelt from "../../Element/professional-mega-luxury/element-2.3.3.4.jpg";
import elDailyMinBudTop from "../../Element/daily-minimal-budget/element-1.1.1.1.jpg";
import elDailyMinBudTrousers from "../../Element/daily-minimal-budget/element-1.1.1.2.jpg";
import elDailyMinBudShoes from "../../Element/daily-minimal-budget/element-1.1.1.3.jpg";
import elDailyMinBudShirt from "../../Element/daily-minimal-budget/element-1.1.1.4.jpg";
import elDailyMinMidTop from "../../Element/daily-minimal-midrange/element-1.1.2.1.jpg";
import elDailyMinMidTrousers from "../../Element/daily-minimal-midrange/element-1.1.2.2.jpg";
import elDailyMinMidShoes from "../../Element/daily-minimal-midrange/element-1.1.2.3.jpg";
import elDailyMinLuxTop from "../../Element/daily-minimal-luxury/element-1.1.3.1.jpg";
import elDailyMinLuxTrousers from "../../Element/daily-minimal-luxury/element-1.1.3.2.jpg";
import elDailyMinLuxShoes from "../../Element/daily-minimal-luxury/element-1.1.3.3.jpg";
import elDailyMinLuxBelt from "../../Element/daily-minimal-luxury/element-1.1.3.4.jpg";
import elDailyBalBudTop from "../../Element/daily-balanced-budget/element-1.2.1.1.jpg";
import elDailyBalBudTrousers from "../../Element/daily-balanced-budget/element-1.2.1.2.jpg";
import elDailyBalBudShoes from "../../Element/daily-balanced-budget/element-1.2.1.3.jpg";
import elDailyBalBudBracelets from "../../Element/daily-balanced-budget/element-1.2.1.4.jpg";
import elDailyBalMidTop from "../../Element/daily-balanced-midrange/element-1.2.2.1.jpg";
import elDailyBalMidTrousers from "../../Element/daily-balanced-midrange/element-1.2.2.2.jpg";
import elDailyBalMidShoes from "../../Element/daily-balanced-midrange/element-1.2.2.3.jpg";
import elDailyBalMidBracelet from "../../Element/daily-balanced-midrange/element-1.2.2.4.jpg";
import elDailyBalMidBlazer from "../../Element/daily-balanced-midrange/element-1.2.2.5.jpg";
import elDailyBalLuxTop from "../../Element/daily-balanced-luxury/element-1.2.3.1.jpg";
import elDailyBalLuxTrousers from "../../Element/daily-balanced-luxury/element-1.2.3.2.jpg";
import elDailyBalLuxShoes from "../../Element/daily-balanced-luxury/element-1.2.3.3.jpg";
import elDailyBalLuxBracelet from "../../Element/daily-balanced-luxury/element-1.2.3.4.jpg";
import elDailyMegaBudTop from "../../Element/daily-mega-budget/element-1.3.1.1.jpg";
import elDailyMegaBudTrousers from "../../Element/daily-mega-budget/element-1.3.1.2.jpg";
import elDailyMegaBudShoes from "../../Element/daily-mega-budget/element-1.3.1.3.jpg";
import elDailyMegaBudEarrings from "../../Element/daily-mega-budget/element-1.3.1.4.jpg";
import elDailyMegaBudBangle from "../../Element/daily-mega-budget/element-1.3.1.5.jpg";
import elDailyMegaMidTop from "../../Element/daily-mega-midrange/element-1.3.2.1.jpg";
import elDailyMegaMidNecklace from "../../Element/daily-mega-midrange/element-1.3.2.2.jpg";
import elDailyMegaMidEarrings from "../../Element/daily-mega-midrange/element-1.3.2.3.jpg";
import elDailyMegaMidBangle from "../../Element/daily-mega-midrange/element-1.3.2.4.jpg";
import elDailyMegaLuxVest from "../../Element/daily-mega-luxury/element-1.3.3.1.jpg";
import elDailyMegaLuxDress from "../../Element/daily-mega-luxury/element-1.3.3.2.jpg";
import elDailyMegaLuxEarrings from "../../Element/daily-mega-luxury/element-1.3.3.3.jpg";
import elDailyMegaLuxNecklace from "../../Element/daily-mega-luxury/element-1.3.3.4.jpg";
import elDailyMegaLuxBangle from "../../Element/daily-mega-luxury/element-1.3.3.5.jpg";
import elDailyMegaLuxHeels from "../../Element/daily-mega-luxury/element-1.3.3.6.jpg";
import elBdayMinBudTop from "../../Element/bday-minimal-budget/element-3.1.1.1.jpg";
import elBdayMinBudInner from "../../Element/bday-minimal-budget/element-3.1.1.2.jpg";
import elBdayMinBudTrousers from "../../Element/bday-minimal-budget/element-3.1.1.3.jpg";
import elBdayMinBudFlats from "../../Element/bday-minimal-budget/element-3.1.1.4.jpg";
import elBdayMinMidTop from "../../Element/bday-minimal-midrange/element-3.1.2.1.jpg";
import elBdayMinMidNecklace from "../../Element/bday-minimal-midrange/element-3.1.2.2.jpg";
import elBdayMinMidEarrings from "../../Element/bday-minimal-midrange/element-3.1.2.3.jpg";
import elBdayMinLuxTop from "../../Element/bday-minimal-luxury/element-3.1.3.1.jpg";
import elBdayMinLuxTrousers from "../../Element/bday-minimal-luxury/element-3.1.3.2.jpg";
import elBdayMinLuxBodysuit from "../../Element/bday-minimal-luxury/element-3.1.3.3.jpg";
import elBdayMinLuxBracelet from "../../Element/bday-minimal-luxury/element-3.1.3.4.jpg";
import elBdayMinLuxRings from "../../Element/bday-minimal-luxury/element-3.1.3.5.jpg";
import elBdayMinLuxShoes from "../../Element/bday-minimal-luxury/element-3.1.3.6.jpg";
import elBdayBalBudTop from "../../Element/bday-balanced-budget/element-3.2.1.1.jpg";
import elBdayBalBudNecklace from "../../Element/bday-balanced-budget/element-3.2.1.2.jpg";
import elBdayBalBudSandals from "../../Element/bday-balanced-budget/element-3.2.1.3.jpg";
import elBdayBalMidCoat from "../../Element/bday-balanced-midrange/element-3.2.2.1.jpg";
import elBdayBalMidBlouse from "../../Element/bday-balanced-midrange/element-3.2.2.2.jpg";
import elBdayBalMidBelt from "../../Element/bday-balanced-midrange/element-3.2.2.3.jpg";
import elBdayBalMidTrousers from "../../Element/bday-balanced-midrange/element-3.2.2.4.jpg";
import elBdayBalMidPumps from "../../Element/bday-balanced-midrange/element-3.2.2.5.jpg";
import elBdayBalLuxBlouse from "../../Element/bday-balanced-luxury/element-3.2.3.1.jpg";
import elBdayBalLuxTrousers from "../../Element/bday-balanced-luxury/element-3.2.3.2.jpg";
import elBdayBalLuxPumps from "../../Element/bday-balanced-luxury/element-3.2.3.3.jpg";
import elBdayBalLuxNecklace from "../../Element/bday-balanced-luxury/element-3.2.3.4.jpg";
import elBdayBalLuxEarrings from "../../Element/bday-balanced-luxury/element-3.2.3.5.jpg";
import elBdayBalLuxWatch from "../../Element/bday-balanced-luxury/element-3.2.3.6.jpg";
import elBdayMegaBudTop from "../../Element/bday-mega-budget/element-3.3.1.1.jpg";
import elBdayMegaBudTrousers from "../../Element/bday-mega-budget/element-3.3.1.2.jpg";
import elBdayMegaBudNecklace from "../../Element/bday-mega-budget/element-3.3.1.3.jpg";
import elBdayMegaBudEarrings from "../../Element/bday-mega-budget/element-3.3.1.4.jpg";
import elBdayMegaBudSandals from "../../Element/bday-mega-budget/element-3.3.1.5.jpg";
import elBdayMegaMidBlouse from "../../Element/bday-mega-midrange/element-3.3.2.1.jpg";
import elBdayMegaMidPants from "../../Element/bday-mega-midrange/element-3.3.2.2.jpg";
import elBdayMegaMidNecklace from "../../Element/bday-mega-midrange/element-3.3.2.3.jpg";
import elBdayMegaMidEarrings from "../../Element/bday-mega-midrange/element-3.3.2.4.jpg";
import elBdayMegaMidBracelets from "../../Element/bday-mega-midrange/element-3.3.2.5.jpg";
import elBdayMegaMidHeels from "../../Element/bday-mega-midrange/element-3.3.2.6.jpg";
import elBdayMegaLuxDress from "../../Element/bday-mega-luxury/element-3.3.3.1.jpg";
import elBdayMegaLuxNecklace from "../../Element/bday-mega-luxury/element-3.3.3.2.jpg";
import elBdayMegaLuxBangle from "../../Element/bday-mega-luxury/element-3.3.3.3.jpg";
import elBdayMegaLuxRing from "../../Element/bday-mega-luxury/element-3.3.3.4.jpg";
import elBdayMegaLuxEarrings from "../../Element/bday-mega-luxury/element-3.3.3.5.jpg";
import elBdayMegaLuxSandals from "../../Element/bday-mega-luxury/element-3.3.3.6.jpg";

const SLOT_IMAGES: Record<string, string[]> = {
  Top:       [top1, top2, top3],
  Bottom:    [trousers1, trousers2, trousers3, trousers4],
  Shoes:     [shoes1, shoes2, shoes3, shoes4, shoes5],
  Accessory: [acc1, acc2, acc3, acc4, acc5],
};

export const Route = createFileRoute("/generate")({
  head: () => ({
    meta: [
      { title: "Stylar" },
      {
        name: "description",
        content: "Compose a head-to-toe look. Set your style, budget and climate — Stylar does the rest.",
      },
    ],
  }),
  component: Studio,
});

const LOADING_STEPS = [
  "Reading your silhouette…",
  "Analysing palette and climate…",
  "Composing the look…",
  "Refining the final edit…",
  "Almost ready…",
];

type ShopItem = {
  slot: "Top" | "Bottom" | "Shoes" | "Accessory";
  name: string;
  brand: string;
  price: string;
  color: string;
  image?: string;
  optional?: boolean;
};

const SHOP_SETS: Record<string, ShopItem[]> = {
  "professional-minimal-budget": [
    { slot: "Top",       name: "Cotton Regular Fit Shirt",        brand: "Uniqlo",         price: "RM 69",  color: "#e8e4de", image: elProfMinBudShirt },
    { slot: "Bottom",    name: "Straight-Leg Tailored Trousers",  brand: "Zara",           price: "RM 99",  color: "#2b2d31", image: elProfMinBudTrousers },
    { slot: "Accessory", name: "Le Pliage Original Tote",         brand: "Longchamp",      price: "RM 79",  color: "#1a1a1a", image: elProfMinBudBag },
    { slot: "Shoes",     name: "Classic Block Heel Pump",         brand: "Gabor",          price: "RM 49",  color: "#7a4d2e", image: elProfMinBudHeels },
  ],
  "professional-minimal-luxury": [
    { slot: "Top",    name: "Relaxed Tailored Shirt",        brand: "COS",           price: "RM 249", color: "#e8e4de", image: elProfMinLuxTop },
    { slot: "Bottom", name: "Wide-Leg Tailored Trousers",    brand: "COS",           price: "RM 349", color: "#2b2d31", image: elProfMinLuxTrousers },
    { slot: "Shoes",  name: "Leather Block Heel Sandal",     brand: "Massimo Dutti", price: "RM 399", color: "#7a4d2e", image: elProfMinLuxShoes },
  ],
  "professional-minimal-midrange": [
    { slot: "Top",       name: "Modest Draped Blouse",       brand: "Lubna",            price: "RM 159", color: "#e8ddd0", image: elProfMinMidTop },
    { slot: "Shoes",     name: "Pointed-Toe Heeled Mule",    brand: "Charles & Keith",  price: "RM 189", color: "#2b2d31", image: elProfMinMidShoes },
    { slot: "Accessory", name: "Gold Drop Earrings",         brand: "Habib",            price: "RM 299", color: "#c9b48a", image: elProfMinMidEarrings },
  ],
  "professional-balanced-budget": [
    { slot: "Top",       name: "Fitted Blazer Shirt",        brand: "Zara",     price: "RM 89",  color: "#e8e4de", image: elProfBalBudTop },
    { slot: "Bottom",    name: "Slim Tailored Trouser",      brand: "Theory",   price: "RM 119", color: "#2b2d31", image: elProfBalBudTrousers },
    { slot: "Shoes",     name: "Day Heel",                   brand: "Everlane", price: "RM 59",  color: "#c8bca8", image: elProfBalBudShoes },
    { slot: "Accessory", name: "Woven Leather Belt",         brand: "Uniqlo",   price: "RM 29",  color: "#7a4d2e", image: elProfBalBudBelt },
  ],
  "professional-balanced-midrange": [
    { slot: "Top",       name: "Structured Blazer",          brand: "Massimo Dutti",   price: "RM 299", color: "#2b2d31", image: elProfBalMidBlazer },
    { slot: "Top",       name: "Relaxed Cotton Shirt",       brand: "COS",             price: "RM 139", color: "#e8e4de", image: elProfBalMidInner },
    { slot: "Shoes",     name: "Pointed-Toe Heeled Mule",    brand: "Charles & Keith", price: "RM 149", color: "#7a4d2e", image: elProfBalMidShoes },
    { slot: "Accessory", name: "Gold Hoop Earrings",         brand: "Fossil",          price: "RM 59",  color: "#c9b48a", image: elProfBalMidEarrings },
  ],
  "big day-mega-luxury": [
    { slot: "Bottom",    name: "Signature Evening Gown",     brand: "Gelly Wee Gown Store",       price: "RM 699", color: "#f1ece2", image: elBdayMegaLuxDress },
    { slot: "Accessory", name: "Diamond Pendant Necklace",   brand: "Habib Exclusive",            price: "RM 299", color: "#c9b48a", image: elBdayMegaLuxNecklace },
    { slot: "Accessory", name: "22K Gold Bangle",            brand: "Joyalukkas Jewellery",       price: "RM 249", color: "#c9b48a", image: elBdayMegaLuxBangle },
    { slot: "Accessory", name: "Embellished Statement Ring", brand: "Fabindia",                   price: "RM 99",  color: "#c9b48a", image: elBdayMegaLuxRing },
    { slot: "Accessory", name: "Pearl Drop Earrings",        brand: "Wah Chan Jewel",             price: "RM 99",  color: "#f1ece2", image: elBdayMegaLuxEarrings },
    { slot: "Shoes",     name: "Embellished Strappy Sandal", brand: "Charles & Keith Exclusive",  price: "RM 149", color: "#7a4d2e", image: elBdayMegaLuxSandals },
  ],
  "big day-mega-midrange": [
    { slot: "Top",       name: "Silk Logo Blouse",           brand: "Gucci",          price: "RM 299", color: "#f1ece2", image: elBdayMegaMidBlouse },
    { slot: "Bottom",    name: "Tailored Slim Pants",        brand: "Saint Laurent",  price: "RM 249", color: "#2b2d31", image: elBdayMegaMidPants },
    { slot: "Accessory", name: "Gold Chain Necklace",        brand: "Habib Gold",     price: "RM 149", color: "#c9b48a", image: elBdayMegaMidNecklace },
    { slot: "Accessory", name: "Crystal Hoop Earrings",      brand: "Michael Kors",   price: "RM 89",  color: "#c9b48a", image: elBdayMegaMidEarrings },
    { slot: "Accessory", name: "Gold Bangle Set",            brand: "Malabar Gold",   price: "RM 59",  color: "#c9b48a", image: elBdayMegaMidBracelets },
    { slot: "Shoes",     name: "Strappy Block Heels",        brand: "Zara",           price: "RM 49",  color: "#7a4d2e", image: elBdayMegaMidHeels },
  ],
  "big day-mega-budget": [
    { slot: "Top",       name: "Flowy Occasion Blouse",      brand: "Shopee Marketplace", price: "RM 49",  color: "#f1ece2", image: elBdayMegaBudTop },
    { slot: "Bottom",    name: "Wide-Leg Palazzo Trousers",  brand: "Lazada Marketplace", price: "RM 59",  color: "#e8e4de", image: elBdayMegaBudTrousers },
    { slot: "Accessory", name: "Layered Chain Necklace",     brand: "Charles & Keith",    price: "RM 89",  color: "#c9b48a", image: elBdayMegaBudNecklace },
    { slot: "Accessory", name: "Pearl Stud Earrings",        brand: "Zara",               price: "RM 49",  color: "#f1ece2", image: elBdayMegaBudEarrings },
    { slot: "Shoes",     name: "Strappy Occasion Sandal",    brand: "Bata",               price: "RM 89",  color: "#7a4d2e", image: elBdayMegaBudSandals },
  ],
  "big day-balanced-luxury": [
    { slot: "Top",       name: "Silk-Blend Draped Blouse",   brand: "COS",               price: "RM 249", color: "#f1ece2", image: elBdayBalLuxBlouse },
    { slot: "Bottom",    name: "Tailored Satin Trousers",    brand: "Massimo Dutti",     price: "RM 399", color: "#e8e4de", image: elBdayBalLuxTrousers },
    { slot: "Shoes",     name: "Pointed-Toe Stiletto Pumps", brand: "Charles & Keith",   price: "RM 189", color: "#7a4d2e", image: elBdayBalLuxPumps },
    { slot: "Accessory", name: "Gold Pendant Necklace",      brand: "Habib",             price: "RM 199", color: "#c9b48a", image: elBdayBalLuxNecklace },
    { slot: "Accessory", name: "Crystal Drop Earrings",      brand: "Wah Chan",          price: "RM 99",  color: "#c9b48a", image: elBdayBalLuxEarrings },
    { slot: "Accessory", name: "Gold Mesh Watch",            brand: "Daniel Wellington", price: "RM 59",  color: "#c9b48a", image: elBdayBalLuxWatch },
  ],
  "big day-balanced-midrange": [
    { slot: "Top",       name: "Oversized Coat",             brand: "Zara",          price: "RM 199", color: "#2b2d31", image: elBdayBalMidCoat },
    { slot: "Top",       name: "Satin Ruched Blouse",        brand: "Mango",         price: "RM 129", color: "#f1ece2", image: elBdayBalMidBlouse },
    { slot: "Accessory", name: "Leather Waist Belt",         brand: "Massimo Dutti", price: "RM 149", color: "#7a4d2e", image: elBdayBalMidBelt },
    { slot: "Bottom",    name: "Tailored Wide-Leg Trousers", brand: "COS",           price: "RM 199", color: "#e8e4de", image: elBdayBalMidTrousers },
    { slot: "Shoes",     name: "Pointed-Toe Pumps",          brand: "Charles & Keith", price: "RM 119", color: "#7a4d2e", image: elBdayBalMidPumps },
  ],
  "big day-balanced-budget": [
    { slot: "Top",       name: "Floral Midi Dress",          brand: "Mango",              price: "RM 159", color: "#e8ddd0", image: elBdayBalBudTop },
    { slot: "Accessory", name: "Classic Pendant Necklace",   brand: "Daniel Wellington", price: "RM 149", color: "#c9b48a", image: elBdayBalBudNecklace },
    { slot: "Shoes",     name: "Strappy Flat Sandal",        brand: "Charles & Keith",   price: "RM 89",  color: "#7a4d2e", image: elBdayBalBudSandals },
  ],
  "big day-minimal-luxury": [
    { slot: "Top",       name: "Draped Satin Blouse",       brand: "Zara",            price: "RM 199",   color: "#f1ece2", image: elBdayMinLuxTop },
    { slot: "Bottom",    name: "Satin Wide-Leg Trousers",   brand: "COS",             price: "RM 499",   color: "#e8e4de", image: elBdayMinLuxTrousers },
    { slot: "Top",       name: "Bodysuit",                  brand: "Balenciaga",      price: "RM 999",   color: "#0a0a0c", image: elBdayMinLuxBodysuit },
    { slot: "Accessory", name: "Gold Chain Bracelet",       brand: "Charles & Keith", price: "RM 149",   color: "#c9b48a", image: elBdayMinLuxBracelet },
    { slot: "Accessory", name: "Gold Stacking Rings",       brand: "Wah Chan",        price: "RM 299",   color: "#c9b48a", image: elBdayMinLuxRings },
    { slot: "Shoes",     name: "Leather Heeled Sandal",     brand: "Massimo Dutti",   price: "RM 499",   color: "#7a4d2e", image: elBdayMinLuxShoes },
  ],
  "big day-minimal-midrange": [
    { slot: "Top",       name: "Silk Crew-Neck Blouse",     brand: "Prada",  price: "RM 399", color: "#f1ece2", image: elBdayMinMidTop },
    { slot: "Accessory", name: "Pearl Pendant Necklace",    brand: "Habib",  price: "RM 229", color: "#c9b48a", image: elBdayMinMidNecklace },
    { slot: "Accessory", name: "Sculptural Drop Earrings",  brand: "COS",    price: "RM 69",  color: "#e8e4de", image: elBdayMinMidEarrings },
  ],
  "big day-minimal-budget": [
    { slot: "Top",    name: "Structured Blazer",          brand: "Massimo Dutti",  price: "RM 149", color: "#e8e4de", image: elBdayMinBudTop },
    { slot: "Top",    name: "Satin Inner Camisole",       brand: "Zara",           price: "RM 79",  color: "#f1ece2", image: elBdayMinBudInner },
    { slot: "Bottom", name: "Tailored Wide-Leg Trousers", brand: "Brands Outlet",  price: "RM 89",  color: "#2b2d31", image: elBdayMinBudTrousers },
    { slot: "Shoes",  name: "Pointed-Toe Ballet Flats",   brand: "Charles & Keith", price: "RM 79", color: "#7a4d2e", image: elBdayMinBudFlats },
  ],
  "daily-mega-luxury": [
    { slot: "Top",       name: "Tailored Knit Vest",         brand: "Mango",              price: "RM 99",  color: "#2b2d31", image: elDailyMegaLuxVest },
    { slot: "Bottom",    name: "Flowy Midi Dress",           brand: "Zara",               price: "RM 199", color: "#e8e4de", image: elDailyMegaLuxDress },
    { slot: "Accessory", name: "Pearl Drop Earrings",        brand: "Shopee Marketplace", price: "RM 29",  color: "#f1ece2", image: elDailyMegaLuxEarrings },
    { slot: "Accessory", name: "Gold Chain Necklace",        brand: "Lazada Marketplace", price: "RM 39",  color: "#c9b48a", image: elDailyMegaLuxNecklace },
    { slot: "Accessory", name: "Polished Gold Bangle",       brand: "Massimo Dutti",      price: "RM 399", color: "#c9b48a", image: elDailyMegaLuxBangle },
    { slot: "Shoes",     name: "Strappy Stiletto Heels",     brand: "Charles & Keith",    price: "RM 489", color: "#7a4d2e", image: elDailyMegaLuxHeels },
  ],
  "daily-mega-midrange": [
    { slot: "Top",       name: "Logo Oversized Tee",         brand: "Gucci",         price: "RM 399", color: "#2b2d31", image: elDailyMegaMidTop },
    { slot: "Accessory", name: "YSL Pendant Necklace",       brand: "Saint Laurent", price: "RM 199", color: "#c9b48a", image: elDailyMegaMidNecklace },
    { slot: "Accessory", name: "Crystal Drop Earrings",      brand: "Zara",          price: "RM 59",  color: "#e8e4de", image: elDailyMegaMidEarrings },
    { slot: "Accessory", name: "Gold Bangle",                brand: "Wah Chan",      price: "RM 89",  color: "#c9b48a", image: elDailyMegaMidBangle },
  ],
  "daily-mega-budget": [
    { slot: "Top",       name: "Printed Oversized Tee",      brand: "Mango",             price: "RM 89",  color: "#e8e4de", image: elDailyMegaBudTop },
    { slot: "Bottom",    name: "Relaxed Wide-Leg Trousers",  brand: "Shopee Marketplace", price: "RM 49", color: "#2b2d31", image: elDailyMegaBudTrousers },
    { slot: "Shoes",     name: "Classic Flat Sneaker",       brand: "Bata",              price: "RM 79",  color: "#f1ece2", image: elDailyMegaBudShoes },
    { slot: "Accessory", name: "Gold Drop Earrings",         brand: "Charles & Keith",   price: "RM 59",  color: "#c9b48a", image: elDailyMegaBudEarrings },
    { slot: "Accessory", name: "Beaded Bangle",              brand: "Lazada",            price: "RM 29",  color: "#c8bca8", image: elDailyMegaBudBangle },
  ],
  "daily-balanced-luxury": [
    { slot: "Top",       name: "Oversized Cotton Shirt",     brand: "COS",           price: "RM 249", color: "#e8e4de", image: elDailyBalLuxTop },
    { slot: "Bottom",    name: "Tailored Slim Trousers",     brand: "Massimo Dutti", price: "RM 399", color: "#2b2d31", image: elDailyBalLuxTrousers },
    { slot: "Shoes",     name: "Leather Slip-On Loafer",     brand: "Shopee",        price: "RM 89",  color: "#7a4d2e", image: elDailyBalLuxShoes },
    { slot: "Accessory", name: "Rose Gold Bangle Bracelet",  brand: "Fossil",        price: "RM 159", color: "#c9b48a", image: elDailyBalLuxBracelet },
  ],
  "daily-balanced-midrange": [
    { slot: "Top",       name: "Graphic Print Tee",          brand: "Shopee",          price: "RM 39",  color: "#2b2d31", image: elDailyBalMidTop },
    { slot: "Bottom",    name: "Slim Tapered Trousers",      brand: "Uniqlo",          price: "RM 79",  color: "#2b2d31", image: elDailyBalMidTrousers },
    { slot: "Shoes",     name: "Leather Block Heel",         brand: "Charles & Keith", price: "RM 189", color: "#7a4d2e", image: elDailyBalMidShoes },
    { slot: "Accessory", name: "Vintage Bangle Bracelet",    brand: "Fossil",          price: "RM 199", color: "#c9b48a", image: elDailyBalMidBracelet },
    { slot: "Top",       name: "Relaxed Linen Blazer",       brand: "COS",             price: "RM 189", color: "#e8e4de", image: elDailyBalMidBlazer },
  ],
  "daily-balanced-budget": [
    { slot: "Top",       name: "Cotton Relaxed Tee",         brand: "COS",         price: "RM 149", color: "#e8e4de", image: elDailyBalBudTop },
    { slot: "Bottom",    name: "Straight-Leg Jeans",         brand: "Zara",        price: "RM 109", color: "#3b4a66", image: elDailyBalBudTrousers },
    { slot: "Shoes",     name: "Casual Sneakers",            brand: "Lazada",      price: "RM 59",  color: "#f1ece2", image: elDailyBalBudShoes },
    { slot: "Accessory", name: "Beaded Bracelet Set",        brand: "Tiktok Shop", price: "RM 29",  color: "#c9b48a", image: elDailyBalBudBracelets },
  ],
  "daily-minimal-luxury": [
    { slot: "Top",       name: "Oversized Merino Knit",      brand: "COS",           price: "RM 249", color: "#e8e4de", image: elDailyMinLuxTop },
    { slot: "Bottom",    name: "Tailored Wide-Leg Trousers", brand: "COS",           price: "RM 349", color: "#2b2d31", image: elDailyMinLuxTrousers },
    { slot: "Shoes",     name: "Leather Flat Loafer",        brand: "Massimo Dutti", price: "RM 299", color: "#7a4d2e", image: elDailyMinLuxShoes },
    { slot: "Accessory", name: "Woven Leather Belt",         brand: "Zara",          price: "RM 49",  color: "#c8bca8", image: elDailyMinLuxBelt },
  ],
  "daily-minimal-midrange": [
    { slot: "Top",    name: "Relaxed Cotton T-Shirt",     brand: "COS",         price: "RM 149", color: "#e8e4de", image: elDailyMinMidTop },
    { slot: "Bottom", name: "Wide-Leg Casual Trousers",   brand: "Tiktok Shop", price: "RM 89",  color: "#2b2d31", image: elDailyMinMidTrousers },
    { slot: "Shoes",  name: "Leather Loafer",             brand: "Zara",        price: "RM 299", color: "#7a4d2e", image: elDailyMinMidShoes },
  ],
  "daily-minimal-budget": [
    { slot: "Top",       name: "ACG Woven Logo Tee",    brand: "Nike ACG", price: "RM 89",  color: "#2b2d31", image: elDailyMinBudTop },
    { slot: "Bottom",    name: "Jogger Pants",          brand: "Uniqlo",   price: "RM 79",  color: "#2b2d31", image: elDailyMinBudTrousers },
    { slot: "Shoes",     name: "Canvas Sneakers",       brand: "Shopee",   price: "RM 49",  color: "#f1ece2", image: elDailyMinBudShoes },
    { slot: "Accessory", name: "Plain Black Inner Tee", brand: "Shopee",   price: "RM 29",  color: "#0a0a0c", image: elDailyMinBudShirt },
  ],
  "professional-mega-luxury": [
    { slot: "Top",       name: "Silk-Blend Draped Blouse",   brand: "Massimo Dutti",  price: "RM 399", color: "#e8e4de", image: elProfMegaLuxTop },
    { slot: "Bottom",    name: "Tailored Wide-Leg Trousers", brand: "COS",            price: "RM 349", color: "#2b2d31", image: elProfMegaLuxTrousers },
    { slot: "Shoes",     name: "Heeled Leather Sandal",      brand: "Zara",           price: "RM 249", color: "#7a4d2e", image: elProfMegaLuxShoes },
    { slot: "Accessory", name: "Gold Chain Belt",            brand: "Shopee/Lazada",  price: "RM 49",  color: "#c9b48a", image: elProfMegaLuxBelt },
  ],
  "professional-mega-midrange": [
    { slot: "Top",       name: "Tailored Linen Blazer",      brand: "Massimo Dutti",   price: "RM 299", color: "#2b2d31", image: elProfMegaMidTop },
    { slot: "Bottom",    name: "Wide-Leg Trousers",          brand: "COS",             price: "RM 249", color: "#c8bca8", image: elProfMegaMidTrousers },
    { slot: "Shoes",     name: "Pointed Kitten Heel",        brand: "Zara",            price: "RM 129", color: "#7a4d2e", image: elProfMegaMidShoes },
    { slot: "Accessory", name: "Croc-Effect Handbag",        brand: "Charles & Keith", price: "RM 169", color: "#1a1a1a", image: elProfMegaMidBag },
  ],
  "professional-mega-budget": [
    { slot: "Top",       name: "Cotton Relaxed Shirt",        brand: "Uniqlo",          price: "RM 59",  color: "#e8e4de", image: elProfMegaBudTop },
    { slot: "Bottom",    name: "Wide-Leg Tailored Trousers",  brand: "Zara",            price: "RM 99",  color: "#2b2d31", image: elProfMegaBudTrousers },
    { slot: "Shoes",     name: "Strappy Block Heel",          brand: "GHAAL (Shopee)",  price: "RM 89",  color: "#7a4d2e", image: elProfMegaBudShoes },
    { slot: "Accessory", name: "Structured Tote Bag",         brand: "Charles & Keith", price: "RM 99",  color: "#1a1a1a", image: elProfMegaBudBag },
  ],
  "professional-balanced-luxury": [
    { slot: "Top",       name: "Premium Linen Shirt",        brand: "Uniqlo",          price: "RM 149", color: "#e8e4de", image: elProfBalLuxTop },
    { slot: "Bottom",    name: "Wide-Leg Tailored Trousers", brand: "Zara",            price: "RM 299", color: "#2b2d31", image: elProfBalLuxTrousers },
    { slot: "Shoes",     name: "Leather Strappy Heel",       brand: "Charles & Keith", price: "RM 489", color: "#7a4d2e", image: elProfBalLuxShoes },
    { slot: "Accessory", name: "Woven Leather Belt",         brand: "Shopee",          price: "RM 49",  color: "#c8bca8", image: elProfBalLuxBelt },
  ],
  minimal: [
    { slot: "Top",       name: "Merino Crewneck",       brand: "Uniqlo",       price: "RM 59",  color: "#2b2d31" },
    { slot: "Bottom",    name: "Slim Straight Chino",   brand: "COS",          price: "RM 89",  color: "#c8bca8" },
    { slot: "Shoes",     name: "Leather Low Trainer",   brand: "Veja",         price: "RM 160", color: "#f1ece2" },
    { slot: "Accessory", name: "Canvas Tote",           brand: "L.L.Bean",     price: "RM 35",  color: "#b08a5a", optional: true },
  ],
  balanced: [
    { slot: "Top",       name: "Oxford Button-Down",    brand: "Everlane",     price: "RM 88",  color: "#172033" },
    { slot: "Bottom",    name: "Tailored Trouser",      brand: "COS",          price: "RM 130", color: "#2b2d31" },
    { slot: "Shoes",     name: "Leather Loafer",        brand: "Clarks",       price: "RM 145", color: "#7a4d2e" },
    { slot: "Accessory", name: "Crossbody Bag",         brand: "Carhartt WIP", price: "RM 65",  color: "#5b5a3a", optional: true },
  ],
  mega: [
    { slot: "Top",       name: "Single-Button Blazer",  brand: "Reiss",        price: "RM 380", color: "#0a0a0c" },
    { slot: "Bottom",    name: "Tailored Dress Trouser", brand: "Reiss",       price: "RM 220", color: "#172033" },
    { slot: "Shoes",     name: "Oxford Brogue",         brand: "Church's",     price: "RM 390", color: "#3e2418" },
    { slot: "Accessory", name: "Silk Pocket Square",    brand: "Drake's",      price: "RM 75",  color: "#c9b48a", optional: true },
  ],
};

function getShopItems(outfit: GenOutfit, occasion: GenStyle): ShopItem[] {
  const compositeKey = `${occasion.toLowerCase()}-${outfit.style?.toLowerCase()}-${outfit.price_range?.toLowerCase().replace(/[\s-]+/g, "")}`;
  if (SHOP_SETS[compositeKey]) return SHOP_SETS[compositeKey];
  return SHOP_SETS[outfit.style?.toLowerCase()] ?? SHOP_SETS.balanced;
}

function Studio() {
  const [style, setStyle]           = useState<GenStyle>("Daily");
  const [priceRange, setPriceRange] = useState<GenPriceRange>("Budget");
  const [climate, setClimate]       = useState<GenClimate>("Hot");
  const [styleLevel, setStyleLevel] = useState<GenStyleLevel>("Balanced");

  const [loading, setLoading]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [outfit, setOutfit]       = useState<GenOutfit | null>(null);
  const [error, setError]         = useState<string | null>(null);

  const [toast, setToast]         = useState(false);
  const [phoneScreen, setPhoneScreen] = useState<Element | null>(null);

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef    = useRef<HTMLDivElement | null>(null);
  const contentRef   = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPhoneScreen(document.querySelector(".phone-screen"));
    contentRef.current = document.querySelector(".phone-content") as HTMLDivElement | null;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (toastTimer.current)  clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (outfit && resultRef.current && contentRef.current) {
      const top = resultRef.current.offsetTop - 16;
      contentRef.current.scrollTo({ top, behavior: "smooth" });
    }
  }, [outfit]);

  function showToast() {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(true);
    toastTimer.current = setTimeout(() => setToast(false), 2000);
  }

  async function handleGenerate() {
    setLoading(true);
    setOutfit(null);
    setError(null);
    setProgress(0);
    setStepIndex(0);

    const DURATION = 4000;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / DURATION) * 100, 99));
      setStepIndex(Math.min(
        Math.floor((elapsed / DURATION) * LOADING_STEPS.length),
        LOADING_STEPS.length - 1,
      ));
    }, 80);

    try {
      const [result] = await Promise.all([
        fetchGenOutfit(style, priceRange, styleLevel),
        new Promise<void>((r) => setTimeout(r, DURATION)),
      ]);

      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);

      if (!result) setError("No looks found for this combination. Try different filters.");
      else setOutfit(result);
    } catch {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Toast portal — renders inside phone-screen above all content */}
      {toast && phoneScreen && createPortal(
        <div
          className="absolute inset-x-0 z-[999] flex justify-center pointer-events-none px-6"
          style={{ top: "80px" }}
        >
          <div className="bg-foreground text-primary-foreground px-5 py-3 flex items-center gap-2.5 shadow-2xl animate-fade-up">
            <span style={{ color: "var(--gold)" }}>✓</span>
            <span className="eyebrow text-[10px]">Added to basket</span>
          </div>
        </div>,
        phoneScreen,
      )}

      <StylarNav />

      <section className="px-5 pb-8 pt-8">
        <p className="eyebrow">The Studio</p>
        <h1 className="font-display mt-3 text-[2.2rem] leading-[1]">
          Compose your look.
        </h1>
      </section>

      {/* FILTERS */}
      <section className="px-5">
        <div className="hairline border-b border-border pb-6 pt-4 space-y-6">
          <Control label="Occasion">
            <div className="flex flex-wrap gap-2">
              {GEN_STYLES.map((s) => (
                <Chip key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Chip>
              ))}
              <ComingSoonChip>Evening Out</ComingSoonChip>
              <ComingSoonChip>Gym & Active</ComingSoonChip>
              <ComingSoonChip>Travel</ComingSoonChip>
              <ComingSoonChip>Formal Event</ComingSoonChip>
            </div>
          </Control>

          <Control label="Style">
            <div className="flex flex-wrap gap-2">
              {GEN_STYLE_LEVELS.map((l) => (
                <Chip key={l} active={styleLevel === l} onClick={() => setStyleLevel(l)}>{l}</Chip>
              ))}
              <ComingSoonChip>Avant-Garde</ComingSoonChip>
              <ComingSoonChip>Streetwear Edit</ComingSoonChip>
            </div>
          </Control>

          <Control label="Price Range">
            <div className="flex flex-wrap gap-2">
              {GEN_PRICE_RANGES.map((p) => (
                <Chip key={p} active={priceRange === p} onClick={() => setPriceRange(p)}>{p}</Chip>
              ))}
              <ComingSoonChip>Ultra Luxury</ComingSoonChip>
            </div>
          </Control>

          <Control label="Climate">
            <div className="flex flex-wrap gap-2">
              <Chip active={climate === "Hot"} onClick={() => setClimate("Hot")}>Hot</Chip>
              <ComingSoonChip>Mild</ComingSoonChip>
              <ComingSoonChip>Cold</ComingSoonChip>
              <ComingSoonChip>Snowy</ComingSoonChip>
            </div>
          </Control>

          <Control label="Fit Preference">
            <div className="flex flex-wrap gap-2">
              <ComingSoonChip>Fit</ComingSoonChip>
              <ComingSoonChip>Regular</ComingSoonChip>
              <ComingSoonChip>Oversize</ComingSoonChip>
            </div>
          </Control>

          <Control label="Colour Preference">
            <div className="flex flex-wrap gap-2">
              <ComingSoonChip>Neutrals</ComingSoonChip>
              <ComingSoonChip>Earth Tones</ComingSoonChip>
              <ComingSoonChip>Monochrome</ComingSoonChip>
              <ComingSoonChip>Pastels</ComingSoonChip>
              <ComingSoonChip>Bold</ComingSoonChip>
              <ComingSoonChip>Dark Palette</ComingSoonChip>
            </div>
          </Control>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="eyebrow w-full border border-foreground bg-foreground py-4 text-primary-foreground transition-colors hover:bg-gold hover:border-gold hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Composing…" : "Generate Outfit"}
          </button>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <section className="px-5 py-16">
          <p className="eyebrow mb-5 text-center">Stylar AI</p>
          <div className="h-px w-full bg-border overflow-hidden">
            <div
              className="h-px bg-gold"
              style={{ width: `${progress}%`, transition: "width 80ms linear" }}
            />
          </div>
          <p className="font-display mt-6 text-center text-xl italic text-muted-foreground">
            {LOADING_STEPS[stepIndex]}
          </p>
          <p className="font-mono mt-3 text-center text-xs text-muted-foreground/50">
            {Math.round(progress)}%
          </p>
        </section>
      )}

      {/* ERROR */}
      {!loading && error && (
        <section className="px-5 py-16 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
        </section>
      )}

      {/* RESULT */}
      {!loading && outfit && (
        <>
          <section ref={resultRef} className="px-5 py-10">
            <GenOutfitCard outfit={outfit} />
          </section>

          {/* SHOP THE LOOK */}
          <section className="px-5 pb-10">
            <div className="hairline pt-6 mb-6">
              <p className="eyebrow">Shop the Look</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Each piece curated to complete this edit.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {getShopItems(outfit, style).map((item) => (
                <ShopItemCard key={`${item.slot}-${item.brand}`} item={item} onAddToBasket={showToast} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* EMPTY STATE */}
      {!loading && !outfit && !error && (
        <section className="px-5 py-16">
          <div className="border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl text-muted-foreground">
              Set your filters and press Generate.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

function ShopItemCard({ item, onAddToBasket }: { item: ShopItem; onAddToBasket?: () => void }) {
  const [inBasket, setInBasket] = useState(false);

  const slotImage = useMemo(() => {
    if (item.image) return item.image;
    const pool = SLOT_IMAGES[item.slot] ?? SLOT_IMAGES.Top;
    const hash = item.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return pool[hash % pool.length];
  }, [item.slot, item.name, item.image]);

  return (
    <div className="border border-border flex flex-col">
      <div className="w-full aspect-square overflow-hidden relative">
        <img src={slotImage} alt={item.slot} className="h-full w-full object-cover" />
        {item.optional && (
          <span className="absolute bottom-1.5 left-1.5 eyebrow text-[7px] bg-background/70 text-muted-foreground px-1.5 py-0.5 backdrop-blur-sm">
            Optional
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs font-medium text-foreground leading-tight">{item.name}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{item.brand}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-mono text-xs text-foreground">{item.price}</span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="eyebrow text-[9px] text-gold hover:opacity-70 transition-opacity"
          >
            Checkout →
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!inBasket) {
              setInBasket(true);
              onAddToBasket?.();
            } else {
              setInBasket(false);
            }
          }}
          className="eyebrow text-[9px] w-full py-2 border transition-all"
          style={{
            borderColor: inBasket ? "var(--gold)" : "var(--border)",
            color: inBasket ? "var(--gold)" : "var(--muted-foreground)",
            backgroundColor: inBasket ? "var(--gold)15" : "transparent",
          }}
        >
          {inBasket ? "✓ In basket" : "+ Add to basket"}
        </button>
      </div>
    </div>
  );
}

function GenOutfitCard({ outfit }: { outfit: GenOutfit }) {
  return (
    <article className="animate-fade-up space-y-6">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
        <img
          src={outfit.image_url}
          alt={outfit.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 bg-background/70 px-3 py-1.5 backdrop-blur">
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span className="eyebrow text-foreground text-[9px]">Stylar AI · Curated</span>
        </div>
      </div>

      <div>
        <p className="eyebrow">{outfit.style} · Generated by Stylar</p>
        <h2 className="font-display mt-2 text-3xl leading-[1.05]">{outfit.name}</h2>

        <div className="hairline mt-6 pt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="eyebrow text-[9px]">Price Range</p>
            <p className="font-display mt-1 text-xl">{outfit.price_range}</p>
          </div>
          <div>
            <p className="eyebrow text-[9px]">Style Direction</p>
            <p className="font-display mt-1 text-xl italic text-foreground/80">{outfit.style}</p>
          </div>
        </div>

        <div className="hairline mt-6 pt-4 space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This look was composed by Stylar AI based on your selected occasion,
            price range and climate — refined using what Stylar has learned from
            your likes and saved looks.
          </p>
          <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
            The more you like and save in <span className="text-gold">For You</span>,
            the more personal your generations become.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="eyebrow mt-6 border border-border px-5 py-3 transition-colors hover:border-gold hover:text-gold"
        >
          ↑ Regenerate
        </button>
      </div>
    </article>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      {children}
    </div>
  );
}

function ComingSoonChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button
        type="button"
        disabled
        className="border px-3 py-2 text-xs cursor-not-allowed select-none"
        style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", opacity: 0.35 }}
      >
        {children}
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="bg-foreground text-background px-2.5 py-1.5 whitespace-nowrap shadow-lg">
          <span className="eyebrow text-[8px]">Coming Soon</span>
        </div>
        <div className="w-0 h-0 mx-auto" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid var(--foreground)" }} />
      </div>
    </div>
  );
}

function Chip({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border px-3 py-2 text-xs transition-all disabled:cursor-not-allowed disabled:opacity-35"
      style={{
        borderColor: active ? "var(--gold)" : "var(--border)",
        color: active ? "var(--gold)" : "var(--muted-foreground)",
      }}
    >
      {children}
    </button>
  );
}
