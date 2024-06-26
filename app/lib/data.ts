import { User, Designated, Asset } from './model/product';
import * as changeCase from "change-case";
import { unstable_noStore as noStore } from 'next/cache';
import { allAssets, allDesignatedUsers } from './fixture/fake-data';
import { execBackendQuery } from './utils';

/* Public site */
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

/* Private site */

export async function fetchFakeAssets() {
  noStore();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    return Promise.resolve(allAssets);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all asset data");
  }
}

export async function fetchSummaryCardsData() {
  noStore();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const numberOfAssets = await Promise.resolve(allAssets.length);
    const numberOfDesignated = await Promise.resolve(allDesignatedUsers.length);
    const nextCheckData = await Promise.resolve('31-12-2024');

    return {
      numberOfAssets,
      numberOfDesignated,
      nextCheckData,

    };
  } catch (error) {
    console.error("Some errors during data fetching:", error);
    throw new Error("Failed to fetch summary cards data.");
  }
}


export async function fetchFakeDesignated() {
  noStore();


  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    return Promise.resolve(allDesignatedUsers)
  } catch (error) {
    allDesignatedUsers
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all designated data.");
  }
}

export async function fetchAllDesignated() {
  noStore();
  try {
    const response: any[] = await execBackendQuery("GET", 'designateds');
    const designateds = response.map(obj =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [changeCase.camelCase(key), value])
      )
    ) as any as Designated[];
    return designateds;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all designated.");
  }
}

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


export async function fetchAllAssets() {
  noStore();
  try {
    const response: any[] = await execBackendQuery("GET", 'assets');
    console.log("response:", response);
    const camelCaseArray = response.map(obj =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [changeCase.camelCase(key), value])
      )
    );
    console.log("camelCaseObject:", camelCaseArray);
    const assets = camelCaseArray as any as Asset[];
    console.log("assets:", assets);
    return assets as Asset[];
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all assets.");
  }
}

export async function fetchAssetById(id: string) {
  noStore();

  try {
    const response: any = await execBackendQuery("GET", `assets/${id}`);
    return Object.fromEntries(Object.entries(response).map(([key, value]) => [changeCase.camelCase(key), value])) as any as Asset;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all assets.");
  }
}

export async function fetchEnrichedAssetById(id: string) {
  noStore();

  try {
    const response: any = await execBackendQuery("GET", `assets/${id}/enriched`);
    const asset = Object.fromEntries(Object.entries(response.asset).map(([key, value]) => [changeCase.camelCase(key), value])) as any as Asset;
    asset.designatedList = response.designated_list
      .map((it: any) => Object.fromEntries(Object.entries(it).map(([key, value]) => [changeCase.camelCase(key), value])) as any as Designated);
    ;
    return asset
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all assets.");
  }
}

export async function getUser(email: string, password: string) {
  try {
    const user = await execBackendQuery("POST", `auth/login`, {
      email,
      password,
    });
    const normalizedUser = Object.fromEntries(Object.entries(user).map(([key, value]) => [changeCase.camelCase(key), value])) as any as User;
    return {
      ...normalizedUser,
      name: `${normalizedUser.firstName} ${normalizedUser.lastName}`,
    } as any as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}