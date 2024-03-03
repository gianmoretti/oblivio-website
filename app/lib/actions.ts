'use server';

import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const AssetValidationSchema = z.object({
    id: z.string(),
    designatedId: z.string({ invalid_type_error: 'Please select a designated.' }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.', }),
    date: z.string(),
});


const AssetToSave = AssetValidationSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        designatedId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createAsset(prevState: State, formData: FormData) {
    //const rawFormData = Object.fromEntries(formData.entries())
    const rawFormData = {
        designatedId: formData.get('designatedId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    };
    // Test it out:
    console.log(rawFormData);

    const validatedFields = AssetToSave.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create Asset.',
        };
    }

    const { designatedId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO assets (customer_id, amount, status, date)
        VALUES (${designatedId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Asset.',
        };
    }
    revalidatePath('/dashboard/assets');
    redirect('/dashboard/assets');
}

export async function editAsset(id: string, prevState: State, formData: FormData) {
    const rawFormData = {
        designatedId: formData.get('designatedId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    };
    const validatedFields = AssetToSave.safeParse(rawFormData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to edit Asset.',
        };
    }
    const { designatedId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
    try {
        await sql`
        UPDATE assets 
        set 
            customer_id = ${designatedId}, 
            amount = ${amountInCents},
            status = ${status},
            date = ${date}
        WHERE
            id = ${id}
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Asset.' };
    }

    revalidatePath('/dashboard/assets');
    redirect('/dashboard/assets');
}

export async function deleteAsset(id: string) {
    try {
        await sql`DELETE FROM assets WHERE id = ${id}`;
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Asset.' };
    }
    revalidatePath('/dashboard/assets');
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
