'use server';

import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const schema = z.object({
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
})

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


const DesignatedToSave = DesignatedValidationSchema.omit({ id: true, date: true });

export type State = {
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

export async function createDesignated(prevState: State, formData: FormData) {
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
    console.log(rawFormData);

    console.log("PREV_STATE---->", prevState);
    const validatedFields = DesignatedToSave.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Designated.',
        };
    }

    const { firstName, lastName, fiscalCode, email, birthPlace, birthDate, residence, phoneNumber } = validatedFields.data;
    try {
        const response = await execBackendQuery("POST", 'designateds', {
            first_name: firstName,
            last_name: lastName,
            fiscal_code: fiscalCode,
            email,
            birth_date: birthDate.toISOString().substring(0, 10),
            birth_place: birthPlace,
            residence,
            phone_number: phoneNumber,
        });
        console.log("RESPONSE ---> ", response);
    } catch (error) {
        return {
            message: 'Database Error: Failed to create Designated.',
        };
    }
    revalidatePath('/dashboard/designated');
    redirect('/dashboard/designated');
}

export async function editDesignated(id: string, _prevState: State, formData: FormData) {
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
    console.log("PREV_STATE---->", _prevState);
    const validatedFields = DesignatedToSave.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to edit Designated.',
        };
    }
    const { firstName, lastName, fiscalCode, email, birthPlace, birthDate, residence, phoneNumber } = validatedFields.data;
    try {
        const response = await execBackendQuery("POST", `designateds/${id}`, {
            first_name: firstName,
            last_name: lastName,
            fiscal_code: fiscalCode,
            email,
            birth_date: birthDate.toISOString().substring(0, 10),
            birth_place: birthPlace,
            residence,
            phone_number: phoneNumber,
        });
        console.log("RESPONSE ---> ", response);
    } catch (error) {
        console.log(error);
        return { message: 'Database Error: Failed to Update Designated.' };
    }

    revalidatePath('/dashboard/designated');
    redirect('/dashboard/designated');
}

export async function deleteDesignated(id: string) {
    try {
        console.log("DELETE IN PROGRESS");
        const response = await execBackendQuery("DELETE", `designateds/${id}`, undefined);
        console.log("RESPONSE ---> ", response);
    } catch (error) {
        console.log(error);
        return { message: 'Database Error: Failed to Delete Designated.' };
    }
    revalidatePath('/dashboard/designated');
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

function removeUndefinedFields(obj: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([_, value]) => value !== undefined)
    );
}

async function execBackendQuery(method: string, apiPath: string, body?: any) {
    console.log("method:", method);
    const fullPath = `${process.env.BACKEND_API_URL!!}/api/${apiPath}`;
    console.log("fullPath:", fullPath);
    console.log("body:", body);

    const initRequest = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    };
    console.log("initResponse:", initRequest);
    const normalizedRequest = removeUndefinedFields(initRequest);
    console.log("normalizedRequest:", normalizedRequest);
    const response = await fetch(fullPath, normalizedRequest);
    console.log(response);
    if (method !== 'DELETE') {
        const result = await response.json();
        return result;
    } else {
        return response.status;
    }
}