module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/Projects/gynecomastiamd/lib/graphql.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * WordPress REST API client for fetching posts, pages and other content
 */ __turbopack_context__.s([
    "fetchWordPressAPI",
    ()=>fetchWordPressAPI
]);
async function fetchWordPressAPI(endpoint, options = {}) {
    const apiBase = ("TURBOPACK compile-time value", "https://gynecomastiamd.com/wp-json/wp/v2");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const url = `${apiBase}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    // Add Basic authentication if credentials are available
    if (process.env.API_USERNAME && process.env.API_PASSWORD) {
        const credentials = btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`);
        headers['Authorization'] = `Basic ${credentials}`;
    }
    try {
        const response = await fetch(url, {
            ...options,
            headers
        });
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(`API request failed with status ${response.status}: ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
    }
}
}),
"[project]/Documents/Projects/gynecomastiamd/lib/queries.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Endpoints and parameters for the WordPress REST API
 */ __turbopack_context__.s([
    "ENDPOINTS",
    ()=>ENDPOINTS,
    "POST_QUERY_PARAMS",
    ()=>POST_QUERY_PARAMS,
    "SINGLE_POST_QUERY_PARAMS",
    ()=>SINGLE_POST_QUERY_PARAMS
]);
const ENDPOINTS = {
    POSTS: '/posts',
    PAGES: '/pages',
    CATEGORIES: '/categories',
    SITE: '/settings'
};
const POST_QUERY_PARAMS = {
    per_page: 10,
    orderby: 'date',
    order: 'desc',
    _fields: [
        'id',
        'title',
        'excerpt',
        'slug',
        'date',
        'featured_image',
        'status'
    ]
};
const SINGLE_POST_QUERY_PARAMS = {
    _fields: [
        'id',
        'title',
        'content',
        'excerpt',
        'slug',
        'date',
        'featured_image',
        'author',
        'categories',
        'tags'
    ]
};
}),
"[project]/Documents/Projects/gynecomastiamd/app/api/posts/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$gynecomastiamd$2f$lib$2f$graphql$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/gynecomastiamd/lib/graphql.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$gynecomastiamd$2f$lib$2f$queries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/gynecomastiamd/lib/queries.ts [app-route] (ecmascript)");
;
;
const dynamic = 'force-dynamic';
async function GET() {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('per_page', '5');
        queryParams.append('orderby', 'date');
        queryParams.append('order', 'desc');
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$gynecomastiamd$2f$lib$2f$graphql$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchWordPressAPI"])(`${__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$gynecomastiamd$2f$lib$2f$queries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENDPOINTS"].POSTS}?${queryParams.toString()}`);
        return Response.json({
            data,
            error: null
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching posts:', error);
        return Response.json({
            data: null,
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aaca1842._.js.map