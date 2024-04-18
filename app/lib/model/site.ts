export interface GraphQLSection {
  title: string,
  description: string,
  richDescription: {
    html: string,
    text: string,
  },
  alignment?: string,
  backgroundColor?: {
    hex: string,
  },
  ctaBackgroundColor?: {
    hex: string,
  },
  ctaLabel?: string,
  ctaOnHoverColor?: {
    hex: string,
  },
  ctaTextColor?: {
    hex: string,
  },
  ctaUrl?: string,
  desktopImage?: {
    url: string,
  },
  mobileImage: {
    url: string,
  },
  order?: string,
  textColor?: {
    hex: string,
  },
  type: string,
}

export interface Plan {
  name: string;
  price: string;
  color: { hex: string };
  planFeatures: PlanFeature[];
}

export interface PlanFeature {
  description: string;
  notes?: string;
}