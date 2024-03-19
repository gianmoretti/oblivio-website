export interface Section {
  title: string,
  description: string,
  icon?: string,
  image?: {
    desktop: string,
    mobile: string,
    alt: string,
  },
  video?: string,
  backgroundColor?: string,
  textColor?: string,
  alignment?: string,
  order?: string,
  cta?: {
    label: string,
    url: string,
    backgroundColor?: string,
    backgroundColorOnHover?: string,
    textColor?: string,
  }
}

export interface Feature {
  title: string,
  description: string,
}

export type Revenue = {
  month: string,
  revenue: number,
}

export type LatestAsset = {
  id: string,
  name: string,
  image_url: string,
  email: string,
  amount: string,
}

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestAssetRaw = Omit<LatestAsset, "amount"> & {
  amount: number,
}

export type AssetsTable = {
  id: string,
  customer_id: string,
  name: string,
  email: string,
  image_url: string,
  date: string,
  amount: number,
  status: "pending" | "paid",
}

export type DesignatedTableType = {
  id: string,
  name: string,
  email: string,
  image_url: string,
  total_assets: number,
  total_pending: number,
  total_paid: number,
}

export type FormattedDesignatedTable = {
  id: string,
  name: string,
  email: string,
  image_url: string,
  total_assets: number,
  total_pending: string,
  total_paid: string,
}

export type DesignatedField = {
  id: string,
  name: string,
}

export type AssetForm = {
  id: string,
  customer_id: string,
  amount: number,
  status: "pending" | "paid",
}
