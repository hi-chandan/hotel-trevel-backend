"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgInput = exports.postInput = exports.PostInput = void 0;
const z = __importStar(require("zod"));
const LatitudeSchema = z.coerce
    .number({
    required_error: "Latitude is required",
    invalid_type_error: "Latitude must be a number",
})
    .min(-90)
    .max(90)
    .refine((val) => val !== 0, {
    message: "Latitude must be 0",
});
const LongitudeSchema = z.coerce
    .number({
    required_error: "Longitude is required",
    invalid_type_error: "Longitude must be a number",
})
    .min(-180)
    .max(180)
    .refine((val) => val !== 0, {
    message: "Longitude must be 0",
});
exports.PostInput = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(2, { message: "Title minimum 2 characters" }),
    price: z.coerce
        .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    })
        .min(1, { message: "Price must be greater than 1" }),
    address: z
        .string({ required_error: "Address is required" })
        .min(3, { message: "Address must be at least 3 characters" }),
    city: z
        .string({ required_error: "City is required" })
        .min(3, { message: "City must be at least 3 characters" }),
    bedroom: z.coerce
        .number({
        required_error: "Bedroom count is required",
        invalid_type_error: "Bedroom count must be a number",
    })
        .min(1, { message: "There must be at least 1 bedroom" }),
    bathroom: z.coerce
        .number({
        required_error: "Bathroom count is required",
        invalid_type_error: "Bathroom count must be a number",
    })
        .min(1, { message: "There must be at least 1 bathroom" }),
    latitude: LatitudeSchema,
    longitude: LongitudeSchema,
    type: z
        .string({ required_error: "Type is required" })
        .min(1, { message: "Type must be at least 1 character" }),
    property: z
        .string({ required_error: "Property type is required" })
        .min(3, { message: "Property type must be at least 3 characters" }),
    desc: z
        .string({ required_error: "Description is required" })
        .min(3, { message: "Description must be at least 3 characters" }),
    image: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image must be a string",
    }),
    utilities: z.string().optional(),
    pet: z.string().optional(),
    size: z.coerce.number().optional(),
    income: z.string().optional(),
    school: z.coerce.number().optional(),
    bus: z.coerce.number().optional(),
    restaurant: z.coerce.number().optional(),
});
exports.postInput = exports.PostInput.pick({
    title: true,
    price: true,
    address: true,
    city: true,
    bedroom: true,
    bathroom: true,
    latitude: true,
    longitude: true,
    type: true,
    property: true,
    desc: true,
    utilities: true,
    pet: true,
    size: true,
    income: true,
    bus: true,
    restaurant: true,
});
exports.imgInput = exports.PostInput.pick({
    image: true,
});
