/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order } from './types';

export const products: Product[] = [
  {
    id: 'gourmet-salmon-pumpkin',
    name: 'Gourmet Salmon & Pumpkin',
    category: 'wet',
    subcategory: 'Grain-Free Wet Recipe',
    price: 3.50,
    rating: 4.9,
    reviewsCount: 124,
    isBestseller: true,
    isNew: false,
    image: 'https://i.postimg.cc/5t54qfb2/GKm-YEXf-OEOGwbh-E9QYOz-G6a7r9eku-UKMjsuq-Ngu0h-ZRFb-SA7ix-DQ9Sm-PJg-Ll-RVJsrzh-X3n-Yt-NPWAMr0esdy6u.jpg',
    tags: ['Adult', 'Sensitive Stomach'],
    description: 'Provide your cat with exquisite flavor and ultimate cellular nourishment. Slow-simmered wild-caught Pacific salmon is harmoniously paired with prebiotic-rich pumpkin, fiber-dense sweet potato, and selected trace minerals. Specially formulated to soothe sensitive digestive systems while maintaining a gleaming coat.',
    ingredients: 'Fresh Wild Atlantic Salmon, Pumpkin Puree, Salmon Broth, Sweet Potato, Organ Meats (Livers & Hearts), Cold-Pressed Flaxseed Oil, Calcium Carbonate, Inulin, Taurine, Zinc Amino Acid Chelate, Vitamin E Supplement, Vitamin B12.',
    guaranteedAnalysis: {
      protein: '11.5% Min',
      fat: '6.5% Min',
      fiber: '1.0% Max',
      moisture: '78.0% Max',
      ash: '2.1% Max',
      taurine: '0.15% Min',
      calories: '920 kcal/kg (approx. 78 kcal per 3oz single jar)'
    },
    benefits: [
      'Prebiotic pumpkin supports stable gastrointestinal flora and smooth digestion.',
      'Wild salmon loaded with EPA and DHA omega-3 fatty acids for structural skin health.',
      'Grain-free formula completely free from heavy starches, corn, soy, wheat, or synthetic binders.'
    ],
    galleryImages: [
      'https://i.postimg.cc/5t54qfb2/GKm-YEXf-OEOGwbh-E9QYOz-G6a7r9eku-UKMjsuq-Ngu0h-ZRFb-SA7ix-DQ9Sm-PJg-Ll-RVJsrzh-X3n-Yt-NPWAMr0esdy6u.jpg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9hNfAiGvtZBjPEUsCvjMjdZ4ZFVOPW13TxN0tpVqWEx5L_GjODpTSEA9sUiDPdWiR5one-sXGy9oxGEpv0SVilwR7bOacFYty9UfUT7dDzLJ45NsQ-mngJ_6jm3dEV2sZY_IgughowtVqp079RHgK1HzW0Ru8FkRlFjsSV-rShckaFr0QIg-sr6lZKtoTFE_-P6EM9P9f5lk2FmSbm4mK1zh77r47WZVmVk4-xowdGh9oUlLcG-3aInO0tZMK5CpXjEzWlTRhykc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBR9lVDz4iUg_IPTQGNuZSI3ghVRfsj0iLL_lk0wH2kiTv9b5TTf0d5EFjni0HbHUaN9w_iCTFqRJ2MCutLMk0RIXKRH75cudQLpKn8GKRhgAOzdGGsWNhwVChHeKvcIN8oj0G_WM0bfR1xiBvJcg2uKXQG-UtwTWMdffItFl1KAN1JOYStpfOPA3M_VCxGkR5bAGgsF9OLUj7BzEzI2UYEUxepf3Cu5cwLiN_5j3y66t8Z991pBxsYgc2VVPJNDrW0y9Tm874h6E8'
    ],
    size: '3 oz Jar',
    caloriesSummary: '78 kcal/can'
  },
  {
    id: 'atlantic-salmon-pate',
    name: 'Wild Atlantic Salmon Pâté',
    category: 'wet',
    subcategory: 'Artisanal Wet Pâté',
    price: 3.25,
    rating: 4.8,
    reviewsCount: 88,
    isBestseller: false,
    isNew: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7CspeahJJASy0d1rFeqQzzM6lWLfglN6fXzauiVAeywrl3jwD4LCJRUAuz0Y4VV9jf_sWlqawEvrsIqxwXMzFBRNC8JO4fchO6cPNJtIgoxBaZPk-lHns5TDnVC5Hx84kjr7RI_3_eGUuBz2688CvgC82cDuNMKaHJDvE9uo5utucoDgtPUmBdQOR8uQ8EO91GOoyqyQ3lMmpGQJ0fst2pJmfFOwYfbLTsp-gL5OqP7woTI-JshLa-qYcg5Ii1TyN7afq51Inscs',
    tags: ['Adult', 'Sensitive Stomach'],
    description: 'An elite single-protein pate utilizing freshly pulled coldwater Atlantic Salmon. Smooth, velvety consistency guarantees high palatability for the most discerning and senior guests.',
    ingredients: 'Atlantic Salmon, Salmon Bone Broth, Organic Peas, Flax Oil, Taurine, Sea Salt, Iron Proteinate, Niacin, Riboflavin.',
    guaranteedAnalysis: {
      protein: '11.0% Min',
      fat: '7.0% Min',
      fiber: '0.8% Max',
      moisture: '77.5% Max',
      ash: '2.0% Max',
      taurine: '0.14% Min',
      calories: '940 kcal/kg'
    },
    benefits: ['Single animal protein source minimizes food sensitivity reactions.', 'High hydration level promotes renal and urinary health.', 'Rich in taurine for optical and myocardial cellular support.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7CspeahJJASy0d1rFeqQzzM6lWLfglN6fXzauiVAeywrl3jwD4LCJRUAuz0Y4VV9jf_sWlqawEvrsIqxwXMzFBRNC8JO4fchO6cPNJtIgoxBaZPk-lHns5TDnVC5Hx84kjr7RI_3_eGUuBz2688CvgC82cDuNMKaHJDvE9uo5utucoDgtPUmBdQOR8uQ8EO91GOoyqyQ3lMmpGQJ0fst2pJmfFOwYfbLTsp-gL5OqP7woTI-JshLa-qYcg5Ii1TyN7afq51Inscs'
    ],
    size: '3 oz Jar',
    caloriesSummary: '82 kcal/can'
  },
  {
    id: 'turkey-pumpkin-feast',
    name: 'Turkey & Pumpkin Feast',
    category: 'wet',
    subcategory: 'Grain-Free Wet Stew',
    price: 3.40,
    rating: 4.7,
    reviewsCount: 64,
    isBestseller: false,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzYsDBoLpmoGO-bTTQGG1jBma0EyCcWU42vCCpzWWrAt506J29vhzVJW3kKGIW_nlusK9KLDTzeGH-mORC04JNTD6Z26dszcIHIMFQd7LuqZyzGcXkr7fNexw0WT6RYeU2q0lLuKQCs9E8siPJrJSm2OK8iytZOTrc-CoyGM0UrEolCXlahCAXxUsjQ4ey1KOAc7cSYVIcFIucC-i3R1QafJcwnAVRP9ViijSCYCyspHyQESkN99PAa8c9LW9O8u9RZdokt0P3TVs',
    tags: ['Adult', 'Weight Control'],
    description: 'Slow-stewed free-range turkey breast combined with pureed garden pumpkin and nutritious dandelion greens. Designed for lean muscle profiling and high satiety index.',
    ingredients: 'Free-Range Turkey, Turkey Broth, Pumpkin, Cranberries, Carrots, Chicory Root, Choline Chloride, Thiamine Mononitrate, L-Carnitine.',
    guaranteedAnalysis: {
      protein: '10.5% Min',
      fat: '4.5% Min',
      fiber: '1.5% Max',
      moisture: '80.0% Max',
      ash: '1.8% Max',
      taurine: '0.12% Min',
      calories: '860 kcal/kg'
    },
    benefits: ['Low fat level and slow carbohydrates assist active weight maintenance.', 'L-Carnitine enhances cellular fatty acid conversion.', 'Cranberries provide clinical urinary track defense.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzYsDBoLpmoGO-bTTQGG1jBma0EyCcWU42vCCpzWWrAt506J29vhzVJW3kKGIW_nlusK9KLDTzeGH-mORC04JNTD6Z26dszcIHIMFQd7LuqZyzGcXkr7fNexw0WT6RYeU2q0lLuKQCs9E8siPJrJSm2OK8iytZOTrc-CoyGM0UrEolCXlahCAXxUsjQ4ey1KOAc7cSYVIcFIucC-i3R1QafJcwnAVRP9ViijSCYCyspHyQESkN99PAa8c9LW9O8u9RZdokt0P3TVs'
    ],
    size: '3 oz Jar',
    caloriesSummary: '70 kcal/can'
  },
  {
    id: 'organic-chicken-kibble',
    name: 'Organic Free-Range Chicken Kibble',
    category: 'dry',
    subcategory: 'Complete & Balanced Kibble',
    price: 26.99,
    rating: 4.9,
    reviewsCount: 205,
    isBestseller: true,
    isNew: false,
    image: 'https://i.postimg.cc/R0tJxfp8/644a1d2203db19203-jpg-e1080.webp',
    tags: ['Adult', 'Hairball'],
    description: 'A masterpiece dry feeding profile utilizing USDA-certified organic free-range chicken, wholesome complex brown rice, and botanical fibers. Crafted to encourage pristine weight control and easy hairball passage.',
    ingredients: 'Organic Free-Range Chicken, Chicken Meal, Brown Rice, Oats, Chicken Fat, Kelp, Miscanthus Grass, Taurine, Rosemary Extract, Dried Lactobacillus Acidophilus.',
    guaranteedAnalysis: {
      protein: '34.0% Min',
      fat: '14.0% Min',
      fiber: '4.5% Max',
      moisture: '10.0% Max',
      ash: '6.5% Max',
      taurine: '0.20% Min',
      calories: '3,850 kcal/kg (approx. 410 kcal per cup)'
    },
    benefits: ['Sourced from sustainable family-run farms with animal welfare guidelines.', 'Organic miscanthus grass fiber aids healthy hairball transport.', 'Probiotics added post-extrusion for robust gastrointestinal resilience.'],
    galleryImages: [
      'https://i.postimg.cc/R0tJxfp8/644a1d2203db19203-jpg-e1080.webp'
    ],
    size: '4 lb Bag',
    caloriesSummary: '410 kcal/cup'
  },
  {
    id: 'indoor-vitality-protection',
    name: 'Indoor Vitality Protection',
    category: 'dry',
    subcategory: 'Adult Indoor Diet',
    price: 28.50,
    rating: 4.8,
    reviewsCount: 154,
    isBestseller: true,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-nWs5L3GgmnHNXogP0teCm3IwDpIz1TqAXaHWI75ODWglrBDyBQ5CuTfsUTZO12oIRfFFA5eWZg_oj1y8sJecH62LYT_iOpZ6QolnsZukowDfcx9Asa_5DhA8IGdJC7UIv4C9ZwPKrv3Ned97o1aUJyhLq2UMCYQTneUGtGECtJkIL44OgA5Tfc5r7HrRdIzfNeIAlRQQfT0GjbVqilWTMFe37JhcsZ58uZkOZi6Naq-GfMmCMdXOoFS49bgrA3AN1A_7tV9nQHo',
    tags: ['Adult', 'Weight Control'],
    description: 'An meticulously calorie-controlled kibble designed for low-activity indoor residents. Combines wild turkey meal with fibrous leafy alfalfa and antioxidant-rich wild blueberries.',
    ingredients: 'Turkey Meal, Peas, Lentils, Alfalfa Meal, Turkey Fat, Cranberries, Blueberries, Dried Yucca Schidigera Extract, Calcium Pantothenate, Yucca.',
    guaranteedAnalysis: {
      protein: '32.0% Min',
      fat: '11.0% Min',
      fiber: '6.0% Max',
      moisture: '10.0% Max',
      ash: '6.0% Max',
      taurine: '0.18% Min',
      calories: '3,550 kcal/kg'
    },
    benefits: ['Yucca Schidigera extract dramatically reduces litter box odor volatiles.', 'Carefully optimized fat percentage locks down body composition safely.', 'Concentrated anthocyanins for systemic immunological protection.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-nWs5L3GgmnHNXogP0teCm3IwDpIz1TqAXaHWI75ODWglrBDyBQ5CuTfsUTZO12oIRfFFA5eWZg_oj1y8sJecH62LYT_iOpZ6QolnsZukowDfcx9Asa_5DhA8IGdJC7UIv4C9ZwPKrv3Ned97o1aUJyhLq2UMCYQTneUGtGECtJkIL44OgA5Tfc5r7HrRdIzfNeIAlRQQfT0GjbVqilWTMFe37JhcsZ58uZkOZi6Naq-GfMmCMdXOoFS49bgrA3AN1A_7tV9nQHo'
    ],
    size: '4 lb Bag',
    caloriesSummary: '375 kcal/cup'
  },
  {
    id: 'kitten-growth-wellness',
    name: 'Kitten Growth & Wellness Formula',
    category: 'dry',
    subcategory: 'Junior Growth Formula',
    price: 29.99,
    rating: 4.9,
    reviewsCount: 110,
    isBestseller: false,
    isNew: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYQkb1H0zrOp-rlcJiytaM7XfHQi6Qd5CuyhW4aON57zhdP2ChDoSXZ9ZUvHrS8-4LO96g0ymINM5okFa7dz2Ngk6ubgiD9TtKrDOMsOszLuikWexuIE5J17mDQHRHWWUIJDyZuWHRQBhor29xQRDMWBh9M6rClkJJFC_B9SFyYglnZ3OlS8HEloE6gc_dNUHMbYthvZqQuBNqEeHjLU4Z0gE__F1PJ-KY9hDZ65TkBiBtlj3zoxEUMWUNEx6V9jl1CT9NnTJh3Ok',
    tags: ['Kitten', 'Sensitive Stomach'],
    description: 'Nurture their foundational stage with robust, dense nutrition. Specially enriched with pure colostrum, oceanic DHA for sensory neural acceleration, and highly assimilable calcium complexes.',
    ingredients: 'Deboned Chicken, Chicken Meal, Egg Product, Herring Meal, Dried Beet Pulp, Fish Oil (source of DHA), Colostrum Powder, Dicalcium Phosphate, Folic Acid.',
    guaranteedAnalysis: {
      protein: '38.0% Min',
      fat: '18.0% Min',
      fiber: '3.0% Max',
      moisture: '10.0% Max',
      ash: '7.2% Max',
      taurine: '0.22% Min',
      calories: '4,150 kcal/kg'
    },
    benefits: ['Natural DHA structural support for advanced retinal development.', 'Colostrum inclusion boosts naive immune response efficiency.', 'Extra micro-kibble sizing caters to tender deciduous teeth.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYQkb1H0zrOp-rlcJiytaM7XfHQi6Qd5CuyhW4aON57zhdP2ChDoSXZ9ZUvHrS8-4LO96g0ymINM5okFa7dz2Ngk6ubgiD9TtKrDOMsOszLuikWexuIE5J17mDQHRHWWUIJDyZuWHRQBhor29xQRDMWBh9M6rClkJJFC_B9SFyYglnZ3OlS8HEloE6gc_dNUHMbYthvZqQuBNqEeHjLU4Z0gE__F1PJ-KY9hDZ65TkBiBtlj3zoxEUMWUNEx6V9jl1CT9NnTJh3Ok'
    ],
    size: '4 lb Bag',
    caloriesSummary: '445 kcal/cup'
  },
  {
    id: 'freeze-dried-heritage-turkey',
    name: 'Freeze-Dried Heritage Turkey Treats',
    category: 'treats',
    subcategory: 'Single-Ingredient Treats',
    price: 11.99,
    rating: 4.95,
    reviewsCount: 310,
    isBestseller: true,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvQRdKPkVLvmFIUjX_5fpYuJ7TEg1KURW4riXkcL9GX2hdv3pLQ5jPl2q4OJcnyDNkWPQOp9KK1Hf2LUnbY6M1WHhkXq-XdeN_B1gHxqjgh1L8QjiiNPhwncQRdWCYsVKAOcv38KhALZWy6eCqAd1zeo9Z5sBMamRtHFtDXPzoaBDo_znQkxfDYqWECr8MsttlAdcGAUPiUkDLono51HxfZ1Ebz_k66GMhzwB7aU2JSa2w9Z5mlGQ-S7mOyRvhvH9PvmVtg0IO2z8',
    tags: ['Adult', 'Sensitive Stomach'],
    description: '100% pure premium heritage turkey breast, ultra-gently freeze-dried at -40°F to retain crucial cell enzymes and volatile meat aromas. Perfect zero-additives incentive for training, toppers, or luxury pampering.',
    ingredients: '100% Raw Heritage Turkey Breast.',
    guaranteedAnalysis: {
      protein: '78.0% Min',
      fat: '6.0% Min',
      fiber: '0.5% Max',
      moisture: '5.0% Max',
      ash: '4.8% Max',
      taurine: '0.12% Min',
      calories: '3,900 kcal/kg (approx. 2.4 kcal per piece)'
    },
    benefits: ['Zero grains, zero binders, zero artificial flavorings, or chemical curing steps.', 'High structural protein concentration supports dynamic cellular tissue and muscle.', 'Moisture can be easily restored with custom warm bone broth.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvQRdKPkVLvmFIUjX_5fpYuJ7TEg1KURW4riXkcL9GX2hdv3pLQ5jPl2q4OJcnyDNkWPQOp9KK1Hf2LUnbY6M1WHhkXq-XdeN_B1gHxqjgh1L8QjiiNPhwncQRdWCYsVKAOcv38KhALZWy6eCqAd1zeo9Z5sBMamRtHFtDXPzoaBDo_znQkxfDYqWECr8MsttlAdcGAUPiUkDLono51HxfZ1Ebz_k66GMhzwB7aU2JSa2w9Z5mlGQ-S7mOyRvhvH9PvmVtg0IO2z8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLhlZA2BGQD7IwoCWmhdH-l4iVvsyXxt7_9isPINbOvQ4fpMzgq2s1_VDsgs1Rk-9GZDJmf3jThR5SLwvjx0FlHtdSalQwvBFKph2DGLRDzUD9CQpCIrLTASmVWVi-05XfFhosWo6MDdPoAUTlcaiNKUS0P6SRjvt5U3g_R6P8p8BWYTrBvjk9ji9xhn-9v0IU-N0-1Mx_zpRFW0iTtawc2ISzwIZzQM8s_TEI1cQEZ5mdyRYKGTy4fVdWRqQPgw_NQR3UyPJ6njA'
    ],
    size: '2.5 oz Bag',
    caloriesSummary: '2.4 kcal/treat'
  },
  {
    id: 'salmon-pumpkin-crisp',
    name: 'Salmon & Pumpkin Crisp Dry',
    category: 'dry',
    subcategory: 'Sensitive Stomach Dry Diet',
    price: 29.50,
    rating: 4.8,
    reviewsCount: 94,
    isBestseller: false,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOhAYYfhfIF9_lYwfoQ-rvJDcYqU18ZAGbEnt9ojRZGEci-uzBgRxzsjm73ag1hX7ijTHdl9ZIXS1Dfkji5NdyKLIvkXnZGAWSX7sJs3FDS0zl2WkeEOdhUrG4DNzCnAkfQGxkCc-S4nNDlECptvDOz1OIcmq-At5s1UicBgu-IGXe-myIT5-gr_4JRUzP97-jVkUjVD2sT_fJat2-eBZKDWlXw50Ikp2cVX5AQp946XRQCrXsdXfPGVWYJjXuu-SgdKGxIw3Ngic',
    tags: ['Adult', 'Sensitive Stomach'],
    description: 'An advanced kibble recipe blending coldwater ocean-caught salmon with prebiotic pumpkin flesh and tender sweet potatoes. Optimized to decrease stool odor and settle easily in delicate cat gastrointestinal pathways.',
    ingredients: 'Salmon, Salmon Meal, Sweet Potatoes, Pumpkin, Canola Oil, Peas, Dried Chicory Root, Brewer’s Yeast, Fructooligosaccharides.',
    guaranteedAnalysis: {
      protein: '31.0% Min',
      fat: '13.0% Min',
      fiber: '4.0% Max',
      moisture: '10.0% Max',
      ash: '6.2% Max',
      taurine: '0.16% Min',
      calories: '3,780 kcal/kg'
    },
    benefits: ['Excellent high-purity ocean protein supplies rich essential amino acids.', 'Pumpkin prebiotics accelerate bowel microflora proliferation.', 'Low starch loading layout decreases flatulence probability.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOhAYYfhfIF9_lYwfoQ-rvJDcYqU18ZAGbEnt9ojRZGEci-uzBgRxzsjm73ag1hX7ijTHdl9ZIXS1Dfkji5NdyKLIvkXnZGAWSX7sJs3FDS0zl2WkeEOdhUrG4DNzCnAkfQGxkCc-S4nNDlECptvDOz1OIcmq-At5s1UicBgu-IGXe-myIT5-gr_4JRUzP97-jVkUjVD2sT_fJat2-eBZKDWlXw50Ikp2cVX5AQp946XRQCrXsdXfPGVWYJjXuu-SgdKGxIw3Ngic'
    ],
    size: '4 lb Bag',
    caloriesSummary: '395 kcal/cup'
  },
  {
    id: 'senior-weight-control',
    name: 'Senior Weight Control Dry Food',
    category: 'dry',
    subcategory: 'Weight & Hairball Care',
    price: 31.50,
    rating: 4.75,
    reviewsCount: 76,
    isBestseller: false,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvpilXpicKkNRAO33N5pPg7j6alxR76pFOmuglRYgUDG0TylAt5tkz55r5fRPa1A5uau71XXm7QTIUpFptq-O764Vf8qmNQKfKgdewP0x8f1PFsik7s3ZKKnFh_sVMY8hr-UJeX6LhV1BtRJEwCIgWNSl6L_3x_nFyvBS-I69IUskKWzm-o1Dn68JeNuTTfAyafd5q4tODcvfmXVmYnMREoZdg6XtnW8pnlVENozYHzU4BiYV0XH9eIx_JBZofwAkYfclHKSmOdt8',
    tags: ['Senior', 'Weight Control'],
    description: 'Designed exclusively for senior felines over 7 years. Low-density carbohydrate structure with custom fiber densities blocks body weight creep while soothing aging joint matrixes via native glucosamine.',
    ingredients: 'Chicken Meal, Brown Rice, Alfalfa Fiber, Tomato Pomace, Chicken Fat (Preserved with Mixed Tocopherols), Glucosamine Hydrochloride, Chondroitin Sulfate.',
    guaranteedAnalysis: {
      protein: '29.0% Min',
      fat: '9.0% Min',
      fiber: '7.5% Max',
      moisture: '10.0% Max',
      ash: '5.8% Max',
      taurine: '0.15% Min',
      calories: '3,320 kcal/kg'
    },
    benefits: ['Glucosamine & Chondroitin support joint cartilage integrity.', 'High-density fiber profile minimizes hunger crying between meals.', 'Optimized dry crunch removes dental plaque safely.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvpilXpicKkNRAO33N5pPg7j6alxR76pFOmuglRYgUDG0TylAt5tkz55r5fRPa1A5uau71XXm7QTIUpFptq-O764Vf8qmNQKfKgdewP0x8f1PFsik7s3ZKKnFh_sVMY8hr-UJeX6LhV1BtRJEwCIgWNSl6L_3x_nFyvBS-I69IUskKWzm-o1Dn68JeNuTTfAyafd5q4tODcvfmXVmYnMREoZdg6XtnW8pnlVENozYHzU4BiYV0XH9eIx_JBZofwAkYfclHKSmOdt8'
    ],
    size: '4 lb Bag',
    caloriesSummary: '340 kcal/cup'
  },
  {
    id: 'wild-atlantic-whitefish',
    name: 'Wild-Caught Atlantic Whitefish Dry Recipe',
    category: 'dry',
    subcategory: 'High Protein Dry Diet',
    price: 32.99,
    rating: 4.85,
    reviewsCount: 118,
    isBestseller: true,
    isNew: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGKYJ1JQJe8fugXZ9I_nBHokrr6o5hl4eZ-m75sgolCURgu-M47hoXmIfVI8qyCSwaMlKo_QE3Jb4aVK-dvl2ivaxjQ-r3LbE8SgpnHjcC7qPSpYjwHcN_kpCrmmULLvo84UxKqpa2rPnqgncnltTlME8ZeAHlyKoj1Vi5L62SrJUmEhCvp_2ykLy0LOfimVlnMiAysowzTn-vpRimc3swovvkAUGUzfbVt4m3EEyvvIoLeaADhclSKSE2B0_fInLNXbD5azEDEyM',
    tags: ['Adult', 'Hairball'],
    description: 'High-altitude formulation featuring coldwater whitefish species. Exceptionally high density of noble amino profile triggers active cell growth and sleek, luxurious hair coatings.',
    ingredients: 'Whitefish, Herring Meal, Peas, Lentils, Salmon Oil, Dried Yeast, Chicory Root, Cranberry, Spinach, Turmeric Root Extract.',
    guaranteedAnalysis: {
      protein: '35.0% Min',
      fat: '15.0% Min',
      fiber: '4.0% Max',
      moisture: '10.0% Max',
      ash: '6.8% Max',
      taurine: '0.20% Min',
      calories: '3,920 kcal/kg'
    },
    benefits: ['Packed with antioxidant turmeric root for cellular damage defense.', 'Excellent palatability satisfies fish hunters effortlessly.', 'Natural plant cellulose controls internal hairball formation.'],
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGKYJ1JQJe8fugXZ9I_nBHokrr6o5hl4eZ-m75sgolCURgu-M47hoXmIfVI8qyCSwaMlKo_QE3Jb4aVK-dvl2ivaxjQ-r3LbE8SgpnHjcC7qPSpYjwHcN_kpCrmmULLvo84UxKqpa2rPnqgncnltTlME8ZeAHlyKoj1Vi5L62SrJUmEhCvp_2ykLy0LOfimVlnMiAysowzTn-vpRimc3swovvkAUGUzfbVt4m3EEyvvIoLeaADhclSKSE2B0_fInLNXbD5azEDEyM'
    ],
    size: '4 lb Bag',
    caloriesSummary: '418 kcal/cup'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'FLN-9214-A',
    date: 'October 14, 2026',
    amount: 14.00,
    items: [
      {
        id: 'gourmet-salmon-pumpkin',
        name: 'G gourmet Salmon & Pumpkin',
        price: 3.50,
        quantity: 4,
        image: 'https://i.postimg.cc/5t54qfb2/GKm-YEXf-OEOGwbh-E9QYOz-G6a7r9eku-UKMjsuq-Ngu0h-ZRFb-SA7ix-DQ9Sm-PJg-Ll-RVJsrzh-X3n-Yt-NPWAMr0esdy6u.jpg'
      }
    ],
    status: 'Delivered'
  },
  {
    id: 'FLN-8110-B',
    date: 'September 28, 2026',
    amount: 32.99,
    items: [
      {
        id: 'wild-atlantic-whitefish',
        name: 'Wild-Caught Atlantic Whitefish Dry Recipe',
        price: 32.99,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGKYJ1JQJe8fugXZ9I_nBHokrr6o5hl4eZ-m75sgolCURgu-M47hoXmIfVI8qyCSwaMlKo_QE3Jb4aVK-dvl2ivaxjQ-r3LbE8SgpnHjcC7qPSpYjwHcN_kpCrmmULLvo84UxKqpa2rPnqgncnltTlME8ZeAHlyKoj1Vi5L62SrJUmEhCvp_2ykLy0LOfimVlnMiAysowzTn-vpRimc3swovvkAUGUzfbVt4m3EEyvvIoLeaADhclSKSE2B0_fInLNXbD5azEDEyM'
      }
    ],
    status: 'Delivered'
  },
  {
    id: 'FLN-7612-Z',
    date: 'August 11, 2026',
    amount: 38.98,
    items: [
      {
        id: 'kitten-growth-wellness',
        name: 'Kitten Growth & Wellness Formula',
        price: 29.99,
        quantity: 1,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYQkb1H0zrOp-rlcJiytaM7XfHQi6Qd5CuyhW4aON57zhdP2ChDoSXZ9ZUvHrS8-4LO96g0ymINM5okFa7dz2Ngk6ubgiD9TtKrDOMsOszLuikWexuIE5J17mDQHRHWWUIJDyZuWHRQBhor29xQRDMWBh9M6rClkJJFC_B9SFyYglnZ3OlS8HEloE6gc_dNUHMbYthvZqQuBNqEeHjLU4Z0gE__F1PJ-KY9hDZ65TkBiBtlj3zoxEUMWUNEx6V9jl1CT9NnTJh3Ok'
      },
      {
        id: 'gourmet-salmon-pumpkin',
        name: 'Gourmet Salmon & Pumpkin',
        price: 3.50,
        quantity: 2,
        image: 'https://i.postimg.cc/5t54qfb2/GKm-YEXf-OEOGwbh-E9QYOz-G6a7r9eku-UKMjsuq-Ngu0h-ZRFb-SA7ix-DQ9Sm-PJg-Ll-RVJsrzh-X3n-Yt-NPWAMr0esdy6u.jpg'
      }
    ],
    status: 'Delivered'
  }
];
