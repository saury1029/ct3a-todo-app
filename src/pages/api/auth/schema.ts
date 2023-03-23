import { z } from "zod";

export const schema = z.object({
  name: z
    .string({
      required_error: "请输入姓名",
    })
    .nonempty("姓名不能为空"),
  password: z
    .string({
      required_error: "请输入密码",
    })
    .min(6, {
      message: "密码长度不能小于6位",
    }),
});
