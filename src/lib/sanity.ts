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

  allCoaches: `*[_type == "coach"]{
    name,
    slug,
    bio,
    photo,
    specialties
  }`,

  coachBySlug: `*[_type == "coach" && slug.current == $slug][0]{
    name,
    slug,
    bio,
    photo,
    specialties
  }`,

  allClassTypes: `*[_type == "classType"] | order(order asc){
    title,
    slug,
    description,
    image,
    order
  }`,

  classTypeBySlug: `*[_type == "classType" && slug.current == $slug][0]{
    title,
    slug,
    description,
    image
  }`,

  allClassSchedules: `*[_type == "classSchedule"] | order(day asc, time asc){
    day,
    time,
    classType->{title, slug},
    coach->{name, slug},
    duration
  }`,

  scheduleByDay: `*[_type == "classSchedule" && day == $day] | order(time asc){
    day,
    time,
    classType->{title, slug},
    coach->{name, slug},
    duration
  }`,

  allMembershipTiers: `*[_type == "membershipTier"] | order(order asc){
    name,
    price,
    interval,
    features,
    highlighted,
    order
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
