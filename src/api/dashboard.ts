import HttpClient from "./http_client";
import { HttpAttribute } from "./http_attribute";

export class DashboardApi {

    apiUrl: string;

    constructor() {
        this.apiUrl = "https://fc72-197-156-72-29.ngrok-free.app";
    }

    async getDashboardData() {
        return new HttpClient().get(
            new HttpAttribute(this.apiUrl ?? "", "/api/analytics/getOverAllAnalytics", {})
        );
    }

    async getAllBooking() {
        return new HttpClient().get(
            new HttpAttribute(this.apiUrl ?? "", "/api/flight/getAllBooking", {})
        );
    }
}
