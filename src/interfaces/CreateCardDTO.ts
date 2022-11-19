export interface CreateCardDTO {
    "name": string;
    "telNumber": string;
    "introduce": string;
    "isDeliver": boolean;
    "imageURL"?: string;
    "type": number;
    "address": string;
    "weekday": boolean[];
};
