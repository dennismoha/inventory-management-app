import { StaticImageData } from 'next/image';

export interface CheckoutProducts {
  productId: number; // productId is a number
  name: string; // name is a string
  price: number; // price is a number
  image?: string | StaticImageData; // image is a string (URL or path to the image)
  description: string; // description is a string
  slug: string; // slug is a string, typically used for SEO-friendly URLs
}
