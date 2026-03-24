import { faq } from "@/schemaTypes/documents/faq";
import { footer } from "@/schemaTypes/documents/footer";
import { homePage } from "@/schemaTypes/documents/home-page";
import { navbar } from "@/schemaTypes/documents/navbar";
import { page } from "@/schemaTypes/documents/page";
import { settings } from "@/schemaTypes/documents/settings";

export const singletons = [homePage, settings, footer, navbar];

export const documents = [page, faq, ...singletons];
