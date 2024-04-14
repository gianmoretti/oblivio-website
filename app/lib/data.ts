import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';
import { User, Designated } from './model';
import * as changeCase from "change-case";

export async function fetchDesignatedById(id: string) {
  noStore();

  try {
    const response: any = await execBackendQuery("GET", `designateds/${id}`);
    console.log("response:", response);
    const designated = Object.fromEntries(
      Object.entries(response).map(([key, value]) => [changeCase.camelCase(key), value])
    ) as any as Designated;
    return designated
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all designated.");
  }
}

export async function fetchDesignated() {
  noStore();
  try {
    const response: any[] = await execBackendQuery("GET", 'designateds');
    console.log("response:", response);
    const camelCaseArray = response.map(obj =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [changeCase.camelCase(key), value])
      )
    );
    console.log("camelCaseObject:", camelCaseArray);
    const designateds = camelCaseArray as any as Designated[];
    console.log("designateds:", designateds);
    return designateds as Designated[];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all designated.");
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

async function execBackendQuery(method: string, apiPath: string) {
  console.log("method:", method);
  const fullPath = `${process.env.BACKEND_API_URL!!}/api/${apiPath}`;
  console.log("fullPath:", fullPath);
  const response = await fetch(fullPath, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  return result;
}