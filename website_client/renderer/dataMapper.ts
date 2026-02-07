// renderer/dataMapper.ts
// Maps backend data format to component prop format

type SectionContent = Record<string, any>;

export function mapSectionData(type: string, content: SectionContent): SectionContent {
  switch (type) {
    case 'hero':
      return {
        title: content.heading,
        subtitle: content.subheading,
        ctaText: content.ctaText,
        ctaLink: content.ctaLink,
        tagline: content.tagline,
        backgroundImage: content.backgroundImage,
        alignment: content.alignment,
      };

    case 'about':
      return {
        heading: content.heading,
        description: content.text,
        imageUrl: content.image,
        imagePosition: content.imagePosition,
        stats: content.stats || [],
      };

    case 'features':
      return {
        heading: content.title,
        subtitle: content.subtitle,
        items: content.features?.map((feat: any) => ({
          icon: feat.icon,
          title: feat.title,
          description: feat.description,
          imageUrl: feat.image,
        })) || [],
        layout: content.layout,
        columns: content.columns,
      };

    case 'gallery':
      return {
        heading: content.heading,
        subtitle: content.subtitle,
        images: content.images?.map((img: any) => ({
          src: img.url,
          alt: img.alt,
          caption: img.caption,
        })) || [],
        layout: content.layout,
        columns: content.columns,
      };

    case 'testimonials':
      return {
        heading: content.title,
        items: content.testimonials?.map((t: any) => ({
          name: t.name,
          role: t.role,
          message: t.text,
          avatar: t.avatar,
          rating: t.rating,
        })) || [],
        layout: content.layout,
      };

    case 'contact':
      return {
        heading: content.heading,
        description: content.subtitle,
        email: content.email,
        phone: content.phone,
        address: content.address,
        formFields: content.formFields || [],
        submitText: content.submitText,
      };

    case 'cta':
      return {
        heading: content.heading,
        subheading: content.text,
        buttonText: content.primaryButton?.text,
        buttonLink: content.primaryButton?.link,
        secondaryButtonText: content.secondaryButton?.text,
        secondaryButtonLink: content.secondaryButton?.link,
      };

    case 'footer':
      return {
        logoText: content.logo,
        description: content.description,
        text: content.copyright,
        links: content.links?.map((link: any) => ({
          label: link.label,
          href: link.url,
        })) || [],
        socialLinks: content.social?.map((s: any) => ({
          name: s.platform,
          href: s.url,
        })) || [],
      };

    case 'navbar':
      return {
        logoText: content.logoText || content.logo,
        links: content.links?.map((link: any) => ({
          label: link.label,
          href: link.url,
        })) || [],
        demoButtonText: content.demoButtonText,
      };

    default:
      // Return content as-is if no mapping defined
      return content;
  }
}
