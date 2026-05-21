import { z } from 'zod';

export const RaritySchema = z.enum(['Abundant', 'Common', 'Uncommon', 'Rare', 'VeryRare', 'ExtremelyRare']);

export const AllowedLocationsSchema = z.enum(['Coastal', 'Continental', 'Mountain']);

export const HttpErrorSchema = z.object({
    statusCode: z.number().int(),
    error: z.string(),
    message: z.string(),
});

export const NotFoundSchema = (message: string) =>
    HttpErrorSchema.meta({
        description: 'Not Found',
        examples: [
            {
                statusCode: 404,
                error: 'Not Found',
                message,
            },
        ],
    });
