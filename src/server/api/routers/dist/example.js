"use strict";
exports.__esModule = true;
exports.exampleRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("~/server/api/trpc");
exports.exampleRouter = trpc_1.createTRPCRouter({
    hello: trpc_1.publicProcedure
        .input(zod_1.z.object({ text: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return {
            greeting: "Hello " + input.text
        };
    }),
    getAll: trpc_1.publicProcedure.query(function (_a) {
        var ctx = _a.ctx;
        return ctx.prisma.example.findMany();
    })
});
