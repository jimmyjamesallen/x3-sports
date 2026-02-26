import { sanityClient } from 'sanity:client';

export const client = sanityClient;

export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    title,
    logo,
    phone,
    email,
    address,
    businessHours,
    socialLinks
  }`,

  navigation: `*[_type == "navigation"][0]{
    items[]{
      label,
      link,
      children[]{
        label,
        link
      }
    }
  }`,

  allPages: `*[_type == "page"] | order(title asc){
    title,
    slug,
    seo
  }`,

  pageBySlug: `*[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    seo
  }`,

  allHeroes: `*[_type == "hero"]{
    title,
    heading,
    subheading,
    backgroundImage,
    ctaText,
    ctaLink
  }`,

  allServices: `*[_type == "service"] | order(order asc){
    title,
    slug,
    description,
    icon,
    image,
    order
  }`,

  serviceBySlug: `*[_type == "service" && slug.current == $slug][0]{
    title,
    slug,
    description,
    icon,
    image
  }`,

  allTestimonials: `*[_type == "testimonial"]{
    name,
    role,
    company,
    quote,
    image,
    rating
  }`,

  allFaqs: `*[_type == "faq"] | order(order asc){
    question,
    answer,
    category,
    order
  }`,

  faqsByCategory: `*[_type == "faq" && category == $category] | order(order asc){
    question,
    answer,
    category,
    order
  }`,
};
