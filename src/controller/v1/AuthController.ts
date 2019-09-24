import { Controller, Post, Req, Res, Use } from "@tsed/common"
import { Docs, Name } from "@tsed/swagger"
import { loginValidator } from "../../validator/AuthValidator"

@Controller("/auth")
@Name("Auth")
@Docs("api-v1")
export class AuthController {

  @Use(loginValidator)
  @Post("/login")
  async login(@Req() req: Req, @Res() res: Res) {}
}
