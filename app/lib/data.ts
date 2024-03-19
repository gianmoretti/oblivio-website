import { sql } from "@vercel/postgres";
import {
  DesignatedField,
  DesignatedTableType,
  AssetForm,
  AssetsTable,
  LatestAssetRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";
import { unstable_noStore as noStore } from 'next/cache';
import { User } from "./model";

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  noStore();

  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestAssets() {
  noStore();

  try {
    const data = await sql<LatestAssetRaw>`
      SELECT assets.amount, designated.name, designated.image_url, designated.email, assets.id
      FROM invoices as assets
      JOIN customers as designated ON assets.customer_id = designated.id
      ORDER BY assets.date DESC
      LIMIT 5`;

    const latestAssets = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestAssets;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest assets.");
  }
}

export async function fetchCardData() {
  noStore();

  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices as assets`;
    const designatedCountPromise = sql`SELECT COUNT(*) FROM customers as designated`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices as assets`;

    const data = await Promise.all([
      invoiceCountPromise,
      designatedCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfAssets = Number(data[0].rows[0].count ?? "0");
    const numberOfDesignated = Number(data[1].rows[0].count ?? "0");
    const totalPaidAssets = formatCurrency(data[2].rows[0].paid ?? "0");
    const totalPendingAssets = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfDesignated,
      numberOfAssets,
      totalPaidAssets,
      totalPendingAssets,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredAssets(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const assets = await sql<AssetsTable>`
      SELECT
        assets.id,
        assets.amount,
        assets.date,
        assets.status,
        designated.name,
        designated.email,
        designated.image_url
      FROM invoices as assets
      JOIN customers as designated ON assets.customer_id = designated.id
      WHERE
        designated.name ILIKE ${`%${query}%`} OR
        designated.email ILIKE ${`%${query}%`} OR
        assets.amount::text ILIKE ${`%${query}%`} OR
        assets.date::text ILIKE ${`%${query}%`} OR
        assets.status ILIKE ${`%${query}%`}
      ORDER BY assets.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return assets.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch assets.");
  }
}

export async function fetchAssetsPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices as assets
    JOIN customers as designated ON assets.customer_id = designated.id
    WHERE
      designated.name ILIKE ${`%${query}%`} OR
      designated.email ILIKE ${`%${query}%`} OR
      assets.amount::text ILIKE ${`%${query}%`} OR
      assets.date::text ILIKE ${`%${query}%`} OR
      assets.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of assets.");
  }
}

export async function fetchAssetById(id: string) {
  noStore();

  try {
    const data = await sql<AssetForm>`
      SELECT
        assets.id,
        assets.customer_id,
        assets.amount,
        assets.status
      FROM invoices as assets
      WHERE assets.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchDesignated() {
  noStore();

  try {
    const data = await sql<DesignatedField>`
      SELECT
        id,
        name
      FROM customers as designated
      ORDER BY name ASC
    `;

    const designated = data.rows;
    return designated;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all designated.");
  }
}

export async function fetchFilteredDesignated(query: string) {
  noStore();

  try {
    const data = await sql<DesignatedTableType>`
		SELECT
		  designated.id,
		  designated.name,
		  designated.email,
		  designated.image_url,
		  COUNT(assets.id) AS total_assets,
		  SUM(CASE WHEN assets.status = 'pending' THEN assets.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN assets.status = 'paid' THEN assets.amount ELSE 0 END) AS total_paid
		FROM customers as designated
		LEFT JOIN invoices as assets ON designated.id = assets.customer_id
		WHERE
		  designated.name ILIKE ${`%${query}%`} OR
        designated.email ILIKE ${`%${query}%`}
		GROUP BY designated.id, designated.name, designated.email, designated.image_url
		ORDER BY designated.name ASC
	  `;

    const designated = data.rows.map((designated) => ({
      ...designated,
      total_pending: formatCurrency(designated.total_pending),
      total_paid: formatCurrency(designated.total_paid),
    }));

    return designated;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch designated table.");
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function loadSubscriptionPlanSection() {
  const query: string = `
    query SubscriptionPlanSection {
      section(where: {
        type: SubscriptionPlan
      }) {
        title
        richDescription{
          html
          text
        }
      }
    }`;
  return execGraphQLQuery(query);
}

export async function loadSubscriptionPlans() {
  const query: string = `
    query SubscriptionPlans {
        subscriptionPlans {
                name
                price
            richDescription {
                html
            }
            color {
                hex
                css
            }
            planFeatures {
                description
                notes
            }
        }
    }`;
  return execGraphQLQuery(query);
}

export async function loadProcessSection() {
  const query: string = `
    query ProcessSection {
      section(where: {
        type: Process
      }) {
        title
        richDescription{
          html
          text
        }
        desktopImage {
          url
        }
        mobileImage{
          url
        }
      }
    }`;
  return execGraphQLQuery(query);
}

export async function loadHeroSection() {
  const query: string = `
    query HeroSection {
      section(where: {
        type: Hero
      }) {
        title
        description
        desktopImage{
          url
        }
        mobileImage{
          url
        }
      }
    }`;
  return execGraphQLQuery(query);
}

export async function loadReasonSection() {
  const query: string = `
    query ReasonSection {
      section(where: {
        type: Reason
      }) {
        title
        description
      }
    }`;
  return execGraphQLQuery(query);
}

export async function loadEnrollmentSection() {
  const query: string = `
    query EnrollmentSection {
      section(where: {
        type: Enrollment
      }) {
        title
        description
      }
    }`;
  return execGraphQLQuery(query);
}

export async function loadAllFeaturesSection() {
  const query: string = `
    query AllFeaturesSection {
      productFeatures{
          title
          description
        }
      }`;
  ;
  return execGraphQLQuery(query);
}

async function execGraphQLQuery(query: string) {
  const response = await fetch(process.env.CMS_API_URL!!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CMS_API_KEY}`
    },
    body: JSON.stringify({
      query
    }),
  });
  const result = await response.json();
  return result;
}