import HttpClient from "./http_client";
import { HttpAttribute } from "./http_attribute";

export class AdminApi {

    apiUrl: string;

    constructor() {
        this.apiUrl = "https://fc72-197-156-72-29.ngrok-free.app";
    }

    async login(loginRequest: { email: string, password: string }) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/admin-login", loginRequest)
        );
    }

    async getAgent() {
        return await new HttpClient().get(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/getAllAgents", {})
        );
    }

    async changeAgentStatus(id: string) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/changeAgentStatus", { id })
        );
    }

    async getAdmin() {
        return await new HttpClient().get(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/getAdmins", {})
        );
    }

    async changeAdminStatus(id: string) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/changeAdminStatus", { id })
        );
    }

    async deleteAgent(id: string) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/deleteAgent", { id })
        );
    }

    async deleteAdmin(id: string) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/deleteAdmin", { id })
        );
    }

    async addAgent(agent: { emailAddress: string, password: string, name: string, phone: string }) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/addAgent", agent)
        );
    }

    async addAdmin(agent: { emailAddress: string, password: string, name: string, phone: string }) {
        return await new HttpClient().post(
            new HttpAttribute(this.apiUrl ?? "", "/api/user/addAdmin", agent)
        );
    }
}
