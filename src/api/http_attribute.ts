export class HttpAttribute {
    baseUrl: string;
    relativeUrl: string;
    body?: Object;
    header?: Object;

    constructor(
        baseUrl: string,
        relativeUrl: string,
        body?: Object,
        header?: Object
    ) {
        this.baseUrl = baseUrl;
        this.relativeUrl = relativeUrl;
        this.body = body;
        this.header = header || { "Content-Type": "application/json" };
    }
}
