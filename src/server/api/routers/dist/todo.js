"use strict";
exports.__esModule = true;
exports.todoRouter = void 0;
var trpc_1 = require("../trpc");
exports.todoRouter = trpc_1.createTRPCRouter({
    getTodos: trpc_1.publicProcedure.query(function (_a) {
        var ctx = _a.ctx;
        var todos = ctx.prisma.todo.findMany();
        return todos;
    })
});
