module.exports = [
"[project]/github_projects/zoo-app/app/services/timeService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hrsPassed",
    ()=>hrsPassed
]);
function hrsPassed(lastFed, hours) {
    const lastFedTime = new Date(lastFed).getTime();
    const currentTime = new Date().getTime();
    const hrsInMilliSec = hours * 60 * 60 * 1000;
    return currentTime - lastFedTime > hrsInMilliSec;
}
}),
"[project]/github_projects/zoo-app/app/services/animalService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "feedAnimal",
    ()=>feedAnimal,
    "getAnimalById",
    ()=>getAnimalById,
    "getAnimals",
    ()=>getAnimals,
    "resetAnimalFeedingIfNeeded",
    ()=>resetAnimalFeedingIfNeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$app$2f$services$2f$timeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/github_projects/zoo-app/app/services/timeService.ts [app-ssr] (ecmascript)");
;
const API_URL = "https://animals.azurewebsites.net/api/animals";
const STORAGE_KEY = "animals";
async function getAnimals() {
    const storedAnimals = localStorage.getItem(STORAGE_KEY);
    if (storedAnimals) {
        return JSON.parse(storedAnimals);
    }
    const response = await fetch(API_URL);
    const animals = await response.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(animals));
    return animals;
}
async function getAnimalById(id) {
    const animals = await getAnimals();
    const animal = animals.find((animal)=>animal.id === id);
    if (!animal) {
        return undefined;
    }
    const updatedAnimal = resetAnimalFeedingIfNeeded(animal);
    if (updatedAnimal.isFed !== animal.isFed) {
        const updatedAnimals = animals.map((animal)=>animal.id === id ? updatedAnimal : animal);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnimals));
    }
    return updatedAnimal;
}
function feedAnimal(id) {
    const animals = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updatedAnimals = animals.map((animal)=>{
        if (animal.id === id) {
            return {
                ...animal,
                isFed: true,
                lastFed: new Date().toISOString()
            };
        }
        return animal;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnimals));
}
function resetAnimalFeedingIfNeeded(animal) {
    if (animal.isFed && (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$app$2f$services$2f$timeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hrsPassed"])(animal.lastFed, 3)) {
        return {
            ...animal,
            isFed: false
        };
    }
    return animal;
}
}),
"[project]/github_projects/zoo-app/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/github_projects/zoo-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/github_projects/zoo-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/github_projects/zoo-app/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$app$2f$services$2f$animalService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/github_projects/zoo-app/app/services/animalService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$app$2f$services$2f$timeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/github_projects/zoo-app/app/services/timeService.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Home() {
    const [animals, setAnimals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadAnimals() {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$app$2f$services$2f$animalService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnimals"])();
            setAnimals(data);
        }
        loadAnimals();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8 text-yellow-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-4xl font-bold mb-8",
                children: "The Zoo"
            }, void 0, false, {
                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
                children: animals.map((animal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "border p-4 rounded",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: animal.imageUrl,
                                alt: animal.name,
                                onError: (event)=>{
                                    event.currentTarget.src = "/placeholder-animal.png";
                                },
                                className: "w-full h-64 object-contain rounded mb-4"
                            }, void 0, false, {
                                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold mb-2",
                                children: animal.name
                            }, void 0, false, {
                                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-4",
                                children: animal.shortDescription
                            }, void 0, false, {
                                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$app$2f$services$2f$timeService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hrsPassed"])(animal.lastFed, 4) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-4 font-extrabold text-black",
                                children: "Mata mig! 🦦"
                            }, void 0, false, {
                                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$github_projects$2f$zoo$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/animals/${animal.id}`,
                                className: "underline",
                                children: "Läs mer"
                            }, void 0, false, {
                                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this)
                        ]
                    }, animal.id, true, {
                        fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/github_projects/zoo-app/app/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/github_projects/zoo-app/app/page.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=github_projects_zoo-app_app_0ndxwcd._.js.map