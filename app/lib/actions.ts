'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { unstable_noStore as noStore } from 'next/cache';
import { execBackendQuery } from './utils';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const DesignatedValidationSchema = z.object({
    id: z.string(),
    firstName: z.string({ invalid_type_error: 'Please insert a valid first name.' })
        .min(1, { message: "This field has to be filled." }),
    lastName: z.string({ invalid_type_error: 'Please insert a valid last name.' })
        .min(1, { message: "This field has to be filled." }),
    fiscalCode: z.string({ invalid_type_error: 'Please insert a fiscal code.' })
        .min(1, { message: "This field has to be filled." }),
    email: z.string({ invalid_type_error: 'Please insert a valid email.' })
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    birthPlace: z.string({ invalid_type_error: 'Please insert a valid birth place.' })
        .min(1, { message: "This field has to be filled." }),
    birthDate: z.coerce.date()
        .refine((date) => date < new Date(), { message: 'Birth date must be in the past' }),
    residence: z.string({ invalid_type_error: 'Please insert a valid residence.' })
        .min(1, { message: "This field has to be filled." }),
    phoneNumber: z.string({ invalid_type_error: 'Please insert a valid phoneNumber.' })
        .min(1, { message: "This field has to be filled." })
        .regex(phoneRegex, 'Invalid Number!'),
});

const AssetValidationSchema = z.object({
    id: z.string(),
    category: z.string({ invalid_type_error: 'Please insert a valid category.' })
        .min(1, { message: "This field has to be filled." }),
    name: z.string({ invalid_type_error: 'Please insert a valid name.' })
        .min(1, { message: "This field has to be filled." }),
    description: z.string({ invalid_type_error: 'Please insert a valid description.' })
        .min(1, { message: "This field has to be filled." }),
});

const AssetWithDesignatedValidationSchema = z.object({
    designatedIds: z.string().regex(/^\d+(,\d+)*$/, "This field should be a valid list of numbers"),
});

const DesignatedToSave = DesignatedValidationSchema.omit({ id: true, date: true });
const AssetToSave = AssetValidationSchema.omit({ id: true, date: true });

export type DesignatedState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        fiscalCode?: string[];
        email?: string[];
        birthPlace?: string[];
        birthDate?: string[];
        residence?: string[];
        phoneNumber?: string[];
    };
    message?: string | null;
};

export type AssetState = {
    errors?: {
        category?: string[];
        name?: string[];
        description?: string[];
    };
    message?: string | null;
};


export type AssetWithDesignatedState = {
    errors?: {
        designatedIds?: string[];
    };
    message?: string | null;
};

export async function createDesignated(prevState: DesignatedState, formData: FormData) {
    return upsertDesignated(formData, prevState, undefined);
}

export async function editDesignated(id: string, prevState: DesignatedState, formData: FormData) {
    return upsertDesignated(formData, prevState, id);
}

export async function upsertDesignated(formData: FormData, _prevState: DesignatedState, id?: string) {
    const rawFormData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        fiscalCode: formData.get('fiscalCode'),
        email: formData.get('email'),
        birthPlace: formData.get('birthPlace'),
        birthDate: formData.get('birthDate'),
        residence: formData.get('residence'),
        phoneNumber: formData.get('phoneNumber'),
    };

    const validatedFields = DesignatedToSave.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to act on Designated.',
        };
    }

    const { firstName, lastName, fiscalCode, email, birthPlace, birthDate, residence, phoneNumber } = validatedFields.data;
    try {
        await execBackendQuery("POST", `designateds${id ? `/${id}` : ''}`, {
            first_name: firstName,
            last_name: lastName,
            fiscal_code: fiscalCode,
            email,
            birth_date: birthDate.toISOString().substring(0, 10),
            birth_place: birthPlace,
            residence,
            phone_number: phoneNumber,
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to act on Designated.',
        };
    }
    revalidatePath('/dashboard/designated');
    redirect('/dashboard/designated');
}

export async function deleteDesignated(id: string) {
    try {
        await execBackendQuery("DELETE", `designateds/${id}`, undefined);
    } catch (error) {
        console.log(error);
        return { message: 'Database Error: Failed to Delete Designated.' };
    }
    revalidatePath('/dashboard/designated');
}


export async function createAsset(prevState: AssetState, formData: FormData) {
    return upsertAsset(formData, prevState, undefined);
}

export async function editAsset(id: string, prevState: AssetState, formData: FormData) {
    return upsertAsset(formData, prevState, id);
}

export async function upsertAsset(formData: FormData, _prevState: AssetState, id?: string) {
    const rawFormData = {
        category: formData.get('category'),
        name: formData.get('name'),
        description: formData.get('description'),
    };

    const validatedFields = AssetToSave.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to act on Asset.',
        };
    }

    const { category, name, description } = validatedFields.data;
    try {
        await execBackendQuery("POST", `assets${id ? `/${id}` : ''}`, {
            category,
            name,
            description,
            updated_at: new Date().toISOString(),
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to act on Asset.',
        };
    }
    revalidatePath('/dashboard/assets');
    redirect('/dashboard/assets');
}

export async function deleteAsset(id: string) {
    try {
        await execBackendQuery("DELETE", `assets/${id}`, undefined);
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Asset.' };
    }
    revalidatePath('/dashboard/assets');
}

export async function associateAssetWithDesignated(assetId: string, _prevState: AssetWithDesignatedState, formData: FormData) {
    noStore();

    const rawFormData = {
        designatedIds: formData.get('designatedIds'),
    };
    const validatedFields = AssetWithDesignatedValidationSchema.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to assign designated to asset.',
        };
    }

    try {
        const { designatedIds } = validatedFields.data;
        const designatedIdList = designatedIds.split(",").map((id) => parseInt(id.trim()));

        console.log("designatedIdList:", designatedIdList);

        type assetDesignatedType = { id: number, asset_id: number, designated_id: number };
        const existingDesignated: assetDesignatedType[] = await execBackendQuery("GET", `asset_designateds/query?asset_id=${assetId}`);

        console.log("Existing: ", existingDesignated);

        // Delete the ones no more existing
        existingDesignated.forEach(async (it: assetDesignatedType) => {
            if (!designatedIdList.includes(it.designated_id)) {
                console.log("Deleting:", it.designated_id);
                await execBackendQuery("DELETE", `asset_designateds/${it.id}`, undefined);
            }
        })

        // Add the new ones
        designatedIdList
            .filter((designatedId) => !existingDesignated.some((existingOne) => existingOne.designated_id === designatedId))
            .forEach(async (id) => {
                console.log("Adding:", id)
                await execBackendQuery("POST", 'asset_designateds', {
                    asset_id: parseInt(assetId),
                    designated_id: id,
                });
            });
    } catch (error) {
        return {
            message: 'Database Error: Failed to assign designated to asset.',
        };
    }

    revalidatePath('/dashboard/assets');
    redirect('/dashboard/assets');
}


export async function authenticateWithCredentials(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function authenticateWithGoogle(
    prevState: string | undefined,
) {
    try {
        await signIn('google', { redirect: true, redirectTo: "/dashboard" });
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Something went wrong.';
        }
        throw error;
    }
}
