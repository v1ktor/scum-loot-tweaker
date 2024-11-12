import { StringEnum } from "../../../utils/swagger-typebox-enum.ts";

export const RaritySchema = StringEnum(["Abundant", "Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare"])
export const AllowedLocationsSchema = StringEnum(["Coastal", "Continental", "Mountain"])